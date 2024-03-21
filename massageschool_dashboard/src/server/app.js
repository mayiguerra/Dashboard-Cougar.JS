const express = require('express');

const app = express();
const PORT = 3000;

app.get('/', function(request, response) {
    response.send('Hello from linux!')
})

app.listen(PORT, function() {
    console.log(`Server listening on port ${PORT}`)
});

// error handling method
app.use(function (error, request, response, next) {
    console.error(error.message, request)
    if (!error.statusCode) {error.statusCode = 500};
    response.status(error.statusCode).send(error.message)
});
