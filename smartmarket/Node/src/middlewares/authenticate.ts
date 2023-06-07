

const authMiddleware = (req: any, res: any, next: any) => {
  // Get the token from the request headers
  const token = req.header('Authorization');

  // Check if the token exists
  if (!token) {
    return res.status(401).json({ message: 'Authorization token not found' });
  }

  try {
    // Verify the token -- MAke a call to the backend to verify /verify
    
   // const decoded = jwt.verify(token, 'your_secret_key'); // Replace 'your_secret_key' with your actual secret key

    // Add the user object to the request for further use in route handlers
    //req.user = decoded.user;

    // Call the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};

export default authMiddleware
