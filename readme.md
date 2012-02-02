#FormBuilder.js

#Builds ajax forms from a given Model, when inputs are changed, model properties are automatically updated.

NB: model must have a .properties object, and there is a specific formatting structure. See model.js in /demo

Usage

  myModel = new Model();
  fb = new FormBuilder(myModel);
  fb.render().inject(document.id('container'));
  
