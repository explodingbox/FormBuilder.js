#FormBuilder.js

##Builds ajax forms from a given Model, when inputs are changed, model properties are automatically updated.

###NB: 

- Model must have a .properties object, and there is a specific formatting structure. See model.js in /demo
- Currently uses mootools for dom manipulation and slider element

Usage

    myModel = new Model();
    fb = new FormBuilder(myModel);
    fb.render().inject(document.id('container'));
  
