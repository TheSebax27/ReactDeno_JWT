import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const { login, loading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Por favor completa todos los campos');
      return;
    }

    const success = await login({ email, password });
    if (!success) {
      setError('Credenciales inválidas. Verifica tu email y contraseña.');
    }
  };

  const styles = {
    container: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      padding: '1rem',
      fontFamily: 'Arial, sans-serif'
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.95)',
      borderRadius: '20px',
      boxShadow: '0 25px 50px rgba(0, 0, 0, 0.25)',
      padding: '2rem',
      width: '100%',
      maxWidth: '400px',
      backdropFilter: 'blur(10px)',
      border: '1px solid rgba(255, 255, 255, 0.2)'
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2rem'
    },
    logo: {
      width: '60px',
      height: '60px',
      backgroundColor: '#667eea',
      borderRadius: '50%',
      margin: '0 auto 1rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    title: {
      fontSize: '2rem',
      fontWeight: 'bold',
      color: '#333',
      marginBottom: '0.5rem',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      WebkitBackgroundClip: 'text',
      WebkitTextFillColor: 'transparent'
    },
    subtitle: {
      color: '#666',
      fontSize: '0.9rem'
    },
    form: {
      display: 'flex',
      flexDirection: 'column' as const,
      gap: '1.5rem'
    },
    inputGroup: {
      position: 'relative' as const
    },
    inputIcon: {
      position: 'absolute' as const,
      left: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#888',
      fontSize: '18px'
    },
    input: {
      width: '100%',
      padding: '12px 12px 12px 45px',
      border: '2px solid #e1e1e1',
      borderRadius: '12px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s ease',
      backgroundColor: 'rgba(255, 255, 255, 0.8)',
      boxSizing: 'border-box' as const
    },
    inputFocus: {
      borderColor: '#667eea',
      boxShadow: '0 0 0 3px rgba(102, 126, 234, 0.1)'
    },
    passwordToggle: {
      position: 'absolute' as const,
      right: '12px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#888',
      fontSize: '18px',
      padding: '4px'
    },
    button: {
      width: '100%',
      padding: '14px',
      background: 'linear-gradient(135deg, #667eea, #764ba2)',
      color: 'white',
      border: 'none',
      borderRadius: '12px',
      fontSize: '1rem',
      fontWeight: '600',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '8px'
    },
    buttonHover: {
      transform: 'translateY(-2px)',
      boxShadow: '0 10px 25px rgba(102, 126, 234, 0.3)'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    error: {
      backgroundColor: '#fee',
      border: '1px solid #fcc',
      color: '#c33',
      padding: '12px',
      borderRadius: '8px',
      fontSize: '0.9rem',
      marginBottom: '1rem'
    },
    footer: {
      marginTop: '1.5rem',
      textAlign: 'center' as const,
      color: '#888',
      fontSize: '0.8rem'
    },
    spinner: {
      width: '20px',
      height: '20px',
      border: '2px solid rgba(255, 255, 255, 0.3)',
      borderTop: '2px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
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
        `}
      </style>
      
      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🔐</div>
          <h1 style={styles.title}>Bienvenido</h1>
          <p style={styles.subtitle}>Inicia sesión en tu cuenta</p>
        </div>

        {error && (
          <div style={styles.error}>
            {error}
          </div>
        )}

        <form style={styles.form} onSubmit={handleSubmit}>
          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Correo electrónico"
              style={styles.input}
              disabled={loading}
              required
            />
          </div>

          <div style={styles.inputGroup}>
            <span style={styles.inputIcon}>🔒</span>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Contraseña"
              style={{...styles.input, paddingRight: '45px'}}
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
              disabled={loading}
            >
              {showPassword ? '🙈' : '👁️'}
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              ...styles.button,
              ...(loading ? styles.buttonDisabled : {})
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                Object.assign(e.currentTarget.style, styles.buttonHover);
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.transform = 'none';
                e.currentTarget.style.boxShadow = 'none';
              }
            }}
          >
            {loading ? (
              <>
                <div style={styles.spinner}></div>
                <span>Iniciando sesión...</span>
              </>
            ) : (
              <>
                <span>🚀</span>
                <span>Iniciar Sesión</span>
              </>
            )}
          </button>
        </form>

        <div style={styles.footer}>
          <p>Protegido con JWT Authentication</p>
        </div>
      </div>
    </div>
  );
};