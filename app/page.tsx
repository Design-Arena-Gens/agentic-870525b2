'use client'

import { useState, useEffect } from 'react'

interface Alert {
  id: string
  timestamp: Date
  location: string
  status: 'active' | 'resolved'
  severity: 'critical' | 'high' | 'medium'
}

export default function PanicButtonDashboard() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [panicActive, setPanicActive] = useState(false)
  const [activeAlerts, setActiveAlerts] = useState(0)

  useEffect(() => {
    const active = alerts.filter(a => a.status === 'active').length
    setActiveAlerts(active)
  }, [alerts])

  const triggerPanic = () => {
    setPanicActive(true)
    const newAlert: Alert = {
      id: Date.now().toString(),
      timestamp: new Date(),
      location: 'Main Office',
      status: 'active',
      severity: 'critical'
    }
    setAlerts([newAlert, ...alerts])

    setTimeout(() => setPanicActive(false), 2000)
  }

  const resolveAlert = (id: string) => {
    setAlerts(alerts.map(alert =>
      alert.id === id ? { ...alert, status: 'resolved' as const } : alert
    ))
  }

  const clearAll = () => {
    setAlerts([])
  }

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3a8a 0%, #1e1e1e 100%)',
      color: 'white',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <div style={{
        padding: '20px 40px',
        background: 'rgba(0, 0, 0, 0.3)',
        borderBottom: '2px solid rgba(255, 255, 255, 0.1)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <h1 style={{ margin: 0, fontSize: '28px', fontWeight: '700' }}>
          🚨 Emergency Dashboard
        </h1>
        <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <div style={{
            padding: '10px 20px',
            background: activeAlerts > 0 ? '#dc2626' : '#16a34a',
            borderRadius: '8px',
            fontWeight: '600'
          }}>
            Active Alerts: {activeAlerts}
          </div>
          <div style={{ fontSize: '14px', opacity: 0.8 }}>
            {new Date().toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: '40px' }}>
        {/* Panic Button Section */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <button
            onClick={triggerPanic}
            disabled={panicActive}
            style={{
              width: '300px',
              height: '300px',
              borderRadius: '50%',
              border: panicActive ? '8px solid #fbbf24' : '8px solid #dc2626',
              background: panicActive
                ? 'linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%)'
                : 'linear-gradient(135deg, #dc2626 0%, #991b1b 100%)',
              color: 'white',
              fontSize: '36px',
              fontWeight: '900',
              cursor: panicActive ? 'not-allowed' : 'pointer',
              boxShadow: panicActive
                ? '0 0 60px rgba(251, 191, 36, 0.8)'
                : '0 20px 60px rgba(220, 38, 38, 0.5)',
              transition: 'all 0.3s ease',
              transform: panicActive ? 'scale(1.1)' : 'scale(1)',
              animation: panicActive ? 'pulse 0.5s infinite' : 'none'
            }}
            onMouseEnter={(e) => {
              if (!panicActive) {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 25px 70px rgba(220, 38, 38, 0.7)'
              }
            }}
            onMouseLeave={(e) => {
              if (!panicActive) {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(220, 38, 38, 0.5)'
              }
            }}
          >
            {panicActive ? 'ALERT SENT!' : 'PANIC BUTTON'}
          </button>
          <p style={{
            marginTop: '30px',
            fontSize: '18px',
            opacity: 0.9,
            fontWeight: '500'
          }}>
            {panicActive ? '⚠️ Emergency services have been notified' : 'Click to trigger emergency alert'}
          </p>
        </div>

        {/* Alert History */}
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '20px'
          }}>
            <h2 style={{ fontSize: '24px', fontWeight: '600' }}>Alert History</h2>
            {alerts.length > 0 && (
              <button
                onClick={clearAll}
                style={{
                  padding: '10px 20px',
                  background: 'rgba(239, 68, 68, 0.2)',
                  border: '1px solid #ef4444',
                  borderRadius: '6px',
                  color: 'white',
                  cursor: 'pointer',
                  fontWeight: '500'
                }}
              >
                Clear All
              </button>
            )}
          </div>

          {alerts.length === 0 ? (
            <div style={{
              padding: '60px',
              textAlign: 'center',
              background: 'rgba(255, 255, 255, 0.05)',
              borderRadius: '12px',
              border: '1px solid rgba(255, 255, 255, 0.1)'
            }}>
              <p style={{ fontSize: '18px', opacity: 0.6 }}>No alerts recorded</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {alerts.map(alert => (
                <div
                  key={alert.id}
                  style={{
                    padding: '20px',
                    background: alert.status === 'active'
                      ? 'rgba(220, 38, 38, 0.2)'
                      : 'rgba(255, 255, 255, 0.05)',
                    border: alert.status === 'active'
                      ? '2px solid #dc2626'
                      : '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '10px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flex: 1 }}>
                    <div style={{
                      width: '12px',
                      height: '12px',
                      borderRadius: '50%',
                      background: alert.status === 'active' ? '#dc2626' : '#22c55e',
                      animation: alert.status === 'active' ? 'blink 1s infinite' : 'none'
                    }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '16px', fontWeight: '600', marginBottom: '5px' }}>
                        Emergency Alert - {alert.location}
                      </div>
                      <div style={{ fontSize: '14px', opacity: 0.7 }}>
                        {alert.timestamp.toLocaleString()} • Severity: {alert.severity.toUpperCase()}
                      </div>
                    </div>
                    <div style={{
                      padding: '6px 16px',
                      background: alert.status === 'active' ? '#dc2626' : '#16a34a',
                      borderRadius: '20px',
                      fontSize: '14px',
                      fontWeight: '600'
                    }}>
                      {alert.status.toUpperCase()}
                    </div>
                  </div>
                  {alert.status === 'active' && (
                    <button
                      onClick={() => resolveAlert(alert.id)}
                      style={{
                        padding: '10px 20px',
                        background: '#16a34a',
                        border: 'none',
                        borderRadius: '6px',
                        color: 'white',
                        cursor: 'pointer',
                        fontWeight: '500',
                        marginLeft: '20px'
                      }}
                    >
                      Resolve
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stats Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '20px',
          marginTop: '40px',
          maxWidth: '1200px',
          margin: '40px auto 0'
        }}>
          <div style={{
            padding: '30px',
            background: 'rgba(220, 38, 38, 0.15)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px' }}>
              {alerts.filter(a => a.status === 'active').length}
            </div>
            <div style={{ fontSize: '16px', opacity: 0.8 }}>Active Emergencies</div>
          </div>
          <div style={{
            padding: '30px',
            background: 'rgba(34, 197, 94, 0.15)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px' }}>
              {alerts.filter(a => a.status === 'resolved').length}
            </div>
            <div style={{ fontSize: '16px', opacity: 0.8 }}>Resolved</div>
          </div>
          <div style={{
            padding: '30px',
            background: 'rgba(59, 130, 246, 0.15)',
            border: '1px solid rgba(59, 130, 246, 0.3)',
            borderRadius: '12px'
          }}>
            <div style={{ fontSize: '36px', fontWeight: '700', marginBottom: '10px' }}>
              {alerts.length}
            </div>
            <div style={{ fontSize: '16px', opacity: 0.8 }}>Total Alerts</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.7; }
        }
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.3; }
        }
      `}</style>
    </div>
  )
}
