/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FoodSupplyChainContract extends Contract {
    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const products = [
            {
                name: 'Apple',
                quantity: 100,
                price: 30,
                location: {
                    lat: 19.50,
                    lng: 72.00
                }
            },
            {
                name: 'Honey',
                quantity: 500,
                price: 350,
                location: {
                    lat: 20.00,
                    lng: -30.00
                }
            },
            {
                name: 'Jam',
                quantity: 1000,
                price: 60,
                location: {
                    lat: 50.00,
                    lng: 10.10
                }
            }
        ];

        for (let i = 0; i < products.length; i++) {
            products[i].docType = 'Product';
            await ctx.stub.putState('Product ' + i + 1, Buffer.from(JSON.stringify(products[i])));
            console.info('Added <--> ', products[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async createProduct(ctx, productName, id, quantity, price, location) {
        console.info('============= Start : Create Product ===========');
        console.log(productName);
        const product = {
            name: productName,
            id,
            quantity,
            price,
            location
        };
        console.log(product, 'in product 60');
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));

        console.info('============= END : Create Product ===========');

        return `Product with ${id} created successfully`;
    }
}

module.exports = FoodSupplyChainContract;
