// Sample cart items (you would replace this with your actual cart items)
const cartItems = [
  { name: "CAPPUCINO", price: 10.00,},
  { name: "SANDWITHCES", price: 15.00 },
  { name: "AMERICANO", price: 20.00 }
];

// Function to open cart popup
function openCart() {
  // Display cart popup
  document.getElementById("cart-popup").style.display = "block";
  // Display overlay
  document.getElementById("overlay").style.display = "block";

  // Clear existing cart items
  const cartItemsElement = document.querySelector(".cart-items");
  cartItemsElement.innerHTML = "";

  // Populate cart items
  let total = 0;
  cartItems.forEach(item => {
    const itemElement = document.createElement("div");
    itemElement.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsElement.appendChild(itemElement);
    total += item.price;
  });

  // Update total price
  document.getElementById("total-price").textContent = total.toFixed(2);
}

// Function to close cart popup
function closeCart() {
  // Hide cart popup
  document.getElementById("cart-popup").style.display = "none";
  // Hide overlay
  document.getElementById("overlay").style.display = "none";
}

// Dummy checkout function (replace with actual checkout logic)
function checkout() {
  alert("Order placed Successfully!"); // Example alert
}
