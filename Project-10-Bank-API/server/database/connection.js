const mongoose = require('mongoose')
const databaseUrl = "mongodb+srv://NKSnT:P&1nt1tBl&ck0rM&k31tWh1te@cluster0.v5fd3ty.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  process.env.DATABASE_URL || 'mongodb://localhost/argentBankDB'

module.exports = async () => {
  try {
    await mongoose.connect(databaseUrl, { useNewUrlParser: true })
    console.log('Database successfully connected')
  } catch (error) {
    console.error(`Database Connectivity Error: ${error}`)
    throw new Error(error)
  }
}
