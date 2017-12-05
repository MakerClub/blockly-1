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

goog.provide('Blockly.Python.webevent');
goog.require('Blockly.Python');

https://blockly-demo.appspot.Pythonom/static/demos/blockfactory/index.html#yqnowv
Blockly.Python['mcwebevent'] = function(block) {
  var webeventName = block.getFieldValue('EVENT_NAME_INPUT');
  var functionName = block.getFieldValue('FUNCTION_INPUT');
  var value_webevent = Blockly.Python.valueToCode(block, 'WEBEVENT', Blockly.Python.ORDER_ATOMIC) || 90;

  var webeventVariableName = 'webevent_' + webeventName;

  Blockly.Python.addObject({
    class: 'Webevent',
    name: webeventVariableName,
    parameters : [
      `'${webeventName}'`
    ]
  });
  var code = `${ webeventVariableName }.on_trigger(${ functionName });\n`;
  return code;
};

Blockly.Python['webevent_left'] = function(block) {
  var webeventName = block.getFieldValue('WEBEVENT_NUMBER');
  var value_webevent = Blockly.Python.valueToCode(block, 'WEBEVENT', Blockly.Python.ORDER_ATOMIC) || 90;
  var webeventName = 'webevent' + webeventName;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMWebeventDriver');
  Blockly.Python.addObject({
    class: 'Webevent',
    name: webeventName,
    parameters : [
      webeventName
    ]

  });
  var code = ` ${ webeventName }.left(${ value_webevent });\n`;
  return code;
};

Blockly.Python['webevent_right'] = function(block) {
  var webeventName = block.getFieldValue('WEBEVENT_NUMBER');
  var value_webevent = Blockly.Python.valueToCode(block, 'WEBEVENT', Blockly.Python.ORDER_ATOMIC) || 90;
  var webeventName = 'webevent' + webeventName;

  // Blockly.Python.addLibrary('Wire');
  // Blockly.Python.addLibrary('Adafruit_PWMWebeventDriver');
  Blockly.Python.addObject({
   class: 'Webevent',
   name: webeventName,
   parameters : [
     webeventName
   ]
  });
  var code = `${ webeventName }.right(${ value_webevent });\n`;
  return code;
};

Blockly.Python['webevent_get_position'] = function(block) {
  var webeventName = block.getFieldValue('WEBEVENT_NUMBER');
  var webeventName = 'webevent' + webeventName;
  // TODO: Assemble JavaScript into code variable.
  var code = ` ${ webeventName }.getPosition()`;
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
Blockly.Constants.Webevent.IS_DIVISIBLEBY_MUTATOR_MIXIN = {
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
Blockly.Constants.Webevent.IS_DIVISIBLE_MUTATOR_EXTENSION = function() {
  this.getField('PROPERTY').setValidator(function(option) {
    var divisorInput = (option == 'DIVISIBLE_BY');
    this.sourceBlock_.updateShape_(divisorInput);
  });
};
