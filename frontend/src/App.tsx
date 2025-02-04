import React, { useEffect, useState } from "react";
import { ethers } from "ethers";
import HelloWorldABI from "./HelloWorld.json"; // เชื่อม ABI ของ Smart Contract

const contractAddress = "0xdDff68F4eA96DfEF7c91dD0bdd835BA33C726906"; // ใส่ Address ที่ได้จากการ Deploy
const ganacheURL = "HTTP://127.0.0.1:7545"; // URL ของ Ganache

function App() {
  const [message, setMessage] = useState(""); // ข้อความจาก Smart Contract
  const [newMessage, setNewMessage] = useState(""); // ข้อความใหม่ที่ผู้ใช้จะอัปเดต
  const [transactionInfo, setTransactionInfo] = useState<any>(null); // ข้อมูลของธุรกรรม

  // ฟังก์ชันดึงข้อความปัจจุบันจาก Smart Contract
  const getMessage = async () => {
    try {
      const provider = new ethers.JsonRpcProvider(ganacheURL); // เชื่อมต่อกับ Ganache
      const contract = new ethers.Contract(contractAddress, HelloWorldABI.abi, provider); // ใช้ ABI และ provider
      const currentMessage = await contract.message(); // เรียกฟังก์ชัน 'message' จาก smart contract
      setMessage(currentMessage); // ตั้งค่าข้อความที่ได้
    } catch (error) {
      console.error("Error loading message:", error); // ถ้ามีข้อผิดพลาดแสดงข้อความ
    }
  };

  // ฟังก์ชันอัปเดตข้อความใหม่และดึงข้อมูลธุรกรรม
  const updateMessage = async () => {
    try {
      const privateKey = "0x6d1b9a3526d77075307ff504b895d3b87b756d55ae57d124e26ff6cace2eb1ff"; // ใช้ Private Key จาก Ganache
      const provider = new ethers.JsonRpcProvider(ganacheURL); // เชื่อมต่อกับ Ganache
      const wallet = new ethers.Wallet(privateKey, provider); // ใช้ Wallet ของ Ganache
      const contract = new ethers.Contract(contractAddress, HelloWorldABI.abi, wallet); // เชื่อมต่อกับ contract

      const tx = await contract.update(newMessage); // ส่งข้อความใหม่ไปยัง contract
      const receipt = await tx.wait(); // รอให้ธุรกรรมเสร็จสิ้นและดึงข้อมูลของ Transaction Receipt

      console.log("Transaction receipt:", receipt);


      // เก็บข้อมูลธุรกรรมที่สำคัญใน state
      setTransactionInfo({
        transactionHash: receipt.blockHash,
        blockNumber: receipt.blockNumber,
        gasUsed: receipt.gasUsed.toString(),
        status: receipt.status === 1 ? "Success" : "Failed",
      });

      getMessage(); // โหลดข้อความใหม่หลังจากอัปเดต
      setNewMessage(""); // เคลียร์ฟิลด์ input
    } catch (error) {
      console.error("Error updating message:", error); // ถ้ามีข้อผิดพลาดแสดงข้อความ
    }
  };

  // โหลดข้อความครั้งแรกเมื่อเปิดหน้าเว็บ
  useEffect(() => {
    getMessage();
  }, []);

  return (
    <div>
      <h1>Current Message: {message}</h1> {/* แสดงข้อความปัจจุบัน */}
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)} // เมื่อพิมพ์ข้อความใหม่ให้ตั้งค่า
        placeholder="Enter new message"
      />
      <button onClick={updateMessage}>Update Message</button> {/* ปุ่มอัปเดตข้อความ */}

      {transactionInfo && (
        <div>
          <h2>Transaction Information</h2>
          <p><strong>Transaction Hash:</strong> {transactionInfo.transactionHash}</p>
          <p><strong>Block Number:</strong> {transactionInfo.blockNumber}</p>
          <p><strong>Gas Used:</strong> {transactionInfo.gasUsed} wei</p>
          <p><strong>Status:</strong> {transactionInfo.status}</p>
        </div>
      )}
    </div>
  );
}

export default App;
