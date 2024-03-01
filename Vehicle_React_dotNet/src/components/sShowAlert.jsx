import React from 'react';
import { Modal } from 'react-st-modal';
import '../styles/Alert.css'; // Custom CSS for styling the modal

const AlertModal = ({ message }) => {
    return (
        <div className="alert-modal">
            <h2>{message}</h2>
            <button onClick={() => Modal.close()}>OK</button>
        </div>
    );
};

const showAlert = async (message) => {
    await Modal.open(<AlertModal message={message} />);
};

export default showAlert;
