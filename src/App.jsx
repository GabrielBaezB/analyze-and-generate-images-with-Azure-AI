import React, { useState } from "react";
import { analyzeImage } from "./azure-image-analysis";

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
          <p>Etiquetas: {Array.isArray(imageAnalysis.tagsResult.values) ? imageAnalysis.tagsResult.values.join(", ") : 'No hay etiquetas disponibles'}</p>

        </div>
      )}
    </div>
  );
}

export default App;