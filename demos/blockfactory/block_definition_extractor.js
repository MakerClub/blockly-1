/**
 * Copyright 2017 Juan Carlos Orozco Arena
 * Apache License Version 2.0
 */

/**
 * @fileoverview Block element construction functions.
 * @author JC-Orozco (Juan Carlos Orozco), AnmAtAnm (Andrew n marshall)
 */
'use strict';

/**
 * Namespace for BlockDefinitionExtractor.
 */
goog.provide('BlockDefinitionExtractor');


/**
 * @fileoverview
 * The BlockDefinitionExtractor is a class that generates a workspace DOM
 * suitable for the BlockFactory's block editor, derived from an example
 * Blockly.Block.
 *
 * <code>
 * var workspaceDom = new BlockDefinitionExtractor()
 *     .buildBlockFactoryWorkspace(exampleBlocklyBlock);
 * Blockly.Xml.domToWorkspace(workspaceDom, BlockFactory.mainWorkspace);
 * </code>
 *
 * The <code>exampleBlocklyBlock</code> is usually the block loaded into the
 * preview workspace after manually entering the block definition.
 */

/**
 * Class to contain all functions needed to extract block definition from
 * the block preview data structure.
 * @namespace
 */
BlockDefinitionExtractor = BlockDefinitionExtractor || Object.create(null);

/**
 * Builds a BlockFactory workspace that reflects the block structure of the
 * exmaple block.
 *
 * @param {!Blockly.Block} block The reference block from which the definition
 *     will be extracted.
 * @return {Element} Returns the root workspace DOM <xml> for the block editor
 *     workspace.
 */
BlockDefinitionExtractor.buildBlockFactoryWorkspace = function(block) {
  var workspaceXml = goog.dom.createDom('xml');
  var inline = 'AUTO'; // When block.inputsInlineDefault === undefined
  if (block.inputsInlineDefault === true) {
    inline = 'INT';
  } else if (block.inputsInlineDefault === false) {
    inline = 'EXT';
  }
  var connections = 'NONE';
  if (block.outputConnection) {
    connections = 'LEFT';
  } else {
    if (block.previousConnection && block.nextConnection) {
      connections = 'BOTH';
    } else {
      if (block.previousConnection) {
        connections = 'TOP';
      }
      if (block.nextConnection) {
        connections = 'BOTTOM';
      }
    }
  }
  var this_ = this;
  var factoryBaseXml = BlockDefinitionExtractor.factoryBase_(
      block, connections, block.type, inline);
  workspaceXml.append(factoryBaseXml);

  return workspaceXml;
};

/**
 * Helper function to create a new Element with the provided attributes and
 * inner text.
 *
 * @param {string} name New element tag name.
 * @param {Map<String,String>} opt_attrs Optional list of attributes.
 * @param {string?} opt_text Optional inner text.
 * @return {Element} The newly created element.
 */
BlockDefinitionExtractor.newElement_ = function(name, opt_attrs, opt_text) {
  // Avoid createDom(..)'s attributes argument for being too HTML specific.
  var block1 = goog.dom.createDom(name);
  if (opt_attrs) {
    for (var key in attrs) {
      block1.setAttribute(key, attrs[key]);
    }
  }
  if (opt_text) {
    block1.append(opt_text);
  }
  return block1;
};

/**
 * Creates an connection type constraint <block> Element representing the
 * requested type.
 *
 * @param {string} type Type name of desired connection constraint.
 * @return {Element} The <block> representing the the constraint type.
 * @private
 */
BlockDefinitionExtractor.buildBlockForType_ = function(type) {
  switch (type) {
    case 'Null':
      return BlockDefinitionExtractor.typeNull_();
    case 'Boolean':
      return BlockDefinitionExtractor.typeBoolean_();
    case 'Number':
      return BlockDefinitionExtractor.typeNumber_();
    case 'String':
      return BlockDefinitionExtractor.typeString_();
    case 'Array':
      return BlockDefinitionExtractor.typeList_();
    default:
      return BlockDefinitionExtractor.typeOther_(type);
  }
};

/**
 * Constructs a <block> element representing the type constraints of the
 * provided connection.
 *
 * @param {Blockly.Connection} connection The connection with desired
 *     connection constraints.
 * @return {Element} The root <block> element of the constraint definition.
 * @private
 */
BlockDefinitionExtractor.buildTypeConstraintBlockForConnection_ =
    function(connection)
{
  var typeBlock;
  if (connection.check_) {
    if (connection.check_.length < 1) {
      typeBlock = BlockDefinitionExtractor.typeNullShadow_();
    } else if (connection.check_.length === 1) {
      typeBlock = BlockDefinitionExtractor.buildBlockForType_(connection.check_[0]);
    } else if (connection.check_.length > 1 ) {
      typeBlock = BlockDefinitionExtractor.typeGroup_(connection.check_);
    }
  } else {
    typeBlock = BlockDefinitionExtractor.typeNullShadow_();
  }
  return typeBlock;
};

/**
 * Constructs a sequence <block> elements representing the field definition block
 * @param {Array<Blockly.Field>} fieldRow A list of fields in a Blockly.Input.
 * @return {Element} The fist <block> element of the sequence
 *     (and the root of the constructed DOM).
 * @private
 */
BlockDefinitionExtractor.parseFields_ = function(fieldRow) {
  var firstFieldDefElement = null;
  var lastFieldDefElement = null;

  for (var i = 0; i < fieldRow.length; i++) {
    var field = fieldRow[i];
    var fieldDefElement = null;
    if (field instanceof Blockly.FieldLabel) {
      fieldDefElement = BlockDefinitionExtractor.fieldLabel_(field.text_);
    } else if (field instanceof Blockly.FieldTextInput) {
      fieldDefElement = BlockDefinitionExtractor.fieldInput_(field.name, field.text_);
    } else if (field instanceof Blockly.FieldNumber) {
      fieldDefElement = BlockDefinitionExtractor.fieldNumber_(
          field.name, field.text_, field.min_, field.max_, field.presicion_);
    } else if (field instanceof Blockly.FieldAngle) {
      fieldDefElement = BlockDefinitionExtractor.fieldAngle_(field.name, field.text_);
    } else if (field instanceof Blockly.FieldCheckbox) {
      fieldDefElement = BlockDefinitionExtractor.fieldCheckbox_(field.name, field.state_);
    } else if (field instanceof Blockly.FieldColour) {
      fieldDefElement = BlockDefinitionExtractor.fieldColour_(field.name, field.colour_);
    } else if (field instanceof Blockly.FieldImage) {
      fieldDefElement = BlockDefinitionExtractor.fieldImage_(
          field.src_, field.width_, field.height_, field.text_);
    } else if (field instanceof Blockly.FieldVariable) {
      // FieldVariable must be before FieldDropdown.
      fieldDefElement = BlockDefinitionExtractor.fieldVariable_(field.name, field.text_);
    } else if (field instanceof Blockly.FieldDropdown) {
      fieldDefElement = BlockDefinitionExtractor.fieldDropdown_(field);
    }

    if (lastFieldDefElement) {
      var next = BlockDefinitionExtractor.newElement_('next');
      next.append(fieldDefElement);
      lastFieldDefElement.append(next);
    } else {
      firstFieldDefElement = fieldDefElement;
    }
    lastFieldDefElement = fieldDefElement;
  }

  return firstFieldDefElement;
};

/**
 * Constructs a sequence of <block> elements that represent the inputs of the
 * provided block.
 *
 * @param {Blockly.Block} block The source block to copy the inputs of.
 * @return {Element} The fist <block> element of the sequence
 *     (and the root of the constructed DOM).
 * @private
 */
BlockDefinitionExtractor.parseInputs_ = function(block) {
  var firstInputDefElement = null;
  var lastInputDefElement = null;
  for (var i = 0; i < block.inputList.length; i++) {
    var input = block.inputList[i];
    var align = 'LEFT'; // Left alignment is the default.
    if (input.align || input.align === 0) {
      if (input.align === Blockly.ALIGN_CENTRE) {
        align = 'CENTRE';
      } else if (input.align === Blockly.ALIGN_RIGHT) {
        align = 'RIGHT';
      }
    }

    var inputDefElement = BlockDefinitionExtractor.input_(input, align);
    if (lastInputDefElement) {
      var next = BlockDefinitionExtractor.newElement_('next');
      next.append(inputDefElement);
      lastInputDefElement.append(next);
    } else {
      firstInputDefElement = inputDefElement;
    }
    lastInputDefElement = inputDefElement;
  }
  return firstInputDefElement;
};

/**
 * Creates the root "factory_base" <block> element for the block definition.
 *
 * @param {Blockly.Block} block The example block for the extracted style.
 * @param {string} connections Define block connections. Options: NONE, LEFT,
 *     UP, DOWN, BOTH.
 * @param {string} name Block name.
 * @param {boolean} inline Block layout inline or not.
 * @return {Element} The factory_base block element.
 * @private
 */
BlockDefinitionExtractor.factoryBase_ =
  function(block, connections, name, inline)
{
  BlockDefinitionExtractor.src = {root: block, current: block};
  var factoryBaseEl = BlockDefinitionExtractor.newElement_('block', {type: 'factory_base'});
  factoryBaseEl.append(BlockDefinitionExtractor.newElement_('mutation', {connections: connections}));
  factoryBaseEl.append(BlockDefinitionExtractor.newElement_('field', {name: 'NAME'}, name));
  factoryBaseEl.append(BlockDefinitionExtractor.newElement_('field', {name: 'INLINE'}, inline));
  factoryBaseEl.append(
      BlockDefinitionExtractor.newElement_('field', {name: 'CONNECTIONS'}, connections));

  var inputsStatement = BlockDefinitionExtractor.newElement_('statement', {name: 'INPUTS'});
  inputsStatement.append(BlockDefinitionExtractor.parseInputs_(block));
  factoryBaseEl.append(inputsStatement);

  var tooltipValue = BlockDefinitionExtractor.newElement_('value', {name: 'TOOLTIP'});
  tooltipValue.append(BlockDefinitionExtractor.text_(block.tooltip));
  factoryBaseEl.append(tooltipValue);

  var helpUrlValue = BlockDefinitionExtractor.newElement_('value', {name: 'HELPURL'});
  helpUrlValue.append(BlockDefinitionExtractor.text_(block.helpUrl));
  factoryBaseEl.append(helpUrlValue);

  if (connections === 'LEFT') {
    var inputValue = BlockDefinitionExtractor.newElement_('value', {name: 'OUTPUTTYPE'});
    inputValue.append(BlockDefinitionExtractor.buildTypeConstraintBlockForConnection_(
        block.outputConnection));
    factoryBaseEl.append(inputValue);
  } else {
    if (connections === 'UP' || connections === 'BOTH') {
      var inputValue = BlockDefinitionExtractor.newElement_('value', {name: 'TOPTYPE'});
      inputValue.append(BlockDefinitionExtractor.buildTypeConstraintBlockForConnection_(
          block.previousConnection));
      factoryBaseEl.append(inputValue);
    }
    if (connections === 'DOWN' || connections === 'BOTH') {
      var inputValue = BlockDefinitionExtractor.newElement_('value', {name: 'BOTTOMTYPE'});
      inputValue.append(BlockDefinitionExtractor.buildTypeConstraintBlockForConnection_(
          block.nextConnection));
      factoryBaseEl.append(inputValue);
    }
  }

  // Convert colour_ to hue value 0-360 degrees
  // TODO(#1247): Solve off-by-one errors.
  // TODO: Deal with colors that don't map to standard hues. (Needs improved block definitions.)
  var colour_hue = Math.floor(
      goog.color.hexToHsv(block.colour_)[0]);  // This is off by one... sometimes
  var colourBlock = BlockDefinitionExtractor.colourBlockFromHue_(colour_hue);
  var colourInputValue = BlockDefinitionExtractor.newElement_('value', {name: 'COLOUR'});
  colourInputValue.append(colourBlock);
  factoryBaseEl.append(colourInputValue);
  return factoryBaseEl;
};

/**
 * Creates a <block> element representing a block input.
 *
 * @param {Blockly.Input} input The input object.
 * @param {string} align Can be left, right or centre.
 * @return {Element} The <block> element that defines the input.
 * @private
 */
BlockDefinitionExtractor.input_ = function(input, align) {
  var inputTypeAttr = (input.type === Blockly.INPUT_VALUE) ? 'input_value' :
      (input.type === Blockly.INPUT_STATEMENT) ? 'input_statement' :
      /* input.type === Blockly.INPUT_DUMMY */ 'input_dummy';
  var inputDefBlock = BlockDefinitionExtractor.newElement_('block', {type: inputTypeAttr});

  if (input.type != Blockly.DUMMY_INPUT) {
    inputDefBlock.append(
        BlockDefinitionExtractor.newElement_('field', {name: 'INPUTNAME'}, input.name));
  }
  inputDefBlock.append(BlockDefinitionExtractor.newElement_('field', {name: 'ALIGN'}, align));

  var fieldsDef = BlockDefinitionExtractor.newElement_('statement', {name: 'FIELDS'});
  var fieldsXml = BlockDefinitionExtractor.parseFields_(input.fieldRow);
  fieldsDef.append(fieldsXml);
  inputDefBlock.append(fieldsDef);

  if (input.type != Blockly.DUMMY_INPUT) {
    var typeValue = BlockDefinitionExtractor.newElement_('value', {name: 'TYPE'});
    typeValue.append(BlockDefinitionExtractor.buildTypeConstraintBlockForConnection_(input.connection));
    inputDefBlock.append(typeValue);
  }

  return inputDefBlock;
};

/**
 * Creates a <block> element representing a FieldLabel definition.
 * @param {string} text
 * @return {Element} The XML for FieldLabel definition.
 * @private
 */
BlockDefinitionExtractor.fieldLabel_ = function(text) {
  var fieldBlock = BlockDefinitionExtractor.newElement_('block', {type: 'field_static'});
  fieldBlock.append(BlockDefinitionExtractor.newElement_('field', {name: 'TEXT'}, text));
  return fieldBlock;
};

/**
 * Creates a <block> element representing a FieldInput (text input) definition.
 *
 * @param {string} fieldName The identifying name of the field.
 * @param {string} text The default text string.
 * @return {Element} The XML for FieldInput definition.
 * @private
 */
BlockDefinitionExtractor.fieldInput_ = function(fieldName, text) {
  var fieldInput = BlockDefinitionExtractor.newElement_('block', {type: 'field_input'});
  fieldInput.append(BlockDefinitionExtractor.newElement_('field', {name: 'TEXT'}, text));
  fieldInput.append(BlockDefinitionExtractor.newElement_('field', {name: 'FIELDNAME'}, fieldName));
  return fieldInput;
};

/**
 * Creates a <block> element representing a FieldNumber definition.
 *
 * @param {string} fieldName The identifying name of the field.
 * @param {number} value The field's default value.
 * @param {number} min The minimum allowed value, or negative infinity.
 * @param {number} max The maximum allowed value, or positive infinity.
 * @param {number} precision The precision allowed for the number.
 * @return {Element} The XML for FieldNumber definition.
 * @private
 */
BlockDefinitionExtractor.fieldNumber_ =
  function(fieldName, value, min, max, precision)
{
  var fieldNumber = BlockDefinitionExtractor.newElement_('block', {type: 'field_number'});
  fieldNumber.append(BlockDefinitionExtractor.newElement_('field', {name: 'VALUE'}, value));
  fieldNumber.append(BlockDefinitionExtractor.newElement_('field', {name: 'FIELDNAME'}, fieldName));
  fieldNumber.append(BlockDefinitionExtractor.newElement_('field', {name: 'MIN'}, min));
  fieldNumber.append(BlockDefinitionExtractor.newElement_('field', {name: 'MAX'}, max));
  fieldNumber.append(BlockDefinitionExtractor.newElement_('field', {name: 'PRECISION'}, precision));
  return fieldNumber;
};

/**
 * Creates a <block> element representing a FieldAngle definition.
 *
 * @param {string} fieldName The identifying name of the field.
 * @param {number} angle The field's default value.
 * @return {Element} The XML for FieldAngle definition.
 * @private
 */
BlockDefinitionExtractor.fieldAngle_ = function(angle, fieldName) {
  var fieldAngle = BlockDefinitionExtractor.newElement_('block', {type: 'field_angle'});
  fieldAngle.append(BlockDefinitionExtractor.newElement_('field', {name: 'ANGLE'}, angle));
  fieldAngle.append(BlockDefinitionExtractor.newElement_('field', {name: 'FIELDNAME'}, fieldName));
  return fieldAngle;
};

/**
 * Creates a <block> element representing a FieldDropdown definition.
 *
 * @param {Blockly.FieldDropdown} dropdown
 * @return {Element} The <block> XML representing a similar FieldDropdown definition.
 * @private
 */
BlockDefinitionExtractor.fieldDropdown_ = function(dropdown) {
  var menuGenerator = dropdown.menuGenerator_;
  if (typeof menuGenerator === 'function') {
    var options = menuGenerator();
  } else if (goog.isArray(menuGenerator)) {
    var options = menuGenerator;
  } else {
    throw new Error('Unrecognized type of menuGenerator: ' + menuGenerator);
  }

  var fieldDropdown = BlockDefinitionExtractor.newElement_('block', {type: 'field_dropdown'});
  var optionsStr = '[';

  var mutation = BlockDefinitionExtractor.newElement_('mutation');
  fieldDropdown.append(mutation);
  fieldDropdown.append(BlockDefinitionExtractor.newElement_('field', {name: 'FIELDNAME'}, dropdown.name));
  for (var i=0; i<options.length; i++) {
    var option = options[i];
    if (typeof option[0] === "string") {
      optionsStr += '"text",'
      fieldDropdown.append(BlockDefinitionExtractor.newElement_('field', {name: 'USER'+i}, option[0]));
    } else {
      optionsStr += '"image",';
      fieldDropdown.append(
          BlockDefinitionExtractor.newElement_('field', {name: 'SRC'+i}, option[0].src));
      fieldDropdown.append(
          BlockDefinitionExtractor.newElement_('field', {name: 'WIDTH'+i}, option[0].width));
      fieldDropdown.append(
          BlockDefinitionExtractor.newElement_('field', {name: 'HEIGHT'+i}, option[0].height));
      fieldDropdown.append(
          BlockDefinitionExtractor.newElement_('field', {name: 'ALT'+i}, option[0].alt));
    }
    fieldDropdown.append(BlockDefinitionExtractor.newElement_('field', {name: 'CPU'+i}, option[1]));
  }
  optionsStr = optionsStr.slice(0,-1); // Drop last comma
  optionsStr += ']';
  mutation.setAttribute('options', optionsStr);

  return fieldDropdown;
};

/**
 * Creates a <block> element representing a FieldCheckbox definition.
 *
 * @param {string} fieldName The identifying name of the field.
 * @param {string} checked The field's default value, true or false.
 * @return {Element} The XML for FieldCheckbox definition.
 * @private
 */
BlockDefinitionExtractor.fieldCheckbox_ =
  function(fieldName, checked)
{
  var fieldCheckbox = BlockDefinitionExtractor.newElement_('block', {type: 'field_checkbox'});
  fieldCheckbox.append(BlockDefinitionExtractor.newElement_('field', {name: 'CHECKED'}, checked));
  fieldCheckbox.append(
    BlockDefinitionExtractor.newElement_('field', {name: 'FIELDNAME'}, fieldName));
  return fieldCheckbox;
};

/**
 * Creates a <block> element representing a FieldColour definition.
 *
 * @param {string} fieldName The identifying name of the field.
 * @param {string} colour The field's default value as a string.
 * @return {Element} The XML for FieldColour definition.
 * @private
 */
BlockDefinitionExtractor.fieldColour_ =
    function(fieldName, colour)
{
  var fieldColour = BlockDefinitionExtractor.newElement_('block', {type: 'field_colour'});
  fieldColour.append(BlockDefinitionExtractor.newElement_('field', {name: 'COLOUR'}, colour));
  fieldColour.append(
    BlockDefinitionExtractor.newElement_('field', {name: 'FIELDNAME'}, fieldName));
  return fieldColour;
};

/**
 * Creates a <block> element representing a FieldVaraible definition.
 *
 * @param {string} fieldName The identifying name of the field.
 * @param {string} varName The variables
 * @return {Element} The <block> element representing the FieldVariable.
 * @private
 */
BlockDefinitionExtractor.fieldVariable_ = function(fieldName, varName) {
  var fieldVar = BlockDefinitionExtractor.newElement_(
      'block', {type: 'field_variable'});
  fieldVar.append(BlockDefinitionExtractor.newElement_(
      'field', {name: 'FIELDNAME'}, fieldName));
  fieldVar.append(BlockDefinitionExtractor.newElement_(
      'field', {name: 'TEXT'}, varName));
  return fieldVar;
};

/**
 * Creates a <block> element representing a FieldImage definition.
 *
 * @param {string} src The URL of the field image.
 * @param {number} width The pixel width of the source image
 * @param {number} height The pixel height of the source image.
 * @param {string} alt Alterante text to describe image.
 * @private
 */
BlockDefinitionExtractor.fieldImage_ =
  function(src, width, height, alt)
{
  var block1 = BlockDefinitionExtractor.newElement_('block', {type: 'field_image'});
  block1.append(BlockDefinitionExtractor.newElement_('field', {name: 'SRC'}, src));
  block1.append(BlockDefinitionExtractor.newElement_('field', {name: 'WIDTH'}, width));
  block1.append(BlockDefinitionExtractor.newElement_('field', {name: 'HEIGHT'}, height));
  block1.append(BlockDefinitionExtractor.newElement_('field', {name: 'ALT'}, alt));
};

/**
 * Creates a <block> element a group of allowed connection constraint types.
 *
 * @param {Array<string>} types List of type names in this group.
 * @return {Element} The <block> element representing the group, with child
 *     types attached.
 * @private
 */
BlockDefinitionExtractor.typeGroup_ = function(types) {
  var typeGroupBlock = BlockDefinitionExtractor.newElement_('block', {type: 'type_group'});
  typeGroupBlock.append(BlockDefinitionExtractor.newElement_('mutation', {types:types.length}));
  for (var i=0; i<types.length; i++) {
    var typeBlock = BlockDefinitionExtractor.buildBlockForType_(types[i]);
    var valueBlock = BlockDefinitionExtractor.newElement_('value', {name:'TYPE'+i});
    valueBlock.append(typeBlock);
    typeGroupBlock.append(valueBlock);
  }
  return typeGroupBlock;
};

/**
 * Creates a <shadow> block element representing the default null connection
 * constraint.
 * @return {Element} The <block> element representing the "null" type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeNullShadow_ = function() {
  return BlockDefinitionExtractor.newElement_('shadow', {type: 'type_null'});
};

/**
 * Creates a <block> element representing null in a connection constraint.
 * @return {Element} The <block> element representing the "null" type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeNull_ = function() {
  return BlockDefinitionExtractor.newElement_('block', {type: 'type_null'});
};

/**
 * Creates a <block> element representing the a boolean in a connection
 * constraint.
 * @return {Element} The <block> element representing the "boolean" type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeBoolean_ = function() {
  return BlockDefinitionExtractor.newElement_('block', {type: 'type_boolean'});
};

/**
 * Creates a <block> element representing the a number in a connection
 * constraint.
 * @return {Element} The <block> element representing the "number" type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeNumber_ = function() {
  return BlockDefinitionExtractor.newElement_('block', {type: 'type_number'});
};

/**
 * Creates a <block> element representing the a string in a connection
 * constraint.
 * @return {Element} The <block> element representing the "string" type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeString_ = function() {
  return BlockDefinitionExtractor.newElement_('block', {type: 'type_string'});
};

/**
 * Creates a <block> element representing the a list in a connection
 * constraint.
 * @return {Element} The <block> element representing the "list" type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeList_ = function() {
  return BlockDefinitionExtractor.newElement_('block', {type: 'type_list'});
};

/**
 * Creates a <block> element representing the given custom connection
 * constraint type name.
 *
 * @param {string} type The connection constratin type name.
 * @return {Element} The <block> element representing a custom input type
 *     constraint.
 * @private
 */
BlockDefinitionExtractor.typeOther_ = function(type) {
  var block = BlockDefinitionExtractor.newElement_(
      'block', {type: 'type_other'});
  block.append(BlockDefinitionExtractor.newElement_('field', {name: 'TYPE'}, type));
  return block;
};

/**
 * Creates a block Element for the color_hue block, with the given hue.
 * @param hue {number} The hue value, from 0 to 360.
 * @return {Element} The <block> Element representing a colour_hue block
 *     with the given hue.
 * @private
 */
BlockDefinitionExtractor.colourBlockFromHue_ = function(hue) {
  var colourBlock = BlockDefinitionExtractor.newElement_(
      'block', {type: 'colour_hue'});
  colourBlock.append(BlockDefinitionExtractor.newElement_('mutation', {
    colour: Blockly.hueToRgb(hue)
  }));
  colourBlock.append(BlockDefinitionExtractor.newElement_(
      'field', {name: 'HUE'}, hue.toString()));
  return colourBlock;
};

/**
 * Creates a block Element for a text block with the given text.
 *
 * @param text {string} The text value of the block.
 * @return {Element} The <block> element representing a "text" block.
 * @private
 */
BlockDefinitionExtractor.text_ = function(text) {
  var textBlock =
      BlockDefinitionExtractor.newElement_('block', {type: 'text'});
  if (text) {
    textBlock.append(BlockDefinitionExtractor.newElement_(
      'field', {name: 'TEXT'}, text));
  } // Else, use empty string default.
  return textBlock;
};