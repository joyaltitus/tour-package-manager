// Displays one tour package as a card
function PackageCard({ name, description, price, duration_days, image_url }) {
  return (
    <div style={{
      border: '1px solid #ddd',
      borderRadius: '10px',
      overflow: 'hidden',
      width: '300px',
      boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
    }}>
      <img
        src={image_url}
        alt={name}
        style={{ width: '100%', height: '180px', objectFit: 'cover' }}
      />
      <div style={{ padding: '16px' }}>
        <h2 style={{ margin: '0 0 8px', fontSize: '18px' }}>{name}</h2>
        <p style={{ color: '#555', fontSize: '14px', margin: '0 0 8px' }}>{description}</p>
        <p style={{ margin: '0 0 4px' }}>⏱ {duration_days} days</p>
        <p style={{ margin: '0 0 16px', fontWeight: 'bold', color: '#2a7d4f' }}>₹{price}</p>
        <button style={{
          backgroundColor: '#2a7d4f',
          color: 'white',
          border: 'none',
          padding: '10px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          width: '100%',
          fontSize: '15px'
        }}>
          Book Now
        </button>
      </div>
    </div>
  );
}

export default PackageCard;
