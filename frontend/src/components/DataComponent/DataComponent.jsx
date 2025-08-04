// Template 3: DataComponent.jsx
// Use this for: Components that fetch data from your FastAPI backend
// Pattern based on your current App.js approach
// ===========================================

// useEffect is another cool React Hook
import { useEffect, useState } from 'react';

function DataComponent({ apiEndpoint, renderItem }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

// whatever is here will run as soon as the component is mounted
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(apiEndpoint);
        
        if (!response.ok) {
          throw new Error(`Failed to fetch: ${response.status}`);
        }
        
        const result = await response.json();
        
        // Handle different API response formats
        if (result.users) {
          setData(result.users);  // Like your /api/users endpoint
        } else if (Array.isArray(result)) {
          setData(result);
        } else {
          setData([result]);  // Single item
        }
        
        setError(null);
      } catch (err) {
        console.error('Failed to fetch data:', err);
        setError(err.message);
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [apiEndpoint]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  if (data.length === 0) {
    return <div className="no-data">No data found</div>;
  }

  return (
    <div className="data-component">
      {data.map((item, index) => (
        <div key={item.id || index} className="data-item">
          {renderItem ? renderItem(item) : (
            <pre>{JSON.stringify(item, null, 2)}</pre>
          )}
        </div>
      ))}
    </div>
  );
}

export default DataComponent;

// HOW TO USE:
// <DataComponent 
//   apiEndpoint="/api/users" 
//   renderItem={(user) => (
//     <div>
//       <strong>{user.name}</strong> - {user.email}
//     </div>
//   )}
// />