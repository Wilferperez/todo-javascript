let IdCounter = 0;
const input = document.querySelector('input[type="text"]');
const list = document.getElementById('list');

const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// if (localStorage.getItem('tasks')){
    console.log(localStorage.getItem('tasks'))
    console.log(tasks)
    tasks.forEach((element, index) => {
        console.log(element, index)
        
        list.innerHTML += `
        <div class="task-container" id="${element.id}">
                <label>
                    <input type="checkbox" id="${element.id}" ${element.completed ? 'checked' : ''}>
                    ${element.name}
                </label>
                <img src="./img/basura.png" class="closeBtn" width = "15px" height = "15px">
            </div>
            `
    });

    let element = list.querySelectorAll('div'); 
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    stats.innerHTML = `<p>Tareas pendientes: ${element.length} Completadas: ${checkbox.
    length}</p>`;// }

userInput.addEventListener('submit', (event)=>{
    event.preventDefault();
    addTask();
});

let addTask = ()=>{
    IdCounter++;

    let newValue = input.value;
    console.log(newValue)
    if (newValue === ""){
        console.log('debe ingresar tarea')
        // error.innerHTML = `<p>debe ingresar tarea</p>`
     alert('debe ingresar tarea')
        return;
    }

    list.innerHTML += `
    <div class="task-container" id="${IdCounter}">
            <label>
                <input type="checkbox">
                ${newValue}
            </label>
            <img src="./img/basura.png" class="closeBtn" width = "15px" height = "15px">
        </div>
        `
        input.value = '';

        const ids = tasks.map(item => item.id)
        const maxId = Math.max(...ids) 
    
        tasks.push({
            "id": (maxId === -Infinity) ? 0 : maxId + 1,
            "name": newValue,
            "completed": false
          })
          console.log(tasks)
        window.localStorage.setItem('tasks', JSON.stringify(tasks));

        updateStats();
};

list.addEventListener('click',(event)=>{
    const elementId = Number(event.srcElement.id);
    console.log('elementId ', elementId)
    // console.log('evento dsds', document.getElementById(`${event.srcElement.id}`))
   

    if(event.srcElement.nodeName == 'INPUT'){
        console.log("input", event.srcElement.checked)
        const checked = event.srcElement.checked;
        console.log(checked)
    
        tasks.forEach((element, index) => {
            console.log(element, elementId)
            if (element.id ===  elementId) {
                element.completed = checked === undefined ? false : checked 
            }
        });
        window.localStorage.setItem('tasks', JSON.stringify(tasks));
        console.log("ujt", tasks)  
        updateStats();
    } else if(event.srcElement.nodeName == 'IMG'){
        console.log("img")
       const tasksFiltered = tasks.filter((task) => {
        console.log(task.id)
        console.log(elementId)
        return task.id !== elementId
       })
       console.log(tasksFiltered)
       window.localStorage.setItem('tasks', JSON.stringify(tasksFiltered));

        deleteTask(event.srcElement.parentNode.id);
    }

});
let updateStats = ()=>{
    let element = list.querySelectorAll('div'); 
    let checkbox = list.querySelectorAll('input[type="checkbox"]:checked');
    stats.innerHTML = `<p>Tareas pendientes: ${element.length} Completadas: ${checkbox.
    length}</p>`;
};

let deleteTask = (id)=>{
    let taskToDelete = document.getElementById(id);
    list.removeChild(taskToDelete);
    updateStats();
};

