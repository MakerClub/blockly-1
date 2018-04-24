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

'use strict';

goog.provide('Blockly.Blocks.keypad');
goog.provide('Blockly.Constants.Keypad');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

mcCreateBlocklyBlock({
  "type": "keypad_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "keypad_variable",
      "label": "Set Keypad ",
      "type": "object_dropdown",
      "object": "keypad", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "keypad_numbers",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["1 - 8", "1, 2, 3, 4, 5, 6, 7, 8"],
        ["2 - 9", "2, 3, 4, 5, 6, 7, 8, 9"],
        ["3 - 10", "3, 4, 5, 6, 7, 8, 9, 10"],
      ],
    }
  ],
  "generator": "{{keypad_variable}} = Keypad({{keypad_numbers}})\n",
});

mcCreateBlocklyBlock({
  "type": "keypad_is_pressed",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Boolean",
  "fields": [
    {
      "name": "keypad_variable",
      "label": "Keypad ",
      "type": "object_dropdown",
      "object": "keypad",
    },
    {
      "name": "keypad_number",
      "label": " key %1 is pressed",
      "type": "dropdown",
      "options": [
        ["A", "A"],
        ["B", "B"],
        ["C", "C"],
        ["D", "D"],
        ["*", "*"],
        ["#", "#"],
        ["0", "0"],
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"],
      ],
    }
  ],
  "generator": "{{keypad_variable}}.is_pressed(\"{{keypad_number}}\")",
});

mcCreateBlocklyBlock({
  "type": "keypad_get_digit",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [
    {
      "name": "keypad_variable",
      "label": "Keypad %1 get digit",
      "type": "object_dropdown",
      "object": "keypad",
    },
  ],
  "generator": "{{keypad_variable}}.get_pressed_digit()",
});

mcCreateBlocklyBlock({
  "type": "keypad_get_number",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [
    {
      "name": "keypad_variable",
      "label": "Keypad %1 get number",
      "type": "object_dropdown",
      "object": "keypad",
    },
  ],
  "generator": "{{keypad_variable}}.read_number()\n",
});
