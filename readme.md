
## Setup

### Backend

1. Navigate to the [`diagram-generator-backend`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2F1.Pvt%2F1.Projects%2FC4%20diagrambuilder%20Rag%2Fdiagram-generator-backend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "\diagram-generator-backend") directory:
    ```sh
    cd diagram-generator-backend
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a [`.env`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2Fc%3A%2F1.Pvt%2F1.Projects%2FC4%20diagrambuilder%20Rag%2Fdiagram-generator-backend%2F.env%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "diagram-generator-backend\.env") file in the [`diagram-generator-backend`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2F1.Pvt%2F1.Projects%2FC4%20diagrambuilder%20Rag%2Fdiagram-generator-backend%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "diagram-generator-backend") directory with the following content:
    ```env
    LLM_TYPE=chatgpt
    CHATGPT_API_KEY=your_api_key_here
    ```

4. Start the backend server:
    ```sh
    npm start
    ```

### Frontend

1. Navigate to the [`diagram-viewer`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2F1.Pvt%2F1.Projects%2FC4%20diagrambuilder%20Rag%2Fdiagram-viewer%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "diagram-viewer") directory:
    ```sh
    cd diagram-viewer
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Start the frontend application:
    ```sh
    npm start
    ```

## Running Both Frontend and Backend Together

To run both the frontend and backend together, open two terminal windows or tabs. In one terminal, start the backend server by following the steps in the Backend section. In the other terminal, start the frontend application by following the steps in the Frontend section.

## Testing

### Frontend

To run the frontend tests, navigate to the [`diagram-viewer`](command:_github.copilot.openRelativePath?%5B%7B%22scheme%22%3A%22file%22%2C%22authority%22%3A%22%22%2C%22path%22%3A%22%2FC%3A%2F1.Pvt%2F1.Projects%2FC4%20diagrambuilder%20Rag%2Fdiagram-viewer%22%2C%22query%22%3A%22%22%2C%22fragment%22%3A%22%22%7D%5D "diagram-viewer") directory and run:
```sh
npm test