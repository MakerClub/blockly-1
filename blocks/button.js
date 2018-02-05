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

goog.provide('Blockly.Blocks.button');
goog.provide('Blockly.Constants.Button');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.button.HUE = 260;

mcCreateBlocklyBlock({
  "type": "button_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "button_variable",
      "label": "Set Button ",
      "type": "object_dropdown",
      "object": "Button", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "button_number",
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
  "generator": "{{button_variable}} = Button({{button_number}})\n",
});

mcCreateBlocklyBlock({
  "type": "button_on_press",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "button_variable",
      "label": "Button ",
      "type": "object_dropdown",
      "object": "Button", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "button_function",
      "label": "",
      "type": "dropdown",
      "options": [
        ["on press", "on_press"],
        ["on release", "on_release"],
      ],
    },
    {
      "name": "button_on_press_callback",
      "label": " ",
      "type": "function_dropdown",
    },

  ],
  "generator": "{{button_variable}}.{{button_function}}({{button_on_press_callback}})\n",
});







//A bunch of aliases
function create_basic_button_alias(prettyName, objectName, functionName, functionLabel) {
  mcCreateBlocklyBlock({
    "type": objectName + "_constructor",
    "colour": "%{BKY_LOGIC_HUE}",
    "fields": [
      {
        "name": objectName + "_variable",
        "label": "Set " + prettyName + " ",
        "type": "object_dropdown",
        "object": objectName, //Used with object_dropdown (required if object_dropdown)
      },
      {
        "name": objectName + "_number",
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
    "generator": "{{" + objectName + "_variable}} = Button({{" + objectName + "_number}})\n",
  });

  mcCreateBlocklyBlock({
    "type": objectName + "_" + functionName,
    "colour": "%{BKY_LOGIC_HUE}",
    "fields": [
      {
        "name": objectName + "_variable",
        "label": prettyName + " ",
        "type": "object_dropdown",
        "object": objectName, //Used with object_dropdown (required if object_dropdown)
      },
      {
        "name": objectName + "_" + functionName + "_callback",
        "label": functionLabel,
        "type": "function_dropdown",
      },

    ],
    "generator": "{{" + objectName + "_variable}}.on_press({{" + objectName + "_" + functionName + "_callback}})\n",
  });
}

create_basic_button_alias("Tilt Sensor", "tilt_sensor", "on_tilt", "on tilt");
create_basic_button_alias("Motion Sensor", "motion_sensor", "on_motion", "on motion");
create_basic_button_alias("Light Sensor", "light_sensor", "on_light", "on light");
create_basic_button_alias("Sound Sensor", "sound_sensor", "on_sound", "on sound");
