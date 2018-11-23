'use strict';

goog.provide('Blockly.Blocks.mcCreateBlocklyProcedure');

//We use some of their functions to help create ours
goog.require('Blockly.Blocks.procedures');

if (typeof Blockly.mcGeneratorsToCreate === "undefined") {
  Blockly.mcGeneratorsToCreate = {};
}

//Some procedures are considered "system" and so shouldn't be
//shown to the user in function drop-downs. This is their names.
if (typeof Blockly.mcSystemProcedures === "undefined") {
  Blockly.mcSystemProcedures = [];
}

function mcCreateBlocklyProcedure(args) {
  let defaultArgs = {
    "type": null,
    "colour": Blockly.Blocks.procedures.HUE,
    "tooltip": "",
    "helpUrl": "",
    "displayName": null, //If null, the actual name from the code will be used
    "codeName": null, //This is automatically mangled to avoid conflicts
    "generator": null,
    "system": false, //If we should hide it from the end user
  };
  args = Object.assign({}, defaultArgs, args);
  if (args.type === null) {
    throw "Procedure type cannot be null";
  } else if (args.codeName === null) {
    throw "Procedure codeName cannot be null";
  }

  var newProcedure = Blockly.Blocks[args.type] = mcSetupProcedureFromArgs(args);

  if (args.generator !== null) {
    //Create the generator too
    let generator = mcSetupProcedureGeneratorFromArgs(args);
    if (typeof Blockly.Python === "undefined") {
      //This was called early. Defer creating the generator
      Blockly.mcGeneratorsToCreate[args.type] = generator;
    } else {
      Blockly.Python[args.type] = generator;
    }
  }

}

//This is mostly an internal function and doesn't check args.
//Consider using mcCreateBlocklyProcedure() instead
function mcSetupProcedureFromArgs(args) {
  //We setup the Blockly procedure object
  return {
    init: function() {
      this.mcFields = args;

      if (!("inputsInline" in args)) {
        args.inputsInline = true; //defaults to true
      }

      this.jsonInit(args);
      this.mcCodeName = Blockly.Procedures.findLegalName(args.codeName, this); //This might be different if it's already used
      this.mcDisplayName = args.displayName || this.mcCodeName;

      if (args.system) {
        Blockly.mcSystemProcedures.push(this.mcCodeName);
      }

      this.appendDummyInput().appendField(this.mcDisplayName);

      var fields = args.fields || [];
      for (var iii = 0; iii < fields.length; iii++) {
        var field = args.fields[iii];

        var label = "";
        if ("label" in field) {
          label = field.label;
        }
        var labelBefore = label.split("%1")[0];
        var labelAfter = label.split("%1")[1] || "";

        if (field.type === "dropdown") {
          var options = [];
          if ("options" in field) {
            options = field.options;
          }
          var dropdown = new Blockly.FieldDropdown(options);
          this.appendDummyInput().appendField(labelBefore).appendField(dropdown, field.name).init();
          this.appendDummyInput().appendField(labelAfter).init();
        }
      }

      //These mostly exist to allow us to reuse the procedures.js functions
      this.setStatements_(true);
      this.statementConnection_ = null;
    },

    mutationToDom: Blockly.Blocks['procedures_defnoreturn'].mutationToDom,
    domToMutation: Blockly.Blocks['procedures_defnoreturn'].domToMutation,
    decompose: Blockly.Blocks['procedures_defnoreturn'].decompose,
    compose: Blockly.Blocks['procedures_defnoreturn'].compose,

    getProcedureDef: function() {
      return [this.mcCodeName, [], false]; //name, args, doesItReturn
    },

    //These mostly exist to allow us to reuse the procedures.js functions
    setStatements_: Blockly.Blocks['procedures_defnoreturn'].setStatements_,
    updateParams_: function() {},
    arguments_: [],
    callType_: 'procedures_callnoreturn'
  };
}

//This is mostly an internal function and doesn't check args.
//Consider using mcCreateBlocklyProcedure() instead
function mcSetupProcedureGeneratorFromArgs(args) {
  return function(block) {
    //This callback function must return the Python code for the block
    //%1 is going to just represent all of the normal function code
    let generatorStr = args.generator;
    generatorStr = generatorStr.replace(new RegExp("{{codeName}}", "g"), block.mcCodeName);
    var beforeProcedure = generatorStr.split("%1")[0];
    var afterProcedure = generatorStr.split("%1")[1] || "";

    //This is mostly pulled and modified from procedures.js
    //First we find all global variables and put them at the top of the function
    let globals = mcGetAllVariableCodeNames(block.workspace);
    globals = globals.length ? '  global ' + globals.join(', ') + '\n' : '';

    var funcName = block.mcCodeName;

    var branch = Blockly.Python.statementToCode(block, 'STACK');
    if (!branch) {
      branch = Blockly.Python.PASS;
    }

    var code = beforeProcedure + 'def ' + funcName + '():\n' +
                 globals + branch + afterProcedure;
    code = Blockly.Python.scrub_(block, code);

    var fields = args.fields || [];

    for (var iii = 0; iii < fields.length; iii++) {
      var field = args.fields[iii];
      if (field.type === "dropdown") {
        var valueCode = block.getFieldValue(field.name);
        code = code.replace(new RegExp("{{" + field.name + "}}", "g"), valueCode);
      }
    }

    // Add % so as not to collide with helper functions in definitions list.
    Blockly.Python.definitions_['%' + funcName] = code;

    //We actually don't return the code. But we define the definition for Blocky.
    return null;
  }
}

function mcGetAllVariableCodeNames(workspace) {
  //This tries to find all global variables
  //It's useful for the global line at the top of a function in Python
  let globals = [];

  let blocklyObjects = Blockly.Python['objects'];
  if (blocklyObjects) {
    var objects = Blockly.Python.getUnique(blocklyObjects, 'name');
    for (var iii = 0; iii < objects.length; iii++) {
      globals.push(objects[iii].name);
    }
  }

  let variables = workspace.getAllVariables() || [];
  for (var iii = 0, variable; variable = variables[iii]; iii++) {
    globals.push(Blockly.Python.variableDB_.getName(variable.name,
                   Blockly.Variables.NAME_TYPE));
  }

  return globals;
}


mcCreateBlocklyProcedure({
  "type": "procedures_loop",
  "displayName": "Forever",
  "codeName": "forever", //This is automatically mangled to avoid conflicts
  "system": true, //Hide from end user
});

mcCreateBlocklyProcedure({
  "type": "procedures_start",
  "displayName": "Start",
  "codeName": "start", //This is automatically mangled to avoid conflicts
  "generator": "%1",
  "system": true,
});
