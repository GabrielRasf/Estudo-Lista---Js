const form = document.querySelector('#to-do-form')
const taskTitleInput = document.querySelector('#task-title-input')
const toDoListUl = document.querySelector('#to-do-list')
const mainElement = document.querySelector(`main`)
const input = document.querySelector(`#task-title-input`)
const buttonAdd = document.querySelector(`#add-task`)
const titulo = document.querySelector(`#titulo`)

document.body.style.backgroundColor = `gray`

mainElement.style.backgroundColor = `rgb(109, 109, 109)`
mainElement.style.textAlign = `center`
mainElement.style.padding = `15px`
mainElement.style.borderRadius = `8px`
mainElement.style.boxShadow = `8px 8px rgba(0, 0, 0, 0.272)`

input.style.borderRadius = `8px`
input.style.backgroundColor = `rgb(178, 178, 178)`

buttonAdd.style.cursor = `pointer`
buttonAdd.style.borderRadius = `8px`
buttonAdd.style.backgroundColor = `rgb(178,178, 178)`
buttonAdd.style.color = `rgb(46, 46, 46)`

titulo.style.color = `rgb(46, 46, 46)`

toDoListUl.style.listStyle = `none`



let tasks = []


function renderTaskOnHtml(taskTitle, done = false) {
    const li = document.createElement(`li`)
    const input = document.createElement(`input`)

    input.addEventListener(`change`, (event) => {
        const liToToggle = event.target.parentElement

        const spanToToggle = liToToggle.querySelector(`span`)

        const done = event.target.checked
        if (done) {
            spanToToggle.style.textDecoration = `line-through`
        } else {
            spanToToggle.style.textDecoration = `none`
        }
    
        tasks = tasks.map (t => {
            if (t.title === spanToToggle.textContent) {
                return {
                    title: t.title,
                    done: !t.done
                }
            }
            return t
        })
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
    })

    input.checked = done
    
    input.setAttribute(`type`, `checkbox`)
    
    const span = document.createElement(`span`)
    span.textContent = taskTitle
    if (done) {
        span.style.textDecoration = `line-through`
    }

    const button = document.createElement(`button`)
    button.textContent = `Remover`
    button.style.backgroundColor = `rgb(178,178, 178)`
    button.style.borderRadius = `8px`
    button.style.marginLeft = `5px`
    button.style.color = `rgb(46, 46, 46)`

    button.addEventListener(`click`, (event) => {
        const liToRemove = event.target.parentElement

        const titleToRemove = liToRemove.querySelector(`span`).textContent

        tasks = tasks.filter(t => t.title != titleToRemove)

        console.log(event.target.parentElement)

        toDoListUl.removeChild(liToRemove)
        localStorage.setItem(`tasks`, JSON.stringify(tasks))
    })


    li.appendChild(input)
    li.appendChild(span)
    li.appendChild(button)

    toDoListUl.appendChild(li)
}

window.onload = () => {
    const tasksOnLocalStorage = localStorage.getItem('tasks')
    if (!tasksOnLocalStorage) return

    tasks = JSON.parse(tasksOnLocalStorage)
    tasks.forEach(t => {
        renderTaskOnHtml(t.title, t.done)
    })

    console.log(tasksOnLocalStorage)
}

form.addEventListener('submit', (event) => {
    event.preventDefault() //Evita o comportamento padrão de recarregar página ao enviar formulário

    const taskTitle = taskTitleInput.value

    if (taskTitle.length < 3) {
        alert(`Necessário ao menos 3 caracteres`)
        return
    }

    tasks.push({
        title: taskTitle,
        done: false,
    }) 
    localStorage.setItem(`tasks`, JSON.stringify(tasks))

// Adiciona a nova tarefa no HTML
    renderTaskOnHtml(taskTitle)    


    taskTitleInput.value = ''

})
