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
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    },
    header: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(20px)',
      borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
      padding: '1rem 0',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
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
      width: '50px',
      height: '50px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
    },
    logoText: {
      fontSize: '1.8rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    userInfo: {
      display: 'flex',
      alignItems: 'center',
      gap: '1rem'
    },
    userAvatar: {
      width: '45px',
      height: '45px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '18px',
      boxShadow: '0 4px 15px rgba(102, 126, 234, 0.3)'
    },
    main: {
      maxWidth: '1400px',
      margin: '0 auto',
      padding: '2rem'
    },
    welcomeCard: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '2rem',
      marginBottom: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: '1rem'
    },
    welcomeText: {
      fontSize: '2rem',
      fontWeight: '800',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent',
      marginBottom: '0.5rem'
    },
    logoutButton: {
      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '14px 28px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      gap: '8px',
      boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)'
    },
    statsGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
      gap: '1.5rem',
      marginBottom: '2rem'
    },
    statCard: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    usersSection: {
      background: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '20px',
      padding: '2rem',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255, 255, 255, 0.3)'
    },
    sectionTitle: {
      fontSize: '1.5rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '1.5rem',
      display: 'flex',
      alignItems: 'center',
      gap: '0.75rem'
    },
    loadButton: {
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      padding: '12px 24px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginBottom: '1.5rem',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
    },
    userGrid: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
      gap: '1.5rem'
    },
    userCard: {
      background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05), rgba(118, 75, 162, 0.05))',
      border: '2px solid rgba(102, 126, 234, 0.1)',
      borderRadius: '16px',
      padding: '1.5rem',
      transition: 'all 0.3s ease',
      cursor: 'pointer'
    },
    userCardHover: {
      transform: 'translateY(-5px)',
      boxShadow: '0 15px 35px rgba(102, 126, 234, 0.2)',
      borderColor: 'rgba(102, 126, 234, 0.3)'
    },
    userAvatar2: {
      width: '60px',
      height: '60px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      borderRadius: '50%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold',
      marginBottom: '1rem',
      boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
    },
    userName: {
      fontSize: '1.2rem',
      fontWeight: '700',
      color: '#333',
      marginBottom: '0.5rem'
    },
    userEmail: {
      color: '#666',
      fontSize: '0.95rem',
      marginBottom: '1rem'
    },
    userMeta: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      fontSize: '0.85rem',
      color: '#888'
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      background: 'rgba(0, 0, 0, 0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)'
    },
    modalContent: {
      background: 'white',
      borderRadius: '20px',
      padding: '2rem',
      maxWidth: '500px',
      width: '90%',
      maxHeight: '80vh',
      overflow: 'auto',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.3)'
    },
    closeButton: {
      background: '#ff6b6b',
      color: 'white',
      border: 'none',
      borderRadius: '10px',
      padding: '10px 20px',
      cursor: 'pointer',
      float: 'right'
    },
    spinner: {
      width: '40px',
      height: '40px',
      border: '4px solid rgba(102, 126, 234, 0.3)',
      borderTop: '4px solid #667eea',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite',
      margin: '2rem auto'
    },
    error: {
      background: 'linear-gradient(135deg, #ff6b6b, #ee5a52)',
      color: 'white',
      padding: '1rem',
      borderRadius: '12px',
      marginBottom: '1rem',
      boxShadow: '0 8px 20px rgba(255, 107, 107, 0.3)'
    },
    emptyState: {
      textAlign: 'center',
      padding: '3rem',
      color: '#666'
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
            transform: translateY(-8px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
          }
          
          .load-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(102, 126, 234, 0.4);
          }
          
          .logout-button:hover {
            transform: translateY(-2px);
            box-shadow: 0 12px 25px rgba(255, 107, 107, 0.4);
          }
        `}
      </style>

      <header style={styles.header}>
        <div style={styles.headerContent}>
          <div style={styles.logo}>
            <div style={styles.logoIcon}>🔐</div>
            <div>
              <div style={styles.logoText}>JWT Dashboard</div>
              <div style={{fontSize: '0.9rem', color: '#666', fontWeight: '500'}}>
                Panel de Administración Seguro
              </div>
            </div>
          </div>

          <div style={styles.userInfo}>
            <div style={styles.userAvatar}>👤</div>
            <div>
              <div style={{fontSize: '1rem', fontWeight: '600', color: '#333'}}>
                {user?.name}
              </div>
              <div style={{fontSize: '0.85rem', color: '#666'}}>
                {user?.email}
              </div>
            </div>
            <button
              onClick={handleLogout}
              style={styles.logoutButton}
              className="logout-button"
            >
              <span>🔓</span>
              <span>Salir</span>
            </button>
          </div>
        </div>
      </header>

      <main style={styles.main}>
        <div style={styles.welcomeCard}>
          <div>
            <h2 style={styles.welcomeText}>¡Bienvenido, {user?.name}! 👋</h2>
            <p style={{color: '#666', fontSize: '1.1rem', margin: 0}}>
              Gestiona usuarios y accede a datos protegidos con autenticación JWT
            </p>
          </div>
        </div>

        <div style={styles.statsGrid}>
          {[
            { title: 'Usuarios Registrados', value: users.length || '0', icon: '👥' },
            { title: 'Nivel de Seguridad', value: '95%', icon: '🛡️' },
            { title: 'Último Acceso', value: new Date().toLocaleTimeString(), icon: '🕒' },
            { title: 'Token Activo', value: '✅ Válido', icon: '🔑' }
          ].map((stat, index) => (
            <div key={index} style={styles.statCard} className="stat-card">
              <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between'}}>
                <div>
                  <div style={{fontSize: '0.9rem', color: '#666', fontWeight: '500', marginBottom: '0.5rem'}}>
                    {stat.title}
                  </div>
                  <div style={{fontSize: '1.8rem', fontWeight: '800', color: '#333'}}>
                    {stat.value}
                  </div>
                </div>
                <div style={{fontSize: '2.5rem'}}>{stat.icon}</div>
              </div>
            </div>
          ))}
        </div>

        <div style={styles.usersSection}>
          <h3 style={styles.sectionTitle}>
            <span>👥</span>
            <span>Usuarios del Sistema</span>
            <span style={{
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              color: 'white',
              padding: '4px 12px',
              borderRadius: '20px',
              fontSize: '0.8rem',
              fontWeight: '600'
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
                    e.currentTarget.style.borderColor = 'rgba(102, 126, 234, 0.1)';
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
                    <span>ID: {userData.idUsuario}</span>
                    <span>👁️ Ver detalles</span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div style={styles.emptyState}>
              <div style={{fontSize: '3rem', marginBottom: '1rem'}}>📭</div>
              <h3>No hay usuarios disponibles</h3>
              <p>Haz clic en "Actualizar Lista" para cargar los usuarios</p>
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
              <div style={{clear: 'both', paddingTop: '1rem'}}>
                <div style={{textAlign: 'center', marginBottom: '2rem'}}>
                  <div style={{...styles.userAvatar2, margin: '0 auto 1rem'}}>
                    {selectedUser.nombre.charAt(0).toUpperCase()}
                  </div>
                  <h2 style={{margin: '0 0 0.5rem', color: '#333'}}>
                    {selectedUser.nombre} {selectedUser.apellido}
                  </h2>
                  <p style={{color: '#666', margin: 0}}>{selectedUser.email}</p>
                </div>
                
                <div style={{background: '#f8f9fa', padding: '1.5rem', borderRadius: '12px'}}>
                  <h4 style={{margin: '0 0 1rem', color: '#333'}}>Información del Usuario</h4>
                  <div style={{display: 'grid', gap: '0.75rem'}}>
                    <div><strong>ID:</strong> {selectedUser.idUsuario}</div>
                    <div><strong>Nombre:</strong> {selectedUser.nombre}</div>
                    <div><strong>Apellido:</strong> {selectedUser.apellido}</div>
                    <div><strong>Email:</strong> {selectedUser.email}</div>
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