import dotenv from 'dotenv';
import express,{Request,Response} from "express";
import cors from "cors";
import {ethers} from "ethers";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
// const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string,provider);
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS as string,
    contractABI,
    wallet
);

app.get("/getBalance",async (req:Request,res:Response)=>{
    const balance = await contract.getbalance();
    // const balance = await contract.balanceOf(wallet.address);
    res.json({balance:balance.toString()});
});

app.post("/sendTransaction",async (req:Request,res:Response)=>{
    const {to,amount} = req.body;
    const tx = await contract.transfer(to,amount);
    await tx.wait();
    res.json({message:"Transaction sent"});
});