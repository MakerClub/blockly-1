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
 * @fileoverview Generating C for MakerClub blocks.
 * @author simon@makerclub.org (Simon Riley)
 */
'use strict';

goog.provide('Blockly.Python.servo');
goog.require('Blockly.Python');

if (Blockly.mcGeneratorsToCreate) {
  for (var key in Blockly.mcGeneratorsToCreate) {
    if (!Blockly.mcGeneratorsToCreate.hasOwnProperty(key)) {
      continue
    }
    Blockly.Python[key] = Blockly.mcGeneratorsToCreate[key];
  }
  Blockly.mcGeneratorsToCreate = {};
}
