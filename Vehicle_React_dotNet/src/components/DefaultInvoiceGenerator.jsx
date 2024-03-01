import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import jsPDF from "jspdf";
import { AuthContext } from "../Contexts/AuthContext"; // Import AuthContext
import SendInvoiceViaEmail from "./SendInvoiceViaEmail";
import { ResetContext } from "../Contexts/ResetContext";

function InvoiceGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedId = location.state.selectedId;
  const [modelPrice, setModelPrice] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const orderSize = location.state.orderSize; // Retrieve the order size from location state
  const { userEmail } = useContext(AuthContext);
  const [invoicePath, setInvoicePath] = useState(""); // State to store the invoice PDF path

  const { segmentSelectedTop, setSegmentSelectedTop } =
    useContext(ResetContext);
  const userId = localStorage.getItem("userId").parse;
  const handleConfirmOrder = async () => {
    try {
      // Confirm order logic
      alert("Order confirmed!");
      generateAndDownloadPDF();
      // Send invoice
      const myobj = {
        userId: userId,
        modelId: selectedId,
        orderedQty: orderSize,
        altCompId: [],
        modelPrice: modelPrice,
        totalPrice: totalPrice,
      };
      console.log(myobj);
      // Send invoice
      const response = await fetch(`https://localhost:7232/`, {
        method: "POST",
        mode: "cors",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(myobj),
      });

      if (!response.ok) {
        throw new Error("Failed to send invoice");
      }

      // Continue with your code...
    } catch (error) {
      console.error("Error sending invoice:", error);
      // Handle error...
    }
  };

  const handleSendInvoiceByEmail = () => {
    navigate("/SendInvoiceViaEmail", { state: { invoicePath: invoicePath } }); // Navigate to the component responsible for sending email
  };

  useEffect(() => {
    console.log("invoicePath:", invoicePath);
  }, [invoicePath]);
  useEffect(() => {
    // Fetch model price based on selected model ID
    fetch(`https://localhost:7232/api/Model/${selectedId}`)
      .then((response) => response.json())
      .then((data) => setModelPrice(data.price))
      .catch((error) => console.error("Error fetching model price:", error));
  }, [selectedId]);

  useEffect(() => {
    // Calculate total price based on order size and model price
    if (modelPrice !== null && orderSize !== null) {
      const basePrice = modelPrice * orderSize; // Calculate base price by multiplying model price with order size
      const taxRate = 0.1; // Example tax rate (10%)
      const taxAmount = basePrice * taxRate; // Calculate tax amount
      const totalPrice = basePrice + taxAmount; // Add tax to the base price
      setTotalPrice(totalPrice);
    }
  }, [modelPrice, orderSize]);

  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Header
    doc.setFontSize(18);
    doc.text("Vehicle Configurator Invoice", 10, 20);

    // Date
    doc.setFontSize(12);
    doc.text(`Order Date: ${currentDate}`, 10, 30);

    // Model Price
    doc.setFontSize(14);
    doc.text(`Model Price: Rs ${modelPrice}`, 10, 40);

    // Order Size
    doc.text(`Order Size: ${orderSize}`, 10, 50);

    // Total Price (Including Tax)
    doc.text(`Total Price (Including Tax): Rs ${totalPrice} /-`, 10, 60);

    // Styling
    doc.setLineWidth(0.5);
    doc.line(10, 70, 200, 70); // Horizontal line

    // Footer
    doc.setFontSize(10);
    doc.text("Thank you for your order!", 10, 80);

    // Save the PDF and set the path
    const path = `invoice_${Date.now()}.pdf`;
    doc.save(path);
    sessionStorage.setItem("invoicePath", path);
    setInvoicePath(path);
  };
  console.log(userId);
  console.log(selectedId);
  console.log(orderSize);
  return (
    <div style={{ fontFamily: "Arial, sans-serif" }}>
      <h1 style={{ textAlign: "center" }}>Invoice</h1>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "10px",
          maxWidth: "500px",
          margin: "0 auto",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Model Price:</span>
          <span>Rs {modelPrice}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Order Size:</span>
          <span>{orderSize}</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Tax Rate:</span>
          <span>10%</span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Tax Amount:</span>
          <span>
            Rs{" "}
            {totalPrice !== null
              ? (totalPrice - totalPrice / 1.1).toFixed(2)
              : null}
          </span>
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "10px",
          }}
        >
          <span>Total Price (Including Tax):</span>
          <span>Rs {totalPrice} /-</span>
        </div>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        {/* Confirm order button */}
        <button className="button-57" onClick={handleConfirmOrder}><span class="text">Confirm Order</span><span>Are you sure ?</span></button>
        {/* Send invoice via email button */}
      </div>
      {invoicePath && <SendInvoiceViaEmail invoicePath={invoicePath} />}
    </div>
  );
}

export default InvoiceGenerator;
