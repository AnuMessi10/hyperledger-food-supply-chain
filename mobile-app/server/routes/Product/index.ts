import express from "express";
import productController from "../../controllers/Product";
import network from "../../fabric/network";

const { createProduct, deleteProduct, getProduct, getAllProducts, updateProduct, transferProduct } = productController;

const {Router} = express;

export const productRoutes = Router();

productRoutes.post("/create", network.connectToNetwork, createProduct);

productRoutes.get("/:id", network.connectToNetwork, getProduct);

productRoutes.get("/get/all", network.connectToNetwork, getAllProducts);

productRoutes.patch("/update/:id", network.connectToNetwork, updateProduct);

productRoutes.delete("/delete/:id", network.connectToNetwork, deleteProduct);

productRoutes.post("/transfer/:id", network.connectToNetwork, transferProduct);