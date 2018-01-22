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
 * @fileoverview Generating C for MakerClub blocks.
 * @author simon@makerclub.org (Simon Riley)
 */
'use strict';

goog.provide('Blockly.Python.servo2');
goog.require('Blockly.Python');

Blockly.Python['servo_2_constructor'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER'); //We don't have constructors yet, but obviously this needs to change.
  var servoName = block.getFieldValue('SERVO_VARIABLE');

  var code = `${ servoName } = Servo(${servoNumber});\n`;
  return code;
};


Blockly.Python['servo_2_to'] = function(block) {
  var servoNumber = 1; //We don't have constructors yet, but obviously this needs to change.
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || 1;
  var wait = Blockly.Python.valueToCode(block, 'WAIT', Blockly.Python.ORDER_ATOMIC) || 'False';
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO_POSITION', Blockly.Python.ORDER_ATOMIC) || 90;

  var servoName = block.getFieldValue('SERVO_VARIABLE');

  var code = `${ servoName }.move_to(${ value_servo }, ${duration}, ${wait})\n`;
  return code;
};
