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



mcCreateBlocklyBlock({
  "type": "servo_2_constructor890980",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "foobar",
      "label": "Foo %1 bar",
      "type": "input_value",
      "check": "Number", //can omit for "any" or set to "Boolean" or "String"
      "optional": false, //can omit, this is default
    },
    {
      "name": "optionalName",
      "label": "Servo ",
      "type": "dropdown",
      "options": [
        ["foo", 1],
        ["bar", 2],
      ],
      "optional": true, //If true,
      "optionalDefaultValue": "2", //can omit.
    }
  ],
  "generator": "{{foobar}}.to(foo2)\n",
});

function mcCreateBlocklyBlock(args) {
  var blocklyJson = {
    "type": (args.type || null),
    "message0": "",
    "previousStatement": null, //Null actually means, to allow it to connect.
    "nextStatement": null, //Null actually means, to allow it to connect.
    "colour": (args.colour || "%{BKY_LOGIC_HUE}"),
    "inputsInline": true,
    "mutator": "servo_2_to_mutator2222", ////////////////////////////////////
  };
  if ("previousStatement" in args) {
    blocklyJson.previousStatement = args.previousStatement;
  }
  if ("nextStatement" in args) {
    blocklyJson.nextStatement = args.nextStatement;
  }
  if ("inputsInline" in args) {
    blocklyJson.inputsInline = args.inputsInline;
  }
  if (blocklyJson.type === null) {
    throw "Block type cannot be null";
  }

  var mcDataFields = args.fields || [];
  mcDataFields = mcDataFields.slice(); //Ensure we don't modify the one passed in.

  //Create the base blockly block
  var newBaseBlock = Blockly.Blocks[blocklyJson.type] = {
    init: function() {
      this.jsonInit(blocklyJson);
      this.mcFields = mcDataFields;
      this.updateShape();
    }
  };

}

function mcGetOptionalFields(mcFields) {
  var optionalFields = [];
  for (var iii = 0; iii < mcFields.length; iii++) {
    var field = mcFields[iii];
    if ("optional" in field && field.optional === true) {
      optionalFields.push(field);
    }
  }
  return optionalFields;
}

function mcGetOptionalFieldNames(mcFields) {
  var optionalFields = mcGetOptionalFields(mcFields);
  var optionalFieldNames = [];
  for (var iii = 0; iii < optionalFields.length; iii++) {
    var field = optionalFields[iii];
    optionalFieldNames.push(field.name);
  }
  return optionalFieldNames;
}













Blockly.Constants.Servo2.MUTATOR_MIXIN2222 = {

  /**
   * Create XML to represent the block state.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    //Store the mutator state into xml. We take "showField_<name>" from block and store it into xml
    var container = document.createElement('mutation');
    var optionalFieldNames = mcGetOptionalFieldNames(this.mcFields); //Only optional fields edit the mutator
    for (var iii = 0; iii < optionalFieldNames.length; iii++) {
      var fieldName = "showField_" + optionalFieldNames[iii];
      var blockShowField = false;
      if (fieldName in this && this[fieldName] !== false) {
        blockShowField = true;
      }
      container.setAttribute(fieldName, blockShowField);
    }

    return container;
  },

  /**
   * Parse XML to restore the block state
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var optionalFieldNames = mcGetOptionalFieldNames(this.mcFields);
    for (var iii = 0; iii < optionalFieldNames.length; iii++) {
      var fieldName = "showField_" + optionalFieldNames[iii];
      var fromXmlBlockShowField = xmlElement.getAttribute(fieldName);
      var blockShowField = false;
      if (fromXmlBlockShowField === "true" || fromXmlBlockShowField === true) {
        blockShowField = true;
      }
      //Restore value onto block
      this[fieldName] = blockShowField;
    }
    this.updateShape();
  },

  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('mc_nop_block');
    containerBlock.initSvg();
    var that = this;

    var optionalFields = mcGetOptionalFields(this.mcFields);
    for (var iii = 0; iii < optionalFields.length; iii++) {
      var field = optionalFields[iii];
      var fieldName = "showField_" + field.name;
      var checkboxValue = "FALSE";
      if (fieldName in this && this[fieldName] === true) {
        checkboxValue = "TRUE";
      }
        containerBlock.appendDummyInput().appendField(field.name + ": ").appendField(new Blockly.FieldCheckbox(checkboxValue), field.name).init();
    }

    that.workspace.render();

    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    /*
    this.showWaitToFinish = (containerBlock.getFieldValue('SHOW_WAIT_PARAMETER') == 'TRUE') || false;
    this.showDuration = (containerBlock.getFieldValue('SHOW_DURATION_PARAMETER') == 'TRUE') || false;

    if (typeof this.oldShowWaitToFinish != "undefined" && this.oldShowWaitToFinish != this.showWaitToFinish && this.showWaitToFinish) {
      this.createDefaultWait = true;
    }
    if (typeof this.oldShowDuration != "undefined" && this.oldShowDuration != this.showDuration && this.showDuration) {
      this.createDefaultDuration = true;
    }
    this.oldShowWaitToFinish = this.showWaitToFinish;
    this.oldShowDuration = this.showDuration;



    var waitBlockConnected = this.getInputTargetBlock("WAIT"); //Or null
    var durationBlockConnected = this.getInputTargetBlock("DURATION"); //Or null

    this.updateShape();

    if (waitBlockConnected) {
      if (this.showWaitToFinish) {
        Blockly.Mutator.reconnect(waitBlockConnected.outputConnection, this, "WAIT");
      } else {
        waitBlockConnected.dispose();
      }
    }
    if (durationBlockConnected) {
      if (this.showDuration) {
        Blockly.Mutator.reconnect(durationBlockConnected.outputConnection, this, "DURATION");
      } else {
        durationBlockConnected.dispose();
      }
    }*/
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape: function() {
    //Need to save connection here to restore them at end of update shape
    var connectedBlocks = {};
    for (var iii = 0; iii < this.mcFields.length; iii++) {
      var field = this.mcFields[iii];
      var connectedBlock = this.getInputTargetBlock(field.name); //Or null if nothing.
      connectedBlocks[field.name] = connectedBlock;
    }

    //Remove all inputs, create from scratch
    while (this.inputList.length > 0) {
      this.removeInput(this.inputList[0].name);
    }

    for (var iii = 0; iii < this.mcFields.length; iii++) {
      var field = this.mcFields[iii];
      if ("optional" in field && field.optional === true) {
        var fieldName = "showField_" + field.name;
        if (!(fieldName in this) || this[fieldName] !== true) {
          continue;
        }
      }
      var label = "";
      if ("label" in field) {
        label = field.label;
      }
      this.appendDummyInput().appendField(label.split("%1")[0])
        .appendField(new Blockly.FieldCheckbox("TRUE"), field.name) /////////////////////////
        .appendField((label.split("%1")[1] || ""))
        .init();
    }

    //Restore connections, if an input is gone, destroy anything previously connected
    for (var iii = 0; iii < this.mcFields.length; iii++) {
      var field = this.mcFields[iii];
      var connectedBlock = connectedBlocks[field.name];
      var inputToConnectTo = this.getInput(field.name);
      if (inputToConnectTo === null) {
        if (connectedBlock !== null) {
          connectedBlock.dispose(); //Input is gone, so destroy whatever was connected to it before
        }
      } else {
        if (connectedBlock !== null) {
          Blockly.Mutator.reconnect(connectedBlock.outputConnection, this, field.name); //Reconnect it
        }
      }
    }

/*
    //Create default inputs if required
    if (this.createDefaultWait) {
      this.createDefaultWait = false;
      var that = this;
      //This default block creation has to be delayed. If it isn't we end up
      //redrawing the input and because it's been made so recently this causes an error.
        var newBlock = that.workspace.newBlock("logic_boolean");
        newBlock.setFieldValue('FALSE', 'BOOL');
        that.getInput("WAIT").connection.connect(newBlock.outputConnection);
        newBlock.initSvg();
        that.workspace.render();
    }
    if (this.createDefaultDuration) {
      this.createDefaultDuration = false;
      var that = this;
      //This default block creation has to be delayed. If it isn't we end up
      //redrawing the input and because it's been made so recently this causes an error.
      setTimeout(function() {
        var newBlock = that.workspace.newBlock("math_number");
        newBlock.setFieldValue(1, 'NUM');
        that.getInput("DURATION").connection.connect(newBlock.outputConnection);
        newBlock.initSvg();
        that.workspace.render();
      });
    }
*/

  }
};

Blockly.Extensions.registerMutator('servo_2_to_mutator2222', Blockly.Constants.Servo2.MUTATOR_MIXIN2222, null, ["mutator_nop_block"]);






























//Return the option to select, or null to abort change
var servoDropdownChange = function(newValue) {
  if(newValue == 'mcAddServo') {
    var that = this; //This is a blockly block.
    Blockly.Variables.createVariable(this.workspace, function(varName) {
      if (typeof varName === "undefined" || varName === null) {
        //They cancelled or it failed, so do nothing.
        return null;
      }
      that.setFieldValue(varName, 'SERVO_VARIABLE');
    }, 'Servo');
    //Don't change to "Add Servo", the callback above will
    //change to new variable if it's created successfully.
    return null;
  } else if (newValue === "mcRenameServo") {
    var newVariableName = window.prompt("New variable name:");
    if (newVariableName === null || newVariableName === "") {
      return null; //They cancelled so do nothing.
    }
    this.workspace.renameVariable(this.getFieldValue('SERVO_VARIABLE'), newVariableName);
    //Change to the newly named variable
    //TODO: We kind of need a recursive thing were we change all dropdowns that exist.
    return newVariableName;
  } else if (newValue === "mcDeleteServo") {
    this.workspace.deleteVariable(this.getFieldValue('SERVO_VARIABLE'));
    //Don't change to "Delete Servo", the callback above will
    //change to new variable if it's created successfully.
    //TODO: We kind of need a recursive thing were we change all dropdowns that exist.
    return null;
  }
};



var servo2ToConstructorJson = {
    "type": "servo_2_constructor",
    "message0": "Servo ",
    "previousStatement": null,
    "nextStatement": null,
    "colour": "%{BKY_LOGIC_HUE}",
    "inputsInline": true,
};

Blockly.Blocks['servo_2_constructor'] = {
    init: function() {
      this.jsonInit(servo2ToConstructorJson);

      var dropdown = new Blockly.FieldDropdown(Blockly.Python.getServoList, servoDropdownChange.bind(this));
      this.appendDummyInput().appendField(dropdown, "SERVO_VARIABLE");

      var dropdown2 =  new Blockly.FieldDropdown([
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
      ]);
      this.appendDummyInput().appendField(" = (Servo Number").appendField(dropdown2, "SERVO_NUMBER").appendField(")");
    }
  };





var servo2ToJson =  {
  "type": "servo_2_to",
  "message0": "Servo",
  "previousStatement": null,
  "nextStatement": null,
  "colour": "%{BKY_LOGIC_HUE}",
  "inputsInline": true,
  "mutator": "servo_2_to_mutator"
};

Blockly.Blocks['servo_2_to'] = {
  init: function() {
    this.jsonInit(servo2ToJson);

    var dropdown = new Blockly.FieldDropdown(Blockly.Python.getServoList);
    this.appendDummyInput().appendField(dropdown, "SERVO_VARIABLE");
    this.appendValueInput("SERVO_POSITION")
        .setCheck("Number")
        .appendField("to");
  }
};


Blockly.defineBlocksWithJsonArray([
  // Mutator blocks. Do not extract.
  {
    "type": "mc_nop_block",
    "message0": "",
    "args0": [],
    "enableContextMenu": false,
    "colour": "%{BKY_LOGIC_HUE}",
  },
]);



Blockly.defineBlocksWithJsonArray([
  // Mutator blocks. Do not extract.
  {
    "type": "mutator_nop_block",
    "message0": "Show/hide optional arguments",
    "enableContextMenu": false,
    "colour": "%{BKY_LOGIC_HUE}",
  },
  {
    "type": "servo_2_mutator_options",
    "message0": "Duration %1",
    "args0": [
      {
        "type": "field_checkbox",
        "name": "SHOW_DURATION_PARAMETER"
      }
    ],
    "message1": "Wait to finish %1",
    "args1": [
      {
        "type": "field_checkbox",
        "name": "SHOW_WAIT_PARAMETER"
      }
    ],
    "enableContextMenu": false,
    "colour": "%{BKY_LOGIC_HUE}",
  },
]);

/**
 * Mutator methods added to servo_2 blocks.
 * @mixin
 * @augments Blockly.Block
 * @package
 * @readonly
 */
Blockly.Constants.Servo2.MUTATOR_MIXIN = {

  /**
   * Create XML to represent the block state.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    if (!this.showWaitToFinish && !this.showDuration) {
      return null;
    }

    var container = document.createElement('mutation');
    if (this.showWaitToFinish) {
      container.setAttribute('wait_to_finish', this.showWaitToFinish);
    }
    if (this.showDuration) {
      container.setAttribute('duration', this.showDuration);
    }

    return container;
  },
  /**
   * Parse XML to restore the block state
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    this.showWaitToFinish = (xmlElement.getAttribute('wait_to_finish') == 'true') || false;
    this.showDuration = (xmlElement.getAttribute('duration') == 'true') || false;
    this.updateShape();
  },

  /**
   * Populate the mutator's dialog with this block's components.
   * @param {!Blockly.Workspace} workspace Mutator's workspace.
   * @return {!Blockly.Block} Root block in mutator.
   * @this Blockly.Block
   */
  decompose: function(workspace) {
    var containerBlock = workspace.newBlock('servo_2_mutator_options');
    containerBlock.initSvg();

    if (this.showWaitToFinish) {
      containerBlock.setFieldValue(true, 'SHOW_WAIT_PARAMETER');
    }
    if (this.showDuration) {
      containerBlock.setFieldValue(true, 'SHOW_DURATION_PARAMETER');
    }

    return containerBlock;
  },
  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    this.showWaitToFinish = (containerBlock.getFieldValue('SHOW_WAIT_PARAMETER') == 'TRUE') || false;
    this.showDuration = (containerBlock.getFieldValue('SHOW_DURATION_PARAMETER') == 'TRUE') || false;

    if (typeof this.oldShowWaitToFinish != "undefined" && this.oldShowWaitToFinish != this.showWaitToFinish && this.showWaitToFinish) {
      this.createDefaultWait = true;
    }
    if (typeof this.oldShowDuration != "undefined" && this.oldShowDuration != this.showDuration && this.showDuration) {
      this.createDefaultDuration = true;
    }
    this.oldShowWaitToFinish = this.showWaitToFinish;
    this.oldShowDuration = this.showDuration;



    var waitBlockConnected = this.getInputTargetBlock("WAIT"); //Or null
    var durationBlockConnected = this.getInputTargetBlock("DURATION"); //Or null

    this.updateShape();

    if (waitBlockConnected) {
      if (this.showWaitToFinish) {
        Blockly.Mutator.reconnect(waitBlockConnected.outputConnection, this, "WAIT");
      } else {
        waitBlockConnected.dispose();
      }
    }
    if (durationBlockConnected) {
      if (this.showDuration) {
        Blockly.Mutator.reconnect(durationBlockConnected.outputConnection, this, "DURATION");
      } else {
        durationBlockConnected.dispose();
      }
    }
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape: function() {
    // Delete everything.
    this.removeInput('DURATION', true);
    this.removeInput('WAIT', true);

    if (this.showDuration) {
      this.appendValueInput('DURATION').appendField("Duration");
    }
    if (this.showWaitToFinish) {
      this.appendValueInput('WAIT').appendField("Wait to finish");
    }

    //Create default inputs if required
    if (this.createDefaultWait) {
      this.createDefaultWait = false;
      var that = this;
      //This default block creation has to be delayed. If it isn't we end up
      //redrawing the input and because it's been made so recently this causes an error.
      setTimeout(function() {
        var newBlock = that.workspace.newBlock("logic_boolean");
        newBlock.setFieldValue('FALSE', 'BOOL');
        that.getInput("WAIT").connection.connect(newBlock.outputConnection);
        newBlock.initSvg();
        that.workspace.render();
      });
    }
    if (this.createDefaultDuration) {
      this.createDefaultDuration = false;
      var that = this;
      //This default block creation has to be delayed. If it isn't we end up
      //redrawing the input and because it's been made so recently this causes an error.
      setTimeout(function() {
        var newBlock = that.workspace.newBlock("math_number");
        newBlock.setFieldValue(1, 'NUM');
        that.getInput("DURATION").connection.connect(newBlock.outputConnection);
        newBlock.initSvg();
        that.workspace.render();
      });
    }
  }
};

Blockly.Extensions.registerMutator('servo_2_to_mutator', Blockly.Constants.Servo2.MUTATOR_MIXIN, null, ["mutator_nop_block"]);
