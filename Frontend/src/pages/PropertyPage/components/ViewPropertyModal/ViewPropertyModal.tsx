import React, { useState, useEffect } from 'react';
import './ViewPropertyModal.css';
import { TextField } from '@mui/material';
import { propertyTypeOptions } from '../../../../data/PropertyType/propertyType';
import { fetchPut } from '../../../../services/FetchService';
import { IProperty } from '../../../../interfaces/Property';

interface ViewPropertyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (value: any) => void;
    title?: string;
    submitButtonText?: string;
    property?: IProperty | null;
}

const ViewPropertyModal = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Property Info",
    submitButtonText = 'Update Property',
    property
}: ViewPropertyModalProps) => {
    const [formData, setFormData] = useState({
        propertyName: "",
        address: "",
        purchasePrice: "",
        propertyType: "",
        notes: ""
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen && property) {
            setFormData({
                propertyName: property.propertyName || "",
                address: property.address || "",
                purchasePrice: property.purchasePrice ? String(property.purchasePrice) : "",
                propertyType: property.propertyType || "",
                notes: property.notes || ""
            });
        }
    }, [isOpen, property]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.propertyName.trim()) newErrors.propertyName = "Name is required";
        if (!formData.address.trim()) newErrors.address = "Address is required";
        return newErrors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        if (property) {
            try {
                await fetchPut(`/api/v1/property/${property.id}`, {
                    body: {
                        propertyName: formData.propertyName,
                        address: formData.address,
                        purchasePrice: Number(formData.purchasePrice),
                        propertyType: formData.propertyType,
                        notes: formData.notes
                    }
                });
                onSubmit(formData);
                onClose();
            } catch (error) {
                console.error('Failed to update property:', error);
            }
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        isOpen ? (
            <div className="modal-overlay" onClick={handleOverlayClick}>
                <div className="modal-container">
                    <div className="modal-header">
                        <h2 className="modal-title">{title}</h2>
                        <button className="modal-close" onClick={onClose}>&times;</button>
                    </div>
                    <form onSubmit={handleSubmit}>
                        <div className="modal-content">
                            <div className="modal-input-group">
                                <TextField
                                    label="Property Name"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    name="propertyName"
                                    value={formData.propertyName}
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
                                />
                                <div className="form-field">
                                    <label htmlFor="propertyType">Property Type *</label>
                                    <select
                                        id="propertyType"
                                        name="propertyType"
                                        value={formData.propertyType}
                                        onChange={handleChange}
                                        required
                                        className="form-select"
                                    >
                                        <option value="" disabled>Select Property Type</option>
                                        {propertyTypeOptions.map((option) => (
                                            <option key={option.value} value={option.value}>
                                                {option.label}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                                <TextField
                                    label="Notes"
                                    type="text"
                                    fullWidth
                                    margin="normal"
                                    name="notes"
                                    value={formData.notes}
                                    onChange={handleChange}
                                    multiline
                                    rows={3}
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
            </div>
        ) : null
    );
};

export default ViewPropertyModal;
