import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, orderBy, limit } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";
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
const db = getFirestore(app);
const storage = getStorage();

const orgDocId = "InterithmT4";
const itemsListDivmen = document.getElementById("men");
const itemsListDivwomen = document.getElementById("women");
const itemsListDivAccessories = document.getElementById("Accessories");

// Function to retrieve image download URL from Firebase Storage
async function getImageDownloadURL(imagePath) {
  try {
    const imageRef = ref(storage, imagePath);
    const imageUrl = await getDownloadURL(imageRef);
    return imageUrl;
  } catch (error) {
    console.error("Error getting image download URL:", error);
    return "default-image-url.png";  // Fallback image URL in case of error
  }
}

// Function to fetch and display items based on category
async function fetchAndDisplayItems(manufacturer, containerElement) {
  const itemsRef = collection(doc(db, "organizations", orgDocId), "items");
  const itemsQuery = query(
    itemsRef,
    where("Manufacturer", "==", manufacturer),
    orderBy("Cat_Name")
  );

  const itemQuerySnapshot = await getDocs(itemsQuery);

  const promises = [];
  const itemsData = [];

  itemQuerySnapshot.forEach((itemDoc) => {
    const itemData = itemDoc.data();
    itemsData.push(itemData);

    const productsStockRef = collection(doc(db, "organizations", orgDocId), "products_stock_management");
    const productsStockQuery = query(
      productsStockRef,
      where("Product_ID", "==", itemData.Item_ID),
      orderBy("Available_Qty", "DESC"),
      limit(1)
    );

    promises.push(getDocs(productsStockQuery));
  });

  const snapshots = await Promise.all(promises);

  const aggregatedData = [];

  snapshots.forEach((productsStockSnapshot, index) => {
    const itemData = itemsData[index];
    productsStockSnapshot.forEach((productStockDoc) => {
      const productStockData = productStockDoc.data();
      const mergedData = { ...itemData, productStock: productStockData };
      aggregatedData.push(mergedData);
    });
  });

  aggregatedData.forEach(async (data) => {
    const imageUrl = await getImageDownloadURL(`gs://freidea-pos-img/InterithmT4/Images/Products/Product_${data.Item_ID_Auto}.png`);
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

    containerElement.insertAdjacentHTML('beforeend', itemHtml);
  });
}

// Fetch and display items for each category
await fetchAndDisplayItems("male", itemsListDivmen);
await fetchAndDisplayItems("female", itemsListDivwomen);
await fetchAndDisplayItems("Accessories", itemsListDivAccessories);

// Event delegation for buy buttons
document.body.addEventListener('click', (event) => {
  if (event.target.matches('.buybutton')) {
    const button = event.target;
    const productId = button.getAttribute('data-product-id');
    const productName = button.getAttribute('data-product-name');
    const productImage = button.getAttribute('data-product-image');
    const productPrice = button.getAttribute('data-product-price');
    const productOldPrice = button.getAttribute('data-product-old-price');
    const productImageTwo = button.getAttribute('data-product-imagetwo');
    const productImageThree = button.getAttribute('data-product-imagethree');
    const productImageFour = button.getAttribute('data-product-imagefour');

    const url = new URL('products.html', window.location.origin);
    url.searchParams.append('id', productId);
    url.searchParams.append('name', productName);
    url.searchParams.append('image', productImage);
    url.searchParams.append('price', productPrice);
    url.searchParams.append('oldPrice', productOldPrice);
    url.searchParams.append('imageTwo', productImageTwo);
    url.searchParams.append('imageThree', productImageThree);
    url.searchParams.append('imageFour', productImageFour);

    window.location.href = url.toString();
  }
});
