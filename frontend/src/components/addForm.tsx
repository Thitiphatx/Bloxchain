import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddForm() {

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents default form submission
        const formData = new FormData(e.currentTarget);
        const messageValue = formData.get("message") as string;
        const response = await fetch("http://localhost:3000/setMessage", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newMessage: messageValue }),
        });
        
        const result = response.json();
        console.log(result);
    };

    return (
        <Card>
            <Card.Body>
                <Form onSubmit={handleSubmit}> {/* Use onSubmit instead of action */}
                    <Form.Group className="mb-3">
                        <Form.Label>Message</Form.Label>
                        <Form.Control name="message" type="text" placeholder="Enter message" />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </Card.Body>
        </Card>
    );
}
