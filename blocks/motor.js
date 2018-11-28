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
//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#hfomcc
'use strict';

goog.provide('Blockly.Blocks.motor');
goog.provide('Blockly.Constants.Motor');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.motor.HUE = 260;


mcCreateBlocklyBlock({
  "type": "motor_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "motor_variable",
      "label": "Set Motor ",
      "type": "object_dropdown",
      "object": "Motor", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "motor_number",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["M1", "1"],
        ["M2", "2"],
      ],
    },/*
    {
      "name": "motor_path",
      "label": " at path ",
      "type": "dropdown",
      "optional": true,
      "optionalShowHideLabel": "Module path",
      "options": [
        ["Auto", "auto"],
        ["A", "A"],
        ["B", "B"],
      ],
    }*/
  ],
  "generator": "try:\n" +
               "    {{motor_variable}}\n" +
               "    ___exists = True\n" +
               "except NameError:\n" +
               "    ___exists = False\n" +
               "if ___exists == False or not isinstance({{motor_variable}}, Motor):\n" +
               "    {{motor_variable}} = Motor({{motor_number}})\n" +
               "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "motor_set_speed",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "motor_variable",
      "label": "Motor ",
      "type": "object_dropdown",
      "object": "Motor", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "motor_speed",
      "label": " set speed to ",
      "type": "input_value",
      "check": "Number",
    },/*
    {
      "name": "motor_time",
      "label": " duration (s) ",
      "type": "input_value",
      "check": "Number",
      "optional": true,
      "optionalDefaultValue": 0,
      "optionalShowHideLabel": "Duration",
  },*//*
    {
      "name": "motor_until_done",
      "label": " until done",
      "type": "hidden_checkbox",
      "optional": true,
      "optionalShowHideLabel": "Wait until done",
  },*/
  ],
  "generator": "try:\n" +
               "    {{motor_variable}}\n" +
               "    ___exists = True\n" +
               "except NameError:\n" +
               "    ___exists = False\n" +
               "if ___exists and isinstance({{motor_variable}}, Motor):\n" +
               "    {{motor_variable}}.set_speed({{motor_speed}}, 0)\n" +
               "del ___exists\n"
});
