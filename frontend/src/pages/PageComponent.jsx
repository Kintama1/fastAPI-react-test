// ===========================================
// Template 4: PageComponent.jsx
// Put this in: src/pages/PageComponent.jsx
// Use this for: Full pages that combine multiple components
// ===========================================

import { useState } from 'react';
import BasicComponent from '../components/BasicComponent/BasicComponent';
import FormComponent from '../components/FormComponent/FormComponent';
import DataComponent from "../components/DataComponent/DataComponent";

function PageComponent() {
  const [refreshKey, setRefreshKey] = useState(0);

  const handleFormSuccess = (result) => {
    console.log('New user added:', result);
    // Refresh the user list by changing the key
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-component">
      {/* Header section */}
      <BasicComponent 
        title="User Management" 
        content="Add and view users in the system"
        isHighlighted={true}
      />
      
      {/* Form section */}
      <section>
        <h2>Add New User</h2>
        <FormComponent onSubmitSuccess={handleFormSuccess} />
      </section>
      
      {/* Data display section */}
      <section>
        <h2>Current Users</h2>
        <DataComponent 
          key={refreshKey}  // This forces refresh when form succeeds
          apiEndpoint="/api/users"
          renderItem={(user) => (
            <div style={{ padding: '10px', border: '1px solid #ccc', margin: '5px' }}>
              <strong>{user.name}</strong><br />
              <small>{user.email}</small>
            </div>
          )}
        />
      </section>
    </div>
  );
}

export default PageComponent;

// HOW TO USE IN App.js:
// import PageComponent from './pages/PageComponent';
// 
// function App() {
//   return (
//     <div className="App">
//       <PageComponent />
//     </div>
//   );
// }