/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const assetTransfer = require('./lib/assetTransfer');
const foodContract = require('./lib/foodContract');

module.exports.AssetTransfer = assetTransfer;
module.exports.foodContract = foodContract;
module.exports.contracts = [foodContract];

