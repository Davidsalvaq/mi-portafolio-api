const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const auth = require('../middleware/auth')

// Valores por defecto en memoria (se pueden actualizar via admin)
let statsData = {
  years_coding: 1,
  commitment: '100%',
  coffees: 999
}

// GET estadísticas públicas
router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments()
    res.json({
      success: true,
      data: {
        projects: projectCount,
        years_coding: statsData.years_coding,
        commitment: statsData.commitment,
        coffees: statsData.coffees
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener estadísticas' })
  }
})

// PUT actualizar estadísticas (solo admin)
router.put('/', auth, async (req, res) => {
  try {
    const { years_coding, coffees } = req.body
    if (years_coding !== undefined) statsData.years_coding = years_coding
    if (coffees !== undefined) statsData.coffees = coffees
    res.json({ success: true, data: statsData })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar estadísticas' })
  }
})

module.exports = router