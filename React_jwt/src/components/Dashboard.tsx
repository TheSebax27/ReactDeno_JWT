import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const [protectedData, setProtectedData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [stats] = useState({
    activeUsers: 1247,
    securityLevel: 95,
    lastLogin: new Date().toLocaleString(),
    tokenExpiry: '14:32 minutos'
  });

  const loadProtectedData = async () => {
    if (!token) return;
    
    setLoading(true);
    try {
      const data = await authService.getProtectedData(token);
      setProtectedData(data);
    } catch (error) {
      console.error('Error cargando datos protegidos:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProtectedData();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'Arial, sans-serif'
    },
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '1rem 0'
    },
    headerContent: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    },
    logo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    logoIcon: {
      width: '40px',
      height: '40px',
      backgroundColor: '#667eea',
      borderRadius: '8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px'
    },
    logoText: {
      fontSize: '1.5rem',
      fontWeight: 'bold',
      color: '#333'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userAvatar: {
      width: '40px',
      height: '40px',
      backgroundColor: '#667eea',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '16px'
    },
    userDetails: {
      display: 'flex',
      flexDirection: 'column' as const
    },
    userName: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#333'
    },
    userEmail: {
      fontSize: '0.8rem',
      color: '#666'
    },
    main: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem 1rem'
    },
    welcomeCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap' as const,
      gap: '1rem'
    },
    welcomeText: {
      fontSize: '1.8rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem'
    },
    welcomeSubtext: {
      color: '#666',
      fontSize: '1rem'
    },
    logoutButton: {
      backgroundColor: '#ff4757',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 24px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '15px',
      padding: '1.5rem',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    },
    statHeader: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginBottom: '1rem'
    },
    statTitle: {
      fontSize: '0.9rem',
      color: '#666',
      fontWeight: '500'
    },
    statValue: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333'
    },
    statIcon: {
      fontSize: '2rem'
    },
    contentGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
      gap: '2rem'
    },
    contentCard: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    cardTitle: {
      fontSize: '1.3rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem'
    },
    checkItem: {
      display: 'flex',
      alignItems: 'center',
      gap: '0.5rem',
      marginBottom: '0.8rem',
      color: '#666'
    },
    checkIcon: {
      color: '#27ae60',
      fontSize: '1.2rem'
    },
    loadButton: {
      backgroundColor: '#667eea',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '12px 24px',
      fontSize: '0.9rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '1rem'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      border: '1px solid #c3e6cb',
      color: '#155724',
      padding: '12px',
      borderRadius: '8px',
      marginTop: '1rem',
      fontSize: '0.9rem'
    },
    infoSection: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1rem'
    },
    infoItem: {
      backgroundColor: 'rgba(102, 126, 234, 0.1)',
      padding: '1rem',
      borderRadius: '10px',
      border: '1px solid rgba(102, 126, 234, 0.2)'
    },
    infoTitle: {
      fontSize: '0.9rem',
      fontWeight: '600',
      color: '#333',
      marginBottom: '0.5rem'
    },
    infoValue: {
      fontSize: '0.9rem',
      color: '#666'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(102, 126, 234, 0.3)',
      borderTop: '2px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '2rem auto'
    }
  };

  return (
    <div style={styles.container}>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .stat-card:hover {
            transform: translateY(-5px);
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
          }
          
          .load-button:hover {
            background-color: #5a67d8;
            transform: translateY(-2px);
          }
          
          .logout-button:hover {
            background-color: #ff3742;
            transform: translateY(-2px);
          }
        `}
      </style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🔐</div>
            <div>
              <div style={styles.logoText}>JWT Dashboard</div>
              <div style={{fontSize: '0.8rem', color: '#666'}}>Panel de Acceso Seguro</div>
            </div>
          </div>

          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>👤</div>
            <div style={styles.userDetails}>
              <div style={styles.userName}>{user?.name}</div>
              <div style={styles.userEmail}>{user?.email}</div>
            </div>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.welcomeCard}>
          <div>
            <h2 style={styles.welcomeText}>¡Bienvenido, {user?.name}! 👋</h2>
            <p style={styles.welcomeSubtext}>
              Acceso autenticado correctamente. Tu sesión está protegida con JWT.
            </p>
          </div>
          <button
            onClick={handleLogout}
            style={styles.logoutButton}
            className="logout-button"
          >
            <span>🔓</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>

        <div style={styles.statsGrid}>
          <div style={styles.statCard} className="stat-card">
            <div style={styles.statHeader}>
              <div>
                <div style={styles.statTitle}>Usuarios Activos</div>
                <div style={styles.statValue}>{stats.activeUsers}</div>
              </div>
              <div style={styles.statIcon}>👥</div>
            </div>
          </div>

          <div style={styles.statCard} className="stat-card">
            <div style={styles.statHeader}>
              <div>
                <div style={styles.statTitle}>Nivel de Seguridad</div>
                <div style={{...styles.statValue, color: '#27ae60'}}>{stats.securityLevel}%</div>
              </div>
              <div style={styles.statIcon}>🛡️</div>
            </div>
          </div>

          <div style={styles.statCard} className="stat-card">
            <div style={styles.statHeader}>
              <div>
                <div style={styles.statTitle}>Último Acceso</div>
                <div style={{...styles.statValue, fontSize: '1rem'}}>{stats.lastLogin}</div>
              </div>
              <div style={styles.statIcon}>🕒</div>
            </div>
          </div>

          <div style={styles.statCard} className="stat-card">
            <div style={styles.statHeader}>
              <div>
                <div style={styles.statTitle}>Token Expira en</div>
                <div style={{...styles.statValue, fontSize: '1rem', color: '#f39c12'}}>{stats.tokenExpiry}</div>
              </div>
              <div style={styles.statIcon}>📊</div>
            </div>
          </div>
        </div>

        <div style={styles.contentGrid}>
          <div style={styles.contentCard}>
            <h3 style={styles.cardTitle}>
              <span>🔒</span>
              Datos Protegidos
            </h3>
            
            {loading ? (
              <div style={styles.spinner}></div>
            ) : (
              <div>
                <div style={styles.checkItem}>
                  <span style={styles.checkIcon}>✅</span>
                  <span>Autenticación JWT verificada</span>
                </div>
                <div style={styles.checkItem}>
                  <span style={styles.checkIcon}>✅</span>
                  <span>Acceso a rutas protegidas</span>
                </div>
                <div style={styles.checkItem}>
                  <span style={styles.checkIcon}>✅</span>
                  <span>Token válido y activo</span>
                </div>
                
                <button
                  onClick={loadProtectedData}
                  style={styles.loadButton}
                  className="load-button"
                >
                  Cargar Datos del Servidor
                </button>
                
                {protectedData && (
                  <div style={styles.successMessage}>
                    ✅ Respuesta del servidor: {JSON.stringify(protectedData)}
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={styles.contentCard}>
            <h3 style={styles.cardTitle}>
              <span>📊</span>
              Información de Sesión
            </h3>
            
            <div style={styles.infoSection}>
              <div style={styles.infoItem}>
                <div style={styles.infoTitle}>Usuario Actual</div>
                <div style={styles.infoValue}>{user?.name}</div>
                <div style={styles.infoValue}>{user?.email}</div>
              </div>
              
              <div style={styles.infoItem}>
                <div style={styles.infoTitle}>Estado del Token</div>
                <div style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <div style={{width: '8px', height: '8px', backgroundColor: '#27ae60', borderRadius: '50%'}}></div>
                  <span style={{color: '#27ae60', fontSize: '0.9rem'}}>Activo y válido</span>
                </div>
              </div>
              
              <div style={styles.infoItem}>
                <div style={styles.infoTitle}>Funcionalidades</div>
                <div style={styles.infoValue}>
                  • Autenticación JWT<br/>
                  • Rutas protegidas<br/>
                  • Middleware de validación<br/>
                  • Gestión de sesiones
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};