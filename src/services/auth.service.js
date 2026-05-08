import User from '../models/User.js';

export const loginService = (userName) => User.findOne({ userName: userName }).select("+password");

