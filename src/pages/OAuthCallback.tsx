import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const OAuthCallback = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setToken } = useAuth();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get('token');

    if (!token) {
      navigate('/login', { replace: true });
      return;
    }

    // Store token ASAP
    localStorage.setItem('jwt', token);
    setToken(token);

    // Remove the query string for a clean address bar
    const clean = window.location.origin + '/oauth2/callback';
    window.history.replaceState(null, '', clean);

    // Finally go to the real protected page
    navigate('/home', { replace: true });
  }, [location.search, navigate, setToken]);

  return null;
};
