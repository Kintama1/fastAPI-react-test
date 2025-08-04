// ===========================================
// Template 2: FormComponent.jsx  
// Use this for: Any form that sends data to your FastAPI backend
// ===========================================
// Here we are importing a react Hook, a sort of extra functionality that can "hook" on your component
import { useState } from 'react';
import "./FormComponent.css";

function FormComponent({ onSubmitSuccess }) {
//  by setting data like this, it will persist across renders. so data is consistent
// the format is like this const [object, function that changes object] = useState(initial value of object)
  const [formData, setFormData] = useState({
    name: '',
    email: ''
  });
//   used here again
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    // deconstructing to allow the inclusion of previous value as it is
    setFormData(prev => ({
      ...prev,
      //brackets are necessary to tell it to change name specifically and not add a new name  
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // This is where you'd call your FastAPI endpoint
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        console.log('Success:', result);
        
        // Reset form
        setFormData({ name: '', email: '' });
        
        // Tell parent component we succeeded
        if (onSubmitSuccess) {
          onSubmitSuccess(result);
        }
      }
    } catch (error) {
      console.error('Form submission failed:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="form-component">
        {/* almost regular HTML here */}
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          required
        />
      </div>
      
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? 'Submitting...' : 'Submit'}
      </button>
    </form>
  );
}

export default FormComponent;
// Very simple use where the is declared with the function (we are creating an anonymous function and passing it down)
// HOW TO USE:
// <FormComponent onSubmitSuccess={(result) => {
//   console.log('Form submitted successfully!', result);
//   Maybe refresh a list or show a success message
// }} />