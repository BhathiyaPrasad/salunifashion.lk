
document.addEventListener("DOMContentLoaded", function () {
    // Select all buttons with class buybutton
    const buyButtons = document.querySelectorAll('.buybutton');

    // Function to be executed when a button is clicked
    function handleClick() {
        // redirect tot the cart.html
        window.location.href = ('/cart.html');
        console.log('Button clicked!');








    }

    // Loop through each button and add event listener
    buyButtons.forEach(function (button) {
        button.addEventListener('click', handleClick);
    });
});

const navigationarrow = document.getElementById('navigationarrow');
navigationarrow.addEventListener('click', function () {
    window.location.href = './test/test2.html'
});

