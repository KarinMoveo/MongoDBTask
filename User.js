"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const { Schema, model } = mongoose_1.default;
const userSchema = new Schema({
    name: String,
});
const User = model('User', userSchema);
exports.default = User;
