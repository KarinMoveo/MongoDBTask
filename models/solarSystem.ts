import mongoose from "mongoose";

const { Schema, model } = mongoose;

const solarSystemSchema = new Schema({
    planets: [{ type: Schema.Types.ObjectId, ref: 'Planet' }],
    starName: String,
});

const SolarSystem = model('SolarSystem', solarSystemSchema);

export default SolarSystem;
