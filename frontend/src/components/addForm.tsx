import { useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function AddForm() {

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Prevents default form submission
        const formData = new FormData(e.currentTarget);
        const messageValue = formData.get("message") as string;

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
