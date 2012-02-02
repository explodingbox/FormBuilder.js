#FormBuilder.js

Builds ajax forms from a given Model, when inputs are changed, model properties are automatically updated.

###NB: 

- There is a specific formatting structure. See model.js in /demo
- Currently uses mootools for dom manipulation and slider element. Would love to see someone do a jQuery fork. 

Usage

    myModel = new Model();
    fb = new FormBuilder(myModel);
    fb.render().inject(document.id('container'));
  
