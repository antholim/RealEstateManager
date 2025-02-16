"use client"

import type React from "react"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import styles from "./add-tenant.module.css"

export function AddTenant() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    property: "",
    unit: "",
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
    if (!formData.email.trim()) newErrors.email = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = "Email is invalid"
    if (!formData.phone.trim()) newErrors.phone = "Phone is required"
    if (!formData.property.trim()) newErrors.property = "Property is required"
    if (!formData.unit.trim()) newErrors.unit = "Unit is required"
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
        email: "",
        phone: "",
        property: "",
        unit: "",
      })
    } else {
      setErrors(newErrors)
    }
  }

  return (
    <Card className={styles.card}>
      <h2 className={styles.title}>Add New Tenant</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.formGroup}>
          <label htmlFor="name" className={styles.label}>
            Name
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
          <label htmlFor="email" className={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.email && <span className={styles.error}>{errors.email}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="phone" className={styles.label}>
            Phone
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.phone && <span className={styles.error}>{errors.phone}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="property" className={styles.label}>
            Property
          </label>
          <input
            type="text"
            id="property"
            name="property"
            value={formData.property}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.property && <span className={styles.error}>{errors.property}</span>}
        </div>
        <div className={styles.formGroup}>
          <label htmlFor="unit" className={styles.label}>
            Unit
          </label>
          <input
            type="text"
            id="unit"
            name="unit"
            value={formData.unit}
            onChange={handleChange}
            className={styles.input}
          />
          {errors.unit && <span className={styles.error}>{errors.unit}</span>}
        </div>
        <button type="submit" className={styles.submitButton}>
          Add Tenant
        </button>
      </form>
    </Card>
  )
}

