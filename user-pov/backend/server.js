const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

const app = express();
const PORT = 3000;
const MONGO_URI = process.env.MONGO_URI;

app.use(cors());

app.use(bodyParser.json());
app.use('/uploads', express.static('uploads')); // to serve static files

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
}

// MongoDB connection
mongoose.connect(MONGO_URI, {
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
    Win: { type: [String], default: [] },
    Mid: { type: [String], default: [] },
    Loser: { type: [String], default: [] },
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
    const approval = req.query.approval;
    let query = {};

    if (approval) {
        query.approval = parseInt(approval, 10);
    }

    try {
        const items = await Item.find(query);
        res.json(items);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching items', error: error.message });
    }
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

app.get('/items/:id/comments', async (req, res) => {
    const { id } = req.params;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        res.json(item.comments);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching comments', error: error.message });
    }
});

app.post('/items/:id/comments', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    try {
        const item = await Item.findById(id);
        if (!item) {
            return res.status(404).json({ message: 'Item not found' });
        }
        item.comments.push(comment);
        await item.save();
        res.status(201).json(comment);
    } catch (error) {
        res.status(500).json({ message: 'Error adding comment', error: error.message });
    }
});

app.post('/items/:id/swipe', async (req, res) => {
    const { id } = req.params;
    const { action, phoneNumber } = req.body;

    try {
        const item = await Item.findById(id);

        if (!item) {
            return res.status(404).send('Item not found');
        }

        item.Loser = item.Loser.filter(number => number !== phoneNumber);
        item.Mid = item.Mid.filter(number => number !== phoneNumber);
        item.Win = item.Win.filter(number => number !== phoneNumber);

        if (action === 'win') {
            item.Win.push(phoneNumber);
        } else if (action === 'mid') {
            item.Mid.push(phoneNumber);
        } else if (action === 'lose') {
            item.Loser.push(phoneNumber);
        } else {
            return res.status(400).send('Invalid action');
        }

        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on ${PORT}`);
});
