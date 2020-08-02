# RunStash Client

## Purpose of the project

To keep track of my running data

## Project setup

This project is created using [React](https://reactjs.org/) with [Create React App](https://github.com/facebook/create-react-app)

Language

- JavaScript
- Node.js
- HTML
- CSS

Dependencies

- material-ui
- axios
- dayjs
- jwt-decode
- react-router-dom
- react-redux
- redux
- redux-thunk

## Pre-requisites

[Material-UI](https://material-ui.com/)

```
Material-UI is an open-source project that features React components that implement Google's Material Design.

Material-UI is a very solid and stable set of react components that looks appealing and easy to use and customize.
```

[axios](https://github.com/axios/axios)

```
Axios is a popular, promise-based HTTP client that supports an easy-to-use API.
```

[dayjs](https://github.com/iamkun/dayjs)

```
Day.js is a minimalist JavaScript library that parses, validates, manipulates, and displays dates and times for modern browsers with a largely Moment.js-compatible API.
```

[jwt-decode](https://github.com/auth0/jwt-decode)

```
jwt-decode is a small browser library that helps decoding JWTs token which are Base64Url encoded.
```

[react-router-dom](https://reactrouter.com/web/guides/quick-start)

```
Router components for React application.
```

[redux](https://redux.js.org/)

```
Reudx is used mostly for application state management.
```

[redux-thunk](https://github.com/reduxjs/redux-thunk)

```
With a plain basic Redux store, you can only do simple synchronous updates by dispatching an action. Middleware extend the store's abilities, and let you write async logic that interacts with the store.

Thunks are the recommended middleware for basic Redux side effects logic, including complex synchronous logic that needs access to the store, and simple async logic like AJAX requests.
```

## Setting up the project

### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Deploy and test

The application is deployed on Firebase using [Firebase Hosting](https://firebase.google.com/docs/hosting/quickstart)

1. Install Firebase CLI

```
npm install -g firebase-tools
```

2. Log in and test the Firebase CLI

```
firebase login
```

3. Initialize the project

```
firebase init

Firebase CLI prompts:
- Select to set up Hosting.

- Select a Firebase project to connect to your local project directory.

- Specify a directory to use as your public root directory.
Example:
    i. What do you want to use as your public directory? build

- Choose a configuration for your site
Example:
    i. Configure as a single-page app (rewrite all urls to /index.html)? Yes
    ii. File build/index.html already exists. Overwrite? No

```

4. Deploy the site

```
firebase deploy
```
