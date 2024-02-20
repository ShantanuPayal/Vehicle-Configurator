import React, { useState, useContext } from "react";
import { Button, Form, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ResetContext } from "../Contexts/ResetContext";

function SendInvoiceViaEmail(props) {
  const [recipient, setRecipient] = useState("");
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const { segmentSelectedTop, setSegmentSelectedTop } =
    useContext(ResetContext);
  let invoicePath = sessionStorage.getItem("invoicePath");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Recipient:", recipient);
    console.log("Invoice path:", invoicePath);

    try {
      const response = await fetch(
        "http://localhost:8080/sendMailWithAttachment",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            recipient: recipient,
            msgBody: "Please find the attached invoice.",
            name: "Vehicle Configurator",
            attachment: `C:\\Users\\shubh\\Downloads\\${invoicePath}`,
          }),
        }
      );

      console.log("Response:", response);

      if (!response.ok) {
        console.error("Failed to send email");
        throw new Error("Failed to send email");
      }

      setShowSuccessMessage(true);

      // Navigate back to configurator after 2 seconds
      setTimeout(() => {
        setSegmentSelectedTop(segmentSelectedTop + 1);
        alert("Email sent successfully!");
        setSegmentSelectedTop(segmentSelectedTop + 1);
        navigate("/");
      }, 2000);
    } catch (error) {
      console.error("Error sending email:", error);
      setErrorMessage("Failed to send email. Please try again later.");
    }
  };

  return (
    <div>
      <h2>Send Invoice via Email</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="recipient">
          <Form.Label>Recipient Email</Form.Label>
          <Form.Control
            type="email"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Send
        </Button>
      </Form>
      {/* Error message */}
      {errorMessage && (
        <Alert variant="danger" style={{ marginTop: "20px" }}>
          {errorMessage}
        </Alert>
      )}
      {/* Success message */}
      {showSuccessMessage && (
        <Alert variant="success" style={{ marginTop: "20px" }}>
          Email sent successfully!
        </Alert>
      )}
    </div>
  );
}

export default SendInvoiceViaEmail;
