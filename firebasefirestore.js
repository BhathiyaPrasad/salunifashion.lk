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
const itemsListDiv = document.getElementById("itemlist");

// Reference to the items subcollection within a specific organization
const itemsRef = collection(doc(db, "organizations", orgDocId), "items");

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

 const item = doc.data();
//  const itemDiv = document.createElement("div");
//  itemDiv.textContent = `Item: ${item.Product_Name}, Barcode: ${item.Barcode}
 
 const itemHtml = `
          <div class="showcase">
            <div class="showcase-banner">
              <img src="${item.Image_Location}" alt="${item.Product_Name}" class="product-img default" width="300">
              <img src="${item.image2}" alt="${item.Product_Name}" class="product-img hover" width="300">
              <div class="showcase-actions">
                <button class="btn-action"><ion-icon name="heart-outline"></ion-icon></button>
                <button class="btn-action"><ion-icon name="eye-outline"></ion-icon></button>
                <button class="btn-action"><ion-icon name="repeat-outline"></ion-icon></button>
                <button class="btn-action"><ion-icon name="bag-add-outline"></ion-icon></button>
              </div>
            </div>
            <div class="showcase-content">
              <br>
              <a href="#" class="showcase-category">${item.Product_Name}</a>
              <h3><a href="#" class="showcase-title">${item.Product_Name}</a></h3>
              <div class="showcase-rating">
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
                <ion-icon name="star"></ion-icon>
              </div>
              <div class="price-box">
                <p class="price">${item.price}</p>
                <del>${item.oldPrice}</del>
              </div>
              <br>
              <h5>
                <button class="buybutton" 
                  data-product-id="${doc.id}" 
                  data-product-name="${item.name}" 
                  data-product-image="${item.image1}" 
                  data-product-price="${item.price}" 
                  data-product-old-price="${item.oldPrice}" 
                  data-product-imagetwo="${item.image2}">
                  Add To Cart
                </button>
              </h5>
              <br>
            </div>
          </div>`;
        
        itemsListDiv.insertAdjacentHTML('beforeend', itemHtml);
      });

 




