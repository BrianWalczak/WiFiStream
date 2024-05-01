###### (psst! keep an eye out on this repository, we're releasing an awesome feature shortly 👀)
<h1 align="center">WiFi Stream - The wireless file manager</h1>

<p align="center">A local web server (powered by Express) to manage files over your secure network (WiFi).<br><br></p>

## Features
- Search in any directory accessible on your server (including USB drives!)
- Open and read **any** files located in **any** directory

## Installation
To host the server locally on your device, enter the following commands into your terminal:

```bash
$ git clone https://github.com/BrianWalczak/WiFiStream.git; # Clone the repository from GitHub
$ cd WiFiStream # Enter the extracted repository folder
$ npm install # Install libraries and dependencies
```

Before continuing any further, you'll first have to configure some settings. Open the index.js file to make these changes.
In index.js, you will see the following options:
```js
const settings = {
	defaultPath: '/Volumes/USB Stick/', // The default path to open
	updateDefaultOnChange: false, // Update the defaultPath to the most recent directory file search
	port: 1010, // Port that the server will be hosted on
};
```
Update these settings to your liking, and save the file when done.

<br></br>
After you're happy with the settings that you've configured, enter the following command in your Terminal to deploy the server:
```bash
$ node . # Start the Node program
```
Once you run ``node .``, the web server will start automatically!


  <p align="center">Made with ♡ by <a href="https://www.brianwalczak.com">Briann</a></p>
