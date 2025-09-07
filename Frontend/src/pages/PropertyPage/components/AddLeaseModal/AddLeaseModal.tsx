import React, { useState, useEffect } from 'react';
import './AddLeaseModal.css';
import { TextField, Button, Typography, Container, Paper, MenuItem } from '@mui/material';
import { IProperty } from '../../../../interfaces/Property';
import { fetchPost } from '../../../../services/FetchService';


interface AddLeaseModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (unitData: any) => void;
    title?: string;
    submitButtonText?: string;
    property: IProperty;  // Expect a valid property object
}
const AddLeaseModal: React.FC<AddLeaseModalProps> = ({
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
        unitId:"",
        tenantId: "",
        startDate: '',
        endDate: '',
        monthlyRent: '',
        depositPaid: '',
        status: ''
    });

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
        if (!formData.tenantId.trim()) newErrors.name = "Tenant is required"
        return newErrors
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        const newErrors = validateForm()
        if (Object.keys(newErrors).length === 0) {
            // Here you would typically send the data to your backend
            const response = await fetchPost("/api/v1/lease", {
                body: {
                    ...formData,
                }
            });
            console.log("Form submitted:", formData)
            // Reset form after submission
            setFormData({
                unitId:"",
                tenantId: "",
                startDate: '',
                endDate: '',
                monthlyRent: '',
                depositPaid: '',
                status: ''
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
                                <div className="modal-content">
                                    <TextField
                                        label="Tenant"
                                        type="text"
                                        name="tenant"
                                        fullWidth
                                        margin="normal"
                                        value={formData.tenantId}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />
                                    <TextField
                                        label="Start Date"
                                        type="date"
                                        name="startDate"
                                        fullWidth
                                        margin="normal"
                                        value={formData.startDate}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                        required
                                    />

                                    <TextField
                                        label="End Date"
                                        type="date"
                                        name="endDate"
                                        fullWidth
                                        margin="normal"
                                        value={formData.endDate}
                                        onChange={handleChange}
                                        InputLabelProps={{ shrink: true }}
                                    />

                                    <TextField
                                        label="Monthly Rent"
                                        type="number"
                                        name="monthlyRent"
                                        fullWidth
                                        margin="normal"
                                        value={formData.monthlyRent}
                                        onChange={handleChange}
                                        required
                                    />

                                    <TextField
                                        label="Deposit Paid"
                                        type="number"
                                        name="depositPaid"
                                        fullWidth
                                        margin="normal"
                                        value={formData.depositPaid}
                                        onChange={handleChange}
                                    />

                                    <TextField
                                        select
                                        label="Status"
                                        name="status"
                                        fullWidth
                                        margin="normal"
                                        value={formData.status}
                                        onChange={handleChange}
                                        error={!!errors.unitType}
                                        helperText={errors.unitType}
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
                                        <MenuItem value="ACTIVE">Active</MenuItem>
                                        <MenuItem value="INACTIVE">Inactive</MenuItem>
                                        <MenuItem value="TERMINATED">Terminated</MenuItem>
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

export default AddLeaseModal;