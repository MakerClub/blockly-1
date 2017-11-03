/**
 * @license
 * Visual Blocks Language
 *
 * Copyright 2014 MakerClub Ltd.

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
 * @fileoverview Generating C for loop blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python.mcstepper');

goog.require('Blockly.Python');


Blockly.Python['stepper_forwards'] = function(block) {
  var firstPinNum = parseInt(block.getFieldValue("FIRST_PIN_NUM"));

  // Blockly.Python.addObject({
  //   class: 'Stepper',
  //   name: 'stepper' + firstPinNum,
  //   parameters : [
  //     firstPinNum,
  //     firstPinNum+1,
  //     firstPinNum+2,
  //     firstPinNum+3
  //   ]
  // });

  var code = 'stepper' + firstPinNum + '.forwards();\n';
  return code;
};

Blockly.Python['stepper_backwards'] = function(block) {
  var firstPinNum = parseInt(block.getFieldValue("FIRST_PIN_NUM"));

  // Blockly.Python.addObject({
  //   class: 'Stepper',
  //   name: 'stepper' + firstPinNum,
  //   parameters : [
  //     firstPinNum,
  //     firstPinNum+1,
  //     firstPinNum+2,
  //     firstPinNum+3
  //   ]
  // });

  var code = 'stepper' + firstPinNum + '.backwards();\n';
  return code;
};

Blockly.Python['stepper_stop'] = function(block) {
  var firstPinNum = parseInt(block.getFieldValue("FIRST_PIN_NUM"));

  // Blockly.Python.addObject({
  //   class: 'Stepper',
  //   name: 'stepper' + firstPinNum,
  //   parameters : [
  //     firstPinNum,
  //     firstPinNum+1,
  //     firstPinNum+2,
  //     firstPinNum+3
  //   ]
  // });

  var code = 'stepper' + firstPinNum + '.stop();\n';
  return code;
};

Blockly.Python['stepper_forwards_degrees'] = function(block) {
  var firstPinNum = parseInt(block.getFieldValue("FIRST_PIN_NUM"));

  // Blockly.Python.addObject({
  //   class: 'Stepper',
  //   name: 'stepper' + firstPinNum,
  //   parameters : [
  //     firstPinNum,
  //     firstPinNum+1,
  //     firstPinNum+2,
  //     firstPinNum+3
  //   ]
  // });

  var value_degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_ATOMIC) || 0;
  // TODO: Assemble C into code variable.
  var code = String.format('stepper{0}.forwards({1});\n', firstPinNum, value_degrees);
  return code;
};

Blockly.Python['stepper_backwards_degrees'] = function(block) {
  var firstPinNum = parseInt(block.getFieldValue("FIRST_PIN_NUM"));

  // Blockly.Python.addObject({
  //   class: 'Stepper',
  //   name: 'stepper' + firstPinNum,
  //   parameters : [
  //     firstPinNum,
  //     firstPinNum+1,
  //     firstPinNum+2,
  //     firstPinNum+3
  //   ]
  // });

  var value_degrees = Blockly.Python.valueToCode(block, 'DEGREES', Blockly.Python.ORDER_ATOMIC) || 0;
  // TODO: Assemble C into code variable.
  var code = String.format('stepper{0}.backwards({1});\n', firstPinNum, value_degrees);
  return code;
};
