// firebaseConfig.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, setDoc, doc, collection, query, where, getDocs } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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

// Function to add a new document in collection "cart"
async function addCity() {
    try {
        await setDoc(doc(collection(doc(db, "organizations", orgDocId), "cart")), {
            name: "Los Angeles",
            state: "CA",
            country: "USA"
        });
        console.log("Document successfully written!");
    } catch (e) {
        console.error("Error writing document: ", e);
    }
}

// Export the Firestore instance and addCity function
export { db, addCity };
