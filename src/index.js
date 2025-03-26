import "./styles.css";
import {clearPage, loadHome, loadMenu, loadContact} from "./navigation.js";

const homeButton = document.querySelector("#btn-home");
const menuButton = document.querySelector('#btn-menu');
const contactButton = document.querySelector('#btn-contact');

homeButton.addEventListener("click", () => {
    clearPage();
    loadHome();
})

menuButton.addEventListener("click", () => {
    clearPage();
    loadMenu();
})

contactButton.addEventListener("click", () => {
    clearPage();
    loadContact();
})

loadHome();


