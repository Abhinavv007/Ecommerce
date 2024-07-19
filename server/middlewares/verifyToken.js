import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import userModel from '../models/userModel.js';

dotenv.config();
const secret = process.env.SECRET;

const verifyToken = async (req, resp, next) => {
    const auth = req.headers['authorization'];
    if (auth !== undefined) {
        const bearer = auth.split(" ");
        const token = bearer[1];
        jwt.verify(token, secret, async (err, decoded) => {
            if (err) {
                return resp.status(401).json({ msg: "Invalid Token" });
            } else {
                try {
                    const userData = await userModel.findById(decoded.userID);
                    if (!userData) {
                        return resp.status(404).json({ msg: "User not found" });
                    }
                    req.user = userData;
                    next();
                } catch (error) {
                    return resp.status(500).json({ msg: error.message });
                }
            }
        });
    } else {
        resp.status(401).json({ msg: "Authorization Required" });
    }
};

export default verifyToken;
