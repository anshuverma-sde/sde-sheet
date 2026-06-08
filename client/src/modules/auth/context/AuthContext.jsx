'use client';

import { createContext, useContext, useEffect, useReducer } from 'react';

const AuthContext = createContext(null);

const initialState = { user: null, token: null, loading: true };

function authReducer(state, action) {
  switch (action.type) {
    case 'INIT':
      return { ...state, user: action.user, token: action.token, loading: false };
    case 'LOGIN':
      return { ...state, user: action.user, token: action.token, loading: false };
    case 'LOGOUT':
      return { ...initialState, loading: false };
    default:
      return state;
  }
}

export function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user  = localStorage.getItem('user');
    if (token && user) {
      dispatch({ type: 'INIT', token, user: JSON.parse(user) });
    } else {
      dispatch({ type: 'INIT', token: null, user: null });
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    dispatch({ type: 'LOGIN', token, user });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuthContext = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuthContext must be used inside AuthProvider');
  return ctx;
};
