// Import React and necessary hooks
import React, { useState, useEffect, useContext } from "react";
import { useParams, Route } from "react-router-dom";
import AlternateModifier from "./AlternateModifier";
import "../styles/configurator.css";

import { useNavigate } from 'react-router-dom';
import { ResetContext } from "../Contexts/ResetContext";
// Define the Configurator component
export const Configurator = (props) => {
  // Define state variables
  const [segments, setSegments] = useState([]);
  const [selectedSegment, setSelectedSegment] = useState("");
  const [selectedManufacturer, setSelectedManufacturer] = useState("");
  const [manufacturers, setManufacturers] = useState([]);
  const [models, setModels] = useState([]);
  const [selectedModel, setSelectedModel] = useState("");
  const [components, setComponents] = useState([]);
  const [selectedModelDetails, setSelectedModelDetails] = useState({});
  const [exteriorComponents, setExteriorComponents] = useState([]);
  const [interiorComponents, setInteriorComponents] = useState([]);
  const [coreComponents, setCoreComponents] = useState([]);
  const [orderSize, setOrderSize] = useState(1);
  const { segmentSelectedTop, setSegmentSelectedTop } = useContext(ResetContext);
  // Load order size from session storage on component mount
  useEffect(() => {
    const storedOrderSize = sessionStorage.getItem("orderSize");
    if (storedOrderSize) {
      setOrderSize(parseInt(storedOrderSize));
    }
  }, []);

  // Update order size in session storage whenever it changes
  useEffect(() => {
    sessionStorage.setItem("orderSize", orderSize);
  }, [orderSize]);

  ///////////////////////
  useEffect(() => {
    setSelectedSegment("");
    setComponents([]);
    setCoreComponents([]);
    setSelectedModel("");
    setSelectedManufacturer("");
    setInteriorComponents([]);
    setExteriorComponents([]);
    setModels([]);
    setManufacturers([]);
    setSelectedModelDetails({});
    setOrderSize(1);
    //alert("Resettinggggggggg");
  }, [segmentSelectedTop]);
  ///////////////////////

  // Fetch segments on component mount
  useEffect(() => {
    fetchSegments();
  }, []);

  // Fetch models when selected segment or manufacturer changes
  useEffect(() => {
    if (selectedModel) {
      fetchComponents(selectedModel);
      fetchExteriorComponents(selectedModel);
      fetchInteriorComponents(selectedModel);
      fetchCoreComponents(selectedModel);
      fetchModelDetails(selectedModel);
    }
  }, [selectedModel]);

  // Fetch segments from API
  const fetchSegments = () => {
    fetch("http://localhost:8080/api/segments/")
      .then(response => response.json())
      .then(data => {
        setSegments(data);
      });
  };

  // Fetch manufacturers based on selected segment
  const fetchManufacturers = (segmentId) => {
    fetch(`http://localhost:8080/api/manufacturers/${segmentId}`)
      .then(response => response.json())
      .then(data => {
        setManufacturers(data);
      })
      .catch(error => {
        console.error("Error fetching manufacturers:", error);
      });
  };

  // Fetch models based on selected segment and manufacturer
  const fetchModels = (segmentId, manufacturerId) => {
    fetch(`http://localhost:8080/api/models/${manufacturerId}/${segmentId}`)
      .then(response => response.json())
      .then(data => {
        setModels(data);
      })
      .catch(error => {
        console.error("Error fetching models:", error);
      });
  };

  // Fetch details of the selected model
  const fetchModelDetails = (modelId) => {
    fetch(`http://localhost:8080/api/models/${modelId}`)
      .then(response => response.json())
      .then(data => {
        setSelectedModelDetails(data);
        sessionStorage.setItem('selectedModelDetails', JSON.stringify(data));
        // Set order size after setting selectedModelDetails
        setOrderSize(data.minQty);
      })
      .catch(error => {
        console.error("Error fetching model details:", error);
      });
  };

  // Fetch components for the selected model
  const fetchComponents = (modelId) => {
    fetch(`http://localhost:8080/api/vehicles/S/${modelId}`)
      .then(response => response.json())
      .then(data => {
        setComponents(data);
      })
      .catch(error => {
        console.error("Error fetching components:", error);
      });
  };

  // Fetch exterior components for the selected model
  const fetchExteriorComponents = (modelId) => {
    fetch(`http://localhost:8080/api/vehicles/E/${modelId}`)
      .then(response => response.json())
      .then(data => {
        setExteriorComponents(data);
      })
      .catch(error => {
        console.error("Error fetching exterior components:", error);
      });
  };

  // Fetch interior components for the selected model
  const fetchInteriorComponents = (modelId) => {
    fetch(`http://localhost:8080/api/vehicles/I/${modelId}`)
      .then(response => response.json())
      .then(data => {
        setInteriorComponents(data);
      })
      .catch(error => {
        console.error("Error fetching interior components:", error);
      });
  };

  // Fetch core components for the selected model
  const fetchCoreComponents = (modelId) => {
    fetch(`http://localhost:8080/api/vehicles/C/${modelId}`)
      .then(response => response.json())
      .then(data => {
        setCoreComponents(data);
      })
      .catch(error => {
        console.error("Error fetching core components:", error);
      });
  };

  // Handle change in segment selection
  const handleSegmentChange = (event) => {
    const segmentId = event.target.value;
    setSelectedSegment(segmentId);
    setSelectedManufacturer("");
    setManufacturers([]);
    setModels([]);
    fetchManufacturers(segmentId);
  };

  // Handle change in manufacturer selection
  const handleManufacturerChange = (event) => {
    const manufacturerId = event.target.value;
    setSelectedManufacturer(manufacturerId);
    setModels([]);
    fetchModels(selectedSegment, manufacturerId);
  };

  // Handle change in model selection
  const handleModelChange = (event) => {
    const selectedModelId = event.target.value;
    setSelectedModel(selectedModelId);
    fetchModelDetails(selectedModelId);
    fetchComponents(selectedModelId);
    // setOrderSize(selectedModelDetails.minQty);
  };

  // Function to increment order size
  const incrementOrderSize = () => {
    setOrderSize(prevSize => prevSize + 1);
  };

  // Function to decrement order size without going below minimum quantity
  const decrementOrderSize = () => {
    if (orderSize > selectedModelDetails.minQty) {
      setOrderSize(prevSize => prevSize - 1);
    }
  };

  // Initialize the navigate function
  const navigate = useNavigate();

  // Handle click event for continuing as default
  const handleDefaultClick = () => {
    console.log("Selected Model ID:", selectedModelDetails.id);
    console.log("Order Size:", orderSize);
    navigate('/DefaultInvoiceGenerator', { state: { selectedId: selectedModelDetails.id, orderSize: orderSize } });
  };



  // Handle click event for modifying
  const handleModifyClick = () => {
    navigate('/AlternateModifier/', { state: { selectedId: selectedModelDetails.id, orderSize: orderSize} });
  };

  // Render the component
  return (
    <div id="configurator" className="text-center">
      <div className="container">
        <div className="section-title">
          <h2>Configure here</h2>
        </div>
        <div className="row justify-content-center text-center">
          <div className="col-md-3 mb-3">
            <h3>Segment</h3>
            <select
              className="custom-select"
              value={selectedSegment ?? "hello"}
              onChange={handleSegmentChange}
            >
              <option value="">Select Segment</option>
              {segments.map((segment) => (
                <option key={segment.id} value={segment.id}>
                  {segment.name}
                </option>
              ))}
            </select>
          </div>
          <div className={`col-md-3 mb-3 ${selectedSegment ? "" : "disabled"}`}>
            <h3>Manufacturer</h3>
            <select
              className="custom-select"
              value={selectedManufacturer}
              onChange={handleManufacturerChange}
              disabled={!selectedSegment}
            >
              <option value="">Select Manufacturer</option>
              {manufacturers.map((manufacturer) => (
                <option key={manufacturer.id} value={manufacturer.id}>
                  {manufacturer.name}
                </option>
              ))}
            </select>
          </div>
          <div
            className={`col-md-3 mb-3 ${selectedManufacturer ? "" : "disabled"}`}
          >
            <h3>Model</h3>
            <select
              className="custom-select"
              value={selectedModel}
              onChange={handleModelChange}
              disabled={!selectedManufacturer}
            >
              <option value="">Select Model</option>
              {models.map((model) => (
                <option key={model.id} value={model.id}>
                  {model.modName}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Display Selected Model Details and Components Section */}
        {selectedModel && (
          <div className="row mt-4 models-section">
            <div className="col-md-4 model-details-container">
              <div className="card card-container model-details-wrapper">
                <div className="card-body model-details">
                  <h3>Selected Model Details</h3>
                  <img src={`${selectedModelDetails.imagePath}`} alt="Model Image" />
                  <div>
                    <p>Base Price: {selectedModelDetails.price}</p>
                    <p>
                      Minimum Quantity: {selectedModelDetails.minQty}
                      <button className="btn btn-sm btn-primary ml-2" onClick={incrementOrderSize}>+</button>

                      <button className="btn btn-sm btn-primary" onClick={decrementOrderSize}>-</button>
                      <br></br>
                      <span className="ml-1 mr-1">Order Size: {orderSize}</span>
                    </p>
                  </div>
                </div>
              </div>
              <div className="model-buttons">
                <button className="btn btn-primary" onClick={handleDefaultClick}>
                  Continue as Default
                </button>
                <button className="btn btn-secondary" onClick={handleModifyClick}>
                  Modify
                </button>
              </div>
            </div>

            {/* Components Section */}
            <div className="col-md-8">
              <h3>Default Configuration of the Model is as follows:</h3>
              <div className="components-grid">
                {/* Standard Components */}
                <div className="card card-container">
                  <div className="card-body component-list">
                    <h4>Standard Components</h4>
                    <ul>
                      {components.map((component) => (
                        <li key={component.comp_id}>
                          <strong>&#8226;</strong> {component.comp_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Exterior Components */}
                <div className="card card-container">
                  <div className="card-body component-list">
                    <h4>Exterior Components</h4>
                    <ul>
                      {exteriorComponents.map((component) => (
                        <li key={component.comp_id}>
                          <strong>&#8226;</strong> {component.comp_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Interior Components */}
                <div className="card card-container">
                  <div className="card-body component-list">
                    <h4>Interior Components</h4>
                    <ul>
                      {interiorComponents.map((component) => (
                        <li key={component.comp_id}>
                          <strong>&#8226;</strong> {component.comp_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Core Components */}
                <div className="card card-container">
                  <div className="card-body component-list">
                    <h4>Core Components</h4>
                    <ul>
                      {coreComponents.map((component) => (
                        <li key={component.comp_id}>
                          <strong>&#8226;</strong> {component.comp_name}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Configurator;
