import React, { useState, useRef } from 'react';

function App() {
  
  const [parsedData, setParsedData] = useState(null);
  const uploadInput = useRef(null);
  
  const handleUploadImage = async (ev) => {
    ev.preventDefault();

    const data = new FormData()
    data.append('file', uploadInput.current.files[0]);

    try {
      const response = await fetch('http://127.0.0.1:8000/upload', {
        method: 'POST',
        body: data,
      });

      if (response.ok) {
        // const body = await response.json();
        // console.log("======== RESPONSE ========", body)
        const response_data = await response.json();
        setParsedData(response_data['parsed_resume_data']);
                console.log('Parsed Resume Data:', response_data['parsed_resume_data']);
      } else {
        // Handle error here, e.g., display an error message to the user
        console.error('Error uploading the file.');
      }
    } catch (error) {
      // Handle network or other errors here
      console.error('An error occurred:', error);
    }
    
  };

  return (
    <form onSubmit={handleUploadImage}>
      <div>
        <input ref={uploadInput} accept=".pdf,.doc,.docx" required type="file" />
      </div>
      {/* <div>
        <input ref={fileName} type="text" placeholder="Enter the desired name of file" />
      </div> */}
      <br />
      <div>
        <button>Upload</button>
        {parsedData && (
        <div>
           {/* <pre>{JSON.stringify(parsedData)}</pre> */}
           {/* <p>Email: {parsedData['email']}</p> */}
            <p>Full Name: {parsedData['name']}</p>
            <p>Email: {parsedData['email']}</p>
            <p>Phone: {parsedData['phone']}</p>
            <p>Total Experience: {parsedData['total_exp']}</p>
            <p>University: {parsedData['university']}</p>
            <p>Designition: {parsedData['designition']}</p>
            <p>Degree: {parsedData['degree']}</p>
            <p>Skills: {parsedData['skills']}</p>
            <p>Work history: {parsedData['Companies worked at']}</p>
            
            {/* <p>Phone Number: {parsedData.phoneNumber}</p>
            <p>Phone Number: {parsedData.designition}</p> */}
        </div>
      )}
      </div>
    </form>
  );
}

export default App;
