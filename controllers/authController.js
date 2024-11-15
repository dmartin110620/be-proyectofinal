const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    try {
        const { fullName, email, universityID, contactNumber, password } = req.body;

        // Check if all fields are provided
        if (!fullName || !email || !universityID || !contactNumber || !password) {
            return res.status(400).json({ message: 'Todos los campos son requeridos' });
        }

        // Check if user with this email already exists
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'El correo ya está en uso' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user
        const newUser = new User({
            fullName,
            email,
            universityID,
            contactNumber,
            password: hashedPassword
        });

        // Save user to database
        await newUser.save();

        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};


const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Check if user exists
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: 'Credenciales incorrectas' }); // Generic error
        }

        // Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: 'Credenciales incorrectas' }); // Generic error
        }

        // Generate JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.json({ token });

        if (email === 'test@example.com' && password === 'password123') {
            return res.status(200).json({ token: 'fake-jwt-token', role: 'pasajero' });
        } else {
            return res.status(401).json({ message: 'Credenciales incorrectas' });
        }

    } catch (error) {
        console.error('Error during login:', error);
        res.status(500).json({ message: 'Error en el servidor' });
    }
};



module.exports = {
    registerUser,
    loginUser,
};
