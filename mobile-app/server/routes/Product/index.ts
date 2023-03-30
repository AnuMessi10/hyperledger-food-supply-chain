import express from "express";
import productController from "../../controllers/Product";
import network from "../../fabric/network";

const { createProduct } = productController;

const {Router} = express;

export const productRoutes = Router();

productRoutes.post("/create", network.connectToNetwork, createProduct);