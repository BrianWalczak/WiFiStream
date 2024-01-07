const express = require('express');
const path = require('path');
const ejs = require('ejs');
const fs = require('fs').promises;
const app = express();

const settings = {
	defaultPath: '/Volumes/USB Stick/', // The default path to open
	updateDefaultOnChange: false, // Update the defaultPath to the most recent directory file search
	port: 1010, // Port that the server will be hosted on
};

app.set('view engine', 'ejs');

async function readDirectory(directoryPath) {
	const fileList = [];
	
	try {
		const files = await fs.readdir(directoryPath);
		
		for (const file of files) {
			if(Array.from(file)[0] !== ".") {
				const fileData = await fs.lstat(`${directoryPath}/${file}`);
			
				fileList.push({ name: file, path: `${directoryPath}/${file}`, directory: fileData.isDirectory() });
			}
		}
		
		return fileList;
	} catch (err) {
		return "An unknown error occurred when loading this directory. Perhaps it doesn't exist?";
	}
}

app.get('/', (req, res) => {
  res.status(200).render('index', { defaultPath: settings.defaultPath });
});

app.get('/files/*', async (req, res) => {
	try {
		const reqPath = req.params[0];
		
		await fs.access(reqPath, fs.constants.R_OK);
		const fileData = await fs.lstat(reqPath);
		
		if(fileData.isDirectory()) {
			const files = await readDirectory(reqPath);
			if(files.constructor !== Array) return res.status(404).redirect("/?error=" + files);
		
			res.status(200).render('files', { fileList: files, currentPath: reqPath });
		} else {
			res.status(200).sendFile(reqPath);
		}
	} catch(error) {
		res.status(404).redirect("/?error=An unknown error occurred when loading this file. Perhaps it doesn't exist?");
	}
});

app.get('/api/authorize', (req, res) => {
	try {
		var directory = req.query.path;
		if(!directory) return res.status(400).redirect("/?error=An invalid directory was provided!");
		
		if (directory.lastIndexOf('/') === directory.length - 1) {
			directory = directory.slice(0, -1);
		}
		
		if(settings.updateDefaultOnChange) settings.defaultPath = directory;
		res.redirect('/files/' + directory);
	} catch(error) {
		res.status(500).redirect("/?error=An unknown error occurred when completing this action.");
	}
});

app.use((req, res, next) => {
  res.status(404).redirect('/');
});

app.listen(settings.port, '0.0.0.0', () => {
	if (settings.defaultPath.lastIndexOf('/') === settings.defaultPath.length - 1) {
	  settings.defaultPath = settings.defaultPath.slice(0, -1);
	}
	
  console.log(`Server is running at http://localhost:${port} with default path ${settings.defaultPath}!`);
});
