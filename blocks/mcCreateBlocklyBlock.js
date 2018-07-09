'use strict';

goog.provide('Blockly.Blocks.mcCreateBlocklyBlock');

if (typeof Blockly.mcGeneratorsToCreate === "undefined") {
  Blockly.mcGeneratorsToCreate = {};
}

function mcCreateBlocklyBlock(args) {
  var blocklyJson = {
    "type": (args.type || null),
    "message0": "",
    "previousStatement": null, //Null actually means, to allow it to connect.
    "nextStatement": null, //Null actually means, to allow it to connect.
    "colour": (args.colour || "%{BKY_LOGIC_HUE}"),
    "inputsInline": true,
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
  if ("output" in args) {
    blocklyJson.output = args.output;
    delete blocklyJson.previousStatement;
    delete blocklyJson.nextStatement;
  }

  var mcDataFields = args.fields || [];
  mcDataFields = mcDataFields.slice(); //Ensure we don't modify the one passed in.

  if (mcGetOptionalFields(mcDataFields).length > 0) {
    blocklyJson["mutator"] = "mc_auto_mutator_mixin";
  }

  //Create the base blockly block
  var newBaseBlock = Blockly.Blocks[blocklyJson.type] = {
    init: function() {
      this.jsonInit(blocklyJson);
      this.mcFields = mcDataFields;
      (mcUpdateBlock.bind(this))();
    }
  };

  //Create the generator
  if ("generator" in args) {
    var generatorString = args["generator"];

    var generator = function(block) {
      var code = generatorString;
      for (var iii = 0; iii < block.mcFields.length; iii++) {
        var field = block.mcFields[iii];
        var valueCode = Blockly.Python.valueToCode(block, field.name, Blockly.Python.ORDER_ATOMIC);
        if (valueCode === "" && block.getFieldValue(field.name)) { //No input
          valueCode = block.getFieldValue(field.name);
        }
        if (field.type === "object_dropdown") {
          valueCode = Blockly.Python.variableDB_.getName(block.getFieldValue(field.name), Blockly.Variables.NAME_TYPE);
        }
        if (field.type === "function_dropdown") {
          valueCode = Blockly.Python.variableDB_.getName(block.getFieldValue(field.name), Blockly.Procedures.NAME_TYPE);
        }
        if (field.type === "hidden_checkbox") {
          valueCode = "False";
          if (this["showField_" + field.name] === true) {
            //If it's visible, it's true
            valueCode = "True";
          }
        }
        if (valueCode === null || valueCode === "") {
          //Nothing connected, use default if it exists
          valueCode = "None";
          if ("optionalDefaultValue" in field) {
            if (field.optionalDefaultValue === true) {
              valueCode = "True";
            } else if (field.optionalDefaultValue === false) {
              valueCode = "False";
            } else if (typeof field.optionalDefaultValue === "number") {
              valueCode = field.optionalDefaultValue;
            } else {
              //Assume string
              valueCode = "'''" + field.optionalDefaultValue + "'''"; //Should escape a Python string really.
            }
          }
        }
        //
        code = code.replace(new RegExp("{{" + field.name + "}}", "g"), valueCode);
      }

      if ("output" in blocklyJson) {
        return [code, Blockly.Python.ORDER_ATOMIC];
      } else {
        return code;
      }
    };

    if (typeof Blockly.Python === "undefined") {
      //This was called early. Defer creating the generator
      Blockly.mcGeneratorsToCreate[blocklyJson.type] = generator;
    } else {
      Blockly.Python[blocklyJson.type] = generator;
    }
  }

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



//Now we create the mutator
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

var mcAutoMutatorMixin = {

  /**
   * Create XML to represent the block state.
   * @return {Element} XML storage element.
   * @this Blockly.Block
   */
  mutationToDom: function() {
    //Store the mutator state into xml. We take "showField_<name>" from block and store it into xml
    var container = document.createElement('mutation');
    var optionalFields = mcGetOptionalFields(this.mcFields); //Only optional fields edit the mutator
    for (var iii = 0; iii < optionalFields.length; iii++) {
      var field = optionalFields[iii];
      var fieldName = "showField_" + field.name;
      var blockShowField = false;
      if (fieldName in this && this[fieldName] !== false) {
        blockShowField = true;
      }
      container.setAttribute(fieldName.toLowerCase(), blockShowField); //xml must be lowercase
    }

    return container;
  },

  /**
   * Parse XML to restore the block state
   * @param {!Element} xmlElement XML storage element.
   * @this Blockly.Block
   */
  domToMutation: function(xmlElement) {
    var optionalFields = mcGetOptionalFields(this.mcFields);
    for (var iii = 0; iii < optionalFields.length; iii++) {
      var field = optionalFields[iii];
      var fieldName = "showField_" + field.name;
      var fromXmlBlockShowField = xmlElement.getAttribute(fieldName.toLowerCase()); //xml must be lowercase
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

    var optionalFields = mcGetOptionalFields(this.mcFields);
    for (var iii = 0; iii < optionalFields.length; iii++) {
      var field = optionalFields[iii];
      var fieldName = "showField_" + field.name;
      var checkboxValue = "FALSE";
      if (fieldName in this && this[fieldName] === true) {
        checkboxValue = "TRUE";
      }
      var showHideLabel = field.name + ": ";
      if ("optionalShowHideLabel" in field) {
        showHideLabel = field["optionalShowHideLabel"];
      }
      containerBlock.appendDummyInput().appendField(showHideLabel + " ").appendField(new Blockly.FieldCheckbox(checkboxValue), fieldName).init();
    }

    this.workspace.render();

    return containerBlock;
  },

  /**
   * Reconfigure this block based on the mutator dialog's components.
   * @param {!Blockly.Block} containerBlock Root block in mutator.
   * @this Blockly.Block
   */
  compose: function(containerBlock) {
    var optionalFields = mcGetOptionalFields(this.mcFields);
    for (var iii = 0; iii < optionalFields.length; iii++) {
      var field = optionalFields[iii];
      var fieldName = "showField_" + field.name;
      var fieldValue = false;
      if (containerBlock.getFieldValue(fieldName) && containerBlock.getFieldValue(fieldName) === "TRUE") {
        fieldValue = true;
      }

      if (!(fieldName in this) || (this[fieldName] !== fieldValue && fieldValue === true)) {
        //Field changed
        if ("optionalDefaultValue" in field) {
          //Tag that we need to create a default value for this
          this["createOptionalDefaultValue_" + field.name] = true;
        }
      }

      this[fieldName] = fieldValue;
    }

    this.updateShape();
  },

  /**
   * Modify this block to have the correct number of inputs.
   * @this Blockly.Block
   * @private
   */
  updateShape: mcUpdateBlock,
};

Blockly.defineBlocksWithJsonArray([{
  "type": "mutator_nop_block",
  "message0": "Show/hide optional arguments",
  "enableContextMenu": false,
  "colour": "%{BKY_LOGIC_HUE}",
}]);

Blockly.Extensions.registerMutator('mc_auto_mutator_mixin', mcAutoMutatorMixin, null, ["mutator_nop_block"]);

//This generator and validator are used for the object_dropdown type
function mcObjectDropdownMenuGenerator() {
  var object = this.mcObjectType;
  var prettyObjectName = this.mcPrettyObjectName;
  var variables = Blockly.mainWorkspace.getVariablesOfType(object);
  var variableList = [];
  for (var iii = 0; iii < variables.length; iii++) {
    var variableName = variables[iii].name;
    variableList.push([variableName, variableName]);
  }

  if (variables.length > 0) {
    //variableList.push(["Rename", "mcRenameObject"]); //We kind of need a recursive way to update all dropdowns, until we have this I'm commenting this out.
    variableList.push(["Delete", "mcDeleteObject"]);
  } else {
    variableList.push(['Choose a ' + prettyObjectName.replace(/_/g, " "), "mcNullSelection"]);
  }

  variableList.push(["Add " + prettyObjectName.replace(/_/g, " "), "mcAddNewObject"]);
  return variableList;
}

function mcObjectDropdownValidator(newValue) {
  var object = this.mcObjectType;

  if(newValue == 'mcAddNewObject') {
    var that = this; //This is a blockly block.
    Blockly.Variables.createVariable(Blockly.mainWorkspace, function(varName) {
      if (typeof varName === "undefined" || varName === null) {
        //They cancelled or it failed, so do nothing.
        return null;
      }
      that.setValue(varName);
    }, object);
    //Don't change to "Add Servo", the callback above will
    //change to new variable if it's created successfully.
    return null;
  } else if (newValue === "mcRenameObject") {
    var newVariableName = window.prompt("New variable name:");
    if (newVariableName === null || newVariableName === "") {
      return null; //They cancelled so do nothing.
    }
    //this.workspace.renameVariable(this.getFieldValue('SERVO_VARIABLE'), newVariableName);
    //Change to the newly named variable
    //TODO: We kind of need a recursive thing were we change all dropdowns that exist.
    return newVariableName;
  } else if (newValue === "mcDeleteObject") {
    Blockly.mainWorkspace.deleteVariable(this.getValue());
    this.setValue(this.getOptions()[0][1]);
    //Don't change to "Delete Servo", the callback above will
    //change to new variable if it's created successfully.
    //TODO: We kind of need a recursive thing were we change all dropdowns that exist.
    return null;
  }
}

function mcFunctionMenuGenerator() {
  var functionList = [];

  var allFunctions = Blockly.Procedures.allProcedures(Blockly.mainWorkspace);
  allFunctions = allFunctions[0].concat(allFunctions[1]);

  for (var iii = 0; iii < allFunctions.length; iii++) {
    var functionName = allFunctions[iii][0];
    functionList.push([functionName, functionName]);
  }

  if (functionList.length == 0) {
    functionList.push(["Choose a function", "mcNullSelection"]);
  }

  return functionList;
}

function mcUpdateBlock() {
  //Need to save connection here to restore them at end of update shape
  var connectedBlocks = {};
  for (var iii = 0; iii < this.mcFields.length; iii++) {
    var field = this.mcFields[iii];
    var connectedBlock = this.getInputTargetBlock(field.name); //Or null if nothing.
    connectedBlocks[field.name] = connectedBlock;
  }

  var fieldValues = {};
  for (var iii = 0; iii < this.mcFields.length; iii++) {
    var field = this.mcFields[iii];
    var fieldValue = this.getFieldValue(field.name);
    if (fieldValue) {
      fieldValues[field.name] = fieldValue;
    }
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
        continue; //Hidden
      }
    }
    var label = "";
    if ("label" in field) {
      label = field.label;
    }
    var labelBefore = label.split("%1")[0];
    var labelAfter = label.split("%1")[1] || "";

    if (field.type === "input_value") {
      var check = null;
      if ("check" in field) {
        check = field.check;
      }
      this.appendValueInput(field.name).setCheck(check).appendField(labelBefore).init();
      this.appendDummyInput().appendField(labelAfter).init();
    } else if (field.type === "dropdown") {
      var options = [];
      if ("options" in field) {
        options = field.options;
      }
      var dropdown = new Blockly.FieldDropdown(options);
      this.appendDummyInput().appendField(labelBefore).appendField(dropdown, field.name).init();
      this.appendDummyInput().appendField(labelAfter).init();
    } else if (field.type === "dummy" || field.type === "hidden_checkbox") {
      this.appendDummyInput().appendField(labelBefore + labelAfter).init();
    } else if (field.type === "object_dropdown") {
      var objectType = field.object;
      var prettyObjectName = field.prettyObjectName || objectType;
      var menuGenerator = function() {
        this.mcObjectType = objectType; //Required arg
        this.mcPrettyObjectName = prettyObjectName;
        return (mcObjectDropdownMenuGenerator.bind(this))();
      }
      var dropdownValidator = function(newValue) {
        this.mcObjectType = objectType; //Required arg
        return (mcObjectDropdownValidator.bind(this))(newValue);
      }
      var dropdown = new Blockly.FieldDropdown(menuGenerator, dropdownValidator);
      dropdown.setValue(dropdown.getOptions()[0][1]);
      dropdown.mcObjectType = field.object; //Just in case.
      this.appendDummyInput().appendField(labelBefore).appendField(dropdown, field.name).init();
      this.appendDummyInput().appendField(labelAfter).init();
    } else if (field.type === "function_dropdown") {
      var dropdown = new Blockly.FieldDropdown(mcFunctionMenuGenerator);
      dropdown.setValue(dropdown.getOptions()[0][1]);
      this.appendDummyInput().appendField(labelBefore).appendField(dropdown, field.name).init();
      this.appendDummyInput().appendField(labelAfter).init();
    }
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

  //Restore dropdown values etc.
  for (var iii = 0; iii < this.mcFields.length; iii++) {
    var field = this.mcFields[iii];
    if (fieldValues[field.name]) {
      this.setFieldValue(fieldValues[field.name], field.name);
    }
  }

  //Create any default inputs if required
  for (var iii = 0; iii < this.mcFields.length; iii++) {
    var field = this.mcFields[iii];
    var fieldName = "createOptionalDefaultValue_" + field.name;
    if (fieldName in this && this[fieldName] === true) {
      this[fieldName] = false; //Set to false so it's only created once
      var fieldValueToCreate = field.optionalDefaultValue;
      var newBlock = null;
      if (fieldValueToCreate === true) {
        newBlock = this.workspace.newBlock("logic_boolean");
        newBlock.setFieldValue("TRUE", "BOOL");
      } else if (fieldValueToCreate === false) {
        newBlock = this.workspace.newBlock("logic_boolean");
        newBlock.setFieldValue("FALSE", "BOOL");
      } else if (typeof fieldValueToCreate === "number") {
        newBlock = this.workspace.newBlock("math_number");
        newBlock.setFieldValue(fieldValueToCreate, "NUM");
      } else {
        //Assume string
        newBlock = this.workspace.newBlock("text");
        newBlock.setFieldValue(fieldValueToCreate, "TEXT");
      }

      this.getInput(field.name).connection.connect(newBlock.outputConnection);
      newBlock.initSvg();
      this.workspace.render();
    }
  }
}
