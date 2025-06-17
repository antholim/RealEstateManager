import type React from "react"

import { useState } from "react"
import { Card } from "../../Dashboard/components/ui/card"
import styles from "./addProperty.module.css"
import { TextField, Button, Typography, Container, Paper } from '@mui/material';

export default function AddProperty() {
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

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Add New Property</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          {errors.address && <span className={styles.error}>{errors.address}</span>}
        </div>
        <div className={styles.formGroup}>
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
            value={formData.units}
            onChange={handleChange}
            required
          />
          <TextField
            label="Purchase Price"
            type="text"
            fullWidth
            margin="normal"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
          />
          <TextField
            label="Property Type"
            type="text"
            fullWidth
            margin="normal"
            value={formData.purchasePrice}
            onChange={handleChange}
            required
          />
          {errors.units && <span className={styles.error}>{errors.units}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Property
        </button>
      </form>
    </Card>
  )
}

