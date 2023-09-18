"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const solarSystem_1 = require("./models/solarSystem");
const planet_1 = require("./models/planet");
const visitor_1 = require("./models/visitor");
const MONGODB_URI = 'mongodb://localhost:27017/mongoDBExerciseDB';
mongoose_1.default.connect(MONGODB_URI)
    .then(() => {
    console.log('Connected to MongoDB');
    // createData();
})
    .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
});
function createData() {
    // Create a Solar System
    const solarSystemData = {
        planets: [],
        starName: 'Sun System',
    };
    const solarSystem = new solarSystem_1.default(solarSystemData);
    // Create a Planet
    const planetData = {
        name: 'Earth',
        system: solarSystem,
        visitors: [],
    };
    const planet = new planet_1.default(planetData);
    // Create a Visitor
    const visitorData = {
        name: 'John Doe',
        homePlanet: planet,
        visitedPlanets: [],
    };
    const visitor = new visitor_1.default(visitorData);
    // Save the objects to the database
    solarSystem.save()
        .then(() => {
        planet.save()
            .then(() => {
            visitor.save()
                .then(() => {
                console.log('Data saved to the database');
            })
                .catch((visitorErr) => {
                console.error('Error saving visitor:', visitorErr);
            });
        })
            .catch((planetErr) => {
            console.error('Error saving planet:', planetErr);
        });
    })
        .catch((solarSystemErr) => {
        console.error('Error saving solar system:', solarSystemErr);
    });
}
async function findVisitor() {
    const visitorName = 'John Doe';
    try {
        const visitor = await visitor_1.default.findOne({ name: visitorName }).populate('visitedPlanets').exec();
        if (visitor) {
            // Access the list of visited planets for the visitor
            const visitedPlanets = visitor.visitedPlanets;
            if (visitedPlanets.length === 0) {
                console.log(`${visitorName} has not visited any planets.`);
            }
            else {
                console.log(`${visitorName} has visited the following planets:`);
                visitedPlanets.forEach((planet) => {
                    console.log(planet.id);
                });
            }
        }
        else {
            console.log(`${visitorName} not found.`);
        }
    }
    catch (err) {
        console.error(err);
    }
}
async function findAllVisitorsOnPlanet() {
    const planetName = 'Earth';
    try {
        const visitors = await planet_1.default.findOne({ name: planetName }).populate('visitors').exec();
        if (visitors) {
            // Access the list of visited planets for the visitor
            const visitorsOnPlanet = visitors.visitors;
            if (visitorsOnPlanet.length === 0) {
                console.log(`No visitors on this planet.`);
            }
            else {
                console.log(`Visitors on ${planetName}:`);
                visitorsOnPlanet.forEach((visitor) => {
                    console.log(visitor);
                });
            }
        }
        else {
            console.log(`${planetName} not found.`);
        }
    }
    catch (err) {
        console.error(err);
    }
}
findVisitor();
findAllVisitorsOnPlanet();
