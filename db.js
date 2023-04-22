const { connect } = require('mongoose')

const connectDB = async () => {
    try {
        await connect('mongodb://127.0.0.1:27017/ricknmorty')
        console.info('DB Connected');
    } catch (error) {
        console.error(error)
    }
};

module.exports = { connectDB }