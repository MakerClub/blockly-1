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

goog.provide('Blockly.Blocks.servo');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.servo.HUE = 260;

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#vz8xv3
Blockly.Blocks['servo_to'] = {
  init: function() {
    this.appendValueInput("SERVO")
        .setCheck("Number")
        .appendField("Servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("to");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['servo_left'] = {
  init: function() {
    this.appendValueInput("SERVO")
        .setCheck("Number")
        .appendField("Servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("left");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://makerclub.org/');
  }
};

Blockly.Blocks['servo_right'] = {
  init: function() {
    this.appendValueInput("SERVO")
        .setCheck("Number")
        .appendField("Servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("right");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['servo_get_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("getPosition");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.INTEGER;
  },
};
