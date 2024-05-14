import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import{getFirestore, setDoc, doc, getDoc, collection, query, where, getDocs} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyDLa_nr_0c0kudQSzcGV5hkwq3WH2bRGgo",
    authDomain: "freidea-pos.firebaseapp.com",
    projectId: "freidea-pos",
    storageBucket: "freidea-pos.appspot.com",
    messagingSenderId: "317401437770",
    appId: "1:317401437770:web:2657a877ea9fe88cf878b3",
    measurementId: "G-M8RF0RL2FP"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);

 // Initialize Firebase FireStore
 const db  = getFirestore(app);



 // retrieve firebase data

 
  
 

//   const docRef = doc(db, "cities", "DC");
//   const docSnap = await getDoc(docRef);

//   if (docSnap.exists()){
//     console.log("Document data:", docSnap.data())
//   }else{
//     console.log("No Documents ! ")
//   }



//   const docRef2 = doc(db, "organization/InterithmT3")

//   const docsnaps = await getDoc(docRef2);

//   if(docsnaps.exists()){s
//     console.log("document",docsnaps.data());
//   }else{
//     console.log("no Documents");
//   }



//   const q = query(collection(db, "cities"), where("capital", "==", true));
  
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });


//   const b  = query(collection(db, "users"), where("firstName", "==", "Bhathiya"));
//   const querySnapshots = await getDocs(b);
//   querySnapshots.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });


//   const c = query(collection(db, "salunifashion"));
//   const querySnapshotss = await getDocs(c);
//   querySnapshotss.forEach((doc) => {
//     console.log(doc.id, " => ", doc.data());    
//   });
  

//   const qq = query(collection(db, "organizations"),("Interithm"), collection("items"), where("Barcode", "==", "577348840"));
  
//   const querySnapshotsss = await getDocs(qq);
//   querySnapshotsss.forEach((doc) => {
//     // doc.data() is never undefined for query doc snapshots
//     console.log(doc.id, " => ", doc.data());
//   });

//   import { collection, query, where, getDocs, doc } from "firebase/firestore"; 

// Organization document ID

const orgDocId = "InterithmT3";  // organzation name

// Reference to the items subcollection within a specific organization
const itemsRef = collection(doc(db, "organizations", orgDocId), "products_stock_management");

// Create a query to find the document within the subcollection "items"
const itemsQuery = query(
  itemsRef, 
  where("Barcode", "!=", "")   // create an boolean for selecting whether inventory or non inventory
);

// Execute the query
const querySnapshots = await getDocs(itemsQuery);

// Iterate over the query results
querySnapshots.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});

