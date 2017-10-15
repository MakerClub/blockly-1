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

goog.provide('Blockly.Python.servo');

goog.require('Blockly.Python');

https://blockly-demo.appspot.Pythonom/static/demos/blockfactory/index.html#yqnowv
Blockly.Python['servo_to'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER');
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO', Blockly.Python.ORDER_ATOMIC) || 90;
  var servoName = 'servo' + servoNumber;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMServoDriver');

  // Blockly.Python.addObject({
  //   class: 'MCServo',
  //   name: servoName,
  //   parameters : [
  //     servoNumber
  //   ]
  // });
  var code = `${ servoName }.to(${ value_servo });\n`;
  return code;
};

Blockly.Python['servo_left'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER');
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO', Blockly.Python.ORDER_ATOMIC) || 90;
  var servoName = 'servo' + servoNumber;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMServoDriver');
  // Blockly.Python.addObject({
  //   class: 'MCServo',
  //   name: servoName,
  //   parameters : [
  //     servoNumber
  //   ]
  //
  // });
  var code = ` ${ servoName }.left(${ value_servo });\n`;
  return code;
};

Blockly.Python['servo_right'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER');
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO', Blockly.Python.ORDER_ATOMIC) || 90;
  var servoName = 'servo' + servoNumber;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMServoDriver');
  // Blockly.Python.addObject({
  //   class: 'MCServo',
  //   name: servoName,
  //   parameters : [
  //     servoNumber
  //   ]
  //
  // });
  var code = `${ servoName }.right(${ value_servo });\n`;
  return code;
};

Blockly.Python['servo_get_position'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER');
  var servoName = 'servo' + servoNumber;
  // TODO: Assemble JavaScript into code variable.
  var code = ` ${ servoName }.getPosition()`;
  // TODO: Change ORDER_NONE to the correct strength.
  return [code, Blockly.Python.ORDER_NONE];
};
