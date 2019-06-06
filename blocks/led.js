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

goog.provide('Blockly.Blocks.led');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.led.HUE = 260;

var ledOptions = [];
for (var iii = 1; iii <= 18; iii++) {
  ledOptions.push([iii.toString(), iii.toString()]);
}

Blockly.Blocks['led_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".on");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".off");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_toggle'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".toggle");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_set_brightness'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".setBrightness");
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_fade_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".fadeOn");
    this.appendValueInput("DURATION")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_fade_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".fadeOff");
    this.appendValueInput("DURATION")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['led_fade'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LED")
        .appendField(new Blockly.FieldDropdown(ledOptions), "PIN_NUM")
        .appendField(".fade");
    this.appendValueInput("BRIGHTNESS")
        .setCheck("Number");
    this.appendValueInput("DURATION")
        .setCheck("Number");
    this.setInputsInline(true);
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.led.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};





mcCreateBlocklyBlock({
  "type": "led_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "led_variable",
      "label": "Set LED ",
      "type": "object_dropdown",
      "object": "led", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "led_number",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"],
        ["10", "10"],
      ],
    }
  ],
  "generator": "{{led_variable}} = get_makerboard().pin({{led_number}})\n"
});

mcCreateBlocklyBlock({
  "type": "led_set_state",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "led_variable",
      "label": "LED ",
      "type": "object_dropdown",
      "object": "led",
    },
    {
      "name": "led_state",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["on", "1"],
        ["off", "0"],
      ],
    }
  ],
  "generator": "try:\n" +
               "  {{led_variable}}\n" +
               "  ___exists = True\n" +
               "except NameError:\n" +
               "  ___exists = False\n" +
               "if ___exists and isinstance({{led_variable}}, Gpio):\n" +
               "  {{led_variable}}.digital_write({{led_state}})\n" +
               "del ___exists\n"
});
