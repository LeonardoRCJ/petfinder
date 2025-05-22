const prisma = require('../prisma');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateToken = (user) => {
  return jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );
};

exports.register = async (req, res) => {
  try {
    const { name, cpf, phone, email, password, role } = req.body;

    const existingUserEmail = await prisma.user.findUnique({ where: { email } });
    const existingUserCpf = await prisma.user.findUnique({where: { cpf } })
    if (existingUserEmail) return res.status(400).json({ message: `Usuário com email: ${email} já existe` });

    if (existingUserCpf) return res.status(400).json({message: `Usuário com cpf: ${cpf} já existe` }) 

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        cpf,
        phone,
        email,
        password: hashedPassword,
        role: role || 'USER'
      }
    });

    res.status(201).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao registrar' });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return res.status(400).json({ message: 'Usuário não encontrado' });

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) return res.status(400).json({ message: 'Senha incorreta' });

    const token = generateToken(user);

    res.json({ token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
};
