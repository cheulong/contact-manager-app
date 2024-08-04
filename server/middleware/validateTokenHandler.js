import asyncHandler from "express-async-handler"
import getTokenFromHeader from '../utils/auth.js';
import getUserFromToken from '../utils/user.js';

const validateTokenHandler = asyncHandler(async (req, res, next) => {
  const token = getTokenFromHeader(req);
  if (!token) {
    return res.status(401).json({ error: 'Unauthorized' });
  }

  try {
    const user = await getUserFromToken(token);
    console.log({user});
    req.user = user;
    next();
  } catch (err) {
    res.status(401);
    throw new Error('User is not authenticated');
  }
});

export default validateTokenHandler;