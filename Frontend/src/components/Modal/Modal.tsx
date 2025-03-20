import React, { useState, useEffect } from 'react';
import './Modal.css';

const Modal = ({ 
    isOpen, 
    onClose, 
    onSubmit, 
    title = "Title", 
    inputLabel = "Label", 
    inputPlaceholder = "Placeholder", 
    submitButtonText = 'Submit' 
}) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset input value when modal opens
            setInputValue('');
        }
    }, [isOpen]);

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{title}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <div className="modal-input-group">
                            <label className="modal-label">{inputLabel}</label>
                            <input
                                type="text"
                                className="modal-input"
                                value={inputValue}
                                onChange={(e) => setInputValue(e.target.value)}
                                placeholder={inputPlaceholder}
                                autoFocus
                            />
                        </div>
                    </div>
                    <div className="modal-actions">
                        <button 
                            type="button" 
                            className="modal-button modal-button-cancel"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" 
                            className="modal-button modal-button-submit"
                            disabled={!inputValue.trim()}
                        >
                            {submitButtonText}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Modal;