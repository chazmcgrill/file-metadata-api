const express = require('express');
const app = express();

app.use(express.static('public'));
app.use(express.json())
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/views/index.html');
});

// app.post('/metadata', (res, req) => {

// });

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`server running on port: ${port}`);
})