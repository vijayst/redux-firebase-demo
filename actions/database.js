import firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyCLbh6q-sFs7iSSbfwoIU6ZwSFMPqVinsU',
  authDomain: 'redux-firebase-demo-2dc15.firebaseio.com',
  databaseURL: 'https://redux-firebase-demo-2dc15.firebaseio.com/'
};

firebase.initializeApp(config);
const database = firebase.database();

export default database;
