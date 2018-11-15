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

goog.provide('Blockly.Blocks.pin');
goog.provide('Blockly.Constants.Pin');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.pin.HUE = 260;


mcCreateBlocklyBlock({
  "type": "pin_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "pin_variable",
      "label": "Set Pin ",
      "type": "object_dropdown",
      "object": "Pin", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "pin_number",
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
  "generator": "{{pin_variable}} = get_makerboard().pin({{pin_number}})\n",
});


mcCreateBlocklyBlock({
  "type": "pin_output",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "pin_variable",
      "label": "Pin ",
      "type": "object_dropdown",
      "object": "Pin", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "pin_state",
      "label": " set output ",
      "type": "dropdown",
      "options": [
        ["high", "1"],
        ["low", "0"],
      ],
    }
  ],
  "generator": "try:\n" +
               "    {{pin_variable}}\n" +
               "    ___exists = True\n" +
               "except NameError:\n" +
               "    ___exists = False\n" +
               "if ___exists and isinstance({{pin_variable}}, Gpio):\n" +
               "    {{pin_variable}}.digital_write({{pin_state}})\n" +
               "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "pin_read",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [
    {
      "name": "pin_variable",
      "label": "Pin %1 digital read",
      "type": "object_dropdown",
      "object": "Pin",
    }
  ],
  "generator": "({{pin_variable}}.digital_read() if ('{{pin_variable}}' in globals() and isinstance({{pin_variable}}, Gpio)) else 0)"
});
