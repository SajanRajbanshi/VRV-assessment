# The implementation of RBAC.
This is a basic Role Based Access Control **(RBAC)** in node. It contains basic building block of the RBAC that can be transfered to a full working project as per needs.

## Technologies used
- *Node.js*
- *Express.js*
- *Mongoose*
- *Mongodb*
- *CORS*
- *dotenv*
- *jwt*
- *Javascript*

## How to run in your system.
### Install Node.js in your system
To install Node.js in your system, visit https://nodejs.org and download the latest version of it.

### Clone the repository or download it
You can either download the repository as zip or clone it if you have git installed in your system.
#### To clone it
Remember if will only work if you have git in your system. Run the below code in the directory where you need the file.
```
git clone https://github.com/SajanRajbanshi/VRV-assessment.git
```

#### To download it
 Click on Green "**Code**" button on top right hand side and click on "**Download Zip**".
 Extract the zip file and you are good to go.


### Configure dotenv file
Make a .env file in the base directory of the project and put the necessary key value pairs required to run the application.
Dotenv file will hold the following keys (**Case sensitive**)
- DB_STRING
- SECRET
- PORT (optional) (default 3000)
### Install Modules
Before running the application, you will need to install all the required modules used in this application. To do that navigate to the project directory run the below command in the terminal.
```
npm install
```

### Run the application
To run the application. Run the below command.
```
node app.js
```
### API endpoints
#### "base-url/api" (GET)
it will take token in the header.
Header example:
```
headers: {
'Authorization': 'Bearer <your-jwt-token-here>',
'Content-Type': 'application/json'
}
```
URL example:
```
http://localhost:3000/api
```
This will be the base URL of any endpoint in our application.
This will be used for token verification. If token is valid and has not expired, it returns
```
{ status: true, message: "authentication successfull" }
```

If the token is invalid or has expired, it returns
```
//error code 404
{ message: "user not found" }
```

#### "base-url/api/signup" (POST)
This endpoint will be used to register new user as the name suggest. It requires body to have **username**, **password** and **role**.
```
{
    username:"username",
    password:"password",
    role:"role"
}
```
If the user is successfully registered, it returns token.
```
{
    token:"your-token-here"
}
```

#### "base-url/api/signin" (POST)
This endpoint will be used to perform sign in. It will be used when the user is newly signing in or the token has expired.
It also requires body to have **username**, **password** and **role**.

*Note:It will also return the token in the same way sing up does.*


#### "base-url/api/admin" (GET)
This is a test endpoint to test the RBAC working. This endpoint will be only allowed to the users who are admin. If the user is admin, it will return
```
{status:true,message:"logged in as admin"}
```
#### "base-url/api/moderator" (GET)
Just like above, it is also for testing, it will only allow the users who are moderator. If role matches, it returns
```
{status:true, message:"logged in as moderator"}
```
#### "base-url/api/customer" (GET)
Just like above, for customers, it will return
```
{status:true, message:"logged in as customer"}
```

## Roles
- **Admin**
- **Moderator**
- **Customer**

