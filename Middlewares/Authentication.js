const jwt=require("jsonwebtoken");


// middleware function to authenticate
async function authentication(req,res,next)
{
    // extracting the token from the header
    const token = req.headers.authorization.split(" ")[1];

    // if the token does not exist, return 401 error of token not found
    if(!token)
    {
        res.status(401).send({message:"token not found"});
    }

    // if the token exist, try to verify
    try
    {
        // verify and assign new property to the request
        // we require these properties in next step
        const userData=jwt.verify(token,process.env.SECRET);
        req.body.username=userData.username;
        req.body.password=userData.password;
        req.body.role=userData.role;
    }
    catch(err)
    {
        // if token verification fails, return 403 error of invalid token
        return res.status(403).send({message:"invalid token"});
    }
    // proceed further
    next();
}
module.exports=authentication;