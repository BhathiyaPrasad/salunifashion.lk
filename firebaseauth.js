 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
 import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
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



 function showMessage(message, divId){
    var messageDiv=document.getElementById(divId);
    messageDiv.style.display="block";
    messageDiv.innerHTML=message;
    messageDiv.style.opacity=1;
    setTimeout(function(){
        messageDiv.style.opacity=0;
    },5000);
 }
 const signUp=document.getElementById('submitSignUp');
 signUp.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('rEmail').value;
    const password=document.getElementById('rPassword').value;
    const firstName=document.getElementById('fName').value;
    const lastName=document.getElementById('lName').value;

    const auth=getAuth();
    const db=getFirestore();

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential)=>{
        const user=userCredential.user;
        const userData={
            email: email,
            firstName: firstName,
            lastName:lastName
        };
        showMessage('Account Created Successfully', 'signUpMessage');
       
        const docRef=doc(db, "users", user.uid);

        setDoc(docRef,userData)
        .then(()=>{
            window.location.href='.payments.html';
        })
        .catch((error)=>{
            console.error("error writing document", error);

        });
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode=='auth/email-already-in-use'){
            showMessage('Email Address Already Exists !!!', 'signUpMessage');
        }
        else{
            showMessage('unable to create User', 'signUpMessage');
        }
    })
 });

 const signIn=document.getElementById('submitSignIn');
 signIn.addEventListener('click', (event)=>{
    event.preventDefault();
    const email=document.getElementById('email').value;
    const password=document.getElementById('password').value;
    const auth=getAuth();

    signInWithEmailAndPassword(auth, email,password)
    .then((userCredential)=>{
        showMessage('login is successful', 'signInMessage');
        const user=userCredential.user;
        localStorage.setItem('loggedInUserId', user.uid);
        window.location.href='./payments.html';
    })
    .catch((error)=>{
        const errorCode=error.code;
        if(errorCode==='auth/invalid-credential'){
            showMessage('Incorrect Email or Password', 'signInMessage');
        }
        else{
            showMessage('Account does not Exist', 'signInMessage');
        }
    })
 })
  

// retrieve firebase data
 
  
 

  const docRef = doc(db, "cities", "DC");
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()){
    console.log("Document data:", docSnap.data())
  }else{
    console.log("No Documents ! ")
  }



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
const orgDocId = "InterithmT3";

// Reference to the items subcollection within a specific organization
const itemsRef = collection(doc(db, "organizations", "InterithmT3"), "products_stock_management");

// Create a query to find the document within the subcollection "items"
const itemsQuery = query(
  itemsRef, 
  where("Barcode", "!=", "")   // create an boolean for selecting whether inventory or non inventory
);

// Execute the query
const querySnapshotssss = await getDocs(itemsQuery);

// Iterate over the query results
querySnapshotssss.forEach((doc) => {
  console.log(doc.id, " => ", doc.data());
});
