import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { authService } from '../services/authService';
import { 
  User, 
  LogOut, 
  Shield, 
  CheckCircle, 
  Clock, 
  Activity,
  Settings,
  Bell,
  Search,
  BarChart3,
  Users,
  Lock
} from 'lucide-react';

export const Dashboard = () => {
  const { user, logout, token } = useAuth();
  const [protectedData, setProtectedData] = useState(null);
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      {/* Background effects */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%239C92AC" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="1"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-40"></div>
      
      {/* Header */}
      <header className="relative z-10 backdrop-blur-xl bg-white/5 border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo and title */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-500 to-blue-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">JWT Dashboard</h1>
                <p className="text-xs text-gray-400">Secure Access Panel</p>
              </div>
            </div>

            {/* Search bar */}
            <div className="hidden md:flex items-center space-x-4 flex-1 max-w-md mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Buscar..."
                  className="w-full pl-10 pr-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* User menu */}
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Bell className="w-5 h-5" />
              </button>
              <button className="p-2 text-gray-400 hover:text-white transition-colors">
                <Settings className="w-5 h-5" />
              </button>
              <div className="flex items-center space-x-3 bg-white/5 rounded-lg px-3 py-2">
                <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center">
                  <User className="w-4 h-4 text-white" />
                </div>
                <div className="hidden sm:block">
                  <p className="text-sm font-medium text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Welcome section */}
        <div className="mb-8">
          <div className="backdrop-blur-xl bg-gradient-to-r from-purple-900/30 to-blue-900/30 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-white mb-2">
                  ¡Bienvenido, {user?.name}! 👋
                </h2>
                <p className="text-gray-300">
                  Acceso autenticado correctamente. Tu sesión está protegida con JWT.
                </p>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-2 bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 px-4 py-2 rounded-lg transition-all duration-300 border border-red-500/30"
              >
                <LogOut className="w-4 h-4" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Usuarios Activos</p>
                <p className="text-2xl font-bold text-white">{stats.activeUsers}</p>
              </div>
              <Users className="w-8 h-8 text-purple-400" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Nivel de Seguridad</p>
                <p className="text-2xl font-bold text-green-400">{stats.securityLevel}%</p>
              </div>
              <Shield className="w-8 h-8 text-green-400" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Último Acceso</p>
                <p className="text-sm font-medium text-white">{stats.lastLogin}</p>
              </div>
              <Clock className="w-8 h-8 text-blue-400" />
            </div>
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10 hover:bg-white/10 transition-all duration-300">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-400 text-sm">Token Expira en</p>
                <p className="text-sm font-medium text-yellow-400">{stats.tokenExpiry}</p>
              </div>
              <Activity className="w-8 h-8 text-yellow-400" />
            </div>
          </div>
        </div>

        {/* Protected data section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <Lock className="w-5 h-5 text-purple-400" />
              <h3 className="text-lg font-semibold text-white">Datos Protegidos</h3>
            </div>
            
            {loading ? (
              <div className="flex items-center justify-center py-8">
                <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : (
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Autenticación JWT verificada</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Acceso a rutas protegidas</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-gray-300">Token válido y activo</span>
                </div>
                
                <button
                  onClick={loadProtectedData}
                  className="mt-4 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
                >
                  Cargar Datos del Servidor
                </button>
                
                {protectedData && (
                  <div className="mt-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg">
                    <p className="text-green-300 text-sm">
                      ✅ Respuesta del servidor: {JSON.stringify(protectedData)}
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
            <div className="flex items-center space-x-3 mb-4">
              <BarChart3 className="w-5 h-5 text-blue-400" />
              <h3 className="text-lg font-semibold text-white">Información de Sesión</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Usuario Actual</h4>
                <p className="text-white">{user?.name}</p>
                <p className="text-gray-300 text-sm">{user?.email}</p>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Estado del Token</h4>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-green-400 text-sm">Activo y válido</span>
                </div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <h4 className="text-sm font-medium text-gray-400 mb-2">Funcionalidades</h4>
                <ul className="space-y-1 text-sm text-gray-300">
                  <li>• Autenticación JWT</li>
                  <li>• Rutas protegidas</li>
                  <li>• Middleware de validación</li>
                  <li>• Gestión de sesiones</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Additional features section */}
        <div className="mt-8">
          <div className="backdrop-blur-xl bg-white/5 rounded-xl p-6 border border-white/10">
            <h3 className="text-lg font-semibold text-white mb-4">Panel de Control</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 bg-purple-500/20 hover:bg-purple-500/30 rounded-lg border border-purple-500/30 text-purple-300 hover:text-purple-200 transition-all duration-300 text-left">
                <Users className="w-6 h-6 mb-2" />
                <h4 className="font-medium">Gestionar Usuarios</h4>
                <p className="text-sm opacity-80">Crear, editar y eliminar usuarios</p>
              </button>
              
              <button className="p-4 bg-blue-500/20 hover:bg-blue-500/30 rounded-lg border border-blue-500/30 text-blue-300 hover:text-blue-200 transition-all duration-300 text-left">
                <Shield className="w-6 h-6 mb-2" />
                <h4 className="font-medium">Configuración de Seguridad</h4>
                <p className="text-sm opacity-80">Ajustar políticas de acceso</p>
              </button>
              
              <button className="p-4 bg-green-500/20 hover:bg-green-500/30 rounded-lg border border-green-500/30 text-green-300 hover:text-green-200 transition-all duration-300 text-left">
                <Activity className="w-6 h-6 mb-2" />
                <h4 className="font-medium">Monitoreo</h4>
                <p className="text-sm opacity-80">Ver logs y actividad del sistema</p>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};