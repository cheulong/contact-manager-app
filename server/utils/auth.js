const getTokenFromHeader = req => {
  const authHeader = req.headers.Authorization || req.headers.authorization;
  if (authHeader && authHeader.split(' ')[0] === 'Bearer') {
    return authHeader.split(' ')[1];
  }
  return null;
};

export default getTokenFromHeader;