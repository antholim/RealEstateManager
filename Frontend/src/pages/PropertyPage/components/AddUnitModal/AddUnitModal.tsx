import React, { useState, useEffect } from 'react';
import './AddUnitModal.css';
import { TextField, Button, Typography, Container, Paper, MenuItem } from '@mui/material';
import { propertyTypeOptions } from '../../../../data/PropertyType/propertyType';


const AddUnitModal = ({
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
        name: "",
        address: "",
        units: "",
        purchasePrice: "",
        propertyType: ""
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
        if (!formData.address.trim()) newErrors.address = "Address is required"
        if (!formData.units.trim()) newErrors.units = "Number of units is required"
        else if (isNaN(Number(formData.units))) newErrors.units = "Units must be a number"
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
                address: "",
                units: "",
                purchasePrice: "",
                propertyType: ""
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
                            <h2 className="modal-title">{title} {property?.propertyName ? property.propertyName : "Invalid"} </h2>
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
                                    <TextField
                                        label="Address"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        label="Number of Units"
                                        type="number"
                                        fullWidth
                                        margin="normal"
                                        name="units"
                                        value={formData.units}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        label="Purchase Price"
                                        type="text"
                                        fullWidth
                                        name="purchasePrice"
                                        margin="normal"
                                        value={formData.purchasePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                    <div className="form-field">
                                        <label htmlFor="propertyType">
                                            Property Type *
                                        </label>
                                        <select
                                            id="propertyType"
                                            name="propertyType"
                                            value={formData.propertyType}
                                            onChange={handleChange}
                                            required
                                            className="form-select"
                                        >
                                            <option value="" disabled>
                                                Select Property Type
                                            </option>
                                            {propertyTypeOptions.map((option) => (
                                                <option key={option.value} value={option.value}>
                                                    {option.label}
                                                </option>
                                            ))}
                                        </select>
                                    </div>
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

export default AddUnitModal;