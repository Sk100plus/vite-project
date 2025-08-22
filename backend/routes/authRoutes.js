// File: backend/routes/authRoutes.js
const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const router = express.Router();

// Generate JWT token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'a_very_secret_key', {
        expiresIn: '30d',
    });
};

// Register a new user
router.post('/register', async (req, res) => {
    const { fullName, phoneNumber, email, password, companyName, isAgent } = req.body;
    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }

        const user = await User.create({
            fullName,
            phoneNumber,
            email,
            password,
            companyName,
            isAgent,
        });

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            token: generateToken(user._id),
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// Login user
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await user.matchPassword(password))) {
            res.json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email,
                token: generateToken(user._id),
            });
        } else {
            res.status(401).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// New endpoint to fetch user profile data
router.get('/profile/:userId', async (req, res) => {
    try {
        const user = await User.findById(req.params.userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

// New endpoint to upload profile image
router.post('/upload-profile-image', async (req, res) => {
    const { userId, image } = req.body;
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        
        // This is a simplified approach. In a real app, you would save the image to
        // a cloud storage service (e.g., AWS S3, Cloudinary) and store the resulting URL.
        user.profileImage = image;
        await user.save();
        
        res.json({ imageUrl: image });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;