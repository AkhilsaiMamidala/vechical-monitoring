const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 3000; // Port number for the backend server

// In-memory data storage for simplicity

let serviceRequests = {}; // Store service requests for each unique machineId

// Middleware
app.use(cors()); // Enable CORS for all origins
app.use(express.json()); // Parse JSON request bodies
app.use(express.static(path.join(__dirname, '../frontend'))); // Serve static files

// Serve the main frontend file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'index.html'));
});

// Serve the service history page
app.get('/service_history', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend', 'servicehistory.html'));
});

// API Endpoint to fetch all service requests
app.get('/serviceRequests', (req, res) => {
    // Flatten serviceRequests object into an array of requests
    const allRequests = Object.values(serviceRequests).flat();
    res.json(allRequests); // Return all service requests as JSON
});


// API Endpoint to add a new service request
app.post('/addServiceRequest', (req, res) => {
    const { machineId, problem, transactionHash } = req.body;

    // Validate input
    if (!machineId || !problem || !transactionHash) {
        return res.status(400).send('All required fields (machineId, problem, transactionHash) must be provided.');
    }

    // Initialize an array for the machineId if it doesn't exist
    if (!serviceRequests[machineId]) {
        serviceRequests[machineId] = [];
    }

    // Add the new service request to the array
    const newRequest = {
        machineId,
        problem,
        transactionHash,
        requestedAt: new Date() // Timestamp for when the request was added
    };

    serviceRequests[machineId].push(newRequest);

    res.json({
        message: 'Service request added successfully!',
        serviceRequest: newRequest,
    });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
