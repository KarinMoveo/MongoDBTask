import mongoose from "mongoose";
import SolarSystem from "./models/solarSystem";
import Planet from "./models/planet";
import Visitor from "./models/visitor";
import User from "./User";

const MONGODB_URI = "mongodb://localhost:27017/mongoDBExerciseDB";

mongoose
	.connect(MONGODB_URI)
	.then(() => {
		console.log("Connected to MongoDB");
		// createData();
	})
	.catch((err) => {
		console.error("Error connecting to MongoDB:", err);
	});

function createData() {
	// Create a Solar System
	const solarSystemData = {
		planets: [],
		starName: "Sun System",
	};

	const solarSystem = new SolarSystem(solarSystemData);

	// Create a Planet
	const planetData = {
		name: "Earth",
		system: solarSystem,
		visitors: [],
	};

	const planet = new Planet(planetData);

	// Create a Visitor
	const visitorData = {
		name: "John Doe",
		homePlanet: planet,
		visitedPlanets: [],
	};

	const visitor = new Visitor(visitorData);

	// Save the objects to the database
	solarSystem
		.save()
		.then(() => {
			planet
				.save()
				.then(() => {
					visitor
						.save()
						.then(() => {
							console.log("Data saved to the database");
						})
						.catch((visitorErr) => {
							console.error("Error saving visitor:", visitorErr);
						});
				})
				.catch((planetErr) => {
					console.error("Error saving planet:", planetErr);
				});
		})
		.catch((solarSystemErr) => {
			console.error("Error saving solar system:", solarSystemErr);
		});
}

async function findVisitor() {
	const visitorName = "John Doe";

	try {
		const visitor = await Visitor.findOne({ name: visitorName }).populate("visitedPlanets").exec();

		if (visitor) {
			// Access the list of visited planets for the visitor
			const visitedPlanets = visitor.visitedPlanets;

			if (visitedPlanets.length === 0) {
				console.log(`${visitorName} has not visited any planets.`);
			} else {
				console.log(`${visitorName} has visited the following planets:`);
				visitedPlanets.forEach((planet) => {
					console.log(planet.id);
				});
			}
		} else {
			console.log(`${visitorName} not found.`);
		}
	} catch (err) {
		console.error(err);
	}
}

async function findAllVisitorsOnPlanet() {
	const planetName = "Earth";

	try {
		const visitors = await Planet.findOne({ name: planetName }).populate("visitors").exec();

		if (visitors) {
			// Access the list of visited planets for the visitor
			const visitorsOnPlanet = visitors.visitors;

			if (visitorsOnPlanet.length === 0) {
				console.log(`No visitors on this planet.`);
			} else {
				console.log(`Visitors on ${planetName}:`);
				visitorsOnPlanet.forEach((visitor) => {
					console.log(visitor);
				});
			}
		} else {
			console.log(`${planetName} not found.`);
		}
	} catch (err) {
		console.error(err);
	}
}

async function findAllVisitorsInSystem() {
	const solarSystemName = "Sun System";

	try {
		const solarSystem = await SolarSystem.findOne({ starName: solarSystemName })
			.populate({
				path: "planets",
				populate: {
					path: "visitors",
				},
			})
			.exec();

		if (!solarSystem) {
			console.log(`Solar system ${solarSystemName} not found.`);
		} else {
			const allVisitors = [];

			solarSystem.planets.forEach((planet) => {
				// planet.visitors.forEach((visitor) => {
				// 	allVisitors.push({
				// 		_id: visitor._id,
				// 		name: visitor.name,
				// 		homePlanet: planet.id,
				// 	});
				// });
			});

			if (allVisitors.length === 0) {
				console.log(`No visitors found in ${solarSystemName}.`);
			} else {
				console.log(`Visitors in ${solarSystemName}:`);
				allVisitors.forEach((visitor) => {
					console.log(
						`Visitor ID: ${visitor._id}, Name: ${visitor.name}, Home Planet: ${visitor.homePlanet}`
					);
				});
			}
		}
	} catch (err) {
		console.error(err);
	}
}

// async function getStarNameOfVisitorHomePlanetSystem(visitorId : string) {
//   try {
//     // Find the visitor by ID and populate their homePlanet field
//     const visitor = await Visitor.findById(visitorId).populate('homePlanet');

//     if (!visitor) {
//       console.log('Visitor not found.');
//       return;
//     }

//     const homePlanet = visitor.homePlanet;

//     if (!homePlanet) {
//       console.log('Visitor does not have a home planet.');
//       return;
//     }

//     await homePlanet.populate('system').execPopulate();

//     const system = homePlanet.id;

//     if (!system) {
//       console.log('Home planet does not belong to a system.');
//       return;
//     }

//     const starName = system.starName;
//     console.log(`The star in the system of ${visitor.name}'s home planet is ${starName}.`);
//   } catch (err) {
//     console.error(err);
//   }
// }

async function getPlanetInfo(planetName : string) {
  try {
    const planet = await Planet.findOne({ name: planetName })
      .populate('system')
      .populate('visitors')
      .exec();

    if (!planet) {
      console.log(`Planet ${planetName} not found.`);
      return;
    }

    const system = planet.system;
    const starName = planet.name;
    const visitors = planet.visitors;

    console.log(`Planet: ${planetName}`);
    console.log(`System's Star Name: ${starName}`);

    if (visitors.length === 0) {
      console.log('No visitors found on this planet.');
    } else {
      console.log('Visitors:');
      visitors.forEach((visitor) => {
        console.log(`Visitor ID: ${visitor._id}`);
      });
    }
  } catch (err) {
    console.error(err);
  }
}

findVisitor();
findAllVisitorsOnPlanet();
findAllVisitorsOnPlanet();
// getStarNameOfVisitorHomePlanetSystem('650827f002bc6a35deb90a10');
getPlanetInfo('Earth');
