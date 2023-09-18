import mongoose from "mongoose";

const { Schema, model } = mongoose;

const planetSchema = new Schema({
    name: String,
    system: { type: Schema.Types.ObjectId, ref: 'SolarSystem' },
    visitors: [{ type: Schema.Types.ObjectId, ref: 'Visitor' }],
});

const Planet = model('Planet', planetSchema);

export default Planet;
