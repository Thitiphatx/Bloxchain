import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import Web3 from "web3";
import contractABI from "./HelloWorld.json"; // Ensure this file is exported as a proper module

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const web3 = new Web3("http://127.0.0.1:7545"); // Ganache URL
const contractAddress = "YOUR_DEPLOYED_CONTRACT_ADDRESS";
const contract = new web3.eth.Contract(contractABI.abi, contractAddress);

// Get stored value
app.get("/get", async (req, res) => {
  try {
    const value = await contract.methods.get().call();
    res.json({ value });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

// Set stored value
app.post("/set", async (req, res) => {
  try {
    const { value } = req.body;
    const accounts = await web3.eth.getAccounts();
    const tx = await contract.methods.set(value).send({ from: accounts[0] });

    const block = await web3.eth.getBlock(tx.blockNumber);

    res.json({
      success: true,
      transactionHash: tx.transactionHash,
      blockNumber: tx.blockNumber,
      blockTimestamp: block.timestamp,
      sender: tx.from,
    });
  } catch (error) {
    res.status(500).json({ error: (error as Error).message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));