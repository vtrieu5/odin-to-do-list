export function clearPage () {
    const container = document.querySelector('#content');
    container.innerHTML = "";
}

export function loadHome () {
    const homeContainer = document.querySelector("#content");
    homeContainer.innerHTML = `
        <h1>No Name Restaurant</h1>
        <div id="blurb">
            <h2>About Us</h2>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. <br> Obcaecati saepe excepturi soluta autem molestias ullam.</p>
            <p>Van</p>
        </div>
        <div id="hours">
            <p>Hours</p>
            <p>Sunday: 10am - 8pm</p>
            <p>Monday: 11am - 10pm</p>
            <p>Tuesday: 11am - 10pm</p>
            <p>Wednesday: 11am - 10pm</p>
            <p>Thursday: 11am - 10pm</p>
            <p>Friday: 12pm - 12am</p>
            <p>Saturday: 10am - 12am</p>
        </div>
        <div id="location">
            <p>Location</p>
            <p>1234 12 Avenue NW, Edmonton AB</p>
        </div>`;
}

export function loadMenu() {
    const menuContainer = document.querySelector("#content");
    menuContainer.innerHTML = `
        <h1>Menu</h1>
        <div id="dishes">
            <h1>Main Dishes</h1>
            <div class="dish">
                <h2>Placeholder 1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$10</p>  
            </div>
            <div class="dish">
                <h2>Placeholder 2</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$15</p>  
            </div>
            <div class="dish">
                <h2>Placeholder 3</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$20</p>  
            </div>
        </div>
        <div id="sides">
            <h1>Sides</h1>
            <div class="side">
                <h2>Placeholder 1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$4</p>  
            </div>
            <div class="side">
                <h2>Placeholder 2</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$5</p>  
            </div>
            <div class="side">
                <h2>Placeholder 3</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$6</p>  
            </div>
        </div>
        <div id="drinks">
            <h1>Drinks</h1>
            <div class="drink">
                <h2>Placeholder 1</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$1</p>  
            </div>
            <div class="drink">
                <h2>Placeholder 2</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$2</p>  
            </div>
            <div class="drink">
                <h2>Placeholder 3</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore, impedit.</p>
                <p>$3</p>  
            </div>
        </div>`;
}

export function loadContact() {
    const contactContainer = document.querySelector("#content");
    contactContainer.innerHTML = `
        <h1>Contact Us</h1>
        <div class="contact">
            <h2>John Smith</h2>
            <p>notRealEmail@fake.com</p>
        </div>
        <div class="contact">
            <h2>Jane Doe</h2>
            <p>realEmail@notFake.com</p>
        </div>`;
}