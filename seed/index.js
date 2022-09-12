require('dotenv').config();
const mongoose = require('mongoose');
const Training = require('../models/Training')

const trainings = [
  {name:"Paos", image:"/images/paos.jpeg",date:"10-10-2022",category:'pads'},
  {name:"Airbike", image:"/images/airbike.jpeg",date:"10-10-2022",category:'airbike'},
  {name:"Tabata", image:"/images/tabata.jpeg",date:"12-10-2022",category:'tabata'},
  {name:"Sparring", image:"/images/sparring.jpeg",date:"11-10-2022",category:'sparring'}
]

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Training.create(trainings)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })

// Run npm run seed 