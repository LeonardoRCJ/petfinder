const prisma = require('../prisma');

exports.createPet = async (req, res) => {
  try {
    const result = req.file;  // cloudinary response
    const {
      age,
      breed,
      color,
      energy_level,
      estimated_weight,
      gender,
      health_condition,
      is_castrated,
      is_dewormed,
      is_good_with_kids,
      is_good_with_other_dogs,
      is_vaccinated,
      last_consultation_date,
      petname,
      size,
      specie,
      temperament
    } = req.body;

    const pet = await prisma.pet.create({
      data: {
        age: parseInt(age),
        breed,
        color,
        energy_level,
        estimated_weight: parseFloat(estimated_weight),
        gender,
        health_condition,
        image_url: result.path,
        is_castrated: is_castrated === 'true',
        is_dewormed: is_dewormed === 'true',
        is_good_with_kids: is_good_with_kids === 'true',
        is_good_with_other_dogs: is_good_with_other_dogs === 'true',
        is_vaccinated: is_vaccinated === 'true',
        last_consultation_date: new Date(last_consultation_date),
        petname,
        size,
        specie,
        temperament
      }
    });

    res.status(201).json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao criar pet' });
  }
};

exports.getAllPets = async (req, res) => {
  try {
    const pets = await prisma.pet.findMany();
    res.json(pets);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao listar pets' });
  }
};

exports.getPetById = async (req, res) => {
  try {
    const pet = await prisma.pet.findUnique({
      where: { id: parseInt(req.params.id) }
    });

    if (!pet) {
      return res.status(404).json({ message: 'Pet não encontrado' });
    }

    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao buscar pet' });
  }
};

exports.updatePet = async (req, res) => {
  try {
    const result = req.file;  // se enviou nova imagem
    const data = { ...req.body };

    if (data.estimated_weight) {
      data.estimated_weight = parseFloat(data.estimated_weight);
    }
    if (data.age) {
      data.age = parseInt(data.age);
    }
    if (data.last_consultation_date) {
      data.last_consultation_date = new Date(data.last_consultation_date);
    }

    // Tratamento de booleans
    ['is_castrated', 'is_dewormed', 'is_good_with_kids', 'is_good_with_other_dogs', 'is_vaccinated'].forEach(field => {
      if (data[field] !== undefined) {
        data[field] = data[field] === 'true';
      }
    });

    if (result) {
      data.image_url = result.path;
    }

    const pet = await prisma.pet.update({
      where: { id: parseInt(req.params.id) },
      data
    });

    res.json(pet);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao atualizar pet' });
  }
};

exports.deletePet = async (req, res) => {
  try {
    await prisma.pet.delete({
      where: { id: parseInt(req.params.id) }
    });
    res.json({ message: 'Pet deletado com sucesso' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Erro ao deletar pet' });
  }
};
