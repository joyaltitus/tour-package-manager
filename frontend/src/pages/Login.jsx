import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

// Admin login page — authenticates via Supabase Auth
function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Handles form submission — calls Supabase to check credentials
  async function handleLogin(e) {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const { error } = await supabase.auth.signInWithPassword({ email, password });

    if (error) {
      setError('Wrong email or password');
      setLoading(false);
    } else {
      navigate('/admin');
    }
  }

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <form onSubmit={handleLogin} style={{
        backgroundColor: 'white',
        padding: '40px',
        borderRadius: '10px',
        boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
        width: '320px'
      }}>
        <h2 style={{ textAlign: 'center', marginBottom: '24px', color: '#2a7d4f' }}>
          Admin Login
        </h2>

        {error && (
          <p style={{ color: 'red', textAlign: 'center', marginBottom: '16px' }}>{error}</p>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '12px',
            border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ width: '100%', padding: '10px', marginBottom: '20px',
            border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
        />

        <button
          type="submit"
          disabled={loading}
          style={{
            width: '100%', padding: '12px',
            backgroundColor: '#2a7d4f', color: 'white',
            border: 'none', borderRadius: '6px',
            fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer'
          }}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>
      </form>
    </div>
  );
}

export default Login;
