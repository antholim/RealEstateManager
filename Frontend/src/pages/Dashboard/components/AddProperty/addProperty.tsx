import type React from "react"

import { useState } from "react"
import { Card } from "../ui/card"
import styles from "./addProperty.module.css"

export function AddProperty() {
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    units: "",
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
          <label htmlFor="name" className={styles.label}>
            Property Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.name && <span className={styles.error}>{errors.name}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="address" className={styles.label}>
            Address
          </label>
          <input
            type="text"
            id="address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.address && <span className={styles.error}>{errors.address}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="units" className={styles.label}>
            Number of Units
          </label>
          <input
            type="number"
            id="units"
            name="units"
            value={formData.units}
            onChange={handleChange}
            className={styles.input}
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

