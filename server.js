const express = require('express');
const path = require('path');
const mongoose = require('mongoose');

const port = process.env.PORT || 3000;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));


mongoose.connect(
  'mongodb+srv://17singhatul:ITfvJinkr5pOZoHG@cluster0.8wslpsr.mongodb.net/data',
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('✅ Connected to MongoDB Atlas'))
.catch(err => console.error('❌ MongoDB connection error:', err));


const messageSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
  createdAt: { type: Date, default: Date.now }
});


const Message = mongoose.model('Message', messageSchema);


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Handle POST request
app.post('/submit', async (req, res) => {
  try {
    const newMessage = new Message(req.body);
    await newMessage.save();
    res.status(200).send({ message: "Data saved successfully to MongoDB Atlas" });
  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, () => {
  console.log(` Server started at http://localhost:${port}`);
});
