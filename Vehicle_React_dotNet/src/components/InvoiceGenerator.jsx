import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { ResetContext } from "../Contexts/ResetContext";
import jsPDF from "jspdf";
import SendInvoiceViaEmail from "./SendInvoiceViaEmail";
import { Alert } from 'react-st-modal';

// Inside your InvoiceGenerator component
function InvoiceGenerator() {
  const location = useLocation();
  const navigate = useNavigate();
  const selectedDropdownIds = location.state.selectedDropdownIds;
  const [componentNames, setComponentNames] = useState([]);
  const selectedId = location.state.selectedId;
  const [showPopup, setShowPopup] = useState(false);
  const [nonConfigurableComponents, setNonConfigurableComponents] = useState(
    []
  );
  const [totalPrice, setTotalPrice] = useState(null);
  const [modelPrice, setModelPrice] = useState(null);
  const orderSize = location.state.orderSize; // Retrieve the order size from


  const { segmentSelectedTop, setSegmentSelectedTop } =
    useContext(ResetContext);
  //const userId = localStorage.getItem("userId");
  //const model = localStorage.getItem("model");
  const [check, setCheck] = useState(-1);
  const [invoicePath, setInvoicePath] = useState("");

  useEffect(() => {
    fetch(`https://localhost:7232/api/Model/${selectedId}`)
      .then((response) => response.json())
      .then((data) => setModelPrice(data.price + location.state.totalDeltaa));
  }, [selectedId]);

  // const handleSendInvoiceByEmail = () => {
  //   console.log("Invoice path:", invoicePath);
  //   navigate("/SendInvoiceViaEmail", { state: { invoicePath: invoicePath } }); // Navigate to the component responsible for sending email
  // };

  useEffect(() => {
    Promise.all(
      selectedDropdownIds.map((id) =>
        fetch(`https://localhost:7232/api/components/${id}`).then((response) =>
          response.json()
        )
      )
    ).then((data) => setComponentNames(data.map((item) => item.compName)));
  }, [selectedDropdownIds]);

  useEffect(() => {
    fetch(`https://localhost:7232/api/Vehicle/configurable/${selectedId}/n`)
      .then((response) => response.json())
      .then((data) =>
        setNonConfigurableComponents(data.map((item) => item.Vehicle.comp.compName))
      );
  }, [selectedId]);
  const generateAndDownloadPDF = () => {
    const doc = new jsPDF();
    const currentDate = new Date().toLocaleDateString();

    // Set font size and style
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);

    // Title
    doc.text("Vehicle Configurator Invoice", 105, 20, { align: "center" });

    // Horizontal line
    doc.setLineWidth(0.5);
    doc.line(10, 25, 200, 25);

    // Subtitle
    doc.setFontSize(14);
    doc.text(`Order Date: ${currentDate}`, 105, 35, { align: "right" });

    // Model Price
    doc.setFont("helvetica", "normal");
    doc.text("Model Price:", 20, 45);
    doc.text(`Rs ${modelPrice}`, 120, 45, { align: "right" });

    // Order Size
    doc.text("Order Size:", 20, 55);
    doc.text(`${orderSize}`, 120, 55, { align: "right" });

    // Tax Rate
    doc.text("Tax Rate:", 20, 65);
    doc.text("10%", 120, 65, { align: "right" });

    // Tax Amount
    doc.text("Tax Amount:", 20, 75);
    doc.text(
      `Rs ${totalPrice !== null ? (totalPrice - totalPrice / 1.1).toFixed(2) : null
      }`,
      120,
      75,
      { align: "right" }
    );

    // Total Price
    doc.setFont("helvetica", "bold");
    doc.text("Total Price (Including Tax):", 20, 85);
    doc.text(`Rs ${totalPrice} /-`, 120, 85, { align: "right" });

    // Footer
    doc.setFont("helvetica", "italic");
    doc.setFontSize(10);
    doc.text("Thank you for your order!", 105, 95, { align: "center" });

    const path = `invoice_${Date.now()}.pdf`;
    doc.save(path);
    sessionStorage.setItem("invoicePath", path); // Store the invoice path in sessionStorage
    setInvoicePath(path);

  };

  const handleConfirmOrder = async () => {
    setShowPopup(true);
    generateAndDownloadPDF();
    Alert("ORDER CONFIRMED!");
    //setSegmentSelectedTop(segmentSelectedTop + 1);
    navigate("/SendInvoiceViaEmail");
    try {
      const myobj = {
        userId: parseInt(localStorage.getItem("userId")),
        modelId: selectedId,
        orderedQty: orderSize,
        altCompId: selectedDropdownIds.toString(),
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

  useEffect(() => {
    setCheck(-1);
  }, []);

  useEffect(() => {
    // Calculate total price based on order size and model price
    if (modelPrice !== null && orderSize !== null && check == -1) {
      setCheck(check + 1);
      const basePrice = modelPrice * orderSize; // Calculate base price by multiplying model price with order size
      const taxRate = 0.1; // Example tax rate (10%)
      const taxAmount = basePrice * taxRate; // Calculate tax amount
      const totalPrice = basePrice + taxAmount; // Add tax to the base price
      setTotalPrice(totalPrice);
    }
  }, [modelPrice, orderSize, check]);

  return (
    <div>
      <h1>Invoice component</h1>
      <h2>Non-configurable components:</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {nonConfigurableComponents.map((name, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "5px", // Reduced padding
              borderRadius: "5px",
              flex: "0 0 auto",
              marginRight: "10px",
              width: "20%", // Reduced width
            }}
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
      <h2>Configured components</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "flex-start",
        }}
      >
        {componentNames.map((name, index) => (
          <div
            key={index}
            style={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: "10px",
              border: "1px solid #ccc",
              padding: "5px", // Reduced padding
              borderRadius: "5px",
              flex: "0 0 auto",
              marginRight: "10px",
              width: "20%", // Reduced width
            }}
          >
            <span>{name}</span>
          </div>
        ))}
      </div>
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
        <button className="button-57 button-57-invoice" onClick={handleConfirmOrder}><span class="text">Confirm Order</span><span>Are you sure ?</span></button>
        {/* Send invoice via email button */}
      </div>
      {/*{showPopup && <div>Order confirmed!</div>}*/}
      {invoicePath && <SendInvoiceViaEmail invoicePath={invoicePath} />}
    </div>
  );
}
export default InvoiceGenerator;
