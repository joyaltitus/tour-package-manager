import { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import supabase from '../supabaseClient';

// Checks if user is logged in — if not, redirects to login page
function ProtectedRoute({ children }) {
  const [session, setSession] = useState(undefined);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });
  }, []);

  if (session === undefined) return <p>Loading...</p>;
  if (!session) return <Navigate to="/admin/login" />;
  return children;
}

export default ProtectedRoute;