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

goog.provide('Blockly.Blocks.webevent');
goog.provide('Blockly.Constants.Webevent');

goog.require('Blockly.Blocks');
goog.require('Blockly');


/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.webevent.HUE = 260;
var mcWebEventJson =
  {
    "type": "mcwebevent",
    "message0": "WebEvent %1 on_trigger %2",
    "args0": [
      {
        "type": "field_input",
        "name": "EVENT_NAME_INPUT",
        "text": "default"
      },
      {
        "type": "field_dropdown",
        "name": "FUNCTION_INPUT",
        "options": [
          [
            "option2",
            "OPTIONNAME2"
          ],
          [
            "option3",
            "OPTIONNAME3"
          ]
        ]
      }
    ],
    "previousStatement": null,
    "nextStatement": null,
    "inputsInline": true,
    "mutator": "webevent_functions_list_mutator",
    "colour": 230,
    "tooltip": "",
    "helpUrl": ""
  };

Blockly.Blocks['mcwebevent'] = {
  init: function(maybeRoot){
    this.jsonInit(mcWebEventJson);

  }
}
//Blockly.Procedures.allProcedures

/**
 * Mixin with mutator methods to support alternate output based if the
 * 'math_on_list' block uses the 'MODE' operation.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Webevent.LIST_FUNCTIONS_MUTATOR_MIXIN = {
  /**
   * Modify this block to have the correct output type.
   * @param {string} newOp Either 'MODE' or some op than returns a number.
   * @private
   * @this Blockly.Block
   */
  updateList_: function(newOp) {
    var allProcedures = Blockly.Procedures.allProcedures(Blockly.getMainWorkspace());
    allProcedures = [].concat.apply([], allProcedures);
    if(allProcedures.length){

      this.procedureList = [];
      for(var i = 0; i < allProcedures.length; i++){
        let functionName = allProcedures[i][0];
        this.procedureList.push([functionName, functionName]);
      }
    }
    if(!this.procedureList){
      return;
    }
    var dropdown = new Blockly.FieldDropdown(this.procedureList);
    this.getField('FUNCTION_INPUT').dispose();
    if(this.getInput('FUNCTION_DUMMY')){
      this.removeInput('FUNCTION_DUMMY');
    }
    this.appendDummyInput('FUNCTION_DUMMY').appendField(dropdown, 'FUNCTION_INPUT');
  },
  /**
   * Create XML to represent the output type.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    var container = document.createElement('mutation');


    this.updateList_();
    return container;
  },
  /**
   * Parse XML to restore the output type.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.updateList_();
  }
};

/**
 * Extension to 'math_on_list' blocks that allows support of
 * modes operation (outputs a list of numbers).
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Webevent.LIST_FUNCTIONS_MUTATOR_EXTENSION = function() {
  // this.getField('OP').setValidator(function(newOp) {
  //   this.updateType_(newOp);
  // }.bind(this));
};

Blockly.Extensions.registerMutator('webevent_functions_list_mutator',
  Blockly.Constants.Webevent.LIST_FUNCTIONS_MUTATOR_MIXIN,
  Blockly.Constants.Webevent.LIST_FUNCTIONS_MUTATOR_EXTENSION);
