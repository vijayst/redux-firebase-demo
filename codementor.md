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

## IV. Tutorial

### A. Firebase console

### B. Scaffold the React app

### C. Create the Redux store

### D. Querying data from Firebase

### E. Update data in Firebase

### F. Handle events from Firebase

### G. Wrapping up
