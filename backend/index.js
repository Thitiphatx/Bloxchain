const dotenv = require('dotenv');
const express = require('express');
const cors = require('cors');
const { ethers } = require('ethers');
const HelloWorldABI = require('../contract/artifacts/contracts/HelloWorld.sol/HelloWorld.json');

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

console.log("runnning")

const provider = new ethers.JsonRpcProvider(process.env.GANACHE_URL);
const wallet = new ethers.Wallet(process.env.PRIVATE_KEY , provider);
const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS,
    HelloWorldABI.abi,
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

app.get("/getMessage", async (req, res) => {
    try {
        const currentMessage = await contract.message();
        res.json({ currentMessage });
    }
    catch (error) {
        res.status(500).send("Failed to getting message");
    }

});

app.post("/setMessage", async (req, res) => {
    const { newMessage } = await req.body;
    const tx = await contract.update(newMessage); // ส่งข้อความใหม่ไปยัง contract
    const receipt = await tx.wait(); // รอให้ธุรกรรมเสร็จสิ้นและดึงข้อมูลของ Transaction Receipt
    res.status(200).json({ receipt });
});

app.listen(3000, () => {
    console.log(`Server is running on http://localhost:${3000}`);
  });