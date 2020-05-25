# mern-passport-authentication

Implementing passport.js on MERN application

## Run locally

Clone the repo and install the dependencies

```
$ git clone https://github.com/KBPsystem777/mern-passport-authentication

$ cd mern-passport-authentication

$ npm install

$ npm run start
```

See the server running on http://localhost:1993

### Install [Postman](https://www.postman.com) to test the APIs

## Available endpoints

- `http://localhost:1993/signup` - Handles user registration and accepts `email` and `password` as encoded parameters in Postman

- `http://localhost:1993/login` - Handles login and generates `token` when correct credentials were provided

- `http://localhost:1993/user/profile?token="Generated-Token"` - This serves as a protected route. Will only be accessed by logged users by passing the `"Generated-Token"` generated on the `/login` endpoint
