const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config({ path: require('path').resolve(__dirname, '../.env') })

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB conectado'))
  .catch((err) => console.log('❌ Error:', err))

// Rutas
app.use('/api/projects', require('./routes/projects'))
app.use('/api/auth', require('./routes/auth'))

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '🚀 API de portafolio funcionando' })
})

// Puerto
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en puerto ${PORT}`)
})