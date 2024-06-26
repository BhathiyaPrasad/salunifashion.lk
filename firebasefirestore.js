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
        <p class="price">Rs.${data.Sales_Price}.00</p>
        <del>Rs.${data.Sales_Price2}.00</del>
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
        <p class="price">Rs.${data.Sales_Price}.00</p>
        <del>Rs.${data.Sales_Price2}.00</del>
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




const {} = localStorage.getItem('userData');
console.log(userData);
console.log(userData.mobileNumber); 
console.log(userData.firstName); 

const productData  = localStorage.getItem('products');
console.log(productData);

console.log(productData.id); 







document.addEventListener('click', async (event) => {
  if (event.target.classList.contains('proceed-payment')) {
    console.log("Button clicked!");
    event.preventDefault(); 
    // showLoadingScreen();
    const now = new Date();
    const orgDocId = "InterithmT4"; // Replace with your actual orgDocId
    const orderItemsRef = collection(db, 'organizations', orgDocId, 'order_items');
    const ordersRef = collection(db, 'organizations', orgDocId, 'orders');
    const clientIDListRef = collection(db, 'organizations', orgDocId, 'ClientID_List'); // Reference to ClientID_List
    const totalPrice = event.target.getAttribute('data-product-total-price');
    
    const orderDocRef = doc(ordersRef); // This creates a reference with a unique ID
    const orderId = orderDocRef.id; // Get the unique ID
    
    console.log(orderId);
    
    const generateUUID = () => {
      return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
      );
    };

    const addOrderItem = async (item) => {
      try {
        if (item.name === null) {
          console.log("Item name is null", item);
        } else {
          console.log("ID", generateUUID(), orderId);
          await addDoc(orderItemsRef, {
            orderAutoID: orderId,
            orderID: orderId,
            lineOrder: 0,
            itemAutoID: "",
            itemID: item.id,
            itemName: item.name,
            itemEngName: item.name,
            quantity:item.qty,
            UUID: generateUUID(),
            salePrice: item.price,
            lineTotal: 0.0,
            remark: "",
            Deleted: 0
          });
          console.log('Order item added with order ID: ', orderId);
        }
      } catch (error) {
        console.error('Error adding order item: ', error);
      }
    };

    const copyClientIDListToOrderItem = async (item) => {
      try {
        if (item.name === null) {
          console.log('Null value')}
          else {
        const clientIDListSnapshot = await getDocs(clientIDListRef);
        const combinedData = {};
        clientIDListSnapshot.forEach((doc) => {
          combinedData[doc.id] = 0; // Add client ID as field with value 0
        });
        if (Object.keys(combinedData).length === 0) {
          throw new Error("No documents found in ClientID_List collection.");
        }
        
        await setDoc(doc(orderItemsRef, orderId + "_" + item.id), {
          ...combinedData,
          orderAutoID: orderId,
          orderID: orderId,
          lineOrder: 0,
          itemAutoID: "",
          itemID: item.id,
          itemName: item.name,
          itemEngName: item.name,
          quantity: item.qty,
          UUID: generateUUID(), 
          salePrice: item.price,
          lineTotal: item.price * item.qty, // added line total
          remark: "",
          Deleted: 0
        });
        console.log('All documents copied from ClientID_List to order item for item ID: ', item.id);
      }} catch (error) {
        console.error('Error copying documents: ', error);
      }
    }
  
    const addOrder = async (totalValue) => {
      try {
        await setDoc(doc(ordersRef, orderId), {
          order_id: orderId,
          uuid: generateUUID(),
          total_value: totalValue,
          date: now.toISOString().split('T')[0],
          time: now.toLocaleTimeString()
        });
        console.log('Order added with order ID: ', orderId);
      } catch (error) {
        console.error('Error adding order: ', error);
      }
    };

    const copyClientIDListToOrder = async () => {
      try {
        const clientIDListSnapshot = await getDocs(clientIDListRef);
        const combinedData = {};
        clientIDListSnapshot.forEach((doc) => {
          combinedData[doc.id] = 0; // Add client ID as field with value 0
        });
        if (Object.keys(combinedData).length === 0) {
          throw new Error("No documents found in ClientID_List collection.");
        }
        
        await setDoc(doc(ordersRef, orderId), {
          ...combinedData,
          orderAutoID: orderId,
          orderID: orderId,
          createdDate: now.toISOString().split('T')[0],
          createdTime: now.toLocaleTimeString(), 
          currentStatus: "Pending",
          tableName:  tableName,
          note: additionalDetails,
          subTotal: 0.0,
          confirmedBy: "",
          rejectedBy: "",
          deletedBy: "",
          invoiceNo: "",
          parkNo: "",
          UUID: generateUUID(),
          Deleted: 0
        });
        console.log('All documents copied from ClientID_List to orders.');
      } catch (error) {
        console.error('Error copying documents: ', error);
      }
    };

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    let totalValue = 0;
    for (const item of cart) {
      totalValue += item.price;
      // await addOrderItem(item);
      await copyClientIDListToOrderItem(item); // Execute for every order item
    }
    await addOrder(totalValue);
    await copyClientIDListToOrder(); // Execute once for the entire order
    
    localStorage.clear(); // Clear local storage after successful save
    // hideLoadingScreen();
    // Optionally redirect to another page or show a success message
    alert('Order placed successfully');
    // After your function completes
 

    window.location.href = 'index.html#menu';
  }
});