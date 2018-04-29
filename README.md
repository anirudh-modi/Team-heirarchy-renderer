# team-heirarchy-renderer

This is a tree render, which takes object named `rootNode` present within the `src/config/config.js` file and renders a expandable and collapsable tree.

## Installation
To run the application, follow the process below :

[1] Download the github repo, 
[2] Unzip the downloaded folder
[3] From terminal navigate to the downloaded folder
[4] Run `npm install` within the **root folder**. 
[5] Run `npm start` within the **root folder**. 
[6] In your browser open the url `localhost:8080`

## Editing tree
To change the tree structure,
[1] Open the file `src/config/config.js`
[2] Edit the property `rootNode`
[3] To add multiple child to a node add objects within the `immediateEmployee` array present for each node.
