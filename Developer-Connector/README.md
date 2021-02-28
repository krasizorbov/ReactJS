# Developer-Connector

Full Stack, MongoDB, React, Redux and Node.js.

To Do: Heroku deployment.

If you want to see your avatar make sure you have a gravatar account before registering!

npm install in Developer-Connector directory.

npm install in client directory.

npm run dev to start the App in Developer-Connector directory.

In config create a file default.json and paste MongoDB connection string, your jwt secret,

github clinet Id and github token as shown below.

To register a new OAuth application for github go to this page: https://github.com/settings/applications/new

After registering the application, you will be given a githubClientId and a githubToken.

{

"mongoURI": "your mongo db connection string",

"jwtSecret": "your jwt secret",

"githubClientId": "your github client id",

"githubToken": "your github token"

}
