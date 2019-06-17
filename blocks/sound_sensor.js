'use strict';

goog.provide('Blockly.Blocks.sound_sensor');
goog.provide('Blockly.Constants.sound_sensor');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

mcCreateBlocklyBlock({
  "type": "sound_sensor_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "sound_sensor_variable",
      "label": "Set Sound Sensor ",
      "type": "object_dropdown",
      "object": "sound_sensor", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "sound_sensor_number",
      "label": " to ",
      "type": "dropdown",
      "options": [
        ["1", "1"],
        ["2", "2"],
        ["3", "3"],
        ["4", "4"],
        ["5", "5"],
        ["6", "6"],
        ["7", "7"],
        ["8", "8"],
        ["9", "9"],
        ["10", "10"],
      ],
    }
  ],
  "generator": "try:\n" +
               "  {{sound_sensor_variable}}\n" +
               "  ___exists = True\n" +
               "except NameError:\n" +
               "  ___exists = False\n" +
               "if ___exists == False or not isinstance({{sound_sensor_variable}}, SoundSensor):\n" +
               "  {{sound_sensor_variable}} = SoundSensor({{sound_sensor_number}})\n" +
               "del ___exists\n"
});

mcCreateBlocklyBlock({
  "type": "sound_sensor_on_sound",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "sound_sensor_variable",
      "label": "Sound Sensor ",
      "type": "object_dropdown",
      "object": "sound_sensor", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "sound_sensor_function",
      "label": "on ",
      "type": "dropdown",
      "options": [
        ["loud", "on_loud"],
        ["quiet", "on_quiet"],
      ],
    },
    {
      "name": "sound_sensor_callback",
      "label": " ",
      "type": "function_dropdown",
    },
  ],
  "generator": "try:\n" +
               "  {{sound_sensor_variable}}\n" +
               "  ___exists = True\n" +
               "except NameError:\n" +
               "  ___exists = False\n" +
               "try:\n" +
               "  {{sound_sensor_callback}}\n" +
               "  ___cb_exists = True\n" +
               "except NameError:\n" +
               "  ___cb_exists = False\n" +
               "if ___exists and isinstance({{sound_sensor_variable}}, SoundSensor) and ___cb_exists:\n" +
               "  {{sound_sensor_variable}}.{{sound_sensor_function}}({{sound_sensor_callback}})\n" +
               "del ___exists\n" +
               "del ___cb_exists\n"
});

mcCreateBlocklyBlock({
  "type": "sound_sensor_read",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [
    {
      "name": "sound_sensor_variable",
      "label": "Sound Sensor %1 digital read",
      "type": "object_dropdown",
      "object": "sound_sensor", //Used with object_dropdown (required if object_dropdown)
    }
  ],
  "generator": "({{sound_sensor_variable}}.read() if ('{{sound_sensor_variable}}' in globals() and isinstance({{sound_sensor_variable}}, SoundSensor)) else 0)"
});
