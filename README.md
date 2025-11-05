# API Monitor Platform

A comprehensive platform for managing APIs, MCPs, and AI models with intelligent code analysis and monitoring capabilities.

## Features

### 🔐 Authentication
- **User Registration**: Create an account with name, email, and password
- **User Login**: Secure login system
- **Session Management**: Persistent login using localStorage

### ➕ Add API/MCP
- **AI-Powered Code Analysis**: Paste your API code sample and let AI extract:
  - API endpoint URL
  - HTTP method (GET, POST, PUT, DELETE, etc.)
  - API keys and headers
  - Data structure and fields
  - Request/response patterns
- **Automatic Schema Detection**: AI analyzes code to understand data structure
- **Save & Monitor**: Save analyzed APIs for continuous monitoring

### 📊 Dashboard
- **Overview Statistics**: 
  - Total APIs monitored
  - Active APIs count
  - Total AI models
- **API Cards**: Visual cards showing:
  - API name and description
  - Status (active/inactive)
  - HTTP method
  - Number of detected fields
  - Call history count
- **Search**: Real-time search across all monitored APIs

### 🔍 API Detail View
Click any API card to see:
- **Endpoint Information**: Full URL, method, API keys
- **Data Schema**: Detected fields and structure
- **Sample Code**: Original code that was analyzed
- **Call History**: 
  - Timestamp of each call
  - Request method and endpoint
  - Response status (success/error)
  - Response data preview
- **Test API**: Make live API calls and see results

### 🤖 AI Model Management
- **Add AI Models**: Import and manage AI model configurations:
  - Model name
  - Type (Custom, OpenAI, Anthropic)
  - Capability (Text Generation, Analysis, etc.)
  - API endpoint
  - API key
  - Model name/version
  - Context window size
- **Model Table**: View all configured models in a table
- **Delete Models**: Remove models from your collection

## Getting Started

### 1. Open the Application
```bash
# If you have a local server running
open http://localhost:8000

# Or simply open index.html in your browser
open index.html
```

### 2. Register/Login
- Click "Register" tab
- Enter your name, email, and password
- Click "Register" to create account
- Or use "Login" if you already have an account

### 3. Add Your First API
1. Navigate to "Add API/MCP" page
2. Paste your API code sample (e.g., fetch function with endpoint and headers)
3. Click "🤖 Analyze with AI"
4. Review the extracted information
5. Add a name and description
6. Click "💾 Save API/MCP"

### 4. Monitor APIs
- View all APIs on the Dashboard
- Click any API card to see details
- Use "🧪 Test API" to make live calls
- View call history and responses

### 5. Manage AI Models
- Go to "🤖 AI Models" page
- Click "➕ Add AI Model"
- Fill in model configuration
- Save to add to your collection

## Example API Code Sample

```javascript
async function fetchRecipeEntities() {
    const response = await fetch(`https://app.base44.com/api/apps/6907f8149df3a6b0ccf8bfb3/entities/Recipe`, {
        headers: {
            'api_key': '674dc575177a4851b7a276bf7084f85b',
            'Content-Type': 'application/json'
        }
    });
    const data = await response.json();
    return data;
}
```

The AI will automatically extract:
- Endpoint: `https://app.base44.com/api/apps/.../entities/Recipe`
- Method: `GET`
- API Key: `674dc575177a4851b7a276bf7084f85b`
- Headers: `Content-Type: application/json`

## Data Storage

All data is stored locally in your browser using localStorage:
- User accounts
- Monitored APIs
- AI model configurations
- API call history

**Note**: Data is stored locally and will be cleared if you clear browser data.

## Project Structure

```
kcanva01/
├── index.html          # Main application HTML
├── styles.css          # Complete styling
├── app.js              # Application logic
├── recipe-types.ts     # TypeScript types (legacy)
└── README.md           # This file
```

## Technical Details

### AI Code Analysis
The current implementation uses pattern matching to extract API information. In production, this would connect to an actual AI model API (like the ones you can configure in the AI Models section) to perform more sophisticated code analysis.

### API Testing
When you click "Test API", the application:
1. Makes a live HTTP request to the endpoint
2. Records the response
3. Adds the call to history
4. Displays success/error status

### Browser Compatibility
Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)

## Future Enhancements

- [ ] Connect to actual AI API for code analysis
- [ ] Backend integration for data persistence
- [ ] Real-time API monitoring
- [ ] Alerts and notifications
- [ ] API documentation generation
- [ ] Export/import configurations
- [ ] Team collaboration features

## License

Development tool for API and AI model management.
