import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';

export const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [stats] = useState({
    activeUsers: 1247,
    securityLevel: 95,
    lastLogin: new Date().toLocaleString(),
    tokenExpiry: '14:32 minutos'
  });

  const loadUsers = async () => {
    if (!token) return;
    
    setLoading(true);
    setError('');
    try {
      const response = await authService.getAllUsers(token);
      if (response.success) {
        setUsers(response.data);
      } else {
        setError(response.msg || 'Error al cargar usuarios');
      }
    } catch (error) {
      setError('Error de conexión al servidor');
      console.error('Error cargando usuarios:', error);
    } finally {
      setLoading(false);
    }
  };

  const viewUserDetails = async (userId) => {
    try {
      const response = await authService.getUserById(token, userId);
      if (response.success) {
        setSelectedUser(response.data);
        setShowUserModal(true);
      }
    } catch (error) {
      console.error('Error al obtener detalles del usuario:', error);
    }
  };

  useEffect(() => {
    loadUsers();
  }, [token]);

  const handleLogout = () => {
    logout();
  };

  const styles = {
    container: {
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 50%, #1a1a1a 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      color: '#ffffff'
    },
    header: {
      backgroundColor: 'rgba(0, 0, 0, 0.95)',
      backdropFilter: 'blur(20px)',
      borderBottom: '2px solid #dc2626',
      padding: '1.5rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 8px 32px rgba(220, 38, 38, 0.3)'
    },
    headerContent: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '0 2rem',
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
      width: '55px',
      height: '55px',
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      borderRadius: '15px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '28px',
      boxShadow: '0 8px 25px rgba(220, 38, 38, 0.4)',
      border: '2px solid rgba(255, 255, 255, 0.1)'
    },
    logoText: {
      fontSize: '2rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #dc2626, #ffffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      letterSpacing: '-0.02em'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1.5rem'
    },
    userAvatar: {
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '20px',
      fontWeight: 'bold',
      boxShadow: '0 6px 20px rgba(220, 38, 38, 0.4)',
      border: '3px solid rgba(255, 255, 255, 0.1)'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2.5rem'
    },
    welcomeCard: {
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '20px',
      padding: '2.5rem',
      marginBottom: '2.5rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      border: '2px solid #dc2626',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1.5rem'
    },
    welcomeText: {
      fontSize: '2.5rem',
      fontWeight: '900',
      background: 'linear-gradient(135deg, #dc2626, #ffffff)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem',
      letterSpacing: '-0.02em'
    },
    logoutButton: {
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      padding: '16px 32px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
      border: '2px solid rgba(255, 255, 255, 0.1)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
      gap: '2rem',
      marginBottom: '2.5rem'
    },
    statCard: {
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
      backdropFilter: 'blur(20px)',
      border: '2px solid rgba(220, 38, 38, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    usersSection: {
      background: 'rgba(0, 0, 0, 0.8)',
      borderRadius: '20px',
      padding: '2.5rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
      backdropFilter: 'blur(20px)',
      border: '2px solid #dc2626'
    },
    sectionTitle: {
      fontSize: '1.8rem',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '2rem',
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    loadButton: {
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      color: 'white',
      border: 'none',
      borderRadius: '15px',
      padding: '14px 28px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '2rem',
      boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
      border: '2px solid rgba(255, 255, 255, 0.1)'
    },
    userGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
      gap: '2rem'
    },
    userCard: {
      background: 'rgba(255, 255, 255, 0.05)',
      border: '2px solid rgba(220, 38, 38, 0.3)',
      borderRadius: '18px',
      padding: '2rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      overflow: 'hidden'
    },
    userCardHover: {
      transform: 'translateY(-8px)',
      boxShadow: '0 20px 40px rgba(220, 38, 38, 0.4)',
      borderColor: '#dc2626',
      background: 'rgba(255, 255, 255, 0.1)'
    },
    userAvatar2: {
      width: '65px',
      height: '65px',
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '26px',
      fontWeight: 'bold',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
      border: '3px solid rgba(255, 255, 255, 0.1)'
    },
    userName: {
      fontSize: '1.3rem',
      fontWeight: '800',
      color: '#ffffff',
      marginBottom: '0.8rem'
    },
    userEmail: {
      color: '#cccccc',
      fontSize: '1rem',
      marginBottom: '1.5rem'
    },
    userMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.9rem',
      color: '#aaaaaa'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.8)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(10px)'
    },
    modalContent: {
      background: 'rgba(0, 0, 0, 0.95)',
      borderRadius: '25px',
      padding: '3rem',
      maxWidth: '550px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 30px 60px rgba(0, 0, 0, 0.7)',
      border: '2px solid #dc2626',
      color: '#ffffff'
    },
    closeButton: {
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      cursor: 'pointer',
      float: 'right',
      fontWeight: '700',
      fontSize: '1rem'
    },
    spinner: {
      width: '45px',
      height: '45px',
      border: '4px solid rgba(220, 38, 38, 0.3)',
      borderTop: '4px solid #dc2626',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '3rem auto'
    },
    error: {
      background: 'linear-gradient(135deg, #dc2626, #991b1b)',
      color: 'white',
      padding: '1.5rem',
      borderRadius: '15px',
      marginBottom: '1.5rem',
      boxShadow: '0 10px 25px rgba(220, 38, 38, 0.4)',
      border: '2px solid rgba(255, 255, 255, 0.1)'
    },
    emptyState: {
      textAlign: 'center',
      padding: '4rem',
      color: '#cccccc'
    },
    modalUserDetails: {
      background: 'rgba(255, 255, 255, 0.05)',
      padding: '2rem',
      borderRadius: '15px',
      border: '1px solid rgba(220, 38, 38, 0.3)'
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
            transform: translateY(-10px) scale(1.02);
            box-shadow: 0 30px 60px rgba(220, 38, 38, 0.4);
            border-color: #dc2626;
          }
          
          .stat-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 3px;
            background: linear-gradient(90deg, #dc2626, #991b1b);
            border-radius: 20px 20px 0 0;
          }
          
          .load-button:hover, .logout-button:hover {
            transform: translateY(-3px) scale(1.05);
            box-shadow: 0 15px 35px rgba(220, 38, 38, 0.6);
          }
        `}
      </style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🔐</div>
            <div>
              <div style={styles.logoText}>SECURE PANEL</div>
              <div style={{fontSize: '1rem', color: '#cccccc', fontWeight: '600'}}>
                Sistema de Administración JWT
              </div>
            </div>
          </div>

          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>
              {user?.name?.charAt(0)?.toUpperCase() || '👤'}
            </div>
            <div>
              <div style={{fontSize: '1.1rem', fontWeight: '700', color: '#ffffff'}}>
                {user?.name}
              </div>
              <div style={{fontSize: '0.9rem', color: '#cccccc'}}>
                {user?.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
              className="logout-button"
            >
              <span>🚪</span>
              <span>Cerrar Sesión</span>
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.welcomeCard}>
          <div>
            <h2 style={styles.welcomeText}>¡Bienvenido, {user?.name}! 🎯</h2>
            <p style={{color: '#cccccc', fontSize: '1.2rem', margin: 0, fontWeight: '500'}}>
              Panel de control seguro con autenticación JWT avanzada
            </p>
          </div>
        </div>

        <div style={styles.statsGrid}>
          {[
            { title: 'Usuarios Registrados', value: users.length || '0', icon: '👥', color: '#dc2626' },
            { title: 'Nivel de Seguridad', value: '95%', icon: '🛡️', color: '#10b981' },
            { title: 'Último Acceso', value: new Date().toLocaleTimeString(), icon: '🕒', color: '#f59e0b' },
            { title: 'Token Activo', value: '✅ Válido', icon: '🔑', color: '#8b5cf6' }
          ].map((stat, index) => (
            <div key={index} style={styles.statCard} className="stat-card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <div style={{fontSize: '1rem', color: '#aaaaaa', fontWeight: '600', marginBottom: '0.8rem'}}>
                    {stat.title}
                  </div>
                  <div style={{fontSize: '2.2rem', fontWeight: '900', color: '#ffffff'}}>
                    {stat.value}
                  </div>
                </div>
                <div style={{fontSize: '3rem', opacity: 0.8}}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.usersSection}>
          <h3 style={styles.sectionTitle}>
            <span>👥</span>
            <span>Gestión de Usuarios</span>
            <span style={{
              background: 'linear-gradient(135deg, #dc2626, #991b1b)',
              color: 'white',
              padding: '6px 16px',
              borderRadius: '25px',
              fontSize: '0.9rem',
              fontWeight: '700'
            }}>
              {users.length} usuarios
            </span>
          </h3>
          
          <button
            onClick={loadUsers}
            style={styles.loadButton}
            className="load-button"
            disabled={loading}
          >
            {loading ? '⏳ Cargando...' : '🔄 Actualizar Lista'}
          </button>

          {error && (
            <div style={styles.error}>
              ⚠️ {error}
            </div>
          )}

          {loading ? (
            <div style={styles.spinner}></div>
          ) : users.length > 0 ? (
            <div style={styles.userGrid}>
              {users.map((userData) => (
                <div
                  key={userData.idUsuario}
                  style={styles.userCard}
                  onClick={() => viewUserDetails(userData.idUsuario)}
                  onMouseEnter={(e) => {
                    Object.assign(e.currentTarget.style, styles.userCardHover);
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'none';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.borderColor = 'rgba(220, 38, 38, 0.3)';
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.05)';
                  }}
                >
                  <div style={styles.userAvatar2}>
                    {userData.nombre.charAt(0).toUpperCase()}
                  </div>
                  <div style={styles.userName}>
                    {userData.nombre} {userData.apellido}
                  </div>
                  <div style={styles.userEmail}>
                    📧 {userData.email}
                  </div>
                  <div style={styles.userMeta}>
                    <span>Usuario activo</span>
                    <span style={{color: '#dc2626', fontWeight: '600'}}>👁️ Ver detalles</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={{fontSize: '4rem', marginBottom: '1.5rem'}}>📭</div>
              <h3 style={{color: '#ffffff', fontSize: '1.5rem'}}>No hay usuarios disponibles</h3>
              <p style={{fontSize: '1.1rem'}}>Haz clic en "Actualizar Lista" para cargar los usuarios</p>
            </div>
          )}
        </div>

        {showUserModal && selectedUser && (
          <div style={styles.modal} onClick={() => setShowUserModal(false)}>
            <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
              <button
                style={styles.closeButton}
                onClick={() => setShowUserModal(false)}
              >
                ✕ Cerrar
              </button>
              <div style={{clear: 'both', paddingTop: '1.5rem'}}>
                <div style={{textAlign: 'center', marginBottom: '2.5rem'}}>
                  <div style={{...styles.userAvatar2, margin: '0 auto 1.5rem', width: '80px', height: '80px', fontSize: '32px'}}>
                    {selectedUser.nombre.charAt(0).toUpperCase()}
                  </div>
                  <h2 style={{margin: '0 0 0.8rem', color: '#ffffff', fontSize: '1.8rem', fontWeight: '800'}}>
                    {selectedUser.nombre} {selectedUser.apellido}
                  </h2>
                  <p style={{color: '#cccccc', margin: 0, fontSize: '1.1rem'}}>{selectedUser.email}</p>
                </div>
                
                <div style={styles.modalUserDetails}>
                  <h4 style={{margin: '0 0 1.5rem', color: '#ffffff', fontSize: '1.3rem', fontWeight: '700'}}>
                    Información del Usuario
                  </h4>
                  <div style={{display: 'grid', gap: '1rem'}}>
                    <div style={{color: '#ffffff', fontSize: '1rem'}}>
                      <strong style={{color: '#dc2626'}}>Nombre:</strong> {selectedUser.nombre}
                    </div>
                    <div style={{color: '#ffffff', fontSize: '1rem'}}>
                      <strong style={{color: '#dc2626'}}>Apellido:</strong> {selectedUser.apellido}
                    </div>
                    <div style={{color: '#ffffff', fontSize: '1rem'}}>
                      <strong style={{color: '#dc2626'}}>Email:</strong> {selectedUser.email}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};