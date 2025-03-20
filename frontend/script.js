function addElement()
{
    let task_list = document.getElementById('task-list');
    let new_element = document.createElement('li');
    var text = document.createTextNode('text');

    new_element.appendChild(text);
    task_list.appendChild(new_element);
}

function addTask(id, title, contents)
{
    let task_list = document.getElementById('task-list');

    let new_task = document.createElement('li');
    new_task.setAttribute('id', id);
    let new_task_title = document.createElement('a');
    new_task_title.textContent=title;
    let new_brake = document.createElement('br');
    let new_task_contents = document.createElement('a')
    new_task_contents.textContent=contents;

    new_task.appendChild(new_task_title);
    new_task.appendChild(new_brake);
    new_task.appendChild(new_task_contents);

    task_list.appendChild(new_task);
}

const fetchButton = document.getElementById('fetch');
fetchButton.addEventListener('click', fetchTasks, true);

async function makeRequest(method, URL) {
    try {
        const response = await fetch(URL, {
            method: method,
            headers: {
                'Content-Type': 'application/json'
            }
        });
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        return await response.json();
    } catch (error) {
        console.error('Error:', error);
        return null;
    }
}

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, true); // false for synchronous request
    xmlHttp.responseType = "json";
    xmlHttp.send( null );
    return xmlHttp.response;
}

function fetchTasks() {
    let tasks = makeRequest('GET', 'http://localhost:3000/tasks')
        .then(tasks => {
            console.log(tasks);

            for (let i = 0; i < tasks.length; i++)
            {
                addTask(i.toString(), tasks[i].title, tasks[i].completed);
            }
        })
}
