const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('Hello World!'));

// Make sure the app listens on the port provided by Cloud Run (or defaults to 8080)
const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
