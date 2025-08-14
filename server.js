const express = require('express');
const path = require('path');
const fs = require('fs');

const port = 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/submit', (req, res) => {
  const data = req.body;
  let existingData = [];
    if (fs.existsSync('data.json')) {
    existingData = JSON.parse(fs.readFileSync('data.json', 'utf8'));
  }

  existingData.push(data);
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
  res.send('<h1>Message Saved </h1><a href="/">Go Back</a>');
});

app.listen(port, ()=>{
    console.log('Server started at 3000!!')
})