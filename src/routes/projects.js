const express = require('express')
const router = express.Router()
const Project = require('../models/Project')
const auth = require('../middleware/auth')

// GET todos los proyectos (público)
router.get('/', async (req, res) => {
  try {
    const { category } = req.query
    const filter = category ? { category } : {}
    const projects = await Project.find(filter).sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener proyectos' })
  }
})

// GET un proyecto por ID (público)
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' })
    res.json({ success: true, data: project })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al obtener proyecto' })
  }
})

// POST crear proyecto (solo admin)
router.post('/', auth, async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json({ success: true, data: project })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// PUT editar proyecto (solo admin)
router.put('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' })
    res.json({ success: true, data: project })
  } catch (error) {
    res.status(400).json({ success: false, message: error.message })
  }
})

// DELETE borrar proyecto (solo admin)
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Proyecto no encontrado' })
    res.json({ success: true, message: 'Proyecto eliminado' })
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error al eliminar proyecto' })
  }
})

module.exports = router
