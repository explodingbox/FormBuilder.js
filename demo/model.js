Model = (function(){
  var self = {};
  
  self.properties = [
    {
      key: 'first_name',
      type: 'text',
      value: 'Colin',
      label: 'First Name'
    },
    {
      key: 'middle_name',
      type: 'text',
      label: 'Middle Name',
      placeholder: 'Middle Name'
    },
    {
      key: 'last_name',
      type: 'text',
      value: 'Huddleston',
      'label': 'Last Name'
    },
    {
      key: 'dob',
      type: 'date',
      value: '1980-03-03',
      label: 'Date of Birth'
    },
    {
      key: 'transport_method',
      type: 'select',
      value: 'pogo stick',
      options: [
        {value: 'pogo stick',label: 'Pogo Stick'},
        {value: 'bike',label: 'Bike'},
        {value: 'car',label: 'Car'}
      ],
      label: 'Mode of transport'
    },
    {
      key: 'email',
      type: 'email',
      value: 'colin@explodingbox.com',
      'label': 'Email'
    },
    {
      key: 'gender',
      type: 'radioset',
      label: 'Gender',
      value: 'm',
      options: [
        {
          'value':'m',
          'label':'Male',
          'checked':true
        },
        {
          'value':'f',
          'label':'Female'
        }
      ]
    },
    {
      key: 'metal',
      type: 'collection',
      label: 'Metal',
      items: [
        {
          key: 'hair_metal',
          type: 'checkbox',
          value: false,
          label: 'Hair Metal'
        },
        {
          key: 'pants_metal',
          type: 'checkbox',
          value: true,
          label: 'Pants Metal'
        }
      ]
    },
    {
      key: 'speed',
      value: 10,
      type: 'range',
      label: 'Speed'
    },
    {
      key: 'real_speed',
      value: 100,
      type: 'hidden',
    },
    {
      key: 'addresses',
      type: 'collection',
      params: {
        label: 'Addresses',
        add: true,
        base: {
          type: 'collection',
          items: [
            {
              key: 'street',
              value: '',
              type: 'text',
              label: 'Street'
            },
            {
              key: 'state',
              value: '',
              type: 'text',
              label: 'State'
            }
          ]
        }
      },
      items: [
        {
          key: 'address',
          type: 'collection',
          items: [
            {
              key: 'street',
              value: 'Some place in England',
              type: 'text',
              label: 'Street'
            },
            {
              key: 'state',
              value: 'Oxfordshire',
              type: 'text',
              label: 'State'
            }
          ]
        },
        {
          key: 'address',
          type: 'collection',
          items: [
            {
              key: 'street',
              value: 'Some place in Australia',
              type: 'text',
              label: 'Street'
            },
            {
              key: 'state',
              value: 'Queensland',
              type: 'text',
              label: 'State'
            }
          ]
        }
      ]
    }
  ]
  
  self.save = function(){
    console.log("saving...");
    console.log(self.properties);
  }
    
  
  return self;
});


