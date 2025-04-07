import "./styles.css";
import {toDoItem, projectLibrary, project, clearPage, navLoad, loadProjSidebar, activeTab, deleteFocus, tab, saveLocalStorage} from "./modules.js"

const addDialog = document.querySelector("#addItemDialog");
const editDialog = document.querySelector("#editItemDialog");
const projectDialog = document.querySelector("#addProjectDialog");
const homeButton = document.querySelector("#btnHome");
const todayButton = document.querySelector("#btnToday");
const weekButton = document.querySelector("#btnWeek");
const monthButton = document.querySelector("#btnMonth");
const addProject  = document.querySelector("#btnAddProject");
const cancelProject = document.querySelector("#projectCancel")
const addItemButton = document.querySelector("#btnAddItem");
const cancelButton = document.querySelector("#btnCancel");
const addForm = document.querySelector("#addItemForm");
const editForm = document.querySelector("#editItemForm");
const cancelEdit = document.querySelector("#btnCancelEdit");
const projectForm = document.querySelector("#addProjectForm");
const currentTab = new tab("home");
let library = new projectLibrary([]);
let blank = new project("blank", []);
let blankID = blank.getID;
if (!localStorage.getItem("library")) {
    library.addProject(blank);
    saveLocalStorage(library);
} else {
    loadLocalStorage();
}


function loadLocalStorage() {
    let savedLibrary = JSON.parse(localStorage.getItem("library"));
    blankID = savedLibrary[0].id;
    blank.setID = blankID;
    let blankStorage = JSON.parse(localStorage.getItem(blankID));
    for (let i = 0; i < blankStorage.length; i++) {
        let item = new toDoItem(blankStorage[i].title, blankStorage[i].description, blankStorage[i].dueDate, blankStorage[i].priority, blankStorage[i].projectID);
        item.setID = blankStorage[i].id;
        item.setChecked = blankStorage[i].checked;
        blank.addItem(item);
    }
    library.addProject(blank);
    for (let i = 1; i < savedLibrary.length; i++) {
        let newProject = new project(savedLibrary[i].name, []);
        newProject.setID =savedLibrary[i].id;
        let savedProject = JSON.parse(localStorage.getItem(savedLibrary[i].id));
        for (let j = 0; j < savedProject.length; j++) {
            let item = new toDoItem(savedProject[j].title, savedProject[j].description, savedProject[j].dueDate, savedProject[j].priority, savedProject[j].projectID);
            item.setID = savedProject[j].id;
            item.setChecked = savedProject[j].id;
            newProject.addItem(item);
        }
        library.addProject(newProject);
    }
    navLoad(library, blank.getItems, currentTab.getTab);
    loadProjSidebar(library, blankID, currentTab.getTab);    

}

homeButton.addEventListener("click", () => {
    clearPage();
    currentTab.setTab = "home";
    navLoad(library, blank.getItems, currentTab.getTab);
    activeTab(currentTab.getTab);
    deleteFocus(currentTab.getTab);
})

todayButton.addEventListener("click", () => {
    clearPage();
    currentTab.setTab = "today";
    navLoad(library, blank.getItems, currentTab.getTab);
    activeTab(currentTab.getTab);
    deleteFocus(currentTab.getTab);
})

weekButton.addEventListener("click", () => {
    clearPage();
    currentTab.setTab = "week";
    navLoad(library, blank.getItems, currentTab.getTab);
    activeTab(currentTab.getTab);
    deleteFocus(currentTab.getTab);
})

monthButton.addEventListener("click", () => {
    clearPage();
    currentTab.setTab = "month";
    navLoad(library, blank.getItems, currentTab.getTab);
    activeTab(currentTab.getTab);
    deleteFocus(currentTab.getTab);
})

addItemButton.addEventListener("click", () => {
    addDialog.showModal();
});

cancelButton.addEventListener("click", () => {
    addForm.reset();
    addDialog.close();
    activeTab(document.querySelector("#content").getAttribute("tab"));
    deleteFocus(document.querySelector("#content").getAttribute("tab"));
});

addProject.addEventListener("click", () => {
    projectDialog.showModal();
})

cancelProject.addEventListener("click",  () => {
    projectForm.reset();
    projectDialog.close();
    activeTab(document.querySelector("#content").getAttribute("tab"));
    deleteFocus(document.querySelector("#content").getAttribute("tab"));
})

addForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("addTitle");
    let description = document.getElementById("addDescription");
    let dueDate = document.getElementById("addDueDate");
    let priority = document.querySelector('input[name=addPriority]:checked');
    let content = document.querySelector("#content").getAttribute("tab");
    if (content !== "home" && content !== "today" && content !== "week" && content !== "month") {
        let project = library.getProject(content);
        let item = new toDoItem(title.value, description.value, dueDate.value, priority.value, content);
        project.addItem(item);
        blank.addItem(item);
        navLoad(library, project.getItems, content);
    } else {
        let item = new toDoItem(title.value, description.value, dueDate.value, priority.value, blank.getID);
        blank.addItem(item);
        navLoad(library, blank.getItems, currentTab.getTab);
    }
    addForm.reset();
    addDialog.close();
    currentTab.setTab = content;
    activeTab(currentTab.getTab);
    deleteFocus(currentTab.getTab);
    saveLocalStorage(library);
});

editForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("editTitle");
    let description = document.getElementById("editDescription");
    let dueDate = document.getElementById("editDueDate");
    let priority = document.querySelector('input[name=editPriority]:checked');
    let id = editForm.getAttribute("itemID");
    let item = blank.getItem(id);
    let content = document.querySelector("#content").getAttribute("tab");
    item.setTitle = title.value;
    item.setDescription = description.value;
    item.setDueDate = dueDate.value;
    item.setPriority = priority.value;
    if (content !== "home" && content !== "today" && content !== "week" && content !== "month") {
        let project = library.getProject(content);
        let projectItem = project.getItem(item.getID);
        projectItem.setTitle = title.value;
        projectItem.setDescription = description.value;
        projectItem.setDueDate = dueDate.value;
        projectItem.setPriority = priority.value;
        navLoad(library, project.getItems, content);
    } else {
        if (blankID != item.getProjectID) {
            let project = library.getProject(item.getProjectID);
            let projectItem = project.getItem(item.getID);
            projectItem.setTitle = title.value;
            projectItem.setDescription = description.value;
            projectItem.setDueDate = dueDate.value;
            projectItem.setPriority = priority.value;
        }
        navLoad(library, blank.getItems, currentTab.getTab);
    }
    editForm.reset();
    editDialog.close();
    activeTab(document.querySelector("#content").getAttribute("tab"));
    deleteFocus(document.querySelector("#content").getAttribute("tab"));
    saveLocalStorage(library);
})

cancelEdit.addEventListener("click", () => {
    editForm.reset();
    editDialog.close();
    activeTab(document.querySelector("#content").getAttribute("tab"));
    deleteFocus(document.querySelector("#content").getAttribute("tab"));
})

projectForm.addEventListener("submit", (e) => {
    e.preventDefault();
    let title = document.getElementById("projectTitle");
    let newProject = new project(title.value, []);
    library.addProject(newProject);
    loadProjSidebar(library, blankID, currentTab.getTab);
    projectForm.reset();
    projectDialog.close();
    navLoad(library, newProject.getItems, newProject.getID);
    activeTab(newProject.getID);
    saveLocalStorage(library);
})