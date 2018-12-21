'use strict';

goog.provide('Blockly.Blocks.distance_sensor');
goog.provide('Blockly.Constants.Distance_sensor');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');


mcCreateBlocklyBlock({
  "type": "distance_sensor_constructor",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "distance_sensor_variable",
      "label": "Set Distance Sensor ",
      "type": "object_dropdown",
      "object": "distance_sensor", //Used with object_dropdown (required if object_dropdown)
    },
    {
      "name": "distance_sensor_trig_number",
      "label": " trigger ",
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
    },
    {
      "name": "distance_sensor_echo_number",
      "label": " echo ",
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
  "generator": "{{distance_sensor_variable}} = DistanceSensor({{distance_sensor_trig_number}}, {{distance_sensor_echo_number}})\n"
});

mcCreateBlocklyBlock({
  "type": "distance_sensor_measure",
  "colour": "%{BKY_LOGIC_HUE}",
  "output": "Number",
  "fields": [
    {
      "name": "distance_sensor_variable",
      "label": "Distance Sensor %1 measure",
      "type": "object_dropdown",
      "object": "distance_sensor",
    }
  ],

  "generator": "({{distance_sensor_variable}}.measure() if ('{{distance_sensor_variable}}' in globals() and isinstance({{distance_sensor_variable}}, DistanceSensor)) else 4000)"
});
