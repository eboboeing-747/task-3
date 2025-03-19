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

var el = document.getElementById('test');
el.addEventListener('click', handleClick, true);

function httpGet(theUrl)
{
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", theUrl, false ); // false for synchronous request
    xmlHttp.send( null );
    return xmlHttp.responseText;
}

function handleClick() {
    console.log(httpGet('https://localhost:7071/Interface/GetAllInterfaces'));
}