# README

This is the [Express](https://expressjs.com) [Basic Stack App](https://expressjs.com/en/starter/hello-world.html) example on [Render](https://render.com).

The app in this repo is deployed at [https://express.onrender.com](https://express.onrender.com).
On load The app will display :
1.Current Size of the stack
2.Values present on the stack.

Operations:
Push - Add new values to the stack /n
Pop - Remove the last value from the stack

Validations:
Push gets rejected when stack size is not configured  /n
Pop gets rejected if stack has zero elements /n
Push gets rejected if stack size is reached the configured limit.

## Deployment

See https://render.com/docs/deploy-node-express-app or follow the steps below:

Create a new web service with the following values:
  * Build Command: `yarn`
  * Start Command: `node app.js`

That's it! Your web service will be live on your Render URL as soon as the build finishes.
