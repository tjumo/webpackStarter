import * as firebase from "firebase";

var config = {
    apiKey: "AIzaSyBjXrrcCrsGbxNKamSMgMj1JnOQBNhKYIY",
    authDomain: "financial-c373e.firebaseapp.com",
    databaseURL: "https://financial-c373e.firebaseio.com",
    projectId: "financial-c373e",
    storageBucket: "",
    messagingSenderId: "643964979660"
};
firebase.initializeApp(config);

const fire = firebase.firestore();
fire.settings({ timestampsInSnapshots: true });

export const db = fire;

export var provider = new firebase.auth.GoogleAuthProvider();

let publicName = 'project-643964979660';
