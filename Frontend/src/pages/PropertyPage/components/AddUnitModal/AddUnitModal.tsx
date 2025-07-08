import React, { useEffect, useState } from 'react';
import './AddUnitModal.css';
import { TextField, MenuItem } from '@mui/material';
import { unitTypeOptions } from '../../../../data/UnitType/unitType';
import { IProperty } from '../../../../interfaces/Property';

interface AddUnitModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (unitData: any) => void;
    title?: string;
    submitButtonText?: string;
    property: IProperty;  // Expect a valid property object
}

const AddUnitModal: React.FC<AddUnitModalProps> = ({
    isOpen,
    onClose,
    onSubmit,
    title = "Add Unit",
    submitButtonText = 'Submit',
    property
}) => {
    const [formData, setFormData] = useState({
        unitNumber: '',
        unitType: ''
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    useEffect(() => {
        if (isOpen) {
            setFormData({
                unitNumber: '',
                unitType: ''
            });
            setErrors({});
        }
    }, [isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.unitNumber.trim()) newErrors.unitNumber = "Unit number is required";
        if (!formData.unitType) newErrors.unitType = "Unit type is required";
        return newErrors;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const newErrors = validateForm();
        if (Object.keys(newErrors).length === 0) {
            const payload = {
                ...formData,
                propertyId: property.id,
                rentAmount: parseFloat(formData.rentAmount),
                depositAmount: parseFloat(formData.depositAmount),
            };
            // onSubmit(payload);
        } else {
            setErrors(newErrors);
        }
    };

    const handleOverlayClick = (e: React.MouseEvent) => {
        if (e.target === e.currentTarget) onClose();
    };

    return isOpen ? (
        <div className="modal-overlay" onClick={handleOverlayClick}>
            <div className="modal-container">
                <div className="modal-header">
                    <h2 className="modal-title">{title} — {property?.propertyName || "N/A"}</h2>
                    <button className="modal-close" onClick={onClose}>×</button>
                </div>
                <form onSubmit={handleSubmit}>
                    <div className="modal-content">
                        <TextField
                            label="Unit Number"
                            name="unitNumber"
                            fullWidth
                            margin="normal"
                            value={formData.unitNumber}
                            onChange={handleChange}
                            error={!!errors.unitNumber}
                            helperText={errors.unitNumber}
                        />
                        <TextField
                            select
                            label="Unit Type"
                            name="unitType"
                            fullWidth
                            margin="normal"
                            value={formData.unitType}
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
                            {unitTypeOptions.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

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
    ) : null;
};

export default AddUnitModal;
