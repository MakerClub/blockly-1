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
 * @fileoverview C blocks for MakerClub blockly.
 * @author simon@makerclub.org (Simon Riley)
 */
'use strict';

goog.provide('Blockly.Blocks.servo');
goog.provide('Blockly.Constants.Servo');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.servo.HUE = 260;
Blockly.defineBlocksWithJsonArray([
  {
"type": "servo_to_parameters",
"message0": "Select Parameters",
"colour": 230,
},
{
  "type": "servo_to",
  "message0": "Servo %1 to %2",
  "args0": [
    {
      "type": "field_dropdown",
      "name": "SERVO_NUMBER",
      "options": [
        [
          "1",
          "1"
        ],
        [
          "2",
          "2"
        ],
        [
          "3",
          "3"
        ]
      ]
    },
    {
      "type": "input_value",
      "name": "SERVO_POSITION",
      "check": "Number"
    }
  ],
  "inputsInline": true,
  "previousStatement": null,
  "nextStatement": null,
  "mutator": "servo_parameters_mutator",
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
},
{
  "type": "parameters",
  "message0": "Parameters %1 Duration %2  %3 Wait to finish %4 ",
  "args0": [
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "DURATION_PARAMETER",
    },
    {
      "type": "input_dummy"
    },
    {
      "type": "field_checkbox",
      "name": "WAIT_PARAMETER",
    }
  ],
  "colour": 230,
  "tooltip": "",
  "helpUrl": ""
}]);

Blockly.Blocks['servo_left'] = {
  init: function() {
    this.appendValueInput("SERVO")
        .setCheck("Number")
        .appendField("Servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("left");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://makerclub.org/');
  }
};

Blockly.Blocks['servo_right'] = {
  init: function() {
    this.appendValueInput("SERVO")
        .setCheck("Number")
        .appendField("Servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("right");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};

Blockly.Blocks['servo_get_position'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("servo")
        .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_NUMBER")
        .appendField("getPosition");
    this.setInputsInline(true);
    this.setOutput(true, "Number");
    this.setColour(Blockly.Blocks.servo.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  },
  getBlockType: function() {
    return Blockly.Types.INTEGER;
  },
};

Blockly.Constants.Servo.PARAMETER_MUTATOR_MIXIN = {

  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('parameters');
    containerBlock.initSvg();
    let durationText = this.durationInput ? 'TRUE' : 'FALSE';
    containerBlock.setFieldValue(durationText,'DURATION_PARAMETER');
    let waitText = this.waitInput ? 'TRUE' : 'FALSE';
    containerBlock.setFieldValue(waitText,'WAIT_PARAMETER');

    return containerBlock;
  },

  compose: function(containerBlock) {
    this.durationInput = (containerBlock.getFieldValue('DURATION_PARAMETER') == 'TRUE');
    this.waitInput = (containerBlock.getFieldValue('WAIT_PARAMETER') == 'TRUE');

    this.updateShape_();
  },
  /**
   * Create XML to represent whether the 'divisorInput' should be present.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');

    if(this.durationInput){
      container.setAttribute('duration', this.durationInput);
    }
    if(this.waitInput){
      container.setAttribute('wait', this.waitInput);
    }
    return container;
  },
  /**
   * Parse XML to restore the 'divisorInput'.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    // var waitInput = (xmlElement.getAttribute('wait') == true);
    this.durationInput = (xmlElement.getAttribute('duration') == 'true') || false;
    this.waitInput = (xmlElement.getAttribute('wait') == 'true') || false;
    this.updateShape_();
  },
  /**
   * Modify this block to have (or not have) an input for 'is divisible by'.
   * @param {boolean} divisorInput True if this block has a divisor input.
   * @private
   * @this Blockly.Block
   */
  updateShape_: function() {
    // Add or remove a Value Input.
    var durationInputExists = this.getInput('DURATION_INPUT');
    if (this.durationInput) {
      if (!durationInputExists) {
        this.appendValueInput('DURATION_INPUT')
        .appendField("Duration")
        .setCheck('Number');
      }
    } else if (durationInputExists) {
      this.removeInput('DURATION_INPUT');
    }

    var waitInputExists = this.getInput('WAIT_INPUT');
    if (this.waitInput) {
      if (!waitInputExists) {
        this.appendValueInput('WAIT_INPUT')
        .appendField("Wait")
        .setCheck('Boolean');
      }
    } else if (waitInputExists) {
      this.removeInput('WAIT_INPUT');
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
Blockly.Constants.Servo.PARAMETER_MUTATOR_EXTENSION = function() {
  this.getField('SERVO_NUMBER').setValidator(function(option) {
    var divisorInput = (option == '1');
    this.sourceBlock_.updateShape_(divisorInput);
  });
};

Blockly.Extensions.registerMutator('servo_parameters_mutator',
  Blockly.Constants.Servo.PARAMETER_MUTATOR_MIXIN,
  null, ['servo_to_parameters']);
