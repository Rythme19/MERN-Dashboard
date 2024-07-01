import jwt from 'jsonwebtoken';

const authmiddleware = async (req, res, next) => {
    try {
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
            const token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY || "mySuperSecretKey123!@#");
            if (decoded.userId && decoded.email) {
                req.userId = decoded.userId;
                next();
            } else {
                res.status(401).send({ message: 'Authentication failed' });
            }
        } else {
            res.status(401).send({ message: 'Authentication failed' });
        }
    } catch (error) {
        res.status(401).send({ message: 'Invalid token' });
    }
}

export default authmiddleware;
