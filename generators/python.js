/**
 * @license
 * Visual Blocks Language
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
 * @fileoverview Helper functions for generating Python for blocks.
 * @author fraser@google.com (Neil Fraser)
 */
'use strict';

goog.provide('Blockly.Python');

goog.require('Blockly.Generator');


/**
 * Python code generator.
 * @type {!Blockly.Generator}
 */
Blockly.Python = new Blockly.Generator('Python');

/**
 * List of illegal variable names.
 * This is not intended to be a security feature.  Blockly is 100% client-side,
 * so bypassing this list is trivial.  This is intended to prevent users from
 * accidentally clobbering a built-in object or function.
 * @private
 */
Blockly.Python.addReservedWords(
    // import keyword
    // print(','.join(sorted(keyword.kwlist)))
    // https://docs.python.org/3/reference/lexical_analysis.html#keywords
    // https://docs.python.org/2/reference/lexical_analysis.html#keywords
    'False,None,True,and,as,assert,break,class,continue,def,del,elif,else,' +
    'except,exec,finally,for,from,global,if,import,in,is,lambda,nonlocal,not,' +
    'or,pass,print,raise,return,try,while,with,yield,' +
    // https://docs.python.org/3/library/constants.html
    // https://docs.python.org/2/library/constants.html
    'NotImplemented,Ellipsis,__debug__,quit,exit,copyright,license,credits,' +
    // >>> print(','.join(sorted(dir(__builtins__))))
    // https://docs.python.org/3/library/functions.html
    // https://docs.python.org/2/library/functions.html
    'ArithmeticError,AssertionError,AttributeError,BaseException,' +
    'BlockingIOError,BrokenPipeError,BufferError,BytesWarning,' +
    'ChildProcessError,ConnectionAbortedError,ConnectionError,' +
    'ConnectionRefusedError,ConnectionResetError,DeprecationWarning,EOFError,' +
    'Ellipsis,EnvironmentError,Exception,FileExistsError,FileNotFoundError,' +
    'FloatingPointError,FutureWarning,GeneratorExit,IOError,ImportError,' +
    'ImportWarning,IndentationError,IndexError,InterruptedError,' +
    'IsADirectoryError,KeyError,KeyboardInterrupt,LookupError,MemoryError,' +
    'ModuleNotFoundError,NameError,NotADirectoryError,NotImplemented,' +
    'NotImplementedError,OSError,OverflowError,PendingDeprecationWarning,' +
    'PermissionError,ProcessLookupError,RecursionError,ReferenceError,' +
    'ResourceWarning,RuntimeError,RuntimeWarning,StandardError,' +
    'StopAsyncIteration,StopIteration,SyntaxError,SyntaxWarning,SystemError,' +
    'SystemExit,TabError,TimeoutError,TypeError,UnboundLocalError,' +
    'UnicodeDecodeError,UnicodeEncodeError,UnicodeError,' +
    'UnicodeTranslateError,UnicodeWarning,UserWarning,ValueError,Warning,' +
    'ZeroDivisionError,_,__build_class__,__debug__,__doc__,__import__,' +
    '__loader__,__name__,__package__,__spec__,abs,all,any,apply,ascii,' +
    'basestring,bin,bool,buffer,bytearray,bytes,callable,chr,classmethod,cmp,' +
    'coerce,compile,complex,copyright,credits,delattr,dict,dir,divmod,' +
    'enumerate,eval,exec,execfile,exit,file,filter,float,format,frozenset,' +
    'getattr,globals,hasattr,hash,help,hex,id,input,int,intern,isinstance,' +
    'issubclass,iter,len,license,list,locals,long,map,max,memoryview,min,' +
    'next,object,oct,open,ord,pow,print,property,quit,range,raw_input,reduce,' +
    'reload,repr,reversed,round,set,setattr,slice,sorted,staticmethod,str,' +
    'sum,super,tuple,type,unichr,unicode,vars,xrange,zip'
);



/**
 * Order of operation ENUMs.
 * http://docs.python.org/reference/expressions.html#summary
 */
Blockly.Python.ORDER_ATOMIC = 0;            // 0 "" ...
Blockly.Python.ORDER_COLLECTION = 1;        // tuples, lists, dictionaries
Blockly.Python.ORDER_STRING_CONVERSION = 1; // `expression...`
Blockly.Python.ORDER_MEMBER = 2.1;          // . []
Blockly.Python.ORDER_FUNCTION_CALL = 2.2;   // ()
Blockly.Python.ORDER_EXPONENTIATION = 3;    // **
Blockly.Python.ORDER_UNARY_SIGN = 4;        // + -
Blockly.Python.ORDER_BITWISE_NOT = 4;       // ~
Blockly.Python.ORDER_MULTIPLICATIVE = 5;    // * / // %
Blockly.Python.ORDER_ADDITIVE = 6;          // + -
Blockly.Python.ORDER_BITWISE_SHIFT = 7;     // << >>
Blockly.Python.ORDER_BITWISE_AND = 8;       // &
Blockly.Python.ORDER_BITWISE_XOR = 9;       // ^
Blockly.Python.ORDER_BITWISE_OR = 10;       // |
Blockly.Python.ORDER_RELATIONAL = 11;       // in, not in, is, is not,
                                            //     <, <=, >, >=, <>, !=, ==
Blockly.Python.ORDER_LOGICAL_NOT = 12;      // not
Blockly.Python.ORDER_LOGICAL_AND = 13;      // and
Blockly.Python.ORDER_LOGICAL_OR = 14;       // or
Blockly.Python.ORDER_CONDITIONAL = 15;      // if else
Blockly.Python.ORDER_LAMBDA = 16;           // lambda
Blockly.Python.ORDER_NONE = 99;             // (...)

/************************* START MAKERCLUB *********************/

/**
 * A list of types tasks that the pins can be assigned. Used to track usage and
 * warn if the same pin has been assigned to more than one task.
 */
Blockly.Python.PinTypes = {
  INPUT: 'INPUT',
  OUTPUT: 'OUTPUT',
  PWM: 'PWM',
  SERVO: 'SERVO',
  STEPPER: 'STEPPER',
  SERIAL: 'SERIAL',
  I2C: 'I2C/TWI',
  SPI: 'SPI'
};


/************************* END MAKERCLUB *********************/


/**
 * List of outer-inner pairings that do NOT require parentheses.
 * @type {!Array.<!Array.<number>>}
 */
Blockly.Python.ORDER_OVERRIDES = [
  // (foo()).bar -> foo().bar
  // (foo())[0] -> foo()[0]
  [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_MEMBER],
  // (foo())() -> foo()()
  [Blockly.Python.ORDER_FUNCTION_CALL, Blockly.Python.ORDER_FUNCTION_CALL],
  // (foo.bar).baz -> foo.bar.baz
  // (foo.bar)[0] -> foo.bar[0]
  // (foo[0]).bar -> foo[0].bar
  // (foo[0])[1] -> foo[0][1]
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_MEMBER],
  // (foo.bar)() -> foo.bar()
  // (foo[0])() -> foo[0]()
  [Blockly.Python.ORDER_MEMBER, Blockly.Python.ORDER_FUNCTION_CALL],

  // not (not foo) -> not not foo
  [Blockly.Python.ORDER_LOGICAL_NOT, Blockly.Python.ORDER_LOGICAL_NOT],
  // a and (b and c) -> a and b and c
  [Blockly.Python.ORDER_LOGICAL_AND, Blockly.Python.ORDER_LOGICAL_AND],
  // a or (b or c) -> a or b or c
  [Blockly.Python.ORDER_LOGICAL_OR, Blockly.Python.ORDER_LOGICAL_OR]
];

/**
 * Initialise the database of variable names.
 * @param {!Blockly.Workspace} workspace Workspace to generate code from.
 */
Blockly.Python.init = function(workspace) {
  /**
   * Empty loops or conditionals are not allowed in Python.
   */
  Blockly.Python.PASS = this.INDENT + 'pass\n';
  // Create a dictionary of definitions to be printed before the code.
  Blockly.Python.definitions_ = Object.create(null);
  // Create a dictionary mapping desired function names in definitions_
  // to actual function names (to avoid collisions with user functions).
  Blockly.Python.functionNames_ = Object.create(null);

  if (!Blockly.Python.variableDB_) {
    Blockly.Python.variableDB_ =
        new Blockly.Names(Blockly.Python.RESERVED_WORDS_);
  } else {
    Blockly.Python.variableDB_.reset();
  }

  var defvars = [];
  var variables = workspace.getAllVariables();
  for (var i = 0; i < variables.length; i++) {
    var variable = variables[i];
    defvars[i] = Blockly.Python.variableDB_.getName(variable.name,
        Blockly.Variables.NAME_TYPE) + ' = None';
  }
  Blockly.Python.definitions_['variables'] = defvars.join('\n');
};

/**
 * Prepend the generated code with the variable definitions.
 * @param {string} code Generated code.
 * @return {string} Completed code.
 */
Blockly.Python.finish = function(code) {
  // Convert the definitions dictionary into a list.
  var imports = [];
  var definitions = [];
  for (var name in Blockly.Python.definitions_) {
    var def = Blockly.Python.definitions_[name];
    if (def.match(/^(from\s+\S+\s+)?import\s+\S+/)) {
      imports.push(def);
    } else {
      definitions.push(def);
    }
  }
  // Clean up temporary data.
  delete Blockly.Python.definitions_;
  delete Blockly.Python.functionNames_;
  Blockly.Python.variableDB_.reset();
  var allDefs = imports.join('\n') + '\n\n' + definitions.join('\n\n');
  return allDefs.replace(/\n\n+/g, '\n\n').replace(/\n*$/, '\n\n\n') + code;
};

/**
 * Naked values are top-level blocks with outputs that aren't plugged into
 * anything.
 * @param {string} line Line of generated code.
 * @return {string} Legal line of code.
 */
Blockly.Python.scrubNakedValue = function(line) {
  return line + '\n';
};

/**
 * Encode a string as a properly escaped Python string, complete with quotes.
 * @param {string} string Text to encode.
 * @return {string} Python string.
 * @private
 */
Blockly.Python.quote_ = function(string) {
  // Can't use goog.string.quote since % must also be escaped.
  string = string.replace(/\\/g, '\\\\')
                 .replace(/\n/g, '\\\n');
                 //MAKERCLUB EDIT
                 //I'm removing this line, as I don't think it's actually correct escaping?
                 //.replace(/\%/g, '\\%');
                 //END MAKERCLUB EDIT

  // Follow the CPython behaviour of repr() for a non-byte string.
  var quote = '\'';
  if (string.indexOf('\'') !== -1) {
    if (string.indexOf('"') === -1) {
      quote = '"';
    } else {
      string = string.replace(/'/g, '\\\'');
    }
  };
  return quote + string + quote;
};

/**
 * Common tasks for generating Python from blocks.
 * Handles comments for the specified block and any connected value blocks.
 * Calls any statements following this block.
 * @param {!Blockly.Block} block The current block.
 * @param {string} code The Python code created for this block.
 * @return {string} Python code with comments and subsequent blocks added.
 * @private
 */
Blockly.Python.scrub_ = function(block, code) {
  var commentCode = '';
  // Only collect comments for blocks that aren't inline.
  if (!block.outputConnection || !block.outputConnection.targetConnection) {
    // Collect comment for this block.
    var comment = block.getCommentText();
    comment = Blockly.utils.wrap(comment, Blockly.Python.COMMENT_WRAP - 3);
    if (comment) {
      if (block.getProcedureDef) {
        // Use a comment block for function comments.
        commentCode += '"""' + comment + '\n"""\n';
      } else {
        commentCode += Blockly.Python.prefixLines(comment + '\n', '# ');
      }
    }
    // Collect comments for all value arguments.
    // Don't collect comments for nested statements.
    for (var i = 0; i < block.inputList.length; i++) {
      if (block.inputList[i].type == Blockly.INPUT_VALUE) {
        var childBlock = block.inputList[i].connection.targetBlock();
        if (childBlock) {
          var comment = Blockly.Python.allNestedComments(childBlock);
          if (comment) {
            commentCode += Blockly.Python.prefixLines(comment, '# ');
          }
        }
      }
    }
  }
  var nextBlock = block.nextConnection && block.nextConnection.targetBlock();
  var nextCode = Blockly.Python.blockToCode(nextBlock);
  return commentCode + code + nextCode;
};

/**
 * Gets a property and adjusts the value, taking into account indexing, and
 * casts to an integer.
 * @param {!Blockly.Block} block The block.
 * @param {string} atId The property ID of the element to get.
 * @param {number=} opt_delta Value to add.
 * @param {boolean=} opt_negate Whether to negate the value.
 * @return {string|number}
 */
Blockly.Python.getAdjustedInt = function(block, atId, opt_delta, opt_negate) {
  var delta = opt_delta || 0;
  if (block.workspace.options.oneBasedIndex) {
    delta--;
  }
  var defaultAtIndex = block.workspace.options.oneBasedIndex ? '1' : '0';
  var atOrder = delta ? Blockly.Python.ORDER_ADDITIVE :
      Blockly.Python.ORDER_NONE;
  var at = Blockly.Python.valueToCode(block, atId, atOrder) || defaultAtIndex;

  if (Blockly.isNumber(at)) {
    // If the index is a naked number, adjust it right now.
    at = parseInt(at, 10) + delta;
    if (opt_negate) {
      at = -at;
    }
  } else {
    // If the index is dynamic, adjust it in code.
    if (delta > 0) {
      at = 'int(' + at + ' + ' + delta + ')';
    } else if (delta < 0) {
      at = 'int(' + at + ' - ' + -delta + ')';
    } else {
      at = 'int(' + at + ')';
    }
    if (opt_negate) {
      at = '-' + at;
    }
  }
  return at;
};

Blockly.Python.clearObjects = function() {
  Blockly.Python['objects'] = [];
};

Blockly.Python.includeObjects = function(code) {
  return code;
}

Blockly.Python.includeVariables = function(code){
  var variableString = '';
  for (var name in Blockly.Python.variables_) {
    variableString += Blockly.Python.variables_[name] + "\n";
  }
  code = variableString + "\n\n" + code;

  return code;
};

Blockly.Python.includeLibraries = function(code){
  return 'from makerclub import *' + '\n\n' + code;
};

Blockly.Python.getUnique = function(a, selector) {
  var seen = {};
  return a.filter(function(item) {
      if (selector) {
        return seen.hasOwnProperty(item[selector]) ? false : (seen[item[selector]] = true);
      }
      return seen.hasOwnProperty(item) ? false : (seen[item] = true);
  });
};














Backbone.Radio.channel('blockly').reply('categoryXml:generate', function(args) {
  let blocksXml = [];

  let blockNames = mcGetRemoteControlBlockNames(args);
  for (let iii = 0; iii < blockNames.length; iii++) {
    let blockXml = '<xml><block type="' + blockNames[iii] + '"></block></xml>';
    blocksXml.push(Blockly.Xml.textToDom(blockXml).firstChild);
  }

  return blocksXml;
});

function mcGetRemoteControlBlockNames(args) {
  //When given a remote control we return the block names that relate to it
  let blockNames = [];
  let blockName = "mcRc" + args.type + "_" + args.webhookId;
  //All blocks created for this start with a known prefix
  for (let itemBlockName in Blockly.Blocks) {
    if (!Blockly.Blocks.hasOwnProperty(itemBlockName)) {
      continue;
    }
    if (itemBlockName.indexOf(blockName) === 0) {
      blockNames.push(itemBlockName);
    }
  }

  return blockNames;
}

Backbone.Radio.channel('blockly').reply('remoteControlBlocks:generate', function(args) {
  //We must create the blockly blocks for the control
  switch (args.type) {
    case "slider": {
      mcCreateRcSliderBlocks(args);
      break;
    }

    case "button": {
      mcCreateRcButtonBlocks(args);
      break;
    }

    default: {
      console.log("Unknown remote control type: " + args.type + ". No blocks created for it.");
      break;
    }
  }
});

function mcCreateRcButtonBlocks(args) {
  if (args.type !== "button") {
    throw "Not a button";
  }

  let blockName = "mcRc" + args.type + "_" + args.webhookId;

  mcCreateBlocklyBlock({
    "type": blockName + "_read_value",
    "colour": "%{BKY_LOGIC_HUE}",
    "output": "Number",
    "fields": [
      {
        "label": "is " + args.displayName + " pressed",
        "type": "dummy",
      }
    ],
    "generator": "remote_control.on_change('''" + args.webhookId + "''')\n",
  });

  mcCreateBlocklyProcedure({
    "type": blockName + "_on_press",
    "displayName": "when " + args.displayName + " pressed", //If null, the actual name from the code will be used
    "codeName": blockName + "_on_press", //This is automatically mangled to avoid conflicts
    "generator": "%1remote_control.on_press(" + args.webhookId + ", {{codeName}})\n", //Use {{codeName}} to handle mangling
  });

  mcCreateBlocklyProcedure({
    "type": blockName + "_on_release",
    "displayName": "when " + args.displayName + " released", //If null, the actual name from the code will be used
    "codeName": blockName + "_on_release", //This is automatically mangled to avoid conflicts
    "generator": "%1remote_control.on_release(" + args.webhookId + ", {{codeName}})\n", //Use {{codeName}} to handle mangling
  });

  mcCreateBlocklyProcedure({
    "type": blockName + "_on_change",
    "displayName": "when " + args.displayName + " changes", //If null, the actual name from the code will be used
    "codeName": blockName + "_on_change", //This is automatically mangled to avoid conflicts
    "generator": "%1remote_control.on_change(" + args.webhookId + ", {{codeName}})\n", //Use {{codeName}} to handle mangling
  });

}

function mcCreateRcSliderBlocks(args) {
  if (args.type !== "slider") {
    throw "Not a slider";
  }

  let blockName = "mcRc" + args.type + "_" + args.webhookId;

  mcCreateBlocklyBlock({
    "type": blockName + "_read_value",
    "colour": "%{BKY_LOGIC_HUE}",
    "output": "Number",
    "fields": [
      {
        "label": args.displayName + " value",
        "type": "dummy",
      }
    ],
    "generator": "remote_control.get_value(" + args.webhookId + ")",
  });

  mcCreateBlocklyProcedure({
    "type": blockName + "_on_change",
    "displayName": "when " + args.displayName + " changes", //If null, the actual name from the code will be used
    "codeName": blockName + "_on_change", //This is automatically mangled to avoid conflicts
    "generator": "%1remote_control.on_change(" + args.webhookId + ", {{codeName}})\n", //Use {{codeName}} to handle mangling
  });
}
