/* =========== Toggle Menu ============ */
const openNav = document.querySelector(".open-btn");
const closeNav = document.querySelector(".close-btn");
const menu = document.querySelector(".nav-list");

openNav.addEventListener("click", () => {
  menu.classList.add("show");
});

closeNav.addEventListener("click", () => {
  menu.classList.remove("show");
});


const navbaropenmen = document.getElementById("close-men");

navbaropenmen.addEventListener("click", () => {
  console.log("button Clicked");
  menu.classList.remove("show");
})
const navbaropenwomen = document.getElementById("close-women");

navbaropenwomen.addEventListener("click", () => {
  console.log("button Clicked");
  menu.classList.remove("show");
})

const navbaropenAccessorries = document.getElementById("close-Accessorries");

navbaropenAccessorries.addEventListener("click", () => {
  console.log("button Clicked");
  menu.classList.remove("show");
})

