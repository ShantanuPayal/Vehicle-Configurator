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
                    `https://localhost:7232/api/Vehicle/configurable/${selectedId}/Y`
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
            //console.log(`Fetching alternate components for ${compId}`)
            try {
                const response = await fetch(
                    `https://localhost:7232/api/AlternateComponent/${selectedId}/${compId}`
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
        console.log("Alternate Components:----- ", alternateComponents);
    };

    const navigate = useNavigate();
    const selectedDropdownIds = Object.values(selectedAlternateComponentIds);
    const nonCheckedComponentIds = components
        .filter((component) => !selectedComponentIds.includes(component.Vehicle.comp.id))
        .map((component) => component.Vehicle.comp.id);

    //////////////////////////////////////////
    const handleInvoiceClick = () => {
        const fetchAndSumDeltaPrices = async () => {
            try {
                console.log("DropDownIds=>", selectedDropdownIds); // Log the IDs
                const deltaPrices = await Promise.all(
                    selectedDropdownIds.map(async (id) => {
                        console.log("myid---" + id); // Log the ID
                        const response = await fetch(
                            `https://localhost:7232/api/AlternateComponent/alt/${selectedId}/${id}`
                        );
                        if (!response.ok) {
                            throw new Error(`HTTP error! status: ${response.status}`);
                        }
                        const data = await response.json();
                        console.log("iiiiiii" + data); // Log the response data
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
        console.log(`Changing alternate component for ${compId} to ${selectedValue} "hiieee"`);
        setSelectedAlternateComponentIds((prevState) => ({
            ...prevState,
            [compId]: selectedValue,
        }));
        console.log("Alternate Components:____ ", alternateComponents);
    };

    return (
        <div>
            <h1 className="componenthead">Components List</h1>
            <ul>
                {components.map((component, index) => (
                    <li key={index} >
                        <div className="checkbox-wrapper-7">
                            <input
                                id={index}
                                className="tgl tgl-ios"
                                type="checkbox"
                                checked={selectedComponentIds.includes(component.Vehicle.comp.id)}
                                onChange={(e) =>
                                    handleCheckboxChange(component.Vehicle.comp.id, e.target.checked)
                                }
                            />
                            <label className="tgl-btn" for={index}></label></div>
                        <span className="compnamecheckbox">{component.Vehicle.comp.compName}</span>
                        {selectedComponentIds.includes(component.Vehicle.comp.id) && (

                            <select
                                className="custom-select"
                                value={selectedAlternateComponentIds[component.Vehicle.comp.id] || ""}
                                onChange={(e) => {
                                    handleAlternateChange(component.Vehicle.comp.id, e.target.value);
                                }
                                }
                                disabled={!selectedComponentIds.includes(component.Vehicle.comp.id)}
                            >
                                <option value="">Select Alternate Component</option>
                                {alternateComponents[component.Vehicle.comp.id] &&
                                    alternateComponents[component.Vehicle.comp.id].map(
                                        (alternateComponent, index) => (
                                            <option key={index} value={alternateComponent.CompId}>
                                                {/* {console.log("CONSOLE EE ")}
                                                {console.log(alternateComponent)} */}
                                                {alternateComponent.CompName} (Delta Price:{" "}
                                                {alternateComponent.DeltaPrice})
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
