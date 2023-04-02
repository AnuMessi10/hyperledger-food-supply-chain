import { Response, NextFunction } from "express";

// --------------------- Create New Product ---------------------------------

const createProduct = async (req: any, res: Response, next: NextFunction) => {
  if (!req.body) {
    return res.status(400).json({ message: "Missing request body" });
  }

  const { name, id, price, quantity, location, actor, contract } = req.body;

  const resultBytes = await contract.submitTransaction(
    "CreateProduct",
    name,
    id,
    quantity,
    price,
    location,
    actor
  );

  const result = resultBytes.toString();

  res.status(201).json({ message: `Product with ${id} updated successfully`, product: result });
};

// --------------------- Get All Products ---------------------------------

const getAllProducts = async (req: any, res: Response, next: NextFunction) => {
  try {

    const { contract } = req.body;

    const resultBytes = await contract.evaluateTransaction(
      "GetAllProducts"
    );

    const result = resultBytes.toString('utf8');
    res.status(201).json(JSON.parse(result));

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
    const resultStringified = resultBytes.toString();
    const resultParsed = JSON.parse(resultStringified);

    res.status(201).json({ id, ...resultParsed });

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

    const { contract, quantity, price, name, location, actor } = req.body;

    const { id } = req.params;

    const resultBytes = await contract.submitTransaction(
      "UpdateProduct",
      id,
      quantity,
      price,
      name,
      location,
      actor
    );
    const resultStringified = resultBytes.toString();
    const resultParsed = JSON.parse(resultStringified);

    res.status(201).json({ message: `Product with ${id} updated successfully`, updatedProduct: resultParsed });

  } catch (error) {
    throw error;
  }
};

// --------------------- Delete A Product ---------------------------------

const deleteProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { contract } = req.body;
    const { id } = req.params;

    await contract.evaluateTransaction(
      "DeleteProduct",
      id,
    );

    res.status(201).json({ message: `Product with ${id} deleted successfully` });

  } catch (error) {
    throw error;
  }
};
//--------------------Transfer Product --------------------------
const transferProduct = async (req: any, res: Response, next: NextFunction) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Missing request body" });
    }

    const { contract, actor } = req.body;
    const { id } = req.params
    console.log("id is",id);
    const resultBytes = await contract.submitTransaction(
      "TransferProduct",
      id,
      actor
    );

    const result = resultBytes.toString();

    // console.log(JSON.parse(resultBytes.toString()));

    res.status(201).json({ message: `Product with ${id} was transferred from ${result} to ${actor} successfully!` });

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
