import { useState, useEffect } from 'react';
import { Card } from "../ui/card"
import styles from "./tenantList.module.css"
import { Select } from "../ui/select"
import { fetchGet, fetchDelete } from "../../../../services/FetchService"
import TenantDetailModal from "./TenantDetailModal/TenantDetailModal"

interface TenantData {
    id: number;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    propertyId?: number;
    propertyName?: string;
    status?: string;
}

const options = [
  {value : "All", label : "All Tenants"},
  {value : "ACTIVE", label : "Active"},
  {value : "FORMER", label : "Former"},
]

export function TenantList() {
  const [tenants, setTenants] = useState<TenantData[]>([]);
  const [filter, setFilter] = useState('All');
  const [selectedTenant, setSelectedTenant] = useState<TenantData | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);

  const loadTenants = async () => {
    try {
      const res = await fetchGet<any>('/api/v1/tenant');
      setTenants(res?.payload || []);
    } catch (error) {
      console.error('Failed to load tenants:', error);
    }
  };

  useEffect(() => {
    loadTenants();
  }, []);

  const handleDelete = async (id: number) => {
    if (!window.confirm('Mark this tenant as former?')) return;
    try {
      await fetchDelete(`/api/v1/tenant/${id}`);
      loadTenants();
    } catch (error) {
      console.error('Failed to delete tenant:', error);
    }
  };

  const filteredTenants = filter === 'All'
    ? tenants
    : tenants.filter(t => (t.status || 'ACTIVE') === filter);

  return (
    <div className={styles.container}>
      <Select options={options} onChange={(e: any) => setFilter(e.target.value)} />
      <div className={styles.grid}>
        {filteredTenants.map((tenant) => (
          <Card key={tenant.id} className={styles.card}>
            <div className={styles.cardHeader}>
              <h3 className={styles.tenantName}>{tenant.firstName} {tenant.lastName}</h3>
              <span className={`${styles.statusBadge} ${(tenant.status || 'ACTIVE') === 'ACTIVE' ? styles.statusActive : styles.statusFormer}`}>
                {tenant.status || 'ACTIVE'}
              </span>
            </div>
            <p className={styles.tenantInfo}>
              <strong>Email:</strong> {tenant.email || "N/A"}
            </p>
            <p className={styles.tenantInfo}>
              <strong>Phone:</strong> {tenant.phone}
            </p>
            <p className={styles.tenantInfo}>
              <strong>Property:</strong> {tenant.propertyName || "N/A"}
            </p>
            <div className={styles.cardActions}>
              <button className={styles.viewBtn} onClick={() => { setSelectedTenant(tenant); setIsDetailOpen(true); }}>
                View Details
              </button>
              {(tenant.status || 'ACTIVE') === 'ACTIVE' && (
                <button className={styles.deleteBtn} onClick={() => handleDelete(tenant.id)}>
                  Mark Former
                </button>
              )}
            </div>
          </Card>
        ))}
        {filteredTenants.length === 0 && (
          <p className={styles.empty}>No tenants found.</p>
        )}
      </div>
      <TenantDetailModal
        isOpen={isDetailOpen}
        onClose={() => { setIsDetailOpen(false); setSelectedTenant(null); }}
        tenant={selectedTenant}
      />
    </div>
  )
}
