/*
 * SPDX-License-Identifier: Apache-2.0
 */

export type Actor = "PRODUCER" | "MANUFACTURER" | "WHOLESALER" | "DISTRIBUTOR" | "RETAILER" | "CONSUMER";

export type Location = {
    lat: number;
    lng: number;
}

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: string;
    location: {
        prev?: Location | Location[];
        current: Location;
    } ;
    actor: Actor;
    imageUrl : string;
}
