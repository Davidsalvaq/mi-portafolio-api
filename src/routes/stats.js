const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const auth = require('../middleware/auth')

let statsData = {
  years_coding: 2,
  projects_override: 0
}

// GET estadísticas públicas
router.get('/', async (req, res) => {
  try {
    const projectCount = await Project.countDocuments()
    const projects = statsData.projects_override > 0 
      ? statsData.projects_override 
      : projectCount

    res.json({
      success: true,
      data: {
        projects,
        years_coding: statsData.years_coding,
        commitment: '100%'
      }
    })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener estadísticas' })
  }
})

// PUT actualizar estadísticas (solo admin)
router.put('/', auth, async (req, res) => {
  try {
    const { years_coding, projects_override } = req.body
    if (years_coding !== undefined) statsData.years_coding = years_coding
    if (projects_override !== undefined) statsData.projects_override = projects_override
    res.json({ success: true, data: statsData })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al actualizar estadísticas' })
  }
})

module.exports = router