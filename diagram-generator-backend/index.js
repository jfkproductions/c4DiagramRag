require('dotenv').config();
const express = require('express');
const axios = require('axios');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes
app.use(express.json());

const PORT = process.env.PORT || 3000;
const { CHATGPT_API_KEY } = process.env;

const generateWithChatGPT = async (description, diagramType) => {
    try {
        console.log(`Making a request to ChatGPT API for a ${diagramType} diagram...`);
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: "gpt-4-turbo-preview",
            messages: [
                {
                    role: "user",
                    content: `Identify the diagram type (e.g., draw.io, mermaid, or plantuml) and generate only the diagram code for the following setup without any explanation: ${description}`
                },
                {
                    role: "system",
                    content: "You are an expert in generating diagram codes. Provide just the code with no summary or explanation."
                }
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${CHATGPT_API_KEY}`
            }
        });

        console.log(`Response received from ChatGPT API for a ${diagramType} diagram.`);
        return response.data.choices[0].message.content.trim();
    } catch (error) {
        console.error('Error calling ChatGPT API:', error.message);
        throw new Error('Failed to communicate with ChatGPT');
    }
};

app.post('/generate-diagram', async (req, res) => {
    const { description, diagramType } = req.body;

    // Validate request body
    if (!description || !diagramType) {
        return res.status(400).json({ error: 'Description and diagramType are required.' });
    }

    // Validate diagramType
    const validDiagramTypes = ['drawio', 'mermaid', 'plantuml'];
    if (!validDiagramTypes.includes(diagramType)) {
        return res.status(400).json({ error: 'Invalid diagramType.' });
    }

    const templatePath = path.join(__dirname, 'templates', `${diagramType}.txt`);
    console.log(`Reading template for ${diagramType} from ${templatePath}`);

    if (!fs.existsSync(templatePath)) {
        return res.status(400).json({ error: 'Diagram type template not found.' });
    }

    const templateContent = fs.readFileSync(templatePath, 'utf8');
    console.log(`Template for ${diagramType} read successfully.`);

    try {
        let isValid = false;
        let attempts = 0;
        let generatedCode = '';

        // Loop until a valid code is generated or max attempts reached
        while (!isValid && attempts < 3) {
            attempts++;

            console.log(`Generating code for ${diagramType}, attempt ${attempts}...`);
            // const generatePrompt = `Generate code only ${diagramType} diagram code for the following description: ${description}\n\nbased on the Template:\n${templateContent}`;
            //  test code responsponse without the template
            const generatePrompt = `Generate code only for  ${diagramType} diagram code for the following description: ${description}`;
            console.log(`prompt :${generatePrompt}`);
            generatedCode = await generateWithChatGPT(generatePrompt, diagramType);

            // Check if the code is valid
            const validationPrompt = `Validate this ${diagramType} diagram code:\n\n${generatedCode}\n\nIs this valid ${diagramType} diagram code?`;
            const validationResponse = await generateWithChatGPT(validationPrompt, diagramType);

            isValid = validationResponse.toLowerCase().includes("yes");

            if (!isValid) {
                console.log(`Validation failed for ${diagramType} on attempt ${attempts}. Retrying...`);
            }
        }

        if (isValid) {
            const cleanCode = generatedCode.replace(/^```(xml|plantuml)?|```$/g, '').trim();

            console.log(`Generated valid ${diagramType} diagram code after ${attempts} attempts.`);
            res.json({ code: cleanCode });
        } else {
            const cleanCode = generatedCode.replace(/^```(xml|plantuml)?|```$/g, '').trim();

            console.log(`Generated valid ${diagramType} diagram code after ${attempts} attempts.`);
            res.json({ code: cleanCode });
            // console.log(`Failed to generate valid ${diagramType} diagram code after ${attempts} attempts.`);
            // res.status(500).json({ error: "Failed to generate valid code after several attempts. Please review the input or try again later." });
        }
    } catch (error) {
        console.error('Error during diagram generation:', error.message);
        res.status(500).json({ error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
