const { json } = require('express');
const prisma = require('../prisma')


exports.deleteUser = async (req, res) => {
    try {
        await prisma.user.delete({ where: parseInt(req.params.id)});
        res.status(200).json({message: 'Usuário excluido com sucesso'})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao deletar usuário'})
    }
}

exports.getAllUsers = async (req, res) => {
    try {
        const users = await prisma.user.findMany()
        res.status(200).json(users)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao listar usuários'})
    }
}

exports.getUserById = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where: {id: parseInt(req.params.id)}
        });
        if (!user) return res.status(404).json({ message: 'Usuário não encontrado' });
        res.json(user)
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Erro ao buscar usuário' });
    }
}


exports.editUser = async (req, res) => {
  try {
    const { name, phone, email } = req.body;

    const user = await prisma.user.update({
      where: { id: parseInt(req.params.id) },
      data: {
        name,
        phone,
        email
      }
    });

    res.json(user);
  } catch (err) {
    console.error(err);
    if (err.code === 'P2025') {  // Prisma "Record not found"
      return res.status(404).json({ message: 'Usuário não encontrado' });
    }
    res.status(500).json({ message: 'Erro ao atualizar usuário', log: err });
  }
};
