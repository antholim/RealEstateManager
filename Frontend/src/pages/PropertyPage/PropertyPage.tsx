import Sidebar from "../../components/Sidebar/Sidebar"; 
import AddProperty from "./components/AddProperty"
import styles from "./PropertyPage.module.css"
import { useState } from "react"

export default function PropertyPage() {

  return (
    <div className={styles.container}>
      <Sidebar/>
      <main className={styles.main}>
        <AddProperty/>
      </main>
    </div>
  )
}

