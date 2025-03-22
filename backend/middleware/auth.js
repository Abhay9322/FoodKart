import jwt from 'jsonwebtoken';

const verifyAuth = async (req, res, next) => {
    try {
        const authToken = req.headers.token;
        if (!authToken) {
            return res.status(401).json({ success: false, message: 'Access denied! Please log in.' });
        }

        const decodedToken = jwt.verify(authToken, process.env.JWT_SECRET);
        req.body.userId = decodedToken.id;
        next();
    } catch (error) {
        console.error('Authentication failed:', error);
        res.status(403).json({ success: false, message: 'Invalid or expired token!' });
    }
};

export default verifyAuth;
