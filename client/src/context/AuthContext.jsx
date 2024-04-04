import { createContext, useState, useContext, useEffect } from 'react';
import { registerRequest, loginRequest, verifyTokenRequest } from '../api/auth';
import Cookie from 'js-cookie';

export const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // Nuevo estado para el rol de administrador
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(true);

  const signup = async (user) => {
    try {
      const res = await registerRequest(user);
      console.log(res.data);
      setUser(res.data);
      setIsAuthenticated(true);
      checkAdminRole(res.data); // Verificar el rol de administrador al registrarse
    } catch (error) {
      setErrors(error.response.data);
    }
  };

  const signin = async (user) => {
    try {
      const res = await loginRequest(user);
      console.log(res.data);
      setIsAuthenticated(true);
      setUser(res.data);
      checkAdminRole(res.data); // Verificar el rol de administrador al iniciar sesión
    } catch (error) {
      if (Array.isArray(error.response.data)) {
        setErrors(error.response.data);
      } else {
        setErrors([error.response.data.message]);
      }
    }
  };

  const logout = (user) => {
    setIsAuthenticated(false);
    setIsAdmin(false); // Reiniciar el estado de administrador al cerrar sesión
    setUser(null);
    Cookie.remove('token');
  };

  const checkAdminRole = (userData) => {
    // Verificar el rol de administrador basado en la información del usuario
    if (userData && userData.email === 'test11@test.cl') {
      setIsAdmin(true);
    }
  };

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  useEffect(() => {
    async function checkLogin() {
      const token = Cookie.get('token');

      if (!token) {
        setIsAuthenticated(false);
        setLoading(false);
        return setUser(null);
      }

      try {
        const res = await verifyTokenRequest(token);
        if (!res.data) {
          setIsAuthenticated(false);
          setLoading(false);
          return;
        }

        setIsAuthenticated(true);
        setUser(res.data);
        checkAdminRole(res.data); // Verificar el rol de administrador al cargar la página
        setLoading(false);
      } catch (error) {
        setIsAuthenticated(false);
        setIsAdmin(false); // Reiniciar el estado de administrador al cargar la página
        setUser(null);
        setLoading(false);
      }
    }

    checkLogin();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        signup,
        signin,
        logout,
        loading,
        user,
        isAuthenticated,
        isAdmin,
        errors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
