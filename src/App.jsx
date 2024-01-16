// app.jsx
import React, { useState } from "react";
import { analyzeImage } from "./azure-image-analysis";

const sortTags = (tagsArray) => {
  return tagsArray.sort((a, b) => b.confidence - a.confidence);
};

const roundPercentage = (percentage) => {
  return (percentage * 100).toFixed(2);
};

function App() {
  const [imageUrl, setImageUrl] = useState("");
  const [imageAnalysis, setImageAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyzeClick = async () => {
    setLoading(true);
    try {
      const imageAnalysis = await analyzeImage(imageUrl);
      setImageAnalysis(imageAnalysis);
    } catch (error) {
      setError("Error al analizar la imagen. Intente con otra imagen.");
    } finally {
      setLoading(false);
    }
  };

  const renderTable = () => {
    if (!imageAnalysis || !imageAnalysis.tagsResult.values.length) {
      return null;
    }

    const sortedTags = sortTags(imageAnalysis.tagsResult.values);

    return (
      <table>
        <thead>
          <tr>
            <th>Etiqueta</th>
            <th>Porcentaje</th>
          </tr>
        </thead>
        <tbody>
          {sortedTags.map((tag, index) => (
            <tr key={index}>
              <td>{tag.name}</td>
              <td>{roundPercentage(tag.confidence)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div className="App">
      <h1>Analizar imagen</h1>
      <input
        type="text"
        value={imageUrl}
        onChange={(e) => setImageUrl(e.target.value)}
      />
      <button onClick={handleAnalyzeClick} disabled={loading}>
        Analizar
      </button>
      {loading && <p>Analizando imagen...</p>}
      {error && <p>{error}</p>}
      {imageAnalysis && (
        <div>
          <h2>Resultados</h2>
          {renderTable()}
        </div>
      )}
    </div>
  );
}

export default App;
