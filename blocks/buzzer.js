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

goog.provide('Blockly.Blocks.buzzer');
goog.provide('Blockly.Constants.Buzzer');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

mcCreateBlocklyBlock({
  "type": "buzzer_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "buzzer_variable",
      "label": "Set Buzzer ",
      "type": "object_dropdown",
      "object": "buzzer", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "buzzer_number",
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
  "generator": "{{buzzer_variable}} = get_makerboard().pin({{buzzer_number}})\n"
});

mcCreateBlocklyBlock({
  "type": "buzzer_set_state",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "buzzer_variable",
      "label": "Buzzer ",
      "type": "object_dropdown",
      "object": "buzzer",
    },
    {
      "name": "buzzer_state",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["on", "1"],
        ["off", "0"],
      ],
    }
  ],
  "generator": "try:\n" +
               "    {{buzzer_variable}}\n" +
               "    ___exists = True\n" +
               "except NameError:\n" +
               "    ___exists = False\n" +
               "if ___exists and isinstance({{buzzer_variable}}, Gpio):\n" +
               "    {{buzzer_variable}}.digital_write({{buzzer_state}})\n" +
               "del ___exists\n"
});
