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

goog.provide('Blockly.Blocks.stepper');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.stepper.HUE = 260;

var MCStepperOptions = [
  ["Pins 3-6", "3"],
  ["Pins 4-7", "4"],
  ["Pins 5-8", "5"],
  ["Pins 6-9", "6"],
  ["Pins 7-10", "7"],
  ["Pins 8-11", "8"],
  ["Pins 9-12", "9"],
  ["Pins 10-13", "10"],
  ["Pins 11-14", "11"],
  ["Pins 12-15", "12"],
  ["Pins 13-16", "13"],
  ["Pins 14-17", "14"],
  ["Pins 15-18", "15"],
];

Blockly.Blocks['stepper_forwards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stepper")
        .appendField(new Blockly.FieldDropdown(MCStepperOptions), "FIRST_PIN_NUM")
        .appendField(".forwards");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepper_backwards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stepper")
        .appendField(new Blockly.FieldDropdown(MCStepperOptions), "FIRST_PIN_NUM")
        .appendField(".backwards");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepper_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stepper")
        .appendField(new Blockly.FieldDropdown(MCStepperOptions), "FIRST_PIN_NUM")
        .appendField(".stop");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.stepper.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepper_forwards_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stepper")
        .appendField(new Blockly.FieldDropdown(MCStepperOptions), "FIRST_PIN_NUM")
        .appendField(".forwards");
    this.appendValueInput("DEGREES")
        .setCheck("Number");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

    this.setColour(Blockly.Blocks.stepper.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['stepper_backwards_degrees'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Stepper")
        .appendField(new Blockly.FieldDropdown(MCStepperOptions), "FIRST_PIN_NUM")
        .appendField(".backwards");
    this.appendValueInput("DEGREES")
        .setCheck("Number");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

    this.setColour(Blockly.Blocks.stepper.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
