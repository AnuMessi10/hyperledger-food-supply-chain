/*
 * SPDX-License-Identifier: Apache-2.0
 */

import {
    Context,
    Contract,
    Transaction,
    Returns,
    Info,
} from "fabric-contract-api";
import { Product } from "./Models/product";
import sortKeysRecursive from "sort-keys-recursive";
// import stringify from 'json-stringify-deterministic';
const stringify = require('json-stringify-deterministic');

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
            location: Buffer.from(JSON.stringify(location)).toString("base64"),
        };
        await ctx.stub.putState(id, Buffer.from(JSON.stringify(product)));

        console.info("============= END : Create Product ===========");

        return `Product with ${id} created successfully`;
    }

    async getProduct(ctx: Context, id: Product["id"]) {
        console.info("============= END : Get Product ===========");

        const productAsBytes = await ctx.stub.getState(id);

        if (!productAsBytes || productAsBytes.length === 0) {
            throw new Error(`Product with ${id} does not exist`);
        }

        const response = productAsBytes.toString();

        console.info("============= END : Get Product ===========");

        return response;
    }

    // async updateProduct(ctx: Context, id: Product["id"]) {
    //     const car: Car = JSON.parse(this.getProduct(id));
    //     car.owner = newOwner;
    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    // }

    // ReadProduct returns the food stored in the world state with given id.
    @Transaction(false)
    public async ReadProduct(ctx: Context, id: string): Promise<string> {
        const product = await ctx.stub.getState(id); // get the asset from chaincode state
        if (!product || product.length === 0) {
            throw new Error(`The product ${id} does not exist`);
        }
        return product.toString();
    }

    // UpdateAsset updates an existing asset in the world state with provided parameters.
    @Transaction()
    public async UpdateAsset(
        ctx: Context,
        id: string,
        quantity: string,
        price: number,
        name: string,
        location: Product["location"]
    ): Promise<void> {
        const exists = await this.ProductExists(ctx, id);
        if (!exists) {
            throw new Error(`A food product with ${id} does not exist`);
        }

        // overwriting original asset with new asset
        const updatedAsset = {
            id,
            quantity,
            price,
            name,
            location,
        };
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        return ctx.stub.putState(
            id,
            Buffer.from(stringify(sortKeysRecursive(updatedAsset)))
        );
    }

    // DeleteAsset deletes an given asset from the world state.
    @Transaction()
    public async DeleteAsset(ctx: Context, id: string): Promise<void> {
        const exists = await this.ProductExists(ctx, id);
        if (!exists) {
            throw new Error(`The asset ${id} does not exist`);
        }
        return ctx.stub.deleteState(id);
    }

    // ProductExists returns true when asset with given ID exists in world state.
    @Transaction(false)
    @Returns("boolean")
    public async ProductExists(ctx: Context, id: string): Promise<boolean> {
        const assetJSON = await ctx.stub.getState(id);
        return assetJSON && assetJSON.length > 0;
    }

    // TransferAsset updates the owner field of asset with given id in the world state, and returns the old owner.
    @Transaction()
    public async TransferAsset(
        ctx: Context,
        id: string,
        newOwner: string
    ): Promise<string> {
        const assetString = await this.ReadProduct(ctx, id);
        const asset = JSON.parse(assetString);
        const oldOwner = asset.Owner;
        asset.Owner = newOwner;
        // we insert data in alphabetic order using 'json-stringify-deterministic' and 'sort-keys-recursive'
        await ctx.stub.putState(
            id,
            Buffer.from(stringify(sortKeysRecursive(asset)))
        );
        return oldOwner;
    }

    // GetAllAssets returns all assets found in the world state.
    @Transaction(false)
    @Returns("string")
    public async GetAllAssets(ctx: Context): Promise<string> {
        const allResults = [];
        // range query with empty string for startKey and endKey does an open-ended query of all assets in the chaincode namespace.
        const iterator = await ctx.stub.getStateByRange("", "");
        let result = await iterator.next();
        while (!result.done) {
            const strValue = Buffer.from(
                result.value.value.toString()
            ).toString("utf8");
            let record;
            try {
                record = JSON.parse(strValue);
            } catch (err) {
                console.log(err);
                record = strValue;
            }
            allResults.push(record);
            result = await iterator.next();
        }
        return JSON.stringify(allResults);
    }
}
