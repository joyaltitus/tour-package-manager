import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../supabaseClient';

const API = import.meta.env.VITE_API_URL;

const emptyForm = { name: '', description: '', price: '', duration_days: '', image_url: '' };

function AdminDashboard() {
  const [packages, setPackages] = useState([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => { fetchPackages(); }, []);

  async function fetchPackages() {
    const res = await fetch(API + '/packages');
    const data = await res.json();
    setPackages(data);
  }

  async function handleLogout() {
    await supabase.auth.signOut();
    navigate('/admin/login');
  }

  function handleEdit(pkg) {
    setForm({
      name: pkg.name,
      description: pkg.description,
      price: pkg.price,
      duration_days: pkg.duration_days,
      image_url: pkg.image_url,
    });
    setEditingId(pkg.id);
    setShowForm(true);
  }

  async function handleDelete(id) {
    if (!window.confirm('Are you sure you want to delete this package?')) return;
    await fetch(API + '/packages/' + id, { method: 'DELETE' });
    fetchPackages();
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const method = editingId ? 'PUT' : 'POST';
    const url = editingId ? API + '/packages/' + editingId : API + '/packages';
    await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        ...form,
        price: Number(form.price),
        duration_days: Number(form.duration_days),
      }),
    });
    setForm(emptyForm);
    setEditingId(null);
    setShowForm(false);
    setLoading(false);
    fetchPackages();
  }

  const formTitle = editingId ? 'Edit Package' : 'Add New Package';

  return (
    <div style={{ fontFamily: 'sans-serif', maxWidth: '900px', margin: '0 auto', padding: '24px' }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
        <h1 style={{ color: '#2a7d4f', margin: 0 }}>Admin Panel</h1>
        <button onClick={handleLogout} style={{
          backgroundColor: '#e53e3e', color: 'white', border: 'none',
          padding: '8px 16px', borderRadius: '6px', cursor: 'pointer'
        }}>Logout</button>
      </div>

      {!showForm && (
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setShowForm(true); }} style={{
          backgroundColor: '#2a7d4f', color: 'white', border: 'none',
          padding: '10px 20px', borderRadius: '6px', cursor: 'pointer', marginBottom: '24px'
        }}>
          + Add Package
        </button>
      )}

      {showForm && (
        <form onSubmit={handleSubmit} style={{
          backgroundColor: '#f9f9f9', padding: '24px', borderRadius: '10px',
          marginBottom: '32px', border: '1px solid #ddd'
        }}>
          <h2 style={{ marginTop: 0 }}>{formTitle}</h2>

          {[
            { label: 'Name', key: 'name', type: 'text' },
            { label: 'Description', key: 'description', type: 'text' },
            { label: 'Price', key: 'price', type: 'number' },
            { label: 'Duration (days)', key: 'duration_days', type: 'number' },
            { label: 'Image URL', key: 'image_url', type: 'text' },
          ].map(({ label, key, type }) => (
            <div key={key} style={{ marginBottom: '12px' }}>
              <label style={{ display: 'block', marginBottom: '4px', fontWeight: 'bold' }}>{label}</label>
              <input
                type={type}
                value={form[key]}
                onChange={(e) => setForm({ ...form, [key]: e.target.value })}
                required
                style={{ width: '100%', padding: '8px', border: '1px solid #ddd', borderRadius: '6px', boxSizing: 'border-box' }}
              />
            </div>
          ))}

          <div style={{ display: 'flex', gap: '12px' }}>
            <button type="submit" disabled={loading} style={{
              backgroundColor: '#2a7d4f', color: 'white', border: 'none',
              padding: '10px 24px', borderRadius: '6px', cursor: 'pointer'
            }}>
              {loading ? 'Saving...' : 'Save'}
            </button>
            <button type="button" onClick={() => setShowForm(false)} style={{
              backgroundColor: '#999', color: 'white', border: 'none',
              padding: '10px 24px', borderRadius: '6px', cursor: 'pointer'
            }}>
              Cancel
            </button>
          </div>
        </form>
      )}

      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#2a7d4f', color: 'white' }}>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Name</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Price</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Days</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {packages.map((pkg) => (
            <tr key={pkg.id} style={{ borderBottom: '1px solid #ddd' }}>
              <td style={{ padding: '12px 16px' }}>{pkg.name}</td>
              <td style={{ padding: '12px 16px' }}>Rs.{pkg.price}</td>
              <td style={{ padding: '12px 16px' }}>{pkg.duration_days}</td>
              <td style={{ padding: '12px 16px' }}>
                <button onClick={() => handleEdit(pkg)} style={{
                  marginRight: '8px', backgroundColor: '#3182ce', color: 'white',
                  border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer'
                }}>Edit</button>
                <button onClick={() => handleDelete(pkg.id)} style={{
                  backgroundColor: '#e53e3e', color: 'white',
                  border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer'
                }}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AdminDashboard;
