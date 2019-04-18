'use strict';

goog.provide('Blockly.JavaScript.create-generators');

goog.require('Blockly.JavaScript');


if (Blockly.mcGeneratorsToCreateJavaScript) {
  for (var key in Blockly.mcGeneratorsToCreateJavaScript) {
    if (!Blockly.mcGeneratorsToCreateJavaScript.hasOwnProperty(key)) {
      continue
    }
    Blockly.JavaScript[key] = Blockly.mcGeneratorsToCreateJavaScript[key];
  }
  Blockly.mcGeneratorsToCreateJavaScript = {};
}
