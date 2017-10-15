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

goog.provide('Blockly.Blocks.motor');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.motor.HUE = 260;

Blockly.Blocks['motor_forwards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField(new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
        ]), "MOTOR_NUM")
        .appendField(".forwards");
    this.appendValueInput("SPEED")
      .setCheck("Number");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['motor_backwards'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField(new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
        ]), "MOTOR_NUM")
        .appendField(".backwards");
    this.appendValueInput("SPEED")
      .setCheck("Number");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['motor_stop'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Motor")
        .appendField(new Blockly.FieldDropdown([
          ["1", "1"],
          ["2", "2"],
        ]), "MOTOR_NUM")
        .appendField(".stop");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);
    this.setColour(Blockly.Blocks.motor.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
