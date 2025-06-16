import express from 'express';
import Contact from '../models/Contact.js';

const router = express.Router();

// Get all contact form submissions
router.get('/', async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 });
    res.status(200).json(contacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific contact form submission
router.get('/:id', async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    res.status(200).json(contact);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Submit a new contact form
router.post('/', async (req, res) => {
  try {
    const newContact = new Contact({
      ...req.body,
      status: 'new'
    });
    const savedContact = await newContact.save();
    res.status(201).json(savedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update contact status
router.put('/:id/status', async (req, res) => {
  try {
    const { status } = req.body;
    
    if (!['new', 'read', 'replied', 'spam'].includes(status)) {
      return res.status(400).json({ message: 'Invalid status' });
    }
    
    const updatedContact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status, updatedAt: Date.now() },
      { new: true }
    );
    
    if (!updatedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json(updatedContact);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a contact submission
router.delete('/:id', async (req, res) => {
  try {
    const deletedContact = await Contact.findByIdAndDelete(req.params.id);
    
    if (!deletedContact) {
      return res.status(404).json({ message: 'Contact not found' });
    }
    
    res.status(200).json({ message: 'Contact submission deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router; 