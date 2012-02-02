FormBuilder = (function(model){
  var self=this;
  if ( ! model) return false;
  self.render = function(){
    self.element = new Element('form');
    for (var i=0; i < model.length; i++) {
      p = model[i];
      p.params = p.params || {}
      if ( p.label ) {
        new Element('label',{
          text: p.label
        }).inject(self.element);
      }
      if(self.builders[p.type]){
        self.element.adopt(self.builders[p.type](p));
      }
    };
    return self.element;
  }
  return self;
});


FormBuilder.prototype.builders = {};

FormBuilder.prototype.builders.collection = function(p){
  var el = new Element('div.'+p.key+'.collection');
  var builders = this;
  for (var i=0; i < p.items.length; i++) {
    var item = p.items[i]
    item.params = item.params || {};
    if ( item.label && item.type != 'checkbox') { //checkbox makes its own label
      new Element('label',{
        text: item.label
      }).inject(el);
    }
    if( builders[item.type] ){
      el.adopt(builders[item.type](item));
    }
  };
  return el;
}


FormBuilder.prototype.builders.text = function(p){
  var el = new Element('input.'+p.key,{
    name: p.key,
    value: p.value,
    type: 'text',
    placeholder: p.params.placeholder,
    events: {
      change: function(){
        p.value = el.get('value')
      }
    }
  });  
  return el;
};

FormBuilder.prototype.builders.number = function(p){
  var el = new Element('input.'+p.key,{
    name: p.key,
    value: p.value,
    type: 'number',
    placeholder: p.params.placeholder,
    events: {
      change: function(){
        p.value = el.get('value')
      }
    }
  });  
  return el;
};


FormBuilder.prototype.builders.email = function(p){
  var el = new Element('input.'+p.key,{
    name: p.key,
    type: 'email',
    value: p.value,
    placeholder: p.params.placeholder,
    events: {
      change: function(){
        p.value = el.get('value')
      }
    }
  });  
  return el;  
}

FormBuilder.prototype.builders.hidden = function(p){
  var el = new Element('input.'+p.key,{
    name: p.key,
    type: 'hidden',
    value: p.value
  });
  return el;  
}

FormBuilder.prototype.builders.tel = function(p){
  var el = new Element('input.'+p.key,{
    name: p.key,
    type: 'tel',
    value: p.value,
    placeholder: p.params.placeholder,
    events: {
      change: function(){
        p.value = el.get('value')
      }
    }
  });  
  return el;  
}

FormBuilder.prototype.builders.select = function(p){
  var el = new Element('select.'+p.key,{
    name: p.key,
    value: p.value,
    events: {
      change: function(){
        p.value = el.get('value')
      }
    }
  });
  for (var i=0; i < p.options.length; i++) {
    var option = p.options[i];
    new Element('option',{
      value: option.value,
      text: option.label
    }).inject(el);
  };
  el.set('value',p.value);
  return el;  
}


FormBuilder.prototype.builders.radioset = function(p){
  var el = new Element('div.'+p.key+'.radioset');
  var radio_buttons = []
  for (var i=0; i < p.options.length; i++) {
    var r = p.options[i];
    var radio_el = new Element('input',{
      type: 'radio',
      value: r.value,
      name: p.key,
      checked: r.checked,
      events: {
        'change': function(){
          p.value = el.getElement('input[name='+p.key+']:checked').get('value');
        }
      }
    })
    new Element('label',{'text':r.label}).adopt(radio_el).inject(el);
    radio_buttons.push(radio_el);
  };
  return el;
}


FormBuilder.prototype.builders.checkbox = function(p){
  var checkbox,label;
  
  checkbox = new Element('input.'+p.key,{
    type: 'checkbox',
    checked: p.value,
    name: p.name,
    events: {
      change: function(){
        if (checkbox.get('value')) {
          p.value = true;
        } else {
          p.value = false;
        }
      }
    }    
  }); 

  if (p.label) {
    label = new Element('label',{
      text: p.label
    });
    label.adopt(checkbox);
    return label;
  }

  return checkbox;
  
}


FormBuilder.prototype.builders.date = function(p){
  var el,
      date_array,
      date_object,
      months,
      month_select,
      day_select,
      year_start,
      year_end,
      year_select,
      updateValue;
  el          = new Element('div.'+p.key+'.datepicker');
  date_array  = p.value.split('-');
  date_object = {
    year  : date_array[0].toInt(),
    month : date_array[1].toInt(),
    day   : date_array[2].toInt()
  };
  updateValue = function(){
    p.value = (year_select.get('value')+'-'+month_select.get('value')+'-'+day_select.get('value'));
  }
  month_select = new Element('select',{events:{'change':updateValue}});
  months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  for (var i=0; i < months.length; i++) {
    new Element('option',{
      value: i+1,
      text: months[i]
    }).inject(month_select);
  };
  month_select.set('value',date_object.month);
  day_select = new Element('select',{events:{'change':updateValue}});
  for (var i=1; i < 32; i++) {
    new Element('option',{
      value: i,
      text: i
    }).inject(day_select);
  };
  day_select.set('value',date_object.day);
  year_select = new Element('select',{events:{'change':updateValue}});
  year_start  = p.params.year_start || 1900;
  year_end    = p.params.year_end || 2020;
  for (var i=year_start; i < year_end+1; i++) {
    new Element('option',{
      value: i,
      text: i
    }).inject(year_select);
  };
  year_select.set('value',date_object.year);
  el.adopt(month_select,day_select,year_select);
  return el;
}


FormBuilder.prototype.builders.range = function(p){
  var params = p.params || {};
  var el = new Element('input.'+p.key,{
    value: p.value,
    name: p.key,
    min: params.min || 0,
    max: params.max || 100,
    type: 'range',
    events: {
      change: function(){
        p.value = el.get('value');
      }
    }
  });
  var applyRange = function(){
    try {
    var rs = new RangeSlider(el);
    rs.proxy_element.addClass(p.key);
    
  } catch(err){
    // Fall back to default input
  }
  }
  setTimeout(applyRange,'1');
  return el;
}




















