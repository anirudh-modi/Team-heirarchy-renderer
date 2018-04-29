# team-heirarchy-renderer

This is a tree render, which takes object named `rootNode` present within the `src/config/config.js` file and renders a expandable and collapsable tree.

## Installation
To run the application, follow the process below :

* Download the github repo, 
* Unzip the downloaded folder
* From terminal navigate to the downloaded folder
* Run `npm install` within the **root folder**. 
* Run `npm start` within the **root folder**. 
* In your browser open the url `localhost:8080`

## Editing tree
To change the tree structure,
* Open the file `src/config/config.js`
* Edit the property `rootNode`
* To add multiple child to a node add objects within the `immediateEmployee` array present for each node.
