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

goog.provide('Blockly.Python.led');

goog.require('Blockly.Python');

Blockly.Python['led_on'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var instanceName = "led" + pin;

  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.on();\n`;
  return code;
};

Blockly.Python['led_off'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var instanceName = "led" + pin;

  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.off();\n`;
  return code;
};

Blockly.Python['led_toggle'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var instanceName = "led" + pin;

  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.toggle();\n`;
  return code;
};

Blockly.Python['led_set_brightness'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || 255;
  var instanceName = "led" + pin;

  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.setBrightness(${ brightness });\n`;
  return code;
};

Blockly.Python['led_fade_on'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || 1000;
  var instanceName = "led" + pin;
  //
  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.fadeOn(${ duration });\n`;
  return code;
};

Blockly.Python['led_fade_off'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || 1000;
  var instanceName = "led" + pin;

  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.fadeOff(${ duration });\n`;
  return code;
};

Blockly.Python['led_fade'] = function(block) {
  var pin = block.getFieldValue('PIN_NUM');
  var brightness = Blockly.Python.valueToCode(block, 'BRIGHTNESS', Blockly.Python.ORDER_ATOMIC) || 255;
  var duration = Blockly.Python.valueToCode(block, 'DURATION', Blockly.Python.ORDER_ATOMIC) || 1000;
  var instanceName = "led" + pin;

  // Blockly.Python.addObject({
  //   class: 'LED',
  //   name: instanceName,
  //   parameters : [
  //     pin
  //   ]
  // });

  var code = `${ instanceName }.fade(${ brightness}, ${ duration });\n`;
  return code;
};
