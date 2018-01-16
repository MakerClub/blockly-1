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

Blockly.Python['servo_2_to'] = function(block) {
  var servoNumber = block.getFieldValue('servo_dropdown');
  var duration = Blockly.Python.valueToCode(block, 'DURATION_INPUT', Blockly.Python.ORDER_ATOMIC) || 1;
  var wait = Blockly.Python.valueToCode(block, 'WAIT_INPUT', Blockly.Python.ORDER_ATOMIC) || 'False';
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO_POSITION', Blockly.Python.ORDER_ATOMIC) || 90;

  var servoName = '' + servoNumber;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMServoDriver');

  Blockly.Python.addObject({
    class: 'Servo',
    name: servoName,
    parameters : [
      servoNumber
    ]
  });
  var code = `${ servoName }.to(${ value_servo }, ${duration}, ${wait});\n`;
  return code;
};
