document.addEventListener("DOMContentLoaded", function () {
    // Select all buttons with class buybutton
    const buyButtons = document.querySelectorAll('.buybutton');

    // Function to be executed when a button is clicked
    function handleClick(event) {
        // Get the data associated with the clicked button
        const productId = event.target.dataset.productId;
        const productName = event.target.dataset.productName;
        const productImage = event.target.dataset.productImage;
        const productPrice = event.target.dataset.productPrice;
        const productOldPrice = event.target.dataset.productOldPrice;
        const productimagetwo = event.target.dataset.productImagetwo;

        // this is for testing
        console.log('Product ID:', productId);
        console.log('Product Name:', productName);
        console.log('Product image:', productImage);
        console.log('product price:', productPrice);
        console.log('productOldPrice:', productOldPrice);
        console.log('productImagetwo:', productimagetwo);
        // setup allrechords in browser localstorage
        localStorage.setItem('productId', productId);
        localStorage.setItem('productName', productName);
        localStorage.setItem('productImage', productImage);
        localStorage.setItem('productPrice', productPrice);
        localStorage.setItem('productOldPrice', productOldPrice);
        localStorage.setItem('productimagetwo', productimagetwo);





        // Redirect to cart.html
        window.location.href = `products.html`;
    }

    // Loop through each button and add event listener
    buyButtons.forEach(function (button) {
        button.addEventListener('click', handleClick);
    });
});


// function for change th pictures 
