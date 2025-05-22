require('dotenv').config()
const express = require('express')
const app = express()
const authRoutes = require('./src/routes/auth')
const petsRoutes = require('./src/routes/pets')
const adoptionsRoutes = require('./src/routes/adoptions')
const usersRoutes = require('./src/routes/users')

app.use(express.json());

app.use('/auth', authRoutes);
app.use('/pets', petsRoutes);
app.use('/adoptions', adoptionsRoutes)
app.use('/users', usersRoutes)

app.get('/', (req, res) => {
    res.send('API petfinder rodando')
})


const PORT = process.env.PORT || 3000

app.listen(3000)