import React, { useState } from 'react';

function TextSubmissionForm() {
  // State to hold the input value
  const [inputValue, setInputValue] = useState('');

  // Function to update state with input value
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    // Prevent the default form submit action
    event.preventDefault();
    // Alert or handle the input value on submit
    //alert(`Submitted Value: ${inputValue}`);
    // Reset the input value after submission
    //setInputValue('');

    const queryParams = new URLSearchParams({ prompt: inputValue }).toString();
    const url = `http://localhost:8000/completion?${queryParams}`;
    try {
      const response = await fetch(url);
      if (response.ok) {
        const jsonResponse = await response.json();
        console.log('Server response:', jsonResponse);
        alert(`Server response: ${jsonResponse.message}`);
      } else {
        // Handle HTTP errors
        alert('Failed to submit text');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Error submitting form');
    }
    setInputValue(''); // Reset the input value after submission
};

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Enter text:
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default TextSubmissionForm;