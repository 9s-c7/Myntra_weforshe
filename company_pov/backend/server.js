const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 8082;

app.use(cors());
app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // to serve static files

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// MongoDB connection
mongoose.connect('CLUSTER_URI', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define schema and model
const itemSchema = new mongoose.Schema({
    name: String,
    description: String,
    keywords: [String],
    imageUrl: String,
    approval: { type: Number, default: 0 },
    comments: { type: [String], default: [] },
    completed: { type: Number, default: 0 },
});

const Item = mongoose.model('Item', itemSchema);

// Multer setup for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
    res.send('Welcome to the API');
});

app.get('/items', async (req, res) => {
    const items = await Item.find();
    res.json(items);
});

app.post('/items', upload.single('image'), async (req, res) => {
    console.log('Request received:', req.body, req.file);
    const { name, description, keywords } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : '';
    const newItem = new Item({
        name,
        description,
        keywords: keywords.split(', '),
        imageUrl,
        approval: 0,
        comments: [],
        completed: 0
    });
    await newItem.save();
    res.status(201).json(newItem);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});