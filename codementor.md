## I. Firebase
Firebase is a real-time database from Google. Google positions Firebase as Backend-as-a-Service (BaaS). It is a NoSQL database. Data is stored as key-value pairs. It is easy to get started with Firebase. The Firebase console is available at [https://console.firebase.google.com](https://console.firebase.google.com). A screenshot of the Firebase console is shown below.

![Firebase console](https://cdn.filestackcontent.com/vdjqrF9T4uBmaGgupT86 "Firebase console")

The Firebase console shown above is a snapshot of a database. Creating a new database is simple. Just click on the "Create new project" button and give the project a name. Each database is given a URL. For example, for this tutorial, I create a sample Firebase database called `redux-firebase-demo`. The URL of the database is `redux-firebase-demo-2dc15.firebaseio.com`.

And what is more, each key in the database is given a URL. Though Firebase stores data as key-value pair, the data can be organised in a hierarchical tree. Each node in the tree is called a **ref**. Each ref has its own URL. For example, the database has two refs, agenda and host. The URL for the refs are:

- agenda: `redux-firebase-demo-2dc15.firebaseio.com/agenda`
- host: `redux-firebase-demo-2dc15.firebaseio.com/host`

A ref can be queried or updated like a normal database. These queries or updates can happen from the front-end. Firebase provides a SDK which allows front-end clients to directly connect with it. There is a SDK for iOS apps, Android apps and Web applications (JavaScript).

Firebase is much more exciting that a regular database. It is real-time. What makes Firebase real-time is that a ref can emit events based on data changes at the server.

In this tutorial, we will explore how Firebase can be integrated with a React web application. React applications are structured with uni-directional data flows. Redux is one of the popular implementations. Most of the Firebase operations are handled within the Redux layer. Let us delve into Redux.

## II. Redux
Redux organises data in the front-end using three principles.

1. The state of the application is stored in a single object tree.
2. The state is read-only.
3. The state can be changed by emitting an action which describes the desired change.

Using Redux within an application allows uni-directional data flow. When Redux is used with React, the data from the store flows through props in container components. The container components pass data down to other React components.

Whenever a component wants to change the data stored within the store, it prepares an action object and dispatches the action object to the store. The store passes on the action to several reducers. A reducer is a JavaScript function which takes the previous state of the store and the action object and then creates a new state for the store. The organisation of modules within the Redux layer is shown below.

![Redux](https://cdn.filestackcontent.com/23F6Q1YuRlKbYnb2KNqt "Redux")

Actions are objects which have an action type. The action object is dispatched to the store. More often than not, React applications interact with data through an API. The API is responsible to fetch data from the backend and update data. API interactions are asynchronous. When a request to fetch data is made to an API, the API returns back with data after some time. To enable asynchronous communication within the Redux layer, Redux has a middleware component called `redux-thunk`. Redux thunk allows a react component to dispatch a function instead of an action object. The dispatched function usually interacts with the API and dispatches an action object when it receives a response from the API.

Apart from `redux-thunk`, there is a convenience package called `react-redux`. The package has Providers and Connectors to connect a React component to a Redux store. The Provider component is responsible for providing the store to downstream components. The connect function wraps a React component and provides the state of the store via props.

For this tutorial, we will use `redux-thunk` to dispatch functions which interact with Firebase. We will use `react-redux` to connect React components to the Redux store.

## III. Benefits of using Firebase with Redux
Firebase connects the database to the front-end with a simple API. The real-time feature of Firebase is an additional bonus. It is possible to use Firebase directly within React components. This will make the React components hard-to-maintain. Moving the Firebase code to the Redux layer greatly simplifies the code structure. Redux passes data to the React components via props. This allows writing functional or stateless components which just renders the props.

## IV. Tutorial
Our sample application is a simple meeting invite app. The app URL is sent to many guests. A guest can accept the meeting invite. When the guest accepts the meeting invite, the guest list is updated real-time in all other browsers which have the app open. The screenshot of the meeting invite app is shown below.

![Meeting invite app](https://cdn.filestackcontent.com/R8wugltbTaeEllOlA0Vg "Meeting invite app")

### A. Firebase data
Create a new Firebase database by clicking on the "Create new project" button. In the project dashboard, the data is shown in a tree view. Data can be exported and imported into the database.

![Firebase data](https://cdn.filestackcontent.com/LscUJLbPTyuQkjRDAY2P "Firebase data")

The database has three top level nodes: host, agenda and guests. Guests is a collection of guest objects. Firebase does not use arrays to store collection. It uses objects with auto-generated keys. We will import data into our project using the following JSON data.

```
{
  "agenda" : "Business meeting for the next Facebook",
  "guests" : {
    "-KUDHLoA79LzYXsXLNZM" : {
      "name" : "Dustin Moskovitz"
    },
    "-KUDHPgsYqOVcC-Db7-W" : {
      "name" : "Eduardo Saverin"
    },
    "-KUDHS9kUXPYWN8aqD6A" : {
      "name" : "Chris Hughes"
    },
    "-KUDHW9EmNahoyjdwJdf" : {
      "name" : "Elon Musk"
    }
  },
  "host" : "Mark Zuckerberg"
}
```
By default, Firebase database has authentication set. To make the database publicly accessible for all, click the `Rules` tab on the database dashboard. Add the following rule.

```
{
  "rules": {
    ".read": true,
    ".write": true
  }
}
```

### B. Scaffold the React project
We are all set to write some code. Initialise the project with package.json.

```
npm init
```
We will install production dependencies for our project.

```
npm install --save
react
react-dom
redux
react-redux
redux-thunk
redux-logger
firebase
bootstrap-sass
```
`react` and `react-dom` packages are required to write React code. `redux` and `react-redux` packages are used to connect React components with the Redux store. `redux-thunk` and `redux-logger` are redux middleware packages. `firebase` package provides a simple interface to interact with the database. `bootstrap-sass` provides the bootstrap styles for the project.

We will use Webpack for building the React application. React components are written in JSX and ES6. JSX and ES6 have to be compiled to JavaScript that the browser understands. Babel is used by Webpack for the transpilation.

```
npm install --save-dev
webpack
webpack-dev-server
babel-core
babel-loader
babel-preset-react
babel-preset-es2015
node-sass
sass-loader
css-loader
style-loader
```
Additionally, create a .babelrc file.

```
{
  "presets": ["es2015", "react"]
}

```
Use the following Webpack config file.

```
module.exports = {
  devtool: 'inline-source-map',
  entry: __dirname + '/app.jsx',
  output: {
    filename: 'bundle.js'
  },
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        loader : 'babel',
        exclude: /node_modules/
      },
      {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass']
      }
    ]
  }
}
```
Webpack uses the entry file to start the build process. All the files referenced by the entry file are included as input files. Webpack makes use of loaders to process the input files. The loaders used with the above configuration are babel, css and sass. The output of the build process is a bundle which has all the scripts required to run the application.

Our React project is almost ready. Add `app.jsx` which is the main React component.

```
import React from 'react';
import ReactDOM from 'react-dom';

ReactDOM.render(<div>Hello world</div>,
  document.getElementById('container'));
```

Create an index page and include the output bundle.

```
<html>
  <head>
    <title>Meeting Invite</title>
  </head>
  <body>
    <div id="container"></div>
    <script src="bundle.js"></script>
  </body>
</html>
```

Use `webpack-dev-server` for the start script and run the application using `npm start` command.

```
"scripts": {
  "start": "webpack-dev-server --inline",
}
```


### C. Create the Redux store
Creating the redux store involves creating the root reducer and applying middleware components. We will start by creating a basic reducer for managing the invite state.

```
export function inviteReducer(state = {}, action) {
  switch(action.type) {
    default:
      return state;
  }
}
```
Redux provides an utility called `combineReducers` to compose the root reducer.

```
import { combineReducers } from 'redux';
import { inviteReducer } from './invite_reducer';

const rootReducer = combineReducers({
  invite: inviteReducer
});

export default rootReducer;
```
With the root reducer in place, we can create the store.

```
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createLogger from "redux-logger";
import rootReducer from '../reducers/root_reducer';

const logger = createLogger();

const store = createStore(rootReducer,
  {},
  applyMiddleware(thunk, logger)
);

export default store;
```
`redux-thunk` and `redux-logger` are two middleware packages that are used in the store creation. `redux-thunk` is used to dispatch functions instead of action objects. The middleware executes the function. When the function is executed, one or more action objects are dispatched to the store. `redux-logger` provides useful log messages in the browser console.

With the store created, we should connect it to the React component using `react-redux`. The Provider component is the top-level component within a React application.

```
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import InviteContainer from './containers/invite_container';
import store from './store/store';
import "./stylesheets/main.scss";

const main = (
  <Provider store={store}>
    <InviteContainer />
  </Provider>
);

ReactDOM.render(main, document.getElementById('container'));
```
The InviteContainer component in the above code is a wrapper component created by react-redux. It wraps the Invite component by injecting state and dispatch functions via props.

```
import { connect } from 'react-redux';
import Invite from '../components/invite.jsx';

function mapStateToProps(state) {
  return {
    invite: state.invite
  };
}

function mapDispatchToProps(dispatch) {
  return {
  };
}

const inviteContainer = connect(mapStateToProps, mapDispatchToProps)(Invite);

export default inviteContainer;
```
In the above code, the `connect` function accepts two function parameters. The first function provides the state props which are injected into the Invite component. The second function provides the dispatch props which are injected into the Invite component.

Redux store is now created and configured for use within our React application.

### D. Query data from Firebase

We will show a basic meeting invite displaying the host and the agenda. The data comes from our Firebase database. To work with Firebase, we need to create a database object.

```
import firebase from 'firebase';

const config = {
  apiKey: 'your_api_key',
  authDomain: 'your_db_name.firebaseio.com',
  databaseURL: 'https://your_db_name.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
```
Initialising the app requires the API key and the database URL. The database object is used for getting data, updating data and handling events. The root node in our database is the invite object. The code for getting the value of the root node is shown below.

```
database.ref('/').once('value', snap => {
  const invite = snap.val();
});
```
We create a ref object by passing in the URL path. The `once` method on the ref is used to handle the first occurrence of an event. We handle the `value` event which is triggered when the value of the ref is set. The function handler receives the snapshot of the ref. Calling the `val` method on the snapshot gives the value of the node.

We need to plug in the above code within a Redux action. From our component, we will dispatch a function that gets the invite.

```
import ActionTypes from '../constants/action_types';
import database from './database';

export function getInvite() {
  return dispatch => {
    dispatch(getInviteRequestedAction());
    return database.ref('/').once('value', snap => {
      const invite = snap.val();
      dispatch(getInviteFulfilledAction(invite))
    })
    .catch((error) => {
      console.log(error);
      dispatch(getInviteRejectedAction());
    });
  }
}

function getInviteRequestedAction() {
  return {
    type: ActionTypes.GetInviteRequested
  };
}

function getInviteRejectedAction() {
  return {
    type: ActionTypes.GetInviteRejected
  }
}

function getInviteFulfilledAction(invite) {
  return {
    type: ActionTypes.GetInviteFulfilled,
    invite
  };
}
```
The `getInvite` function is executed by the `redux-thunk`. Getting data from Firebase is an async operation. We dispatch three action objects: Requested, Fulfilled and Rejected. The Requested action is dispatched before the async operation. The Fulfilled action is dispatched after the async operation succeeded. The Rejected action is dispatched if there is any error. Action Types are strings which are defined in a constants file.

```
const actionTypes = {
  GetInviteRequested: 'GET_INVITE_REQUESTED',
  GetInviteRejected: 'GET_INVITE_REJECTED',
  GetInviteFulfilled: 'GET_INVITE_FULFILLED'
};

export default actionTypes;

```
We should update our container component with the onGetInvite dispatch function.

```
import { getInvite } from '../actions/get_invite';


function mapDispatchToProps(dispatch) {
  return {
    onGetInvite: () => dispatch(getInvite()),
  };
}
```
Finally, we are all set to get data in our React component. The `onGetInvite` prop is called when the component is mounted.

```
componentDidMount() {
  this.props.onGetInvite();
}
```
This function dispatches the `getInvite` to the store. `redux-thunk` executes the function to get data from Firebase database. The snapshot data is dispatched to the store as the `GetInviteFulfilled` action object. The reducers update the state of the store. The invite state is available to the component as props.

```
render() {
  const { host, agenda } = this.props.invite;
  return (
  <div className="container">
    <div className="well">
      <h1>Meeting invite</h1>
    </div>
    <div className="bg-warning meeting-summary">
      <div className="row">
        <div className="col-sm-4 col-md-2">
          <b>Host:</b>
        </div>
        <div className="col-sm-8 col-md-10">
          {host}
        </div>
      </div>
      <div className="row">
        <div className="col-sm-4 col-md-2">
          <b>Agenda:</b>
        </div>
        <div className="col-sm-8 col-md-10">
          {agenda}
        </div>
      </div>
    </div>
  </div>
  );
}
```

### E. Update data in Firebase
For our invite app, any person who has the invite can click on the `I am coming` button. This will add her to the guest list. The database has a guests collection. We want to add the guest to the guests collection on clicking the button.

```
const guestsRef = database.ref('/guests');
guestsRef.push({
  name
});
```
We get the `guests` ref and push the new guest object. The guest object is trivial. It has just the guest name. We will put this code in a Redux action as we did earlier.

```
import ActionTypes from '../constants/action_types';
import database from './database';

export function addToInvite(name) {
  return dispatch => {
    dispatch(addToInviteRequestedAction());
    const guestsRef = database.ref('/guests');
    guestsRef.push({
      name
    })
    .then(() => {
      dispatch(addToInviteFulfilledAction({ name }));
    })
    .catch((error) => {
      dispatch(addToInviteRejectedAction());
    });
  }
}


function addToInviteRequestedAction() {
  return {
    type: ActionTypes.AddToInviteRequested
  };
}

function addToInviteRejectedAction() {
  return {
    type: ActionTypes.AddToInviteRejected
  }
}

function addToInviteFulfilledAction(guest) {
  return {
    type: ActionTypes.AddToInviteFulfilled,
    guest
  };
}
```
When the above redux action is dispatched to the store, the reducer gets called with the `AddToInviteFulfilled` action. The reducer creates a new invite state while adding the guest.

```
case ActionTypes.AddToInviteFulfilled: {
  const newState = Object.assign({}, state, {
    inProgress: false,
    success: 'Added guest.'
  });
  newState.guests = newState.guests || [];
  newState.guests = newState.guests.slice();
  newState.guests.push(action.guest);
  return newState;
}
```
The container component is wrapped with the new dispatch function.

```
import { getInvite } from '../actions/get_invite';
import { addToInvite } from '../actions/add_invite';

function mapDispatchToProps(dispatch) {
  return {
    onGetInvite: () => dispatch(getInvite()),
    onAddToInvite: (name) => dispatch(addToInvite(name))
  };
}
```
Finally, we handle the click event handler of the button to dispatch the `addToInvite` function. The invite form with the input and button controls is shown below.

```
<div className="bg-info meeting-form">
  <div className="row">
    <div className="col-sm-4 col-md-2">
      <b>Name:</b>
    </div>
    <div className="col-sm-8 col-md-10">
      <input
      type="text"
      value={this.state.name}
      onChange={e => this.setState({ name: e.target.value })}
      />
    </div>
  </div>
  <div className="row">
    <div className="col-sm-4 col-md-2">
      <button
      type="button"
      className="btn btn-primary"
      onClick={() => this.props.onAddToInvite(this.state.name)}
      >
      I am coming!
    </button>
  </div>
</div>
```

### F. Handle events from Firebase
In the previous section, we updated the guests collection in Firebase with a new guest. In the reducer, we updated the state to include the newly added guest. There is a slight caveat with the approach. When I have the invite open, when a guest is added from another browser session, I don't see the new guest in my invite. In this section, we will use the real-time feature of Firebase to update the guest in all browser sessions that has the invite app.

To get the value of a ref, we used the `once` method. The `once` method handles the first occurrence of an event. There is another method called `on` which handles every occurrence of an event. We will use the `on` method on the `child_added` event of the guests ref.

```
export function watchGuestAddedEvent(dispatch) {
  database.ref('/guests').on('child_added', (snap) => {
    dispatch(getGuestAddedAction(snap.val()));
  });
}

function getGuestAddedAction(guest) {
  return {
    type: ActionTypes.GuestAdded,
    guest
  };
}
```
The `watchGuestAddedEvent` watches for the `child_added` event on the `guests` ref and dispatches an action object with the newly added guest. To ensure that we always watch for the event, we call it from the connect code.

```
import { getInvite } from '../actions/get_invite';
import { addToInvite } from '../actions/add_invite';
import { watchGuestAddedEvent } from '../actions/guest_added_event';

function mapDispatchToProps(dispatch) {
  watchGuestAddedEvent(dispatch);
  return {
    onGetInvite: () => dispatch(getInvite()),
    onAddToInvite: (name) => dispatch(addToInvite(name))
  };
}
```
When the `GuestAdded` action is dispatched, our reducer sets a new invite state. The relevant reducer code is shown below.

```
export function inviteReducer(state = {}, action) {
  switch(action.type) {
    case ActionTypes.AddToInviteFulfilled: {
      const newState = Object.assign({}, state, {
        inProgress: false,
        success: 'Added guest.'
      });
      // newState.guests = newState.guests || [];
      // newState.guests = newState.guests.slice();
      // newState.guests.push(action.guest);
      return newState;
    }
    case ActionTypes.GuestAdded: {
      const newState = Object.assign({}, state);
      newState.guests = newState.guests || [];
      newState.guests = newState.guests.slice();
      newState.guests.push(action.guest);
      return newState;
    }
  }
}
```
The `AddToInviteFulfilled` reducer code is commented out. The same code is available while handling the `GuestAdded` action. The makes our invite app real-time.


### G. Wrapping up
We have covered a lot of ground in the tutorial. We started with how firebase database is created. Then we scaffolded the React application with Webpack. We created a Redux store. We queried data, updated data and handled events from Firebase.

Firebase is a real-time and NoSQL database from Google. It is simple and intuitive to use. Redux is a popular implementation of Flux pattern which allows uni-directional data flow. Using Firebase and Redux together makes the code maintainable.

There is an accompanying [github project](https://github.com/vijayst/redux-firebase-demo) to the tutorial which you can use to follow along.
