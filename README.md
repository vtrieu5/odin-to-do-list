# odin-restaurant

export function displayToDo(storage) {
    const container = document.querySelector("#content");
    container.innerHTML = '';
    storage.forEach((item) => {
        const itemCard = document.createElement("div");
        itemCard.classList.add("itemCard");
        itemCard.setAttribute("itemID", item.id);
        itemCard.innerHTML = `
        <div class="card">
            <div class="title">${item.title}</div>
            <div class="description">${item.description}</div>
            <div class="dueDate">${item.dueDate}</div>
            <div class="priority">${item.priority}</div>
            <button class="editButton">Edit</button>
            <button class="deleteButton" 
            onclick="deleteItem(storage,'${item.id}')">Delete</button>
        </div>`;
        container.appendChild(itemCard);
    });
}

export function deleteItem(storage, id) {
    storage = storage.filter((item) => item.id !== id);
    displayToDo(storage);
}
