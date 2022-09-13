require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('../models/Event');

const events = [
  {name:"Armados y peligrosos", imageUrl:"/images/paos.jpeg",date:"10-10-2022"},
  {name:"Homenaje Knhay khan Tom", imageUrl:"",date:"10-10-2022"},
  {name:"Interclub Antonio Campoy", imageUrl:"",date:"12-10-2022"},
  {name:"Interclub Sant Andreu", imageUrl:"",date:"11-10-2022"}
]

mongoose.connect(process.env.MONGO_URL)
  .then(x => console.log(`Connected to ${x.connection.name}`))
  .then(() => {
    return Event.create(events)
  })
  .then(() => {
    console.log('Seed done 🌱');
  })
  .catch(e => console.log(e))
  .finally(() => {
    console.log('Closing connection');
    mongoose.connection.close();
  })
