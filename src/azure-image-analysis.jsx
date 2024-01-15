import axios from 'axios';

export async function analyzeImage(imageUrl) {
    const endpoint = "https://analisafotos.cognitiveservices.azure.com/";
    const subscriptionKey = "";

    const headers = {
        "Ocp-Apim-Subscription-Key": subscriptionKey,
        "Content-Type": "application/json",
    };

    const params = {
        "api-version": "2023-10-01",
        features: "tags,read,caption,denseCaptions,smartCrops,objects,people",
    };

    const requestBody = {
        url: imageUrl,
    };

    try {
        console.log("Request URL:", `${endpoint}/computervision/imageanalysis:analyze`);
        console.log("Request headers:", headers);
        console.log("Request params:", params);

        const response = await axios.post(
            `${endpoint}/computervision/imageanalysis:analyze`,
            requestBody,
            { headers, params }
        );

        console.log("Response:", response.data);
        return response.data;

        
    } catch (error) {
        console.error("Error en la solicitud de análisis de imagen:", error.response?.data || error.message);
        throw error;
    }
}
