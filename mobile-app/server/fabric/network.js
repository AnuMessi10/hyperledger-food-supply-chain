/*
 * Copyright IBM Corp. All Rights Reserved.
 *
 * SPDX-License-Identifier: Apache-2.0
 */
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var fabric_network_1 = require("fabric-network");
var fs_1 = require("fs");
var path_1 = require("path");
function connectToNetwork(req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        var ccpPath, ccp, walletPath, wallet, identity, gateway, network_1, contract, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 5, , 6]);
                    ccpPath = (0, path_1.resolve)(__dirname, "..", "..", "..", "network", "test-network", "organizations", "peerOrganizations", "org1.example.com", "connection-org1.json");
                    ccp = JSON.parse((0, fs_1.readFileSync)(ccpPath, "utf8"));
                    walletPath = (0, path_1.join)(process.cwd(), "fabric/wallet");
                    console.log(process.cwd());
                    return [4 /*yield*/, fabric_network_1.Wallets.newFileSystemWallet(walletPath)];
                case 1:
                    wallet = _a.sent();
                    console.log("Wallet path: ".concat(walletPath));
                    return [4 /*yield*/, wallet.get("appUser")];
                case 2:
                    identity = _a.sent();
                    if (!identity) {
                        console.log('An identity for the user "appUser" does not exist in the wallet');
                        console.log("Run the registerUser.js application before retrying");
                        return [2 /*return*/];
                    }
                    gateway = new fabric_network_1.Gateway();
                    return [4 /*yield*/, gateway.connect(ccp, {
                            wallet: wallet,
                            identity: "appUser",
                            discovery: { enabled: true, asLocalhost: true },
                        })];
                case 3:
                    _a.sent();
                    return [4 /*yield*/, gateway.getNetwork("mychannel")];
                case 4:
                    network_1 = _a.sent();
                    contract = network_1.getContract("basic");
                    // // Disconnect from the gateway.
                    // await gateway.disconnect();
                    req.body.contract = contract;
                    next();
                    return [3 /*break*/, 6];
                case 5:
                    error_1 = _a.sent();
                    console.error("Failed to submit your requested transaction: ".concat(error_1));
                    process.exit(1);
                    return [3 /*break*/, 6];
                case 6: return [2 /*return*/];
            }
        });
    });
}
// connectToNetwork();
var network = { connectToNetwork: connectToNetwork };
exports.default = network;
