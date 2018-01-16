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

//https://blockly-demo.appspot.Pythonom/static/demos/blockfactory/index.html#yqnowv
Blockly.Python['servo_to'] = function(block) {
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

Blockly.Python['servo_left'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER');
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO', Blockly.Python.ORDER_ATOMIC) || 90;
  var servoName = 'servo' + servoNumber;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMServoDriver');
  Blockly.Python.addObject({
    class: 'Servo',
    name: servoName,
    parameters : [
      servoNumber
    ]

  });
  var code = ` ${ servoName }.left(${ value_servo });\n`;
  return code;
};

Blockly.Python['servo_right'] = function(block) {
  var servoNumber = block.getFieldValue('SERVO_NUMBER');
  var value_servo = Blockly.Python.valueToCode(block, 'SERVO', Blockly.Python.ORDER_ATOMIC) || 90;
  var servoName = 'servo' + servoNumber;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMServoDriver');
  Blockly.Python.addObject({
   class: 'Servo',
   name: servoName,
   parameters : [
     servoNumber
   ]
  });
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

/**
 * Mixin for mutator functions in the 'math_is_divisibleby_mutator'
 * extension.
 * @mixin
 * @augments Blockly.Block
 * @package
 */
Blockly.Constants.Servo.IS_DIVISIBLEBY_MUTATOR_MIXIN = {
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');
    var divisorInput = (this.getFieldValue('PROPERTY') == 'DIVISIBLE_BY');
    container.setAttribute('divisor_input', divisorInput);
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var divisorInput = (xmlElement.getAttribute('divisor_input') == 'true');
    this.updateShape_(divisorInput);
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function(divisorInput) {
    // Add or remove a Value Input.
    var inputExists = this.getInput('DIVISOR');
    if (divisorInput) {
      if (!inputExists) {
        this.appendValueInput('DIVISOR')
            .setCheck('Number');
      }
    } else if (inputExists) {
      this.removeInput('DIVISOR');
    }
  }
};

/**
 * 'math_is_divisibleby_mutator' extension to the 'math_property' block that
 * can update the block shape (add/remove divisor input) based on whether
 * property is "divisble by".
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Servo.IS_DIVISIBLE_MUTATOR_EXTENSION = function() {
  this.getField('PROPERTY').setValidator(function(option) {
    var divisorInput = (option == 'DIVISIBLE_BY');
    this.sourceBlock_.updateShape_(divisorInput);
  });
};
