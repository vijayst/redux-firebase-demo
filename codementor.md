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

## III. Benefits of using Firebase with Redux

## IV. Tutorial

### A. Firebase console

### B. Scaffold the React app

### C. Create the Redux store

### D. Querying data from Firebase

### E. Update data in Firebase

### F. Handle events from Firebase

### G. Wrapping up
