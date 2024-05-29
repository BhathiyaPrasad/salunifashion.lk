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

///extract the data from url parameters

const urlParams = new URLSearchParams(window.location.search);
const productId = urlParams.get('id');
const productName = urlParams.get('name');
const productImage = urlParams.get('image');
const productPrice = urlParams.get('price');
const productOldPrice = urlParams.get('oldPrice');
const productImageTwo = urlParams.get('imageTwo');
const productImageThree = urlParams.get('imageThree');
const productImageFour = urlParams.get('imageFour');
const productSize = urlParams.get('size');
const productQty = urlParams.get('quantity');