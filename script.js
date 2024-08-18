const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");

function addTask() {
    if (inputBox.value === '') {
        alert("Please add a task");
    } else {
        let li = document.createElement("li");
        li.textContent = inputBox.value;
        listContainer.appendChild(li);

        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        li.appendChild(span);
    }
    inputBox.value = "";
    saveData();
}


listContainer.addEventListener("click", function (e) {
    if (e.target.tagName === "LI") {
        e.target.classList.toggle("checked");
        saveData();
    } else if (e.target.tagName === "SPAN") {
        e.target.parentElement.remove(); 
        saveData();
    }
}, false);


listContainer.addEventListener("dblclick", function (e) {
    if (e.target.tagName === "LI") {
        let currentTask = e.target;
        let currentText = currentTask.textContent.replace("\u00d7", "").trim();
        let inputField = document.createElement("input");
        inputField.type = "text";
        inputField.value = currentText;
        currentTask.textContent = "";
        currentTask.appendChild(inputField);

        inputField.addEventListener("blur", function () {
            if (inputField.value.trim() !== "") {
                currentTask.textContent = inputField.value;
                let span = document.createElement("span");
                span.innerHTML = "\u00d7"; 
                currentTask.appendChild(span);
            } else {
                currentTask.remove(); 
            }
            saveData();
        });

        inputField.addEventListener("keypress", function (e) {
            if (e.key === "Enter") {
                inputField.blur(); 
            }
        });

        inputField.focus();
    }
});

function saveData() {
    localStorage.setItem("data", listContainer.innerHTML);
}

function showTasks() {
    listContainer.innerHTML = localStorage.getItem("data");
}

showTasks();
