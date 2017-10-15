'use strict';

goog.require('Blockly.Blocks');


/** Common HSV hue for all blocks in this category. */
Blockly.Blocks.procedures.HUE = 290;


Blockly.Blocks['functions_start'] = {
  init: function() {
    this.appendStatementInput("SETUP")
        .appendField("setup");
    this.appendStatementInput("LOOP")
        .appendField("loop");
    this.setColour(Blockly.Blocks.procedures.HUE);
    this.setHelpUrl('https://makerclub.org/examples');
    this.setTooltip(Blockly.Msg.ARD_FUN_RUN_TIP);
    this.contextMenu = false;
  },
  /** @return {!boolean} True if the block instance is in the workspace. */
  getArduinoLoopsInstance: function() {
    return true;
  }
};

Blockly.Blocks['functions_delay'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("delay");
    this.appendValueInput("DELAY")
        .setCheck("Number")
        .appendField("millisecs");
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setColour(Blockly.Blocks.procedures.HUE);
    this.setTooltip('');
    this.setHelpUrl('http://www.example.com/');
  }
};
