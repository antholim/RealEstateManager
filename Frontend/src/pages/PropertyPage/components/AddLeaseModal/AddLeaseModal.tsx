import React, { useState, useEffect } from 'react';
import './AddLeaseModal.css';
import { TextField, Button, Typography, Container, Paper, MenuItem } from '@mui/material';
import { IProperty } from '../../../../interfaces/Property';


interface AddLeaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (unitData: any) => void;
    title?: string;
    submitButtonText?: string;
    property: IProperty;  // Expect a valid property object
}
const AddLeaseModal : React.FC<AddLeaseModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Title",
    submitButtonText = 'Submit',
    property
}) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset input value when modal opens
            setInputValue('');
        }
    }, [isOpen]);

    const [formData, setFormData] = useState({
        name: ""
    })

    const [errors, setErrors] = useState<Record<string, string>>({})

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }))
    }

    const validateForm = () => {
        const newErrors: Record<string, string> = {}
        if (!formData.name.trim()) newErrors.name = "Name is required"
        return newErrors
    }

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = validateForm()
        if (Object.keys(newErrors).length === 0) {
            // Here you would typically send the data to your backend
            console.log("Form submitted:", formData)
            // Reset form after submission
            setFormData({
                name: "",
            })
        } else {
            setErrors(newErrors)
        }
    }

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        isOpen ?
            (
                <div className="modal-overlay" onClick={handleOverlayClick}>
                    <div className="modal-container">
                        <div className="modal-header">
                            <h2 className="modal-title">{title} — {property?.propertyName || "N/A"}</h2>
                            <button className="modal-close" onClick={onClose}>×</button>
                        </div>
                        <form onSubmit={handleSubmit}>
                            <div className="modal-content">
                                <div className="modal-input-group">
                                    <TextField
                                        label="Property Name"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
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
                </div>) : <></>
    );
};

export default AddLeaseModal;