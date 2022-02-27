const express = require('express');
const app = express();
app.use(express.static(__dirname));
app.get('/', (req, res) => {
    res.send("Welcome to Book My Chair Application!!!");
});

app.listen(process.env.PORT || 8000);