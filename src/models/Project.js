const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title_es: { type: String, required: true },
  title_en: { type: String, required: true },
  description_es: { type: String, required: true },
  description_en: { type: String, required: true },
  category: { 
    type: String, 
    enum: ['web', 'mobile', 'desktop', 'tool'],
    required: true 
  },
  image: { type: String, default: '' },
  techs: [{ type: String }],
  github_url: { type: String, default: '' },
  live_url: { type: String, default: '' },
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 }
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)