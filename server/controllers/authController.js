import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import { validationResult } from 'express-validator';

// Generar el token JWT
const generateToken = (user) => {
  return jwt.sign(
    { id: user._id, username: user.username },
    process.env.JWT_SECRET || 'secretKey',
    { expiresIn: '1h' }
  );
};


// Login de usuario
export const loginUser = async (req, res) => {
  try {
    const errors = validationResult(req); 
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() }); 
    }
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ id: user._id, username: user.username }, process.env.JWT_SECRET || 'secretKey', { expiresIn: '1h' });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Obtener los datos del usuario a partir del token
export const getMyData = async (req, res) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', ''); // Obtener el token del header

    if (!token) {
      return res.status(401).json({ message: 'No token provided' });
    }

    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretKey');

    // Buscar al usuario en la base de datos
    const user = await User.findById(decoded.id);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Retornar los datos del usuario
    res.status(200).json({
      id: user._id,
      username: user.username,
      email: user.email, // Si deseas incluir otros datos del usuario, puedes agregarlos aquí
    });
  } catch (error) {
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

