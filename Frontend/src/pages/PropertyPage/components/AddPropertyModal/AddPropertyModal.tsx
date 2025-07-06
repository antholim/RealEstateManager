import React, { useState, useEffect } from 'react';
import './AddPropertyModal.css';
import { TextField, Button, Typography, Container, Paper, MenuItem } from '@mui/material';
import { propertyTypeOptions } from '../../../../data/PropertyType/propertyType';
import { fetchPost } from '../../../../services/FetchService';


const AddPropertyModal = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Title",
    submitButtonText = 'Submit'
}) => {
    const [inputValue, setInputValue] = useState('');


    useEffect(() => {
        if (isOpen) {
            setFormData({
                name: "",
                address: "",
                purchasePrice: "",
                propertyType: ""
            });
            setErrors({});
        }
    }, [isOpen]);

    const [formData, setFormData] = useState({
        name: "",
        address: "",
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
        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = validateForm()
        if (Object.keys(newErrors).length === 0) {
            try {
                const response = await fetchPost("/api/v1/property", {
                    body: {
                        formData
                    }
                });
                console.log("Form submitted:", formData);
                // Reset form after submission
                setFormData({
                    name: "",
                    address: "",
                    purchasePrice: "",
                    propertyType: ""
                });
            } catch (e) {
                console.error(e);
            }
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
                            <h2 className="modal-title">{title}</h2>
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
                                        label="Purchase Price"
                                        type="text"
                                        fullWidth
                                        name="purchasePrice"
                                        margin="normal"
                                        value={formData.purchasePrice}
                                        onChange={handleChange}
                                        required
                                    />
                                    <TextField
                                        select
                                        label="Property Type"
                                        name="propertyType"
                                        fullWidth
                                        margin="normal"
                                        value={formData.propertyType}
                                        onChange={handleChange}
                                        error={!!errors.propertyType}
                                        helperText={errors.propertyType}
                                        SelectProps={{
                                            MenuProps: {
                                                disablePortal: true,
                                                PaperProps: {
                                                    style: {
                                                        zIndex: 2147483647,
                                                    },
                                                },
                                            },
                                        }}
                                    >
                                        {propertyTypeOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </TextField>
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
                                >
                                    {submitButtonText}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>) : <></>
    );
};

export default AddPropertyModal;