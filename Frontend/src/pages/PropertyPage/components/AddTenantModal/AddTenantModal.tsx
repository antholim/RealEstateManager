import React, { useState, useEffect } from 'react';
import './AddTenantModal.css';
import { TextField, Button, Typography, Container, Paper, MenuItem } from '@mui/material';
import { fetchPost } from '../../../../services/FetchService';


interface AddTenantModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (unitData: any) => void;
    title?: string;
    submitButtonText?: string;
}

const AddTenantModal: React.FC<AddTenantModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Add Tenant",
    submitButtonText = 'Add Tenant'
}) => {
    const [inputValue, setInputValue] = useState('');

    useEffect(() => {
        if (isOpen) {
            // Reset input value when modal opens
            setInputValue('');
        }
    }, [isOpen]);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        status: "PROSPECT"
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
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required"
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required"
        if (!formData.email.trim()) {
            newErrors.email = "Email is required"
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email format is invalid"
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required"
        } else if (!/^\+?[\d\s\-\(\)]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Phone number format is invalid"
        }
        return newErrors
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newErrors = validateForm()
        if (Object.keys(newErrors).length === 0) {
            const response = await fetchPost("/api/v1/tenant", {
                body: {
                    ...formData,
                }
            });
            // Here you would typically send the data to your backend
            console.log("Form submitted:", formData)
            onSubmit(formData)
            // Reset form after submission
            setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                status: "PROSPECT"
            })
            setInputValue('')
            onClose()
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
                                        label="First Name"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        error={!!errors.firstName}
                                        helperText={errors.firstName}
                                        required
                                    />
                                    <TextField
                                        label="Last Name"
                                        type="text"
                                        fullWidth
                                        margin="normal"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        error={!!errors.lastName}
                                        helperText={errors.lastName}
                                        required
                                    />
                                    <TextField
                                        label="Email"
                                        type="email"
                                        fullWidth
                                        margin="normal"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        error={!!errors.email}
                                        helperText={errors.email}
                                        required
                                    />
                                    <TextField
                                        label="Phone Number"
                                        type="tel"
                                        fullWidth
                                        margin="normal"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        error={!!errors.phone}
                                        helperText={errors.phone}
                                        placeholder="(555) 123-4567"
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
                                >
                                    {submitButtonText}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>) : <></>
    );
};

export default AddTenantModal;