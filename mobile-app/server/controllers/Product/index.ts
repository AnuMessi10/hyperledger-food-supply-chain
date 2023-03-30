import { Response, NextFunction } from "express";

// --------------------- Create New Product ---------------------------------

const createProduct = async (req: any, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }

  const { name, id, price, quantity, location, contract } = req.body;

  const result = await contract.submitTransaction(
    "createProduct",
    name,
    id,
    quantity,
    price,
    location
  );

  const response = result.toString();
  res.status(201).json(result.toString());
};

const productController = {
  createProduct,
};

export default productController;
