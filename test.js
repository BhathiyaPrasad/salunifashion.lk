import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, doc, collection, getDocs, query, where } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

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
const itemsListDivmen = document.getElementById("men");
// Reference to the 'items' collection
const itemsRef = collection(doc(db, "organizations", orgDocId), "items");

// Query to find documents in the 'items' collection where 'item_id' is not empty
const itemsQuery = query(
  itemsRef,
  where("Item_ID", "!=", "")
);

// Retrieve documents from the 'items' collection
const itemQuerySnapshot = await getDocs(itemsQuery);

// Array to store promises of queries
const promises = [];
const itemsData = [];

// Iterate over the documents in the 'items' collection
itemQuerySnapshot.forEach((itemDoc) => {
  const itemData = itemDoc.data();
  itemsData.push(itemData);

  // Reference to the 'products_stock_management' collection
  const productsStockRef = collection(doc(db, "organizations", orgDocId), "products_stock_management");

  // Query to find documents in the 'products_stock_management' collection where 'product_id' is equal to the 'item_id' from 'items' collection
  const productsStockQuery = query(
    productsStockRef,
    where("Product_ID", "==", itemData.Item_ID)
  );

  // Add the promise of the query to the array
  promises.push(getDocs(productsStockQuery));
});

// Wait for all promises to resolve
const snapshots = await Promise.all(promises);

// Array to store matching documents
const aggregatedData = [];

// Iterate over the query snapshots
snapshots.forEach((productsStockSnapshot, index) => {
  const itemData = itemsData[index];

  // Iterate over the documents in the 'products_stock_management' collection
  productsStockSnapshot.forEach((productStockDoc) => {
    const productStockData = productStockDoc.data();

    // Merge item data with product stock data
    const mergedData = {
      ...itemData,
      productStock: productStockData
    };

    // Add the merged data to the array
    aggregatedData.push(mergedData);
  });
});

// Output the aggregated data
console.log("Aggregated Data:", aggregatedData);

// Access and manipulate the aggregated data
aggregatedData.forEach((data) => {
  // Example: Log each item's name and stock quantity
  console.log(`Item: ${data.Item_ID}`);
  console.log(`Name: ${data.Name}`);
  console.log(`Stock Quantity: ${data.productStock.Available_Qty}`);
  console.log('-----------------------');
  
  const itemHtml = `
  <div class="showcase">
    <div class="showcase-banner">
      <img src="${data.Image_Location}" alt="${data.Product_Name}" class="product-img default" width="300">
      <img src="${data.Image_Location2}" alt="${data.Product_Name}" class="product-img hover" width="300">
      <div class="showcase-actions">
        <button class="btn-action"><ion-icon name="heart-outline"></ion-icon></button>
        <button class="btn-action"><ion-icon name="eye-outline"></ion-icon></button>
        <button class="btn-action"><ion-icon name="repeat-outline"></ion-icon></button>
        <button class="btn-action"><ion-icon name="bag-add-outline"></ion-icon></button>
      </div>
    </div>
    <div class="showcase-content">
      <br>
      <a href="#" class="showcase-category">${data.Item_Name}</a>
      <h3><a href="#" class="showcase-title">${data.Item_Name}</a></h3>
      <div class="showcase-rating">
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
        <ion-icon name="star"></ion-icon>
      </div>
      <div class="price-box">
        <p class="price">${data.Sales_Price}</p>
        <del>${data.Sales_Price2}</del>
      </div>
      <br>
      <h5>
        <button class="buybutton"  
          data-product-id="${data.id}" 
          data-product-name="${data.Item_Name}" 
          data-product-image="${data.Image_Location}" 
          data-product-price="${data.Sales_Price}" 
          data-product-old-price="${data.Sales_Price}" 
          data-product-imagetwo="${data.Image_Location2}"
          data-product-imageThree="${data.Image_Location3}"
          data-product-imageFour="${data.Image_Location4}">
          Add To Cart
        </button>
      </h5>
      <br>
    </div>
  </div>`;

itemsListDivmen.insertAdjacentHTML('beforeend', itemHtml);
});















  // Example: Perform some operations with the data
  // Here, you can manipulate or use the merged data as needed


// Example: Find a specific item by ID
// const itemIdToFind = "00100";
// const foundItem = aggregatedData.find(data => data.Item_ID === itemIdToFind);

// if (foundItem) {
//   console.log("Found Item:", foundItem);
// } else {
//   console.log(`Item with ID ${itemIdToFind} not found.`);
// }
