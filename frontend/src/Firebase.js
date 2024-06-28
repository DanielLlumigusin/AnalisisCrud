import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyCvaYtKPK5c8R1b_wsV9agWiVb3n4p1t90",
  authDomain: "cajero-dfab8.firebaseapp.com",
  databaseURL:"https://cajero-dfab8-default-rtdb.firebaseio.com/",
  projectId: "cajero-dfab8",
  storageBucket: "cajero-dfab8.appspot.com",
  messagingSenderId: "666266850570",
  appId: "1:666266850570:web:bd2a5a61a62120d260d6f3",
  measurementId: "G-YTY9XEPDSP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);


export {database};