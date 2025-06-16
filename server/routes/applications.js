import express from 'express';
import Application from '../models/Application.js';

const router = express.Router();

// Get all applications
router.get('/', async (req, res) => {
  try {
    const applications = await Application.find().sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get applications for a specific job
router.get('/job/:jobId', async (req, res) => {
  try {
    const applications = await Application.find({ jobId: req.params.jobId }).sort({ createdAt: -1 });
    res.status(200).json(applications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific application
router.get('/:id', async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ message: 'Application not found' });
    }
    res.status(200).json(application);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new application
router.post('/', async (req, res) => {
  try {
    const newApplication = new Application({
      ...req.body,
      status: 'new'
    });
    const savedApplication = await newApplication.save();
    res.status(201).json(savedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update application status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'reviewing', 'interviewed', 'accepted', 'rejected'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Add notes to an application
router.put('/:id/notes', async (req, res) => {
  try {
    const { notes } = req.body;
    
    const updatedApplication = await Application.findByIdAndUpdate(
      req.params.id,
      { notes, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json(updatedApplication);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete an application
router.delete('/:id', async (req, res) => {
  try {
    const deletedApplication = await Application.findByIdAndDelete(req.params.id);
    
    if (!deletedApplication) {
      return res.status(404).json({ message: 'Application not found' });
    }
    
    res.status(200).json({ message: 'Application deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 