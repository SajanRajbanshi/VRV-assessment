const jwt = require("jsonwebtoken");

// function to to authorize the user as per their role
// it is higher order function that takes role as a parameter and returns a middleware function
// it can be used in any url and method and can be configured with different roles as needed
function authorization(role) {
  // returning the middleware that handles authorization
  return (req, res, next) => {
    // extracting the token from header
    const token = req.headers.authorization.split(" ")[1];
    // checking if the token exist
    // returning 400 of bad request error when not found
    if (!token) {
      return res.status(400).send({ message: "token not available" });
    }

    // if the token exist, trying to verify it
    try {
      const userData = jwt.verify(token, process.env.SECRET);
      // checking if the role of the user matches with the role
      // if it does match, we proceed
      if (userData.role.toLowerCase() === role) {
        next();
      } else {
        // if the role doesn't match, we return 401 not authorized error
        res.status(401).send({ message: "not authorized" });
      }
    } catch (err) {
      // if the token cannot be verified, we return 403 invalid token error
      return res.status(403).send({ message: "invald token" });
    }
  };
}

// exporting the function
module.exports = authorization;
