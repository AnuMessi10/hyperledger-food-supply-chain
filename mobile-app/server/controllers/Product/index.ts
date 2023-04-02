import { Response, NextFunction } from "express";

// --------------------- Create New Product ---------------------------------

const createProduct = async (req: any, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }

  const { name, id, price, quantity, location, contract } = req.body;

  const resultBytes = await contract.submitTransaction(
    "CreateProduct",
    name,
    id,
    quantity,
    price,
    location
  );

  const result = resultBytes.toString();

  res.status(201).json({ message: `Product with ${id} updated successfully`, product: result });
};

// --------------------- Get All Products ---------------------------------

const getAllProducts = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { contract } = req.body;

    const resultBytes = await contract.evaluateTransaction(
      "GetAllProducts"
    );

    const result = resultBytes.toString();

    res.status(201).json(result);

  } catch (error) {
    throw error;
  }
};

// --------------------- Get A Product ---------------------------------

const getProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { contract } = req.body;

    const { id } = req.params;

    const resultBytes = await contract.evaluateTransaction(
      "GetProduct",
      id
    );

    const result = resultBytes.toString();

    res.status(201).json(result);

  } catch (error) {
    throw error;
  }
};

// --------------------- Update A Product ---------------------------------

const updateProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { contract, quantity, price, name, location } = req.body;

    const { id } = req.params;

    const resultBytes = await contract.evaluateTransaction(
      "UpdateProduct",
      id,
      quantity,
      price,
      name,
      location,
    );

    const result = resultBytes.toString();

    res.status(201).json({ message: `Product with ${id} updated successfully`, updatedProduct: result });

  } catch (error) {
    throw error;
  }
};

// --------------------- Delete A Product ---------------------------------

const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { contract, id } = req.body;

    await contract.evaluateTransaction(
      "DeleteProduct",
      id,
    );

    res.status(201).json({ message: `Product with ${id} deleted successfully` });

  } catch (error) {
    throw error;
  }
};

const transferProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { contract, id, newActor } = req.body;

    const resultBytes = await contract.evaluateTransaction(
      "TransferProduct",
      id,
      newActor
    );

    const result = resultBytes.toString();

    res.status(201).json({ message: `Product with ${id} updated successfully`, updatedProduct: result });

  } catch (error) {
    throw error;
  }
};

const productController = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  transferProduct,
  deleteProduct
};

export default productController;
