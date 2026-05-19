import { useState, useEffect } from 'react';
import PackageCard from '../components/PackageCard';

// Fetches and displays all tour packages
function Home() {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Runs once when page loads — fetches packages from backend
  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + '/packages')
      .then((res) => res.json())
      .then((data) => {
        setPackages(data);
        setLoading(false);
      })
      .catch((err) => {
        setError('Failed to load packages. Is the backend running?');
        setLoading(false);
      });
  }, []);

  if (loading) return <p style={{ textAlign: 'center' }}>Loading packages...</p>;
  if (error) return <p style={{ textAlign: 'center', color: 'red' }}>{error}</p>;

  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: '24px',
      justifyContent: 'center',
      padding: '24px'
    }}>
      {packages.map((pkg) => (
        <PackageCard
          key={pkg.id}
          name={pkg.name}
          description={pkg.description}
          price={pkg.price}
          duration_days={pkg.duration_days}
          image_url={pkg.image_url}
        />
      ))}
    </div>
  );
}

export default Home;
