import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

export default function Display() {
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch("http://localhost:3000/getMessage");
                const result = await response.json();
                setMessage(result.currentMessage);
            } catch (error) {
                console.error("Error fetching message:", error);
            }
        };

        fetchData(); // Fetch initially

        const interval = setInterval(fetchData, 3000); // Poll every 3 seconds

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    return (
        <Card>
            <Card.Body>
                <Card.Title>Data</Card.Title>
                <Card.Text>{message}</Card.Text>
            </Card.Body>
        </Card>
    );
}
