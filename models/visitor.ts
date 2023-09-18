import mongoose from "mongoose";

const { Schema, model } = mongoose;

const visitorSchema = new Schema({
    name: String,
    homePlanet: { type: Schema.Types.ObjectId, ref: 'Planet' },
    visitedPlanets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
});

const Visitor = model('Visitor', visitorSchema);

export default Visitor;
