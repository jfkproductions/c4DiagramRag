import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';


const DiagramViewer = () => {

  const [description, setDescription] = useState('');
  const [diagramType, setDiagramType] = useState('mermaid');
  const [codeResult, setCodeResult] = useState('');
  const [fetchingData, setFetchingData] = useState(false);

  const handleSubmit = async () => {
    setFetchingData(true);
    try {
      const response = await axios.post('http://localhost:3000/generate-diagram', {
        description,
        diagramType
      });
      setCodeResult(response.data.code);
      // If diagram type is mermaid, set preview
    
    } catch (error) {
      console.error('Error fetching diagram:', error.message);
    } finally {
      setFetchingData(false);
    }
  };


  return (
    <div className="container">
      <h2>Diagram Viewer</h2>
      <div className="form-group">
        <label htmlFor="description">Diagram Description:</label>
        <input
          type="text"
          id="description"
          className="form-control"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="diagramType">Diagram Type:</label>
        <select
          id="diagramType"
          className="form-control"
          value={diagramType}
          onChange={(e) => setDiagramType(e.target.value)}
        >
          <option value="mermaid">Mermaid</option>
          <option value="drawio">Draw.io</option>
          <option value="plantuml">PlantUML</option>
        </select>
      </div>

      <button className="btn btn-primary" onClick={handleSubmit} disabled={fetchingData}>
        {fetchingData ? 'Fetching Data...' : 'Generate Diagram'}
      </button>

      <div>
        <h3>Code Result:</h3>
        <textarea
          className="form-control"
          value={codeResult}
          rows="10"
          cols="50"
          readOnly
        />
      </div>


    </div>
  );
};
export default DiagramViewer;