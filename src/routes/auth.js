const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')

// POST login admin
router.post('/login', async (req, res) => {
  try {
    const { password } = req.body

    if (password !== process.env.ADMIN_PASSWORD) {
      return res.status(401).json({ success: false, message: 'Contraseña incorrecta' })
    }

    const token = jwt.sign(
      { role: 'admin' },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({ success: true, token })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error en el servidor' })
  }
})

module.exports = router