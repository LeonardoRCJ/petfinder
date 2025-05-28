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

    const data = {};

    if (age !== undefined) data.age = parseInt(age);
    if (breed !== undefined) data.breed = breed;
    if (color !== undefined) data.color = color;
    if (energy_level !== undefined) data.energy_level = energy_level;
    if (estimated_weight !== undefined) data.estimated_weight = parseFloat(estimated_weight);
    if (gender !== undefined) data.gender = gender;
    if (health_condition !== undefined) data.health_condition = health_condition;
    if (is_castrated !== undefined) data.is_castrated = is_castrated === 'true';
    if (is_dewormed !== undefined) data.is_dewormed = is_dewormed === 'true';
    if (is_good_with_kids !== undefined) data.is_good_with_kids = is_good_with_kids === 'true';
    if (is_good_with_other_dogs !== undefined) data.is_good_with_other_dogs = is_good_with_other_dogs === 'true';
    if (is_vaccinated !== undefined) data.is_vaccinated = is_vaccinated === 'true';
    if (last_consultation_date !== undefined) data.last_consultation_date = new Date(last_consultation_date);
    if (petname !== undefined) data.petname = petname;
    if (size !== undefined) data.size = size;
    if (specie !== undefined) data.specie = specie;
    if (temperament !== undefined) data.temperament = temperament;

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

exports.updatePetImage = async (req, res) => {
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
