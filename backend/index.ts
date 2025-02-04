import dotenv from 'dotenv';
import express, { Request, Response } from "express";
import cors from "cors";
import { ethers } from "ethers";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

const provider = new ethers.providers.JsonRpcProvider(process.env.RPC_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY as string, provider);
const contractABI = 
const contract = new ethers.Contract(
    process.env.CONTRACT_ADDRESS as string,
    contractABI,
    wallet
);

// app.get("/getBalance",async (req:Request,res:Response)=>{
//     const balance = await contract.getbalance();
//     // const balance = await contract.balanceOf(wallet.address);
//     res.json({balance:balance.toString()});
// });

// app.post("/sendTransaction",async (req:Request,res:Response)=>{
//     const {to,amount} = req.body;
//     const tx = await contract.transfer(to,amount);
//     await tx.wait();
//     res.json({message:"Transaction sent"});
// });

app.get("/getMassage", async (req: Request, res: Response) => {
    const block = await contract.massage();
    res.json({ block });
});

app.post("/setMassage", async (req: Request, res: Response) => {
    // const privateKey = "0x6d1b9a3526d77075307ff504b895d3b87b756d55ae57d124e26ff6cace2eb1ff"; // ใช้ Private Key จาก Ganache
    // const provider = contract.JsonRpcProvider(ganacheURL); // เชื่อมต่อกับ Ganache
    // const wallet = new ethers.Wallet(privateKey, provider); // ใช้ Wallet ของ Ganache
    // const contract = new ethers.Contract(contractAddress, HelloWorldABI.abi, wallet); // เชื่อมต่อกับ contract
    const tx = await contract.update(newMessage); // ส่งข้อความใหม่ไปยัง contract
    const receipt = await tx.wait(); // รอให้ธุรกรรมเสร็จสิ้นและดึงข้อมูลของ Transaction Receipt
});