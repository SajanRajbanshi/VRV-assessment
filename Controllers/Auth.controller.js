const Admin = require("../Models/Admin.model");
const Customer = require("../Models/Customer.model");
const Moderator = require("../Models/Moderator.model");
const jwt = require("jsonwebtoken");

// signup controller to handle signup
async function signup(req, res) {
  //checking if all the necessary fields are present in the request body
  if (!req.body.username || !req.body.password || !req.body.role) {
    return res
      .status(400)
      .send({ status: "request doesn't contain required necessary data" });
  }

  // checking where to search for the user depending upon role
  let Model = Admin;
  let role = "admin";
  if (req.body.role.toLowerCase() === "admin") {
    Model = Admin;
    role = "admin";
  } else if (req.body.role.toLowerCase() === "moderator") {
    Model = Moderator;
    role = "moderator";
  } else if (req.body.role.toLowerCase() === "customer") {
    Model = Customer;
    role = "customer";
  } else {
    return res.status(400).send({ message: "role is not valid" });
  }

  // Searching for the user in the given role database
  Model.findOne({ username: req.body.username })
    .then((response) => {
      if (response) {
        //if user already exists, cannot sign in, return user already exist message
        return res.status(409).send({ message: "user already exist" });
      } else {
        //if user does not exist, create a new user and save it
        const newUser = new Model({
          username: req.body.username,
          password: req.body.password,
        });
        newUser
          .save()
          .then((response) => {
            // generating token to be sent to the user
            // keeping the expiry of the token to 1 day
            const token = jwt.sign(
              {
                username: response.username,
                password: response.password,
                role: role,
              },
              process.env.SECRET,
              { expiresIn: "1d" }
            );
            // send the token is success
            res.status(200).send({ token: token });
          })
          .catch((err) => {
            // in case of error in saving the user, log the error and send 500 response
            console.log(err);
            res.status(500).send({ message: "internal server error occured" });
          });
      }
    })
    .catch((err) => {
      // in case of error with db connection, log the error and send the 500 error
      console.log(err);
      res.status(500).send({ message: "internal server error occured" });
    });
}

// signin controller to handle signin
async function signin(req, res) {
  // checking if all the fields are availabe, if not return 400 error i.e. bad request
  if (!req.body.username || !req.body.password || !req.body.role) {
    return res.status(400).send({
      message: "request body doesn't contain required necessary data",
    });
  }

  // decide which collection to search on depending on the role of the user
  let Model = Admin;
  let role = "admin";
  if (req.body.role.toLowerCase() === "admin") {
    Model = Admin;
    role = "admin";
  } else if (req.body.role.toLowerCase() === "moderator") {
    Model = Moderator;
    role = "moderator";
  } else if (req.body.role.toLowerCase() === "customer") {
    Model = Customer;
    role = "customer";
  } else {
    return res.status(400).send({ message: "role is not valid" });
  }

  // search in the collection with username and password
  Model.findOne({ username: req.body.username, password: req.body.password })
    .then((response) => {
      if (response) {
        // if user exist, generate the token with expiry time of 1 day
        const token = jwt.sign(
          {
            username: response.username,
            password: response.password,
            role: role,
          },
          process.env.SECRET,
          { expiresIn: "1d" }
        );
        res.status(200).send({ token: token });
      } else {
        // if the user does not exist, send 404 error of user not found
        res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      // in case of error in connection database, return 500 error of internal server error
      console.log(err);
      res.status(500).send({ message: "internal server error occured" });
    });
}

// verify controller to handle token verification during auto signin with token only.
// this will work only if the token is valid and has not expired
async function verify(req, res) {
  // checking if the request body has all the necessary details
  // if not returning 400 error of bad request
  if (!req.body.username || !req.body.password || !req.body.role) {
    return res
      .status(400)
      .send({ message: "request doesn't contain required data" });
  }


  // deciding which collection to search on depending up on the role of the user
  let Model = Admin;
  let role = "admin";
  if (req.body.role.toLowerCase() === "admin") {
    Model = Admin;
    role = "admin";
  } else if (req.body.role.toLowerCase() === "moderator") {
    Model = Moderator;
    role = "moderator";
  } else if (req.body.role.toLowerCase() === "customer") {
    Model = Customer;
    role = "customer";
  } else {
    return res.status(400).send({ message: "role is not valid" });
  }


  //searching in the model for the existance of that user
  Model.findOne({ username: req.body.username, password: req.body.password })
    .then((response) => {
      // if the user exist, return success message
      if (response) {
        return res
          .status(200)
          .send({ status: true, message: "authentication successfull" });
      } else {
        // if the user does not exist, return 404 error of user not found
        return res.status(404).send({ message: "user not found" });
      }
    })
    .catch((err) => {
      // if error occured in the database connection, return 500 error of internal server error
      console.log(err);
      res.status(500).send({ message: "internal server error occured" });
    });
}

// dummy admin controller to check the authorization that only works for users who are admin
async function adminController(req,res)
{
  res.status(200).send({status:true,message:"logged in as admin"});
}

// dummy moderator controller to check the authorization that only works for users who are moderator
async function moderatorController(req,res)
{
  res.status(200).send({status:true, message:"logged in as moderator"});
}

// dummy customer controller to check the authorization that only works for users who are customer
async function customerController(req,res)
{
  res.status(200).send({status:true,message:"logged in as customer"});
}
module.exports = { signin, signup, verify,adminController,moderatorController,customerController };
