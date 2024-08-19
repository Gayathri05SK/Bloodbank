const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// Initialize express app
const app = express();

// Middleware
app.use(express.json()); // For parsing application/json
app.use(cors()); // Enable CORS

// MongoDB connection
const mongoUri = 'mongodb://localhost:27017/bloodbank'; // Replace with your actual database URI

if (!mongoUri) {
  console.error('MongoDB URI is not defined');
  process.exit(1);
}

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Successfully connected to MongoDB'))
.catch((error) => {
  console.error('Failed to connect to MongoDB:', error);
  process.exit(1); // Exit process if unable to connect to the database
});

// Mongoose schemas and models
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

const donationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  bloodType: { type: String, required: true },
  units: { type: Number, required: true, default: 1 },
  alreadyRegistered: { type: String, required: true },
  place: { type: String, required: true },
});

// New schema for registration
const registerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  age: { type: Number, required: true },
  gender: { type: String, required: true },
  type: { type: String, required: true },
  bloodType: { type: String, required: true },
  units: { type: Number, required: true, default: 1 },
  place: { type: String, required: true },
  password: { type: String, required: true }
});

const User = mongoose.model('User', userSchema);
const Donation = mongoose.model('Donation', donationSchema);
const Register = mongoose.model('Register', registerSchema); // New model for registration

// Route for handling donation form submission
app.post('/api/donate', async (req, res) => {
  try {
    const newDonation = new Donation(req.body);
    await newDonation.save();
    res.status(201).json({ message: 'Donation data saved successfully!' });
  } catch (error) {
    res.status(500).json({ message: 'Error saving donation data', error });
  }
});

// Route for handling registration form submission
app.post('/api/register', async (req, res) => {
  const { name, email, phone, age, gender, type, bloodType, units, place, password } = req.body;

  try {
    // Check if the email is already registered
    const existingRegistration = await Register.findOne({ email });
    if (existingRegistration) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    // Hash the password before saving
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new registration entry
    const newRegistration = new Register({
      name, email, phone, age, gender, type, bloodType, units, place, password: hashedPassword
    });
    
    // Save the new registration to the database
    await newRegistration.save();

    res.status(201).json({ message: 'Registration data saved successfully' });
  } catch (err) {
    console.error('Error saving registration data:', err);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Route for handling user login
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign({ userId: user._id }, 'your_jwt_secret', { expiresIn: '1h' });

    res.json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
