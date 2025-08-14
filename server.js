const express = require('express');
const path = require('path');
const fs = require('fs');

const port = process.env.PORT || 3000;
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname,'index.html'))
})

app.post('/submit', (req, res) => {
   try {
    let existingData = [];

    if (fs.existsSync("data.json")) {
      const fileData = fs.readFileSync("data.json", "utf-8");
      if (fileData.trim()) {
        const parsed = JSON.parse(fileData);
        existingData = Array.isArray(parsed) ? parsed : []; // Ensure array
      }
    }

    existingData.push(req.body); // Now safe to push

    fs.writeFileSync("data.json", JSON.stringify(existingData, null, 2));
    res.status(200).send({ message: "Data saved successfully" });

  } catch (err) {
    console.error(err);
    res.status(500).send({ error: "Internal server error" });
  }
});

app.listen(port, ()=>{
    console.log('Server started at 3000!!')
})