import { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Table } from "react-bootstrap";

export default function AddForm() {
    const [transactionData, setTransactionData] = useState(null);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents default form submission
        const formData = new FormData(e.currentTarget);
        const messageValue = formData.get("message") as string;
        const response = await fetch("http://localhost:3000/setMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newMessage: messageValue }),
        });
        
        const result = await response.json();
        console.log("after update:",result.receipt.blockHash);
        setTransactionData({ ...result.receipt });

        
    };
    const fieldsToShow = [
        "blockHash",
        "blockNumber",
        "from", // Sender
        "to",   // Recipient
        "cumulativeGasUsed",
        "hash",
        "status",
    ];

    return (
        <div className="d-flex justify-content-center"> {/* Center the content */}
            <Card style={{ width: '50rem' }}> {/* Set a maximum width for the card */}
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3">
                            <Form.Label>Message</Form.Label>
                            <Form.Control name="message" type="text" placeholder="Enter message" />
                        </Form.Group>
                        <Button variant="primary" type="submit">
                            Submit
                        </Button>
                    </Form>

                    {transactionData && (
                        <Table striped bordered hover responsive style={{ marginTop: '24px' }}> {/* Make table responsive */}
                            <thead>
                                <tr>
                                    <th>Field</th>
                                    <th>Value</th>
                                </tr>
                            </thead>
                            <tbody>
                                {fieldsToShow.map((field) => (
                                    <tr key={field}>
                                        <td>{field}</td>
                                        <td>{transactionData[field] ? transactionData[field].toString() : "null"}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    )}
                </Card.Body>
            </Card>
        </div>
    );
}
