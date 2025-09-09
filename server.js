// Load environment variables from our .env file
require('dotenv').config();

// Load the Express.js, CORS, and Mongoose packages
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

// Create an instance of Express
const app = express();
const PORT = process.env.PORT || 3000;

// === Middleware ===
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// === Connect to MongoDB Atlas ===
// We get the connection string from our .env file
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected to MongoDB successfully!');
    })
    .catch((err) => {
        console.error('Could not connect to MongoDB:', err);
    });

// === Define the Data Structure (Schema) ===
// This is the blueprint for the data we will save
const submissionSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobile: String,
    eventType: String,
    submittedAt: { type: Date, default: Date.now }
});

// Create a "Model" which is the tool we use to interact with our data
const Submission = mongoose.model('Submission', submissionSchema);


// === Routes ===
app.get('/', (request, response) => {
    response.send('Welcome to the AV Productions Backend!');
});

// This route now saves the form data to the database
app.post('/submit-form', async (request, response) => {
    try {
        // Create a new submission document using the data from the form
        const newSubmission = new Submission({
            name: request.body.name,
            email: request.body.email,
            mobile: request.body.mobile,
            eventType: request.body['event-type'] // Use bracket notation for 'event-type'
        });

        // Save the new submission to the database
        await newSubmission.save();
        
        console.log('New submission saved:', newSubmission);

        response.json({ 
            status: 'success', 
            message: 'Form submitted and saved successfully!' 
        });

    } catch (error) {
        console.error('Error saving submission:', error);
        response.status(500).json({
            status: 'error',
            message: 'There was a problem saving your submission.'
        });
    }
});


// This starts the server
app.listen(PORT, () => {
    console.log(`Server is running and listening on http://localhost:${PORT}`);
});