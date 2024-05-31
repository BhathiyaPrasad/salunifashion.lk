import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, setDoc, doc, getDoc, collection, query, where, getDocs, orderBy , limit } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
import { getStorage, ref, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-storage.js";
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
const db = getFirestore(app);
const storage = getStorage();


// Function to retrieve image download URL from Firebase Storage
async function getImageDownloadURL(imagePath) {
  try {
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error getting image download URL:", error);
    throw error;
  }
}





// Organization document ID

const orgDocId = "InterithmT4";  // organzation name
const itemsListDivmen = document.getElementById("men");
const itemsListDivwomen = document.getElementById("women");
const itemsListDivAccessories = document.getElementById("Accessories");

// Reference to the 'items' collection
const itemsRef = collection(doc(db, "organizations", orgDocId), "items");

// Query to find documents in the 'items' collection where 'item_id' is not empty
const itemsQuery = query(
  itemsRef,
  where("Manufacturer", "==", "male"),
  orderBy("Cat_Name")
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
    where("Product_ID", "==", itemData.Item_ID),
    orderBy("Available_Qty", "DESC"),
    limit(1)
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
aggregatedData.forEach(async(data) => {
  // Example: Log each item's name and stock quantity
  console.log(`Item: ${data.Item_ID}`);
  console.log(`Name: ${data.Item_Name}`);
  console.log(`Stock Quantity: ${data.productStock.Available_Qty}`);
  console.log('-----------------------');
  console.log("freidea-pos-img/InterithmT3/Images/Products/Product_"+`${data.Item_ID_Auto}`+".png");
  const imageUrl = await getImageDownloadURL(`gs://freidea-pos-img/InterithmT4/Images/Products/Product_`+`${data.Item_ID_Auto}`+`.png`);
 
  const itemHtml = `
  <div class="showcase" id="#${data.category}">
    <div class="showcase-banner">
      <img src="${imageUrl}" class="product-img default" width="300">
      <img src="${imageUrl}" alt="${data.Product_Name}" class="product-img hover" width="300">
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
          data-product-id="${data.productStock.Available_Qty}" 
          data-product-name="${data.Item_Name}" 
          data-product-image="${imageUrl}" 
          data-product-price="${data.Sales_Price}" 
          data-product-old-price="${data.Sales_Price}" 
          data-product-imagetwo="${imageUrl}"
          data-product-imageThree="${imageUrl}"
          data-product-imageFour="${imageUrl}">
          View Details
        </button>
      </h5>
      <br>
    </div>
  </div>`;

  itemsListDivmen.insertAdjacentHTML('beforeend', itemHtml);
});









// Reference to the 'items' collection
const itemsReff = collection(doc(db, "organizations", orgDocId), "items");

// Query to find documents in the 'items' collection where 'item_id' is not empty
const itemsQueryy = query(
  itemsReff,
  where("Manufacturer", "==", "female"),
  orderBy("Cat_Name")
);

// Retrieve documents from the 'items' collection
const itemQuerySnapshott = await getDocs(itemsQueryy);

// Array to store promises of queries
const promisess = [];
const itemsDataa = [];

// Iterate over the documents in the 'items' collection
itemQuerySnapshott.forEach((itemDoc) => {
  const itemData = itemDoc.data();
  itemsDataa.push(itemData);

  // Reference to the 'products_stock_management' collection
  const productsStockRef = collection(doc(db, "organizations", orgDocId), "products_stock_management");

  // Query to find documents in the 'products_stock_management' collection where 'product_id' is equal to the 'item_id' from 'items' collection
  const productsStockQueryy = query(
    productsStockRef,
    where("Product_ID", "==", itemData.Item_ID),
    orderBy("Available_Qty", "DESC"),
    limit(1)
  );

  // Add the promise of the query to the array
  promisess.push(getDocs(productsStockQueryy));
});

// Wait for all promises to resolve
const snapshotss = await Promise.all(promisess);

// Array to store matching documents
const aggregatedDataa = [];

// Iterate over the query snapshots
snapshotss.forEach((productsStockSnapshott, index) => {
  const itemData = itemsDataa[index];

  // Iterate over the documents in the 'products_stock_management' collection
  productsStockSnapshott.forEach((productStockDocc) => {
    const productStockDataa = productStockDocc.data();

    // Merge item data with product stock data
    const mergedData = {
      ...itemData,
      productStock: productStockDataa
    };

    // Add the merged data to the array
    aggregatedDataa.push(mergedData);
  });
});

// Output the aggregated data
console.log("Aggregated Data:", aggregatedDataa);

// Access and manipulate the aggregated data
aggregatedDataa.forEach(async(data) => {
  // Example: Log each item's name and stock quantity
  console.log(`Item: ${data.Item_ID}`);
  console.log(`Name: ${data.Item_Name}`);
  console.log(`Stock Quantity: ${data.productStock.Available_Qty}`);
  console.log('-----------------------');
  console.log("freidea-pos-img/InterithmT3/Images/Products/Product_"+`${data.Item_ID_Auto}`+".png");
  const imageUrl = await getImageDownloadURL(`gs://freidea-pos-img/InterithmT4/Images/Products/Product_`+`${data.Item_ID_Auto}`+`.png`);
  const itemHtml = `
  <div class="showcase" id="#${data.category}">
    <div class="showcase-banner">
      <img src="${imageUrl}" alt="${data.Product_Name}" class="product-img default" width="300">
      <img src="${imageUrl}" alt="${data.Product_Name}" class="product-img hover" width="300">
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
          data-product-id="${data.productStock.Available_Qty}" 
          data-product-name="${data.Item_Name}" 
          data-product-image="${imageUrl}" 
          data-product-price="${data.Sales_Price}" 
          data-product-old-price="${data.Sales_Price}" 
          data-product-imagetwo="${imageUrl}"
          data-product-imageThree="${imageUrl}"
          data-product-imageFour="${imageUrl}">
          View Details
        </button>
      </h5>
      <br>
    </div>
  </div>`;

  itemsListDivwomen.insertAdjacentHTML('beforeend', itemHtml);
});


// Reference to the 'items' collection
const itemsRefff = collection(doc(db, "organizations", orgDocId), "items");

// Query to find documents in the 'items' collection where 'item_id' is not empty
const itemsQueryyy = query(
  itemsRefff,
  where("Manufacturer", "==", "Accessories"),
  orderBy("Cat_Name")
);

// Retrieve documents from the 'items' collection
const itemQuerySnapshottt = await getDocs(itemsQueryyy);

// Array to store promises of queries
const promisesss = [];
const itemsDataaa = [];

// Iterate over the documents in the 'items' collection
itemQuerySnapshottt.forEach((itemDoc) => {
  const itemData = itemDoc.data();
  itemsDataaa.push(itemData);

  // Reference to the 'products_stock_management' collection
  const productsStockReff = collection(doc(db, "organizations", orgDocId), "products_stock_management");

  // Query to find documents in the 'products_stock_management' collection where 'product_id' is equal to the 'item_id' from 'items' collection
  const productsStockQueryyy = query(
    productsStockReff,
    where("Product_ID", "==", itemData.Item_ID),
    orderBy("Available_Qty", "DESC"),
    limit(1)
  );

  // Add the promise of the query to the array
  promisesss.push(getDocs(productsStockQueryyy));
});

// Wait for all promises to resolve
const snapshotssss = await Promise.all(promisesss);

// Array to store matching documents
const aggregatedDataaa = [];

// Iterate over the query snapshots
snapshotssss.forEach((productsStockSnapshott, index) => {
  const itemData = itemsDataaa[index];

  // Iterate over the documents in the 'products_stock_management' collection
  productsStockSnapshott.forEach((productStockDocc) => {
    const productStockDataa = productStockDocc.data();

    // Merge item data with product stock data
    const mergedDataa = {
      ...itemData,
      productStock: productStockDataa
    };

    // Add the merged data to the array
    aggregatedDataaa.push(mergedDataa);
  });
});

// Output the aggregated data
console.log("Aggregated Data:", aggregatedDataaa);

// Access and manipulate the aggregated data
aggregatedDataaa.forEach(async(data) => {
  // Example: Log each item's name and stock quantity
  console.log(`Item: ${data.Item_ID}`);
  console.log(`Name: ${data.Item_Name}`);
  console.log(`Stock Quantity: ${data.productStock.Available_Qty}`);
  console.log('-----------------------');
  console.log("freidea-pos-img/InterithmT3/Images/Products/Product_"+`${data.Item_ID_Auto}`+".png");
  const imageUrl = await getImageDownloadURL(`gs://freidea-pos-img/InterithmT4/Images/Products/Product_`+`${data.Item_ID_Auto}`+`.png`);
  const itemHtml = `
  <div class="showcase" id="#${data.category}">
    <div class="showcase-banner">
      <img src="${imageUrl}" alt="${data.Product_Name}" class="product-img default" width="300">
      <img src="${imageUrl}" alt="${data.Product_Name}" class="product-img hover" width="300">
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
        data-product-id="${data.productStock.Available_Qty}" 
        data-product-name="${data.Item_Name}" 
        data-product-image="${imageUrl}" 
        data-product-price="${data.Sales_Price}" 
        data-product-old-price="${data.Sales_Price}" 
        data-product-imagetwo="${imageUrl}"
        data-product-imageThree="${imageUrl}"
        data-product-imageFour="${imageUrl}">
        View Details
      </button>
    </h5>
      <br>
    </div>
  </div>`;

  itemsListDivAccessories.insertAdjacentHTML('beforeend', itemHtml);
});

const buyButtons = document.querySelectorAll('.buybutton');
buyButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const productId = event.target.getAttribute('data-product-id');
    const productName = event.target.getAttribute('data-product-name');
    const productImage = event.target.getAttribute('data-product-image');
    const productPrice = event.target.getAttribute('data-product-price');
    const productOldPrice = event.target.getAttribute('data-product-old-price');
    const productImageTwo = event.target.getAttribute('data-product-imagetwo');
    const productImageThree = event.target.getAttribute('data-product-imageThree');
    const productImageFour = event.target.getAttribute('data-product-imageFour');

    // Create a URL with query parameters
    const url = new URL('products.html', window.location.origin);
    url.searchParams.append('id', productId);
    url.searchParams.append('name', productName);
    url.searchParams.append('image', productImage);
    url.searchParams.append('price', productPrice);
    url.searchParams.append('oldPrice', productOldPrice);
    url.searchParams.append('imageTwo', productImageTwo);
    url.searchParams.append('imageThree', productImageThree);
    url.searchParams.append('imageFour', productImageFour);

    // Navigate to the new URL
    window.location.href = url.toString();
  });
});







