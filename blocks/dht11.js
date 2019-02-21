/**
 * @license
 * Visual Blocks Editor
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
 * @fileoverview Servo blocks for Blockly.
 *
 * This file is scraped to extract a .json file of block definitions. The array
 * passed to defineBlocksWithJsonArray(..) must be strict JSON: double quotes
 * only, no outside references, no functions, no trailing commas, etc. The one
 * exception is end-of-line comments, which the scraper will remove.
 * @author q.neutron@gmail.com (Quynh Neutron)
 */
'use strict';

goog.provide('Blockly.Blocks.dht11');
goog.provide('Blockly.Constants.Dht11');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 * Should be the same as Blockly.Msg.LOGIC_HUE.
 * @readonly
 */
Blockly.Constants.Dht11.HUE = 210;

mcCreateBlocklyBlock({
	"type": "dht11_constructor",
	"colour": "%{BKY_LOGIC_HUE}",
	"fields": [{
			"name": "dht11_variable",
			"label": "Set Temp/Humidity Sensor ",
			"type": "object_dropdown",
			"object": "dht11", //Used with object_dropdown (required if object_dropdown)
			"prettyObjectName": "Sensor",
		},
		{
			"name": "dht11_number",
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
	"generator": "{{dht11_variable}} = Dht11({{dht11_number}})\n",
});

mcCreateBlocklyBlock({
	"type": "dht11_read_temperature",
	"colour": "%{BKY_LOGIC_HUE}",
	"output": "Number",
	"fields": [{
		"name": "dht11_variable",
		"label": "Temp/Humidity Sensor %1 read temperature",
		"type": "object_dropdown",
		"object": "dht11",
		"prettyObjectName": "Sensor",
	}],
	"generator": "({{dht11_variable}}.temperature if ('{{dht11_variable}}' in globals() and isinstance({{dht11_variable}}, Dht11)) else -1)"
});

mcCreateBlocklyBlock({
	"type": "dht11_read_humidity",
	"colour": "%{BKY_LOGIC_HUE}",
	"output": "Number",
	"fields": [{
		"name": "dht11_variable",
		"label": "Temp/Humidity Sensor %1 read humidity",
		"type": "object_dropdown",
		"object": "dht11",
		"prettyObjectName": "Sensor",
	}],
	"generator": "({{dht11_variable}}.humidity if ('{{dht11_variable}}' in globals() and isinstance({{dht11_variable}}, Dht11)) else -1)"
});
