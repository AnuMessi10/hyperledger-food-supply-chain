/*
 * SPDX-License-Identifier: Apache-2.0
 */

export type Actor = "PRODUCER" | "MANUFACTURER" | "WHOLESALER" | "DISTRIBUTOR" | "RETAILER" | "CONSUMER";

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: string;
    location: {
        lat: number;
        lng: number;
    };
    actor: Actor;
    // image: Picture;
}
