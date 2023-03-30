/*
 * SPDX-License-Identifier: Apache-2.0
 */

import { Context, Contract } from "fabric-contract-api";
import { Product } from "./Models/product";

export class FoodContract extends Contract {
    async initLedger(ctx: Context) {
        console.info("============= START : Initialize Ledger ===========");
        const products: {
            name: Product["name"];
            price: Product["price"];
            quantity: Product["quantity"];
            location: Product["location"];
            docType?: Product["docType"];
        }[] = [
            {
                name: "Apple",
                quantity: "100",
                price: 30,
                location: {
                    lat: 19.5,
                    lng: 72.0,
                },
            },
            {
                name: "Honey",
                quantity: "500",
                price: 350,
                location: {
                    lat: 20.0,
                    lng: -30.0,
                },
            },
            {
                name: "Jam",
                quantity: "1000",
                price: 60,
                location: {
                    lat: 50.0,
                    lng: 10.1,
                },
            },
        ];

        for (let i = 0; i < products.length; i++) {
            products[i].docType = "Product";
            await ctx.stub.putState(
                "Product " + `${i + 1}`,
                Buffer.from(JSON.stringify(products[i]))
            );
            console.info("Added <--> ", products[i]);
        }
        console.info("============= END : Initialize Ledger ===========");
    }

    async createProduct(
        ctx: Context,
        productName,
        id,
        quantity,
        price,
        location
    ) {
        console.info("============= Start : Create Product ===========");
        const product = {
            name: productName,
            id,
            quantity,
            price,
            location: Buffer.from(JSON.stringify(location)).toString('base64'),
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));

        console.info("============= END : Create Product ===========");

        return `Product with ${id} created successfully`;
    }
}
