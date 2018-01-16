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
 * @fileoverview Servo2 blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.servo2'); // Deprecated
goog.provide('Blockly.Constants.Servo2');

goog.require('Blockly.Blocks');
goog.require('Blockly');

/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.LOGIC_HUE.
 * @readonly
 */
Blockly.Constants.Servo2.HUE = 210;
/** @deprecated Use Blockly.Constants.Servo2.HUE */
Blockly.Blocks.logic.HUE = Blockly.Constants.Servo2.HUE;

var servo2ToJson =  {
    "type": "servo_2_to",
    "message0": "Servo",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOGIC_HUE}",
    "helpUrl": "%{BKY_CONTROLS_IF_HELPURL}",
    "mutator": "servo_2_to_mutator",
    "extensions": ["servo_2_tooltip"]
  };

Blockly.Blocks['servo_2_to'] = {
    init: function(){
      this.jsonInit(servo2ToJson);
      this.setInputsInline(true);

      var dropdown = new Blockly.FieldDropdown(Blockly.Python.getServoList);
      if (this.selectedServo) {
        dropdown.setValue(this.selectedServo);
      }
      this.appendDummyInput('SERVO_NAME').appendField(dropdown, "SERVO_VARIABLE");
      this.appendValueInput("SERVO_POSITION")
          .setCheck("Number")
          .appendField("to");

    }
  };
  // init: function() {
  //   this.appendValueInput("SERVO")
  //       .setCheck("Number")
  //       .appendField("Servo")
  //       .appendField(new Blockly.FieldDropdown(Blockly.Python.SERVO_ARRAY), "SERVO_INPUT")
  //       .appendField("left");
  //   this.setPreviousStatement(true);
  //   this.setNextStatement(true);
  //   this.setColour(Blockly.Blocks.servo.HUE);
  //   this.setTooltip('');
  //   this.setHelpUrl('http://makerclub.org/');
  // }
// };

Blockly.defineBlocksWithJsonArray([
  // Mutator blocks. Do not extract.
  // Block representing the if statement in the servo_2 mutator.
  {
    "type": "servo_2_if",
    "message0": "Duration %1",
    "args0": [
      {
        "type": "field_checkbox",
        "name": "DURATION_PARAMETER"
      }
    ],
    "message1": "Wait to finish %1",
    "args1": [
      {
        "type": "field_checkbox",
        "name": "WAIT_PARAMETER"
      }
    ],
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": "%{BKY_LOGIC_HUE}",
    "tooltip": "%{BKY_CONTROLS_IF_IF_TOOLTIP}"
  },
  // Block representing the else-if statement in the servo_2 mutator.
  {
    "type": "servo_2_elseif",
    "message0": "Unused ",
    "previousStatement": null,
    "nextStatement": null,
    "enableContextMenu": false,
    "colour": "%{BKY_LOGIC_HUE}",
    "tooltip": "%{BKY_CONTROLS_IF_ELSEIF_TOOLTIP}"
  },
  // Block representing the else statement in the servo_2 mutator.
  {
    "type": "servo_2_else",
    "message0": "Old Else",
    "previousStatement": null,
    "enableContextMenu": false,
    "colour": "%{BKY_LOGIC_HUE}",
    "tooltip": "%{BKY_CONTROLS_IF_ELSE_TOOLTIP}"
  }
]);

/**
 * Mutator methods added to servo_2 blocks.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Servo2.CONTROLS_IF_MUTATOR_MIXIN = {
  elseifCount_: 0,
  elseCount_: 0,

  /**
   * Create XML to represent the number of else-if and else inputs.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.elseifCount_ && !this.elseCount_ && !this.waitToFinish_ && !this.duration_) {
      return null;
    }
    var container = document.createElement('mutation');
    if (this.elseifCount_) {
      container.setAttribute('elseif', this.elseifCount_);
    }
    if (this.elseCount_) {
      container.setAttribute('else', 1);
    }
    if (this.waitToFinish_) {
      console.log('setting wait to finsh', this.waitToFinish_);
      container.setAttribute('wait_to_finish', this.waitToFinish_);
    }
    if (this.duration_) {
      container.setAttribute('duration', this.duration_);
    }
    return container;
  },
  /**
   * Parse XML to restore the else-if and else inputs.
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.elseifCount_ = parseInt(xmlElement.getAttribute('elseif'), 10) || 0;
    this.elseCount_ = parseInt(xmlElement.getAttribute('else'), 10) || 0;
    this.waitToFinish_ = (xmlElement.getAttribute('wait_to_finish') == 'true') || false;
    this.duration_ = (xmlElement.getAttribute('duration') == 'true') || false;
    this.updateShape_();
  },
  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('servo_2_if');
    containerBlock.initSvg();
    var connection = containerBlock.nextConnection;
    for (var i = 1; i <= this.elseifCount_; i++) {
      var elseifBlock = workspace.newBlock('servo_2_elseif');
      elseifBlock.initSvg();
      connection.connect(elseifBlock.previousConnection);
      connection = elseifBlock.nextConnection;
    }
    if (this.elseCount_) {
      var elseBlock = workspace.newBlock('servo_2_else');
      elseBlock.initSvg();
      connection.connect(elseBlock.previousConnection);
    }
    if (this.waitToFinish_) {
      containerBlock.setFieldValue(true, 'WAIT_PARAMETER');
    }
    if (this.duration_) {
      containerBlock.setFieldValue(true, 'DURATION_PARAMETER');
    }

    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    this.waitToFinish_ = (containerBlock.getFieldValue('WAIT_PARAMETER') == 'TRUE') || false;
    this.duration_ = (containerBlock.getFieldValue('DURATION_PARAMETER') == 'TRUE') || false;
    console.log(this.waitToFinish_, this.duration_);
    // Count number of inputs.
    this.elseifCount_ = 0;
    this.elseCount_ = 0;
    var valueConnections = [null];
    var statementConnections = [null];
    var elseStatementConnection = null;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'servo_2_elseif':
          this.elseifCount_++;
          valueConnections.push(clauseBlock.valueConnection_);
          statementConnections.push(clauseBlock.statementConnection_);
          break;
        case 'servo_2_else':
          this.elseCount_++;
          elseStatementConnection = clauseBlock.statementConnection_;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 1; i <= this.elseifCount_; i++) {
      Blockly.Mutator.reconnect(valueConnections[i], this, 'IF' + i);
      Blockly.Mutator.reconnect(statementConnections[i], this, 'DO' + i);
    }
    Blockly.Mutator.reconnect(elseStatementConnection, this, 'ELSE');
  },
  /**
   * Store pointers to any connected child blocks.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  saveConnections: function(containerBlock) {
    var clauseBlock = containerBlock.nextConnection.targetBlock();
    var i = 1;
    while (clauseBlock) {
      switch (clauseBlock.type) {
        case 'servo_2_elseif':
          var inputIf = this.getInput('IF' + i);
          var inputDo = this.getInput('DO' + i);
          clauseBlock.valueConnection_ = inputIf && inputIf.connection.targetConnection;
          clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
          i++;
          break;
        case 'servo_2_else':
          var inputDo = this.getInput('ELSE');
          clauseBlock.statementConnection_ = inputDo && inputDo.connection.targetConnection;
          break;
        default:
          throw 'Unknown block type.';
      }
      clauseBlock = clauseBlock.nextConnection && clauseBlock.nextConnection.targetBlock();
    }
  },
  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape_: function() {
    // Delete everything.
    if (this.getInput('ELSE')) {
      this.removeInput('ELSE');
    }
    if (this.getInput('SERVO')) {
      this.removeInput('SERVO');
    }
    if (this.getInput('DURATION')) {
      this.removeInput('DURATION');
    }
    if (this.getInput('WAIT')) {
      this.removeInput('WAIT');
    }
    var i = 1;
    while (this.getInput('IF' + i)) {
      this.removeInput('IF' + i);
      this.removeInput('DO' + i);
      i++;
    }
    // Rebuild block.
    for (var i = 1; i <= this.elseifCount_; i++) {
      this.appendValueInput('IF' + i).setCheck('Boolean').appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSEIF);
      this.appendStatementInput('DO' + i).appendField(Blockly.Msg.CONTROLS_IF_MSG_THEN);
    }
    if (this.elseCount_) {
      this.appendStatementInput('ELSE').appendField(Blockly.Msg.CONTROLS_IF_MSG_ELSE);
    }
    // let servoList = this.getServoList();
    // if (servoList.length) {
    // }

    if (this.duration_) {
      this.appendValueInput('DURATION').appendField("Duration");
    }
    if (this.waitToFinish_) {
      this.appendValueInput('WAIT').appendField("Wait");
    }
  }

};

Blockly.Extensions.registerMutator('servo_2_to_mutator', Blockly.Constants.Servo2.CONTROLS_IF_MUTATOR_MIXIN, null, ['servo_2_elseif', 'servo_2_else']);
/**
 * "servo_2" extension function. Adds mutator, shape updating methods, and
 * dynamic tooltip to "servo_2" blocks.
 * @this Blockly.Block
 * @package
 */
Blockly.Constants.Servo2.CONTROLS_IF_TOOLTIP_EXTENSION = function() {

  this.setTooltip(function() {
    if (!this.elseifCount_ && !this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_1;
    } else if (!this.elseifCount_ && this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_2;
    } else if (this.elseifCount_ && !this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_3;
    } else if (this.elseifCount_ && this.elseCount_) {
      return Blockly.Msg.CONTROLS_IF_TOOLTIP_4;
    }
    return '';
  }.bind(this));
};

Blockly.Extensions.register('servo_2_tooltip', Blockly.Constants.Servo2.CONTROLS_IF_TOOLTIP_EXTENSION);
