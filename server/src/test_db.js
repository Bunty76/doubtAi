const mongoose = require('mongoose');
const uri = 'mongodb+srv://dbuser:DBuser1234@rzt94fh.mongodb.net/doubtsDB?retryWrites=true&w=majority';

console.log('Attempting to connect to SRV URI...');
mongoose.connect(uri)
    .then(() => {
        console.log('Success!');
        process.exit(0);
    })
    .catch(err => {
        console.error('Failed:', err.message);
        process.exit(1);
    });
