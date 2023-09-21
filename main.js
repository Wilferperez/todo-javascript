var loadingDiv = document.getElementById('loading')

function showSpinner() {
  loadingDiv.style.visibility = 'visible'
}

function hideSpinner() {
  loadingDiv.style.visibility = 'hidden'
}

const input = document.querySelector('input[type="text"]')
const list = document.getElementById('list')

let tasks = localStorage.getItem('tasks')
  ? JSON.parse(localStorage.getItem('tasks'))
  : []

// if (localStorage.getItem('tasks')){
console.log(localStorage.getItem('tasks'))
console.log(tasks)
tasks.forEach((element, index) => {
  console.log(element, index)

  list.innerHTML += `
        <div class="task-container" id="${element.id}">
                <label>
                    <input type="checkbox" id="${element.id}" ${
    element.completed ? 'checked' : ''
  }>
                    ${element.name}
                </label>
                <img src="./img/basura.png" id="${
                  element.id
                }" class="closeBtn" width = "15px" height = "15px" onClick="showSpinner()">
            </div>
            `
})

let element = list.querySelectorAll('div')
let checkbox = list.querySelectorAll('input[type="checkbox"]:checked')
stats.innerHTML = `<p>Tareas pendientes: ${element.length} Completadas: ${checkbox.length}</p>` // }

userInput.addEventListener('submit', (event) => {
  event.preventDefault()
  addTask()
})

let addTask = () => {
  let newValue = input.value
  console.log(newValue)
  if (newValue === '') {
    console.log('debe ingresar tarea')
    // error.innerHTML = `<p>debe ingresar tarea</p>`
    alert('debe ingresar tarea')
    return
  }

  const ids = tasks.map((item) => item.id)
  const maxId = Math.max(...ids)

  list.innerHTML += `<div class="task-container" id="${
    maxId === -Infinity ? 1 : maxId + 1
  }">
            <label>
                <input type="checkbox">
                ${newValue}
            </label>
            <img src="./img/basura.png" id="${
              maxId === -Infinity ? 1 : maxId + 1
            }" class="closeBtn" width = "15px" height = "15px" onClick="showSpinner()">
        </div>`

  input.value = ''

  tasks.push({
    id: maxId === -Infinity ? 1 : maxId + 1,
    name: newValue,
    completed: false
  })
  console.log(tasks)
  window.localStorage.setItem('tasks', JSON.stringify(tasks))

  updateStats()
  setTimeout(() => {
    hideSpinner()
  }, 1000)
}

list.addEventListener('click', (event) => {
  console.log('event.srcElement ', event.srcElement)
  const elementId = Number(event.srcElement.id)
  console.log('elementId ', elementId)
  // console.log('evento dsds', document.getElementById(`${event.srcElement.id}`))

  if (event.srcElement.nodeName == 'INPUT') {
    console.log('input', event.srcElement.checked)
    const checked = event.srcElement.checked
    console.log(checked)

    tasks.forEach((element, index) => {
      console.log(element, elementId)
      if (element.id === elementId) {
        element.completed = checked === undefined ? false : checked
      }
    })
    window.localStorage.setItem('tasks', JSON.stringify(tasks))
    console.log('ujt', tasks)
    updateStats()
  } else if (event.srcElement.nodeName == 'IMG') {
    console.log('img')
    const tasksFiltered = tasks.filter((task) => {
      console.log(task.id)
      console.log(elementId)
      return task.id !== elementId
    })
    console.log(tasksFiltered)
    window.localStorage.setItem('tasks', JSON.stringify(tasksFiltered))
    tasks = tasksFiltered
    deleteTask(event.srcElement.parentNode.id)

    setTimeout(() => {
      hideSpinner()
    }, 1000)
  }
})
let updateStats = () => {
  let element = list.querySelectorAll('div')
  let checkbox = list.querySelectorAll('input[type="checkbox"]:checked')
  stats.innerHTML = `<p>Tareas pendientes: ${element.length} Completadas: ${checkbox.length}</p>`
}

let deleteTask = (id) => {
  let taskToDelete = document.getElementById(id)
  list.removeChild(taskToDelete)
  updateStats()
}
