// src/App.js
import React, { useState } from 'react';
import Start from './components/Start';
import Quiz from './components/Quiz';
import Result from './components/Result';
import UploadQue from './components/UploadQue'; // Import UploadQue component
import { DataProvider } from './context/dataContext';

function App() {
  const [showUploadQue, setShowUploadQue] = useState(false); // State to toggle UploadQue page

  const toggleUploadPage = () => {
    setShowUploadQue(!showUploadQue); // Toggle between quiz and upload form
  };

  return (
    <DataProvider>
      <div className="App-header">
        {/* Button to toggle between Quiz and Upload Question */}
        <button className="btn btn-light m-3" onClick={toggleUploadPage}>
          {showUploadQue ? "Go to Quiz" : "Upload Questions"}
        </button>

        {/* Show UploadQue component or the Quiz components */}
        {showUploadQue ? (
          <UploadQue /> // Render UploadQue if toggled on
        ) : (
          <>
            {/* Welcome Page */}
            <Start />

            {/* Quiz Page */}
            <Quiz />

            {/* Result Page */}
            <Result />
          </>
        )}
      </div>
    </DataProvider>
  );
}

export default App;
