import jwt from 'jsonwebtoken';

const getUserFromToken = token => jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      res.status(401);
      throw new Error('User is not authenticated');
    }
    return decoded.user;
  });

export default getUserFromToken;