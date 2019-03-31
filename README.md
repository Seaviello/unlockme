## Business scenario

As an admin of "TheCloudLock" I would like to have an overview of existing users, existing room locks and logs.
I should be able to open/close a lock, edit the permissions or create a new lock. Every lock-related action 
(opening/closing lock, creating/editing permissions) should be visible in logs.

### Limitations

1. Missing switching between users - a lot of features that are connected to each other and cannot be visible until 
everything is in place (authentication, including roles and logged in status for routing, respecting roles for showing/
hiding features).
1. Simplified data model

## Technical overview

Purpose of this project is to get more familiar with used technologies. Main focus is on using "new" React context as a 
state management solution with combination of react hooks for consuming and interacting with the state.

This project probably won't present the best practises, but rather show the possibilities, especially important in world
of much more complex technologies (Redux, MobX, apollo-link-state).

### Technology stack

1. This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) - with all of the
benefits and limitations.
1. React context and hooks (new React features ) - core.
1. Material UI - for rapid UI development.
1. Enzyme - for unit testing.
1. Cypress - for basic E2E testing.

### Available Scripts

In the project directory, you can run:

#### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [create-react-app/running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run cypress`

Launches the cypress runner in Chrome. It expects that your application is running on [http://localhost:3000](http://localhost:3000)

#### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [create-react-app/deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Observations/clarifications

1. Material UI was used for fast UI development - even without using the solution before. As a downside application for 
sure needs some visual tuning.
1. Contexts as state management works okeyish, however
   * Splitting logic across multiple contexts is similar to MobX multiple store approach. It has its pros and cons.
   * Using one context as a store with whole action/reducer logic around it would be probably more scalable solution - 
   context-redux approach. 
1. Hooks work amazingly well. There is a lot of possibilities that (will) come from it, especially for purely UI logic 
(animations!).
1. Context-hooks approach works well, however typical separation of UI from state logic (component-container) does not 
look elegant with that approach. Whole purpose of hooks is more about local state management, so coupling components
with context directly doesn't seem right (Snack vs LockModal).
1. Included tests should work as show-cases. It came out that enzyme does not fully support context, especially contextType.
Also unit tests are cumbersome because of the combination of state management (high level problem) with React context 
(framework feature).
1. Cypress was used in the simplest way - as a E2E solution (no mocking data, operating on real application). It could be 
configured for integration tests too.