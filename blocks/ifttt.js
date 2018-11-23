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

goog.provide('Blockly.Blocks.ifttt');
goog.provide('Blockly.Constants.ifttt');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.ifttt.HUE = 260;

mcCreateBlocklyBlock({
  "type": "ifttt_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "ifttt_variable",
      "label": "Set Web Event ",
      "type": "object_dropdown",
      "object": "webevent", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "ifttt_event_name",
      "label": " to ",
      "type": "input_value",
      "check": "String",
    }
  ],
  "generator": "try:\n" +
               "    {{ifttt_variable}}\n" +
               "    ___exists = True\n" +
               "except NameError:\n" +
               "    ___exists = False\n" +
               "if ___exists == False or not isinstance({{ifttt_variable}}, IftttEvent):\n" +
               "    {{ifttt_variable}} = IftttEvent({{ifttt_event_name}})\n" +
               "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "ifttt_on_change",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "ifttt_variable",
      "label": "Set Web Event ",
      "type": "object_dropdown",
      "object": "webevent", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "ifttt_on_change_callback",
      "label": "on change",
      "type": "function_dropdown",
    },
  ],
  "generator": "try:\n" +
               "    {{ifttt_variable}}\n" +
               "    ___exists = True\n" +
               "except NameError:\n" +
               "    ___exists = False\n" +
               "try:\n" +
               "    {{ifttt_on_change_callback}}\n" +
               "    ___cb_exists = True\n" +
               "except NameError:\n" +
               "    ___cb_exists = False\n" +
               "if ___exists and isinstance({{ifttt_variable}}, IftttEvent) and ___cb_exists:\n" +
               "    {{ifttt_variable}}.on_change({{ifttt_on_change_callback}})\n" +
               "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "request_url",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "req_url",
      "label": "Make request to url ",
      "type": "input_value",
      "check": "String",
    }
  ],
  "generator": "await request_url_async({{req_url}})\n",
});
