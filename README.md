
#FX Machine: Be the master of your effects !

[![Greenkeeper badge](https://badges.greenkeeper.io/GuillaumeRahbari/FXMachine.svg)](https://greenkeeper.io/)

#Description

###Who are we ?
We are four students from an engineer school in France called Polytech Nice-Sophia. If you want to have more information about us, please go on the website.

###What is FX Machine project ?
We are developing a website for guitarists who would like to have their own effect pedals on
their computers. 

###Tired to buy or test a lot of pedal because you can't find the perfect sound?
 Don't worry, FX Machine is the solution made for you! Thanks to our system, you will be able to
create your own pedal by selecting every components (filters, effects) of your pedal.
When you finish, you can save it and share it with your friends.

### Wait we made more functionalities!
 Once you have built your pedal with all effects you need, you can save it and share it to your
friends. In fact, when you save, your pedal is public and people can use it.

#Project structure

We have two big parts in our project: the Back-end and the Front-end. 

For the Front-end, we developed it in JavaScript with the framework AngularJS. Let's see how the structure has been made.
There is four important parts in the folder app: components, scripts, styles, views. The last three parts are really common in an AngularJS project. In fact, scripts contain three types of elements controllers, directives and services (also an app file to manage some things). Controllers have a link with a view in the folder Views and they have their styles in the folder Styles. 

OKAY ! Do we have something new?

Yes ! We build all our filters for the music and some of our web page pieces as web components. For us, this structure was really important to be able to add elements without refactoring our code all the time and be able to manage current components easily. You can find in the folder Components a folder for each component. In it, you will find the controller, the view and style. Right now, all the components have their own behavior and work indepently.


#Tools
=========
##FrontEnd

- We use NodeJS (which comes bundle with the node package manager NPM).
- We use NPM to manage our dependencies.
- We use Grunt for running javascript tasks.
- We use Bower to manage web dependencies.
- We use Yeoman, a project generator.
- We use Sass (Compass) so we need to install it.
- We need Ruby to use Sass
- We use Bundler to manage the ruby dependencies.

#Installation
=========
##FrontEnd
### Linux

- Open the Terminal.
- Install Ruby : `sudo apt-get install ruby-full`
- Install Bundler : `sudo gem install bundler`
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `sudo npm install grunt-cli -g`
- Install Bower : `sudo npm install bower -g`
- Install Yeoman : `sudo npm install yo -g`

### Windows

- Open the Command Prompt.
- Install Ruby : Use the [Ruby Installer](http://rubyinstaller.org/)
- Install Bundler : `gem install bundler`
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `npm install grunt-cli -g`
- Install Bower : `npm install bower -g`
- Install Yeoman : `npm install yo -g`

### Mac OS

- Open the Terminal.
- Install Ruby : already installed
- Install Bundler : `sudo gem install bundler`
- Install NodeJS : Use the [NodeJS Installer](https://nodejs.org/en/download/)
- Install Grunt : `sudo npm install grunt-cli -g`
- Install Bower : `sudo npm install bower -g`
- Install Yeoman : `sudo npm install yo -g`

## Install

- Open the terminal and go to the location of this project
- Run `npm install`
- Run `bower install`
- Run `bundle install`




