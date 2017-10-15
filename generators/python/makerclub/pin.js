/**
 * @license Licensed under the Apache License, Version 2.0 (the "License"):
 *          http://www.apache.org/licenses/LICENSE-2.0
 */

/**
 * @fileoverview Python code generator for the Servo library blocks.
 *     The Python Servo library docs: http://arduino.cc/en/reference/servo
 *
 * TODO: If angle selector added to blocks edit code here.
 */
'use strict';

goog.provide('Blockly.Python.pin');

goog.require('Blockly.Python');

Blockly.Python['pin_on'] = function(block) {
  var pin = JSON.parse(block.getFieldValue('PIN_NAME'));

  // Blockly.Python.addObject({
  //   class: 'Pin',
  //   name: pin.instanceName,
  //   parameters : [
  //     pin.codePinName
  //   ]
  // });

  var code = `${ pin.instanceName }.on();\n`;
  return code;
};

Blockly.Python['pin_off'] = function(block) {
  var pin = JSON.parse(block.getFieldValue('PIN_NAME'));

  // Blockly.Python.addObject({
  //   class: 'Pin',
  //   name: pin.instanceName,
  //   parameters : [
  //     pin.codePinName
  //   ]
  // });

  var code = `${ pin.instanceName }.off();\n`;
  return code;
};

Blockly.Python['pin_digital_read'] = function(block) {
  var pin = JSON.parse(block.getFieldValue('PIN_NAME'));

  // Blockly.Python.addObject({
  //   class: 'MCInputPin',
  //   name: pin.instanceName,
  //   parameters : [
  //     pin.codePinName
  //   ]
  // });

  var code = `${ pin.instanceName }.digitalRead()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};

Blockly.Python['pin_analog_read'] = function(block) {
  var pin = JSON.parse(block.getFieldValue('PIN_NAME'));

  // Blockly.Python.addObject({
  //   class: 'MCInputPin',
  //   name: pin.instanceName,
  //   parameters : [
  //     pin.codePinName
  //   ]
  // });

  var code = `${ pin.instanceName }.read()`;
  return [code, Blockly.Python.ORDER_ATOMIC];
};
