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
      // const response = await fetch(
      //   "https://localhost:7232/api/SendMail",
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "multipart/form-data",
      //     },
      //     body: JSON.stringify({
      //       ToEmail: recipient,
      //       Body: "Please find the attached invoice.",
      //       //name: "Vehicle Configurator",
      //       Attachments: `"C:\\Users\\rvrah\\Downloads\\${invoicePath}`,
      //     }),
      //   }
      // );
      const formData = new FormData();
      formData.append("ToEmail", recipient);
      formData.append("Body", "Please find the attached invoice.");
      formData.append("Attachments", {
        uri: `C:\\Users\\rvrah\\Downloads\\${invoicePath}`,
        name: invoicePath,
        type: "application/pdf",
      });

      const response = await fetch("https://localhost:7232/api/SendMail", {
        method: "POST",
        body: formData,
      });

      // Handle response...

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
