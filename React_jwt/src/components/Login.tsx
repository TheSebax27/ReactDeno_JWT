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
      background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)',
      padding: '1rem',
      fontFamily: 'Inter, system-ui, sans-serif',
      position: 'relative' as const
    },
    backgroundPattern: {
      position: 'absolute' as const,
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundImage: `
        radial-gradient(circle at 25% 25%, rgba(220, 38, 38, 0.1) 0%, transparent 50%),
        radial-gradient(circle at 75% 75%, rgba(220, 38, 38, 0.05) 0%, transparent 50%)
      `,
      pointerEvents: 'none'
    },
    card: {
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      borderRadius: '24px',
      boxShadow: `
        0 32px 64px rgba(0, 0, 0, 0.5),
        0 0 0 1px rgba(220, 38, 38, 0.1)
      `,
      padding: '3rem',
      width: '100%',
      maxWidth: '450px',
      backdropFilter: 'blur(20px)',
      position: 'relative' as const,
      zIndex: 1
    },
    header: {
      textAlign: 'center' as const,
      marginBottom: '2.5rem'
    },
    logo: {
      width: '80px',
      height: '80px',
      background: 'linear-gradient(135deg, #dc2626, #ef4444)',
      borderRadius: '20px',
      margin: '0 auto 1.5rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: '32px',
      fontWeight: 'bold',
      boxShadow: '0 16px 32px rgba(220, 38, 38, 0.3)'
    },
    title: {
      fontSize: '2.5rem',
      fontWeight: '800',
      color: '#000000',
      marginBottom: '0.5rem',
      letterSpacing: '-0.02em'
    },
    subtitle: {
      color: '#666666',
      fontSize: '1rem',
      fontWeight: '500'
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
      left: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      color: '#666666',
      fontSize: '20px'
    },
    input: {
      width: '100%',
      padding: '16px 16px 16px 52px',
      border: '2px solid #e5e5e5',
      borderRadius: '16px',
      fontSize: '1rem',
      outline: 'none',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      backgroundColor: '#ffffff',
      color: '#000000',
      boxSizing: 'border-box' as const,
      fontWeight: '500'
    },
    inputFocus: {
      borderColor: '#dc2626',
      boxShadow: '0 0 0 4px rgba(220, 38, 38, 0.1)'
    },
    passwordToggle: {
      position: 'absolute' as const,
      right: '16px',
      top: '50%',
      transform: 'translateY(-50%)',
      background: 'none',
      border: 'none',
      cursor: 'pointer',
      color: '#666666',
      fontSize: '20px',
      padding: '8px',
      borderRadius: '8px',
      transition: 'all 0.2s ease'
    },
    button: {
      width: '100%',
      padding: '18px',
      background: 'linear-gradient(135deg, #dc2626, #ef4444)',
      color: 'white',
      border: 'none',
      borderRadius: '16px',
      fontSize: '1.1rem',
      fontWeight: '700',
      cursor: 'pointer',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '10px',
      marginTop: '1rem'
    },
    buttonHover: {
      transform: 'translateY(-3px)',
      boxShadow: '0 20px 40px rgba(220, 38, 38, 0.4)'
    },
    buttonDisabled: {
      opacity: 0.6,
      cursor: 'not-allowed',
      transform: 'none'
    },
    error: {
      backgroundColor: 'rgba(220, 38, 38, 0.1)',
      border: '2px solid rgba(220, 38, 38, 0.2)',
      color: '#dc2626',
      padding: '16px',
      borderRadius: '12px',
      fontSize: '0.95rem',
      marginBottom: '1rem',
      fontWeight: '600',
      display: 'flex',
      alignItems: 'center',
      gap: '8px'
    },
    footer: {
      marginTop: '2rem',
      textAlign: 'center' as const,
      color: '#888888',
      fontSize: '0.9rem',
      fontWeight: '500'
    },
    spinner: {
      width: '24px',
      height: '24px',
      border: '3px solid rgba(255, 255, 255, 0.3)',
      borderTop: '3px solid white',
      borderRadius: '50%',
      animation: 'spin 1s linear infinite'
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundPattern}></div>
      <style>
        {`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
          
          .login-input:focus {
            border-color: #dc2626 !important;
            box-shadow: 0 0 0 4px rgba(220, 38, 38, 0.1) !important;
          }
          
          .password-toggle:hover {
            background-color: rgba(220, 38, 38, 0.1) !important;
            color: #dc2626 !important;
          }
        `}
      </style>

      <div style={styles.card}>
        <div style={styles.header}>
          <div style={styles.logo}>🔐</div>
          <h1 style={styles.title}>Bienvenido</h1>
          <p style={styles.subtitle}>Accede a tu panel de administración</p>
        </div>

        {error && (
          <div style={styles.error}>
            <span>⚠️</span>
            <span>{error}</span>
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
              className="login-input"
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
              style={{ ...styles.input, paddingRight: '52px' }}
              className="login-input"
              disabled={loading}
              required
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={styles.passwordToggle}
              className="password-toggle"
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
                e.currentTarget.style.boxShadow = '0 8px 16px rgba(220, 38, 38, 0.2)';
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
          <p>Protegido con autenticación JWT avanzada</p>
        </div>
      </div>
    </div>
  );
};