const User = require('../models/User');
// const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const registerUser = async (req, res) => {
    const { fullName, email, universityID, contactNumber, password } = req.body;

    if (!fullName || !email || !universityID || !contactNumber || !password) {
        return res.status(400).json({ message: 'Todos los campos son requeridos' });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
        return res.status(400).json({ message: 'El correo ya está en uso' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        fullName,
        email,
        universityID,
        contactNumber,
        password: hashedPassword
    });

    try {
        await newUser.save();
        res.status(201).json({ message: 'Usuario creado con éxito' });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
        return res.status(400).json({ message: 'Usuario no encontrado' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        return res.status(400).json({ message: 'Contraseña incorrecta' });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
};


module.exports = {
    registerUser,
    loginUser,
};
