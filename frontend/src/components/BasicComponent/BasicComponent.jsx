// Template 1: BasicComponent.jsx
// Use this for: Simple display components (like a user card, header, footer)
// ===========================================

// You can import a css file here
import "./BasicComponent.css";


// The arguments of the component are called Props, they are properties that get passd down 
// by parent component that will call this componetn
function BasicComponent({ title, content, isHighlighted }) { // 
  return (
    <div className={`basic-component ${isHighlighted ? 'highlighted' : ''}`}>
    {/* Similar templating to using Jinja2, you can pass these things down */}
      <h3>{title}</h3>
      <p>{content}</p>
    </div>
  );
}
// Necessary otherwise you would not be able to use this component elsewhere
export default BasicComponent;

// How to call this module 
// HOW TO USE:
// <BasicComponent 
//   title="Welcome!" 
//   content="This is a simple component" 
//   isHighlighted={true} 
// />

