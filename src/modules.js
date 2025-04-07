import {format} from 'date-fns';
export class tab {
    constructor(tab) {
        this.tab = tab;
    }
    get getTab() {
        return this.tab;
    }
    /**
     * @param {string} tab
     */
    set setTab(tab) {
        this.tab = tab;
    }
}

export class toDoItem {
    constructor(title, description, dueDate, priority, projectID) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.id = crypto.randomUUID();
        this.checked = false;
        this.projectID = projectID;
    }
    get getTitle() {
        return this.title;
    }
    get getDescription() {
        return this.description;
    }
    get getDueDate() {
        return this.dueDate;
    }
    get getPriority() {
        return this.priority;
    }
    get getID() {
        return this.id;
    }
    get getChecked() {
        return this.checked;
    }
    get getProjectID() {
        return this.projectID;
    }
    /**
     * @param {string} title
     */
    set setTitle(title) {
        this.title = title;
    }
    /**
     * @param {string} description
     */
    set setDescription(description) {
        this.description = description;
    }
    /**
     * @param {string} dueDate
     */
    set setDueDate(dueDate) {
        this.dueDate = dueDate;
    }
    /**
     * @param {string} priority
     */
    set setPriority(priority) {
        this.priority = priority;
    }
    /**
     * @param {string} id
     */
    set setID(id) {
        this.id = id;
    }
    /**
     * @param {bool} checked
     */
    set setChecked(checked) {
        this.checked = checked;
    }
    switchChecked(checked) {
        if (checked) {
            this.checked = false;
        } else {
            this.checked = true;
        }
    }
    /**
     * @param {string} projectID
     */
    set setprojectID(projectID) {
        this.projectID = projectID;
    }
}

export class projectLibrary {
    constructor(library) {
        this.library = library;
    }
    get getLibrary() {
        return this.library;
    }
    /**
     * @param {array} library
     */
    set setLibrary(library) {
        this.library = library;
    }
    addProject(project) {
        this.library.push(project);
    }
    getProject(id) {
        const index = this.library.findIndex(project => project.getID === id);
        return this.library[index];
    }
    getIndex(id) {
        return this.library.findIndex(project => project.getID === id);
    }
}

export class project {
    constructor(name, items) {
        this.name = name;
        this.items = items;
        this.id = crypto.randomUUID();
    }
    get getItems() {
        return this.items;
    }
    /**
     * @param {array} items
     */
    set setItems(items) {
        this.items = items;
    }
    get getName() {
        return this.name;
    }
    /**
     * @param {string} name;
     */
    set setName(name) {
        this.name = name;
    }
    get getID() {
        return this.id;
    }
    /**
     * @param {string} id;
     */
    set setID(id) {
        this.id = id;
    }
    addItem(item) {
        this.items.push(item);
    }
    getItem(id) {
        const index = this.items.findIndex(item => item.getID === id);
        return this.items[index];
    }
}

export function displayToDo(library, storage, currentTab) {
    const container = document.querySelector("#content");
    container.innerHTML = '';
    storage.forEach((item) => {
        
        const checkBox = document.createElement("input");
        checkBox.setAttribute("type", "checkBox");
        checkBox.setAttribute("name", "checkBox");
        
        const title = document.createElement("div");
        title.classList.add("title");
        title.textContent = item.getTitle;
        
        const card = document.createElement("div");
        card.classList.add("card");
        card.appendChild(checkBox);
        card.appendChild(title);
        checkBox.addEventListener("change", () => {
            if (checkBox.checked) {
                title.classList.add("checked");
            } else {
                title.classList.remove("checked");
            }
            item.switchChecked(item.getChecked);
            let blank = library.getLibrary[0];
            let blankItem = blank.getItem(item.getID);
            blankItem.setChecked = item.getChecked;
            let project = library.getProject(item.getProjectID);
            let projectItem = project.getItem(item.getID);
            projectItem.setChecked = item.getChecked;
            saveLocalStorage(library);
        });
        if (item.getChecked) {
            title.classList.add("checked");
            checkBox.checked = true;
        }
        
        const newDate = new Date(item.getDueDate);
        const formattedDate = format(newDate.setDate(newDate.getDate() + 1), 'MMMM do');
        const dueDate = document.createElement("div");
        dueDate.classList.add("dueDate");
        dueDate.textContent = formattedDate;

        const editButton = document.createElement("button");
        editButton.classList.add("editButton");
        editButton.textContent = "Edit";
        editButton.addEventListener("click", () => editItem(item));

        const deleteButton = document.createElement("button");
        deleteButton.classList.add("deleteButton");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteItem(library, item.getID, storage, currentTab));
        
        const buttonCard = document.createElement("div");
        buttonCard.classList.add("buttonCard");
        buttonCard.appendChild(dueDate);
        buttonCard.appendChild(editButton);
        buttonCard.appendChild(deleteButton);
        
        const itemCard = document.createElement("div");
        itemCard.classList.add("itemCard");
        itemCard.classList.add(item.getPriority);
        itemCard.setAttribute("itemID", item.getID);
        itemCard.appendChild(card);
        itemCard.appendChild(buttonCard);
        container.appendChild(itemCard);
        });
}

export function deleteItem(library, id, storage, currentTab) {
    library.getLibrary.forEach((project) => {
        const index = project.getItems.findIndex(item => item.id === id);
        if (index !== -1) {
            project.getItems.splice(index, 1);
            storage = project.getItems;
        }
    })
    if (currentTab == "home") {
        navLoad(library, library.getLibrary[0].getItems, currentTab);
    } else {
        navLoad(library, storage, currentTab);
    }
    saveLocalStorage(library);
}

export function editItem(item) {
    const editDialog = document.querySelector("#editItemDialog");
    const editForm = document.querySelector("#editItemForm")
    editDialog.showModal();
    editForm.editTitle.value = item.getTitle;
    editForm.editDescription.value = item.getDescription;
    editForm.editDueDate.value = item.getDueDate;
    editForm.editPriority.value = item.getPriority;
    editForm.setAttribute("itemID", item.id);
}

export function clearPage() {
    const content = document.querySelector("#content");
    content.innerHTML = "";
}

export function loadHome(library, storage, currentTab) {
    const content = document.querySelector("#content");
    displayToDo(library, storage, currentTab);
}

export function loadToday(library, currentTab) {
    const today = new Date();
    let ids = [];
    let storage = [];
    library.getLibrary.forEach((project) => {
        project.getItems.forEach((item) => {
            if (!ids.includes(item.getID)) {
                ids.push(item.getID);
                let itemDate = new Date(item.getDueDate);
                if (today.getMonth() === itemDate.getMonth() && today.getDate() === (itemDate.getDate() + 1)) {
                    storage.push(item);
                }
            }
        })
    })
    displayToDo(library, storage, currentTab);
}

export function loadWeek(library, currentTab) {
    const today = new Date();
    const week = new Date();
    week.setDate(week.getDate() + 7);
    let ids = [];
    let storage = [];
    library.getLibrary.forEach((project) => {
        project.getItems.forEach((item) => {
            if (!ids.includes(item.getID)) {
                ids.push(item.getID);
                let itemDate = new Date(item.getDueDate);
                if (itemDate < week) {
                    storage.push(item);
                }
            }
        })
    })
    displayToDo(library, storage, currentTab);
}

export function loadMonth(library, currentTab) {
    const today = new Date();
    const month = new Date();
    month.setMonth(month.getMonth() + 1);
    let ids = [];
    let storage = [];
    library.getLibrary.forEach((project) => {
        project.getItems.forEach((item) => {
            if (!ids.includes(item.getID)) {
                ids.push(item.getID);
                let itemDate = new Date(item.getDueDate);
                if (itemDate < month) {
                    storage.push(item);
                }
            }
        })
    })
    displayToDo(library, storage, currentTab);
}

export function loadProject(library, storage, currentTab) {
    const container = document.querySelector("#content");
    container.innerHTML = '';
    if (storage.length === 0) {
        const projectDiv = document.createElement("div");
        const deleteButton = document.createElement("button");
        projectDiv.classList.add("projectText");
        projectDiv.setAttribute("projectID", currentTab);
        projectDiv.innerHTML = `
        <h1>Empty Project!</h1>
        <h2>Create a new-to-do item or delete project.</h2>`
        deleteButton.classList.add("deleteProject");
        deleteButton.textContent = "Delete";
        deleteButton.addEventListener("click", () => deleteProject(library, currentTab));
        projectDiv.appendChild(deleteButton);
        container.appendChild(projectDiv);
    } else {
        displayToDo(library, storage, currentTab);
    }
}

export function deleteProject(library, currentTab) {
    const index = library.getIndex(currentTab);
    library.getLibrary.splice(index, 1);
    const storage = library.getLibrary;
    loadProjSidebar(library, storage[0].getID, currentTab);
    navLoad(library, storage[0].getItems, "home");
    activeTab("home");
    localStorage.removeItem(currentTab);
    saveLocalStorage(library);
}

export function loadProjSidebar(library, blankID, currentTab) {
    const container = document.querySelector("#projectsList");
    let projects = library.getLibrary;
    container.innerHTML = "";
    projects.forEach((project) => {
        if (project.getID != blankID) {
            const projectCard = document.createElement("div");
            projectCard.classList.add("projectCard");
            projectCard.setAttribute("projectID", project.getID);
            const projectButton = document.createElement("button");
            projectButton.setAttribute("id", project.getID);
            projectButton.classList.add("projectName");
            projectButton.textContent = project.getName;
            projectButton.addEventListener("click", () => {
                clearPage();
                currentTab = project.getID;
                navLoad(library, project.getItems, currentTab);
                activeTab(currentTab);
            })
            projectCard.appendChild(projectButton);
            container.appendChild(projectCard);
        }
    })
}

export function navLoad(library, storage, currentTab) {
    const content = document.querySelector("#content");
    content.setAttribute("tab", currentTab);
    if (currentTab == "home") {
        loadHome(library, storage, currentTab);
    } else if (currentTab == "today") {
        loadToday(library, currentTab);
    } else if (currentTab == "week") { 
        loadWeek(library, currentTab);
    } else if (currentTab == "month") {
        loadMonth(library, currentTab);
    } else {
        loadProject(library, storage, currentTab);
    }
}

export function activeTab (currentTab) {
    document.querySelector("#btnHome").classList.remove("focus");
    document.querySelector("#btnToday").classList.remove("focus");
    document.querySelector("#btnWeek").classList.remove("focus");
    document.querySelector("#btnWeek").classList.remove("focus");
    document.querySelector("#btnMonth").classList.remove("focus");
    document.querySelectorAll(".projectName").forEach(i => i.classList.remove("focus"));
    if (currentTab == "home") {
        document.querySelector("#btnHome").classList.add("focus");
    } else if (currentTab == "today") {
        document.querySelector("#btnToday").classList.add("focus");
    } else if (currentTab == "week") {
        document.querySelector("#btnWeek").classList.add("focus");
    } else if (currentTab == "month") {
        document.querySelector("#btnMonth").classList.add("focus");
    } else {
        document.getElementById(currentTab).classList.add("focus");
    }
}

export function deleteFocus(currentTab) {
    const deleteButtons = document.querySelectorAll(".deleteButton");
    if (deleteButtons != null) {
        deleteButtons.forEach((button) => {
            button.addEventListener("click", () => {
                activeTab(currentTab);
            })
        }
    )}
}

export function saveLocalStorage(library) {
    let libraryStorage = [];
    library.getLibrary.forEach((project) => {
        let projectStorage = [];
        project.getItems.forEach((item) => {
            let itemStore = {title: item.getTitle, description: item.getDescription, dueDate: item.getDueDate, priority: item.getPriority, id: item.getID, checked: item.getChecked, projectID: item.getProjectID};
            projectStorage.push(itemStore);
        })
        localStorage.setItem(project.getID, JSON.stringify(projectStorage));
        libraryStorage.push({id:project.getID, name:project.getName})
    })
    localStorage.setItem("library", JSON.stringify(libraryStorage));
}