import React, { useState } from "react"
import { Card, Button, Alert } from "react-bootstrap"
import { useAuth } from '../../contexts/AuthContext'
import { Link, useHistory } from "react-router-dom"

export default function DashboardClient() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const history = useHistory()

    async function handleLogout() {
        setError("")
    
        try {
          await logout()
          history.push('/')
        } catch {
          setError('Failed to log out')
        }
      }
  return (
    <div>
      {currentUser.email}
      <button onClick={handleLogout} > Log out </button>

    </div>
  )
}
