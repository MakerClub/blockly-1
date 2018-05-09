/*
 * Copyright (c) 2016, MakerClub, Simon Riley
 *
 * MAKERCLUB CONFIDENTIAL
 * __________________
 *
 *  [2014] - [2016] MakerClub Ltd
 *  All Rights Reserved.
 *
 * NOTICE:  All information contained herein is, and remains
 * the property of MakerClub Ltd and its suppliers,
 * if any.  The intellectual and technical concepts contained
 * herein are proprietary to MakerClub Ltd
 * and its suppliers and may be covered by U.S. and Foreign Patents,
 * patents in process, and are protected by trade secret or copyright law.
 * Dissemination of this information or reproduction of this material
 * is strictly forbidden unless prior written permission is obtained
 * from MakerClub Ltd.
 */

/**
 * @fileoverview C blocks for MakerClub blockly.
 * @author simon@makerclub.org (Simon Riley)
 */
'use strict';

goog.provide('Blockly.Blocks.audio');
goog.provide('Blockly.Constants.Audio');

goog.require('Blockly.Blocks');
goog.require('Blockly');

goog.require('Blockly.Blocks.mcCreateBlocklyBlock');

/**
 * Common HSV hue for all blocks in this category.
 */
Blockly.Blocks.audio.HUE = 260;


mcCreateBlocklyBlock({
  "type": "play_audio",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "audio_path",
      "label": "Play sound",
      "type": "dropdown",
      "options": function() {
          let files = Backbone.Radio.channel("blockly").request("audioFiles");
          if (files.length === 0) {
              return [["Choose a sound", "mcNullSelection"]];
          }
          let ret = [];
          for (let iii = 0; iii < files.length; iii++) {
              let file = files[iii];
              ret.push([file.original.name, file.processed.name]);
          }
          return ret;
      },
    }
  ],
  "generator": "play_audio(\"{{audio_path}}\")\n",
});

mcCreateBlocklyBlock({
  "type": "play_tone",
  "colour": "%{BKY_LOGIC_HUE}",
  "fields": [
    {
      "name": "audio_frequency",
      "label": "Play tone ",
      "type": "dropdown",
      "options": [
          /*["1 (A)", "28"],
          ["3 (B)", "31"],
          ["4 (C)", "33"],
          ["6 (D)", "37"],
          ["8 (E)", "41"],
          ["9 (F)", "44"],
          ["11 (G)", "49"],
          ["13 (A)", "55"],*/
          ["15 (B)", "62"],
          ["16 (C)", "65"],
          ["18 (D)", "73"],
          ["20 (E)", "82"],
          ["21 (F)", "87"],
          ["23 (G)", "98"],
          ["25 (A)", "110"],
          ["27 (B)", "123"],
          ["28 (C)", "131"],
          ["30 (D)", "131"],
          ["32 (E)", "165"],
          ["33 (F)", "175"],
          ["35 (G)", "196"],
      ],
    },
    {
      "name": "audio_time",
      "label": " for (s) ",
      "type": "input_value",
      "check": "Number",
    },
  ],
  "generator": "play_sawtooth_wave({{audio_frequency}}, {{audio_time}})\n",
});
