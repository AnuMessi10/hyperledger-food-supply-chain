/*
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Product {
    id: string;
    name: string;
    price: number;
    quantity: string;
    location: {
        lat: number;
        lng: number;
    };
    docType?: string;
}
