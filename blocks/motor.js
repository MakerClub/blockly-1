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
//https://blockly-demo.appspot.com/static/demos/blockfactory/index.html#hfomcc
'use strict';

goog.provide('Blockly.Blocks.motor');
goog.provide('Blockly.Constants.Motor');

goog.require('Blockly.Blocks');
goog.require('Blockly');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.motor.HUE = 260;

Blockly.defineBlocksWithJsonArray( // BEGIN JSON EXTRACT
    [
      {
  "type": "select_parameters",
  "message0": "Select Parameters",
  "colour": 230,
},

  {
    "type": "motor_forwards",
    "message0": "Motor %1 forwards %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "motor_select",
        "options": [
          [
            "1", "1"
          ],
          [
            "2", "2"
          ]
        ]
      }, {
        "type": "input_value",
        "name": "motor_speed"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": "",
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "mutator": "motor_is_divisibleby_mutator"
  }, {
    "type": "motor_backwards",
    "message0": "Motor %1 backwards %2",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "motor_select",
        "options": [
          [
            "1", "1"
          ],
          [
            "2", "2"
          ]
        ]
      }, {
        "type": "input_value",
        "name": "motor_speed"
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }, {
    "type": "motor_stop",
    "message0": "Motor  %1  stop",
    "args0": [
      {
        "type": "field_dropdown",
        "name": "motor_select",
        "options": [
          [
            "1", "1"
          ],
          [
            "2", "2"
          ]
        ]
      }
    ],
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  }
]);

Blockly.Constants.Motor.PARAMETER_MUTATOR_MIXIN = {

  decompose: function(workspace) {
    var topBlock = workspace.newBlock('parameters');
    topBlock.initSvg();
    return topBlock;
  },

  compose: function(topBlock) {
  },
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
        this.appendValueInput('DIVISOR').setCheck('Number');
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
Blockly.Constants.Motor.PARAMETER_MUTATOR_EXTENSION = function() {
  this.getField('motor_select').setValidator(function(option) {
    var divisorInput = (option == '1');
    this.sourceBlock_.updateShape_(divisorInput);
  });
};

Blockly.Extensions.registerMutator('motor_is_divisibleby_mutator',
  Blockly.Constants.Motor.PARAMETER_MUTATOR_MIXIN,
  Blockly.Constants.Motor.PARAMETER_MUTATOR_EXTENSION, ['select_parameters']);
