const express = require('express');
const morgan = require('morgan');
const path = require('path');
const axios = require('axios')
const app = express();
const cors = require('cors')
const port = 3050;
const parse = require('body-parser');

app.use(cors())
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, '/public')));
// app.use(express.static(__dirname, '/public'));

// app.use('/:id', express.static(path.join(__dirname, './public')));


app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '/public/index.html'))
})

app.listen(port, () => {
  console.log(`server running at: http://localhost:${port}`);
});
