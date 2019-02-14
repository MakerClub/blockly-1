/**
 * @license
 * Visual Blocks Editor
 *
 * Copyright 2012 Google Inc.
 * https://developers.google.com/blockly/
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * @fileoverview Servo blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.servo'); // Deprecated
goog.provide('Blockly.Constants.Servo');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.LOGIC_HUE.
 * @readonly
 */
Blockly.Constants.Servo.HUE = 210;
/** @deprecated Use Blockly.Constants.Servo.HUE */
Blockly.Blocks.logic.HUE = Blockly.Constants.Servo.HUE;


mcCreateBlocklyBlock({
  "type": "servo_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [{
      "name": "servo_variable",
      "label": "Set Servo ",
      "type": "object_dropdown",
      "object": "Servo", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "servo_number",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
      ],
    },
    /*
        {
          "name": "servo_path",
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
    "    {{servo_variable}}\n" +
    "    ___exists = True\n" +
    "except NameError:\n" +
    "    ___exists = False\n" +
    "if ___exists == False or not isinstance({{servo_variable}}, Servo):\n" +
    "    {{servo_variable}} = Servo({{servo_number}})\n" +
    "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "servo_to",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [{
      "name": "servo_variable",
      "label": "Servo ",
      "type": "object_dropdown",
      "object": "Servo", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "servo_angle",
      "label": " to ",
      "type": "input_value",
      "check": "Number",
    },
    /*
        {
          "name": "servo_time",
          "label": " duration (s) ",
          "type": "input_value",
          "check": "Number",
          "optional": true,
          "optionalDefaultValue": 0,
          "optionalShowHideLabel": "Duration",
      },*/
    /*
        {
          "name": "servo_until_done",
          "label": " until done",
          "type": "hidden_checkbox",
          "optional": true,
          "optionalShowHideLabel": "Wait until done",
      },*/
  ],
  "generator": "try:\n" +
    "    {{servo_variable}}\n" +
    "    ___exists = True\n" +
    "except NameError:\n" +
    "    ___exists = False\n" +
    "if ___exists and isinstance({{servo_variable}}, Servo):\n" +
    "    {{servo_variable}}.move_to({{servo_angle}}, 0)\n" +
    "del ___exists\n"
});









mcCreateBlocklyBlock({
  "type": "servo_gpio_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [{
      "name": "servo_gpio_variable",
      "label": "Set Servo GPIO ",
      "type": "object_dropdown",
      "object": "ServoGpio", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "servo_number",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
      ],
    },
  ],
  "generator": "try:\n" +
    "    {{servo_gpio_variable}}\n" +
    "    ___exists = True\n" +
    "except NameError:\n" +
    "    ___exists = False\n" +
    "if ___exists == False or not isinstance({{servo_gpio_variable}}, ServoGpio):\n" +
    "    {{servo_gpio_variable}} = ServoGpio({{servo_number}})\n" +
    "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "servo_gpio_digital_write",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [{
      "name": "servo_gpio_variable",
      "label": "Servo GPIO ",
      "type": "object_dropdown",
      "object": "ServoGpio", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "servo_gpio_state",
      "label": " set output ",
      "type": "dropdown",
      "options": [
        ["high", "1"],
        ["low", "0"],
      ],
    }
  ],
  "generator": "try:\n" +
    "    {{servo_gpio_variable}}\n" +
    "    ___exists = True\n" +
    "except NameError:\n" +
    "    ___exists = False\n" +
    "if ___exists and isinstance({{servo_gpio_variable}}, ServoGpio):\n" +
    "    await {{servo_gpio_variable}}.digital_write_async({{servo_gpio_state}})\n" +
    "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "servo_gpio_digital_read",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [{
    "name": "servo_gpio_variable",
    "label": "Servo GPIO %1 digital read",
    "type": "object_dropdown",
    "object": "ServoGpio",
  }],
  "generator": "((await {{servo_gpio_variable}}.digital_read_async()) if ('{{servo_gpio_variable}}' in globals() and isinstance({{servo_gpio_variable}}, ServoGpio)) else 0)"
});

mcCreateBlocklyBlock({
  "type": "servo_gpio_analog_read",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [{
    "name": "servo_gpio_variable",
    "label": "Servo GPIO %1 analog read",
    "type": "object_dropdown",
    "object": "ServoGpio",
  }],
  "generator": "((await {{servo_gpio_variable}}.analog_read_async()) if ('{{servo_gpio_variable}}' in globals() and isinstance({{servo_gpio_variable}}, ServoGpio)) else 0)"
});







mcCreateBlocklyBlock({
  "type": "servo_touch_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [{
      "name": "servo_touch_variable",
      "label": "Set Servo Touch ",
      "type": "object_dropdown",
      "object": "ServoTouch", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "servo_number",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
      ],
    },
  ],
  "generator": "try:\n" +
    "    {{servo_touch_variable}}\n" +
    "    ___exists = True\n" +
    "except NameError:\n" +
    "    ___exists = False\n" +
    "if ___exists == False or not isinstance({{servo_touch_variable}}, ServoTouch):\n" +
    "    {{servo_touch_variable}} = ServoTouch({{servo_number}})\n" +
    "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "servo_touch_read",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [{
    "name": "servo_touch_variable",
    "label": "Servo Touch %1 read",
    "type": "object_dropdown",
    "object": "ServoTouch",
  }],
  "generator": "((await {{servo_touch_variable}}.is_touched_async()) if ('{{servo_touch_variable}}' in globals() and isinstance({{servo_touch_variable}}, ServoTouch)) else 0)"
});
