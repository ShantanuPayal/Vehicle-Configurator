import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/AlternateModifier.css";
const AlternateModifier = () => {
  const [components, setComponents] = useState([]);
  const location = useLocation();
  //const selectedModelDetails = location.state.selectedModelDetails;
  const selectedId = location.state.selectedId;
  //alert(`Selected ID: ${selectedId}`);
  const [selectedComponentIds, setSelectedComponentIds] = useState([]);
  const [alternateComponents, setAlternateComponents] = useState({});
  const [selectedAlternateComponentIds, setSelectedAlternateComponentIds] =
    useState({});
  const orderSize = location.state.orderSize; // Retrieve the order size from
  const [totalDelta, setTotalDelta] = useState(0);

  useEffect(() => {
    const fetchComponents = async () => {
      try {
        const response = await fetch(
          `http://localhost:8080/api/vehicles/config/${selectedId}/Y`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        setComponents(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchComponents();
  }, []);

  const handleCheckboxChange = async (compId, checked) => {
    if (checked) {
      setSelectedComponentIds((prevIds) => [...prevIds, compId]);
      try {
        const response = await fetch(
          `http://localhost:8080/api/alternate-components/${selectedId}/${compId}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch alternate components");
        }
        const data = await response.json();
        setAlternateComponents((prevState) => ({
          ...prevState,
          [compId]: data,
        }));
        setSelectedAlternateComponentIds((prevState) => ({
          ...prevState,
          [compId]: selectedAlternateComponentIds[compId] || "", // Set the previously selected option when checkbox is checked
        }));
      } catch (error) {
        console.error("Error fetching alternate components:", error);
      }
    } else {
      setSelectedComponentIds((prevIds) =>
        prevIds.filter((id) => id !== compId)
      );
      setAlternateComponents((prevState) => {
        const newState = { ...prevState };
        delete newState[compId];
        return newState;
      });
      setSelectedAlternateComponentIds((prevState) => {
        const newState = { ...prevState };
        delete newState[compId];
        return newState;
      });
    }
  };

  const navigate = useNavigate();
  const selectedDropdownIds = Object.values(selectedAlternateComponentIds);
  const nonCheckedComponentIds = components
    .filter((component) => !selectedComponentIds.includes(component.comp_id))
    .map((component) => component.comp_id);

  // const handleInvoiceClick = () => {
  //   const fetchAndSumDeltaPrices = async () => {
  //     try {
  //       console.log(selectedDropdownIds); // Log the IDs
  //       const deltaPrices = await Promise.all(
  //         selectedDropdownIds.map(async (id) => {
  //           const response = await fetch(
  //             `http://localhost:8080/api/alternate-components/alt/${selectedId}/${id}`
  //           );
  //           if (!response.ok) {
  //             throw new Error(`HTTP error! status: ${response.status}`);
  //           }
  //           const data = await response.json();
  //           //console.log(data); // Log the response data
  //           const deltaPrice = parseFloat(data.deltaPrice);

  //           return isNaN(deltaPrice) ? 0 : deltaPrice;
  //         })
  //       );

  //       const total = deltaPrices.reduce((a, b) => a + b, 0);
  //       setTotalDelta(total);
  //       alert(totalDelta);
  //       //setTotalDeltaPrice(total);
  //     } catch (error) {
  //       console.log("Fetch failed", error);
  //     }
  //   };

  //   // Call the function
  //   fetchAndSumDeltaPrices();

  //   //alert(totalDeltaPrice);
  //   navigate("/InvoiceGenerator", {
  //     state: {
  //       nonCheckedComponentIds: nonCheckedComponentIds,
  //       selectedDropdownIds: selectedDropdownIds,
  //       selectedId: selectedId,
  //       orderSize: orderSize,
  //       totalDeltaa: totalDelta
  //       // totalDeltaPrice: totalDeltaPrice,
  //     },
  //   });
  // };
  //////////////////////////////////////////
  const handleInvoiceClick = () => {
    const fetchAndSumDeltaPrices = async () => {
      try {
        console.log(selectedDropdownIds); // Log the IDs
        const deltaPrices = await Promise.all(
          selectedDropdownIds.map(async (id) => {
            const response = await fetch(
              `http://localhost:8080/api/alternate-components/alt/${selectedId}/${id}`
            );
            if (!response.ok) {
              throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();
            //console.log(data); // Log the response data
            const deltaPrice = parseFloat(data.deltaPrice);
            return isNaN(deltaPrice) ? 0 : deltaPrice;
          })
        );

        const total = deltaPrices.reduce((a, b) => a + b, 0);
        setTotalDelta(total);
        navigateToInvoice(total); // Navigate with updated totalDelta
      } catch (error) {
        console.log("Fetch failed", error);
      }
    };

    // Function to navigate to InvoiceGenerator
    const navigateToInvoice = (totalDelta) => {
      navigate("/InvoiceGenerator", {
        state: {
          nonCheckedComponentIds: nonCheckedComponentIds,
          selectedDropdownIds: selectedDropdownIds,
          selectedId: selectedId,
          orderSize: orderSize,
          totalDeltaa: totalDelta, // Pass updated totalDelta
        },
      });
    };

    // Call the function
    fetchAndSumDeltaPrices();
  };

  const handleAlternateChange = (compId, selectedValue) => {
    setSelectedAlternateComponentIds((prevState) => ({
      ...prevState,
      [compId]: selectedValue,
    }));
  };

  return (
    <div>
      <h1>Components List</h1>
      <ul>
        {components.map((component, index) => (
          <li key={index}>
            <input
              type="checkbox"
              checked={selectedComponentIds.includes(component.comp_id)}
              onChange={(e) =>
                handleCheckboxChange(component.comp_id, e.target.checked)
              }
            />
            {component.comp_name}
            {selectedComponentIds.includes(component.comp_id) && (
              <select
                value={selectedAlternateComponentIds[component.comp_id] || ""}
                onChange={(e) =>
                  handleAlternateChange(component.comp_id, e.target.value)
                }
                disabled={!selectedComponentIds.includes(component.comp_id)}
              >
                <option value="">Select Alternate Component</option>
                {console.log(alternateComponents)}
                {alternateComponents[component.comp_id] &&
                  alternateComponents[component.comp_id].map(
                    (alternateComponent, index) => (
                      <option key={index} value={alternateComponent.id}>
                        {alternateComponent.comp_name} (Delta Price:{" "}
                        {alternateComponent.delta_price})
                      </option>
                    )
                  )}
              </select>
            )}
          </li>
        ))}
      </ul>
      <button onClick={handleInvoiceClick}>Generate Invoice</button>
    </div>
  );
};

export default AlternateModifier;
