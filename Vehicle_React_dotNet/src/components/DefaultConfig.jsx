import React from 'react';

const DefaultConfig = ({ vehicleComponents, modelDetails }) => {
  return (
    <div className="default-container">
      <div className="model-details">
        <h3>Model Details</h3>
        <p><strong>Model Name:</strong> {modelDetails.modName}</p>
        <p><strong>Price:</strong> {modelDetails.price}</p>
        <p><strong>Safety Rating:</strong> {modelDetails.safetyRating}</p>
        <p><strong>Minimum Quantity:</strong> {modelDetails.minQty}</p>
        {modelDetails.image_path && (
          <div className="vehicle-image">
            <h3>Vehicle Image</h3>
            <img src={modelDetails.image_path} alt="Vehicle Image" />
          </div>
        )}
      </div>
      <div className="vehicle-details">
        <h3>Vehicle Components</h3>
        <ul>
          {vehicleComponents.map(component => (
            <li key={component.comp_id}>
              <strong>{component.comp_name}</strong> - Configurable: {component.is_configurable}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default DefaultConfig;
