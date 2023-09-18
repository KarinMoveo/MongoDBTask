import mongoose from "mongoose";
import SolarSystem from "./models/solarSystem";
import Planet from "./models/planet";
import Visitor from "./models/visitor";


mongoose.connect('mongodb://localhost:27017/mongodbExercise?useNewUrlParser=true&useUnifiedTopology=true');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');

  // Create and save solar systems
  const solarSystem1 = new SolarSystem({
    name: 'Solar System 1',
    starName: 'Sun 1',
  });
  
  const solarSystem2 = new SolarSystem({
    name: 'Solar System 2',
    starName: 'Sun 2',
  });
  
  console.log("d");
  
  solarSystem1.save()
    .then(() => {
      console.log('Solar System 1 saved');
    })
    .catch((err) => {
      console.error(err);
    });
  
  solarSystem2.save()
    .then(() => {
      console.log('Solar System 2 saved');
    })
    .catch((err) => {
      console.error(err);
    });


// Create and save planets
const planet1 = new Planet({
    name: 'Earth',
    system: solarSystem1,
    visitors: [],
  });
  
  const planet2 = new Planet({
    name: 'Mars',
    system: solarSystem1,
    visitors: [],
  });
  
  planet1.save()
    .then(() => {
      console.log('Earth saved');
    })
    .catch((err) => {
      console.error(err);
    });
  
  planet2.save()
    .then(() => {
      console.log('Mars saved');
    })
    .catch((err) => {
      console.error(err);
    });
  

  // Create and save visitors
  const visitor1 = new Visitor({
    name: 'Alice',
    homePlanet: planet1,
    visitedPlanets: [planet1, planet2],
  });
  
  const visitor2 = new Visitor({
    name: 'Bob',
    homePlanet: planet2,
    visitedPlanets: [planet2],
  });
  
  visitor1.save()
    .then(() => {
      console.log('Alice saved');
    })
    .catch((err) => {
      console.error(err);
    });
  
  visitor2.save()
    .then(() => {
      console.log('Bob saved');
    })
    .catch((err) => {
      console.error(err);
    });
  

  // Close the database connection after saving data
  db.close();
});
