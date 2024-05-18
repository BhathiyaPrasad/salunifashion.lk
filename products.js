// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { doc, setDoc } from "firebase/firestore"; 

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDLa_nr_0c0kudQSzcGV5hkwq3WH2bRGgo",
    authDomain: "freidea-pos.firebaseapp.com",
    projectId: "freidea-pos",
    storageBucket: "freidea-pos.appspot.com",
    messagingSenderId: "317401437770",
    appId: "1:317401437770:web:2657a877ea9fe88cf878b3",
    measurementId: "G-M8RF0RL2FP"
};

// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);
const orgDocId = "InterithmT3";

// Add a new document in collection "cities"
await setDoc(collection(doc(db, "organizations", orgDocId), "cart")), {
  name: "Los Angeles",
  state: "CA",
  country: "USA"
};


// const itemsRefff = collection(doc(db, "organizations", orgDocId), "items");