/*
 * Copyright (c) 2016, MakerClub, Simon Riley
 *
 * MAKERCLUB CONFIDENTIAL
 * __________________
 *
 *  [2014] - [2016] MakerClub Ltd
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of MakerClub Ltd and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to MakerClub Ltd
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from MakerClub Ltd.
 */

/**
 * @fileoverview C blocks for MakerClub blockly.
 * @author simon@makerclub.org (Simon Riley)
 */
'use strict';

var pinMap = [
  {
    userVisiblePinName: "1",
    codePinName: "1",
    instanceName: "input1",
    supportsDigitalWrite: false,
    supportsDigitalRead: true, //Emulated in software
    supportsAnalogRead: true,
  },
  {
    userVisiblePinName: "2",
    codePinName: "2",
    instanceName: "input2",
    supportsDigitalWrite: false,
    supportsDigitalRead: true, //Emulated in software
    supportsAnalogRead: true,
  },
  {
    userVisiblePinName: "3",
    codePinName: "3",
    instanceName: "input3",
    supportsDigitalWrite: false, //Supports true, but set to false to make it simpler for kids
    supportsDigitalRead: true,
    supportsAnalogRead: true,
  },
  {
    userVisiblePinName: "4",
    codePinName: "4",
    instanceName: "input4",
    supportsDigitalWrite: false, //Supports true, but set to false to make it simpler for kids
    supportsDigitalRead: true,
    supportsAnalogRead: true,
  },
  {
    userVisiblePinName: "5",
    codePinName: "5",
    instanceName: "input5",
    supportsDigitalWrite: false, //Supports true, but set to false to make it simpler for kids
    supportsDigitalRead: true,
    supportsAnalogRead: true,
  },
  {
    userVisiblePinName: "6",
    codePinName: "6",
    instanceName: "input6",
    supportsDigitalWrite: false, //Supports true, but set to false to make it simpler for kids
    supportsDigitalRead: true,
    supportsAnalogRead: true,
  },
  {
    userVisiblePinName: "1",
    codePinName: "1",
    instanceName: "output1",
    supportsDigitalWrite: true,
    supportsDigitalRead: false, //Supports true, but set to false to make it simpler to kids.
    supportsAnalogRead: false, //Supports true, but set to false to make it simpler to kids.
  },
  {
    userVisiblePinName: "2",
    codePinName: "2",
    instanceName: "output2",
    supportsDigitalWrite: true,
    supportsDigitalRead: false, //Supports true, but set to false to make it simpler to kids.
    supportsAnalogRead: false, //Supports true, but set to false to make it simpler to kids.
  },
];

for (var iii = 3; iii <= 18; iii++) {
  pinMap.push({
    userVisiblePinName: String(iii),
    codePinName: String(iii),
    instanceName: "output" + iii,
    supportsDigitalWrite: true,
    supportsDigitalRead: false,
    supportsAnalogRead: false,
  });
}

function getPinsThatSupport(supportKey) {
  var pinsThatSupport = [];
  supportKey = supportKey.charAt(0).toUpperCase() + supportKey.slice(1);

  for (var iii = 0; iii < pinMap.length; iii++) {
    var pin = pinMap[iii];
    if (("supports" + supportKey) in pin && pin["supports" + supportKey] == true) {
      pinsThatSupport.push(pin);
    }
  }
  return pinsThatSupport;
}

function pinsToDropdown(pins) {
  var output = [];
  for (var iii = 0; iii < pins.length; iii++) {
    var pin = pins[iii];
    output.push([pin.userVisiblePinName, JSON.stringify(pin)]);
  }
  return output;
}

goog.provide('Blockly.Blocks.pin');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.pin.HUE = 260;

https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vz8xv3
Blockly.Blocks['pin_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pin")
        .appendField(new Blockly.FieldDropdown(pinsToDropdown(getPinsThatSupport("digitalWrite"))), "PIN_NAME")
        .appendField(".on");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.pin.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vz8xv3
Blockly.Blocks['pin_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Pin")
        .appendField(new Blockly.FieldDropdown(pinsToDropdown(getPinsThatSupport("digitalWrite"))), "PIN_NAME")
        .appendField(".off");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.pin.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pin_digital_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("input")
        .appendField(new Blockly.FieldDropdown(pinsToDropdown(getPinsThatSupport("digitalRead"))), "PIN_NAME")
        .appendField(".digitalRead");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.pin.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['pin_analog_read'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("input")
        .appendField(new Blockly.FieldDropdown(pinsToDropdown(getPinsThatSupport("analogRead"))), "PIN_NAME")
        .appendField(".analogRead");
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.pin.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
