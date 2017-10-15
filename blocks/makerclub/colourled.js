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
 * @fileoverview Loop blocks for Blockly.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Blocks.colourled');

goog.require('Blockly.Blocks');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.colourled.HUE = 240;

//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#3vjbfz


Blockly.Blocks['colour_led_setcolor'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("colorLed.setColor");
    this.appendValueInput("RED")
        .setCheck("Number")
        .appendField("R");
        this.appendValueInput("GREEN")
            .setCheck("Number")
            .appendField("G");
            this.appendValueInput("BLUE")
                .setCheck("Number")
                .appendField("B");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setInputsInline(true);

    this.setColour(Blockly.Blocks.colourled.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['colour_led_on'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("led.on");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.colourled.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};


Blockly.Blocks['colour_led_off'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("led.off");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.colourled.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
