# Back-End

## Needed tools

We use NodeJS (which comes bundle with the node package manager NPM).
We use NPM to manage dependencies.
We use Grunt for running javascript tasks.
We use mongoDB, and mongoDB should be running on the port 27017.

### Linux
- Open the Terminal.
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `sudo npm install grunt-cli -g`

### Windows
- Open the Command Prompt.
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `npm install grunt-cli -g`

### Mac OS
- Open the Terminal.
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `sudo npm install grunt-cli -g`

## Install

- Open the terminal and go to the location of this project
- Run `npm install`

## Build & development

Start MongoDB on the port 27017.
If it is the first time you are using the application, run "node init.js".
Run `grunt` for starting the server.
Or use the command 'node app' in the this folder.

If you want to clear the database run "node clear.js".

## Test

Start MongoDB on the port 27017.
Run "mocha -u tdd test\XXX" with XXX begin the name of the folder you want to test.
The available folders are domain - data - core, matching the folders in the src folder.

