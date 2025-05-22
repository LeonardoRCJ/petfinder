const prisma = require('../prisma');

exports.createAdoptionRequest = async (req, res) => {
    try {
        const {petId, formResponse} = req.body;

        const adoption = await prisma.adoptionRequest.create({
            data: {
                petId: parseInt(petId),
                userId: req.user.id,
                formResponse: JSON.parse(formResponse || '{}')
            }
        });

        res.status(201).json(adoption);
    }catch(err){
        console.error(err);
        res.status(500).json({message: 'Erro ao criar solicitação'});
    }
}

exports.getAllAdoptions = async (req, res) => {
    try {
        const adoptions = await prisma.adoptionRequest.findMany({
            include: {pet: true, user: true}
        });

        res.json(adoptions);
    }catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao listar solicitações'});
    }
}

exports.getMyAdoptions = async (req, res) => {
    try {
        const adoptions = await prisma.adoptionRequest.findMany({
            where: {userId: req.user.id},
            include: {pet: true}
        })
        res.json(adoptions)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao listar suas solicitações'});
    }
}

exports.updateAdoptionsStatus = async (req, res) => {
    try {
        const { status } = req.body;
        const validStatuses = ['PENDING', 'APPROVED', 'REJECTED']

        if (!validStatuses.includes(status)) return res.status(400).json({message: 'Status inválido'})

        const adoption = await prisma.adoptionRequest.update({
            where: {id: parseInt(req.params.id)},
            data: {status}
        })

        res.json(adoption)
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao atualizar status'});
    }
}


exports.deleteAdoption = async (req, res) => {
    try {
        await prisma.adoptionRequest.delete({
            where: { id: parseInt(req.params.id)}
        });
        res.json({message: 'Solicitação deletada com sucesso!'})
    } catch (err) {
        console.error(err);
        res.status(500).json({message: 'Erro ao deletar a solicitação'})
    }
}