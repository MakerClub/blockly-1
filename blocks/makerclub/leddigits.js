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

goog.provide('Blockly.Blocks.leddigits');

goog.require('Blockly.Blocks');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.leddigits.HUE = 260;

var LedDigitsOptions = [
  ["Pins 3-5", "3"],
  ["Pins 4-6", "4"],
  ["Pins 5-7", "5"],
  ["Pins 6-8", "6"],
  ["Pins 7-9", "7"],
  ["Pins 8-10", "8"],
  ["Pins 9-11", "9"],
  ["Pins 10-12", "10"],
  ["Pins 11-13", "11"],
  ["Pins 12-14", "12"],
  ["Pins 13-15", "13"],
  ["Pins 14-16", "14"],
  ["Pins 15-17", "15"],
  ["Pins 16-18", "16"],
];


Blockly.Blocks['led_digits_set'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("LedDigits")
        .appendField(new Blockly.FieldDropdown(LedDigitsOptions), "FIRST_PIN_NUM")
        .appendField(".set");
    this.appendValueInput("NUMBER")
        .setCheck("Number");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

    this.setColour(Blockly.Blocks.leddigits.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
