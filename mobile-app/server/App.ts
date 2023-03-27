import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { API_ENDPOINT_NOT_FOUND, SERVER_ERR } from "./errors";
import { authRoutes } from "./routes/Auth";
import morgan from "morgan";
import bodyParser from "body-parser";
import sanitizedConfig from "./config";
import network from "./fabric/network";
import { Gateway, Wallets } from "fabric-network";
import fs from "fs";
import path from "path";

console.log(network);

// Init express
const app = express();

// add body parser for ts support
app.use(bodyParser.json({ limit: "50mb", type: "application/json" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// .env variables

const { PORT, MONGODB_URI, NODE_ENV, ORIGIN } = sanitizedConfig;

// middlewares (if any)

// index route

app.get("/", (req, res) => {
  res.status(200).json({
    type: "success",
    message: "Connection to server established",
    data: null,
  });
});

app.get("/createProduct", async (req: any, res, next) => {
  console.log("GET Request to Hello world inside app.ts");
  console.log(req.body);

  const productName = req.body.productName;
  const id = req.body.id;
  const price = req.body.price;
  const quantity = req.body.quantity;
  const location = req.body.location;

  try {
    console.log("inside network.ts");
    // load the network configuration
    const ccpPath = path.resolve(
      __dirname,
      "..",
      "..",
      "network",
      "test-network",
      "organizations",
      "peerOrganizations",
      "org1.example.com",
      "connection-org1.json"
    );
    let ccp = JSON.parse(fs.readFileSync(ccpPath, "utf8"));

    // Create a new file system based wallet for managing identities.
    const walletPath = path.join(`${process.cwd()}/fabric`, "wallet");
    const wallet = await Wallets.newFileSystemWallet(walletPath);
    console.log(`Wallet path: ${walletPath}`);

    // Check to see if we've already enrolled the user.
    const identity = await wallet.get("appUser");
    if (!identity) {
      console.log(
        'An identity for the user "appUser" does not exist in the wallet'
      );
      console.log("Run the registerUser.js application before retrying");
      return;
    }

    // Create a new gateway for connecting to our peer node.
    const gateway = new Gateway();
    await gateway.connect(ccp, {
      wallet,
      identity: "appUser",
      discovery: { enabled: true, asLocalhost: true },
    });

    // Get the network (channel) our contract is deployed to.
    const network = await gateway.getNetwork("mychannel");

    // Get the contract from the network.
    const contract = network.getContract("basic");

    // Submit the specified transaction.
    // createCar transaction - requires 5 argument, ex: ('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom')
    // changeCarOwner transaction - requires 2 args , ex: ('changeCarOwner', 'CAR12', 'Dave')
    // await contract.submitTransaction('createCar', 'CAR12', 'Honda', 'Accord', 'Black', 'Tom');
    // console.log('Transaction has been submitted');

    // // Disconnect from the gateway.
    // await gateway.disconnect();
    req.contract = contract;
    // next();
  } catch (error) {
    console.error(`Failed to submit your requested transaction: ${error}`);
    process.exit(1);
  }
  const contract = req.contract;
  console.log(JSON.stringify({ productName, id, quantity, price, location }));
  const result = await contract.submitTransaction(
    "createProduct",
    productName,
    id,
    quantity,
    price,
    location
  );
  console.log("result is", result.toString());
  // const result = await contract.evaluateTransaction("ReadAsset", "asset5");
  // const response = JSON.parse(result.toString());
  res.json({ myResult: "Hello" });
});

// routes middlewares

app.use("/api/auth", authRoutes);
// app.use("/api/product", productRoutes);

// page not found error handling  middleware

app.use("*", (req, res, next) => {
  console.log("inside * method");
  const error = {
    status: 404,
    message: API_ENDPOINT_NOT_FOUND,
  };
  next(error);
});

// global error handling middleware

app.use((req, res, next) => {
  // console.log(err);
  // const status = err.status || 500;
  // const message = err.message || SERVER_ERR;
  // const data = err.data || null;
  res.json({
    type: "error",
    // message,
    // data,
  });
});

app.use(express.json());

app.use(
  cors({
    credentials: true,
    origin: ORIGIN,
    optionsSuccessStatus: 200,
  })
);

// log in development environment

if (NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// index to boot
const App = async () => {
  try {
    await mongoose.connect(MONGODB_URI as string);
    console.log("Connection to database established successfully.");
    app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

App();
