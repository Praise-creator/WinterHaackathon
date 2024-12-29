const express = require('express');
const multer = require('multer');

const app = express();
const upload = multer({ dest: 'uploads/' }); // Set upload folder

app.post('/upload', upload.single('document'), (req, res) => {
    console.log(req.file); // Info about the uploaded file
    res.json({ message: 'File uploaded successfully!' });
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
