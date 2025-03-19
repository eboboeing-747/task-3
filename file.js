const fs = require('fs');
const file_path = 'tasks.json';

function readTaskById(file_name, taskId) {
    try {
        // Check if the file exists
        if (!fs.existsSync(file_name)) {
            console.log('File does not exist.');
            return null;
        }

        // Read and parse the file
        const fileContent = fs.readFileSync(file_name, 'utf8');
        const data = fileContent ? JSON.parse(fileContent) : {};

        // Check if the task exists
        if (!data[taskId]) {
            console.log(`Task with ID ${taskId} not found.`);
            return null;
        }

        // Return the task
        console.log(`Task with ID ${taskId}:`, data[taskId]);
        return data[taskId];
    } catch (error) {
        console.error('Error reading task:', error);
        return null;
    }
}

readTaskById('tasks.json', '3');

function readAllTasks(file_name) {
    try {
        // Check if the file exists
        if (!fs.existsSync(file_name)) {
            console.log('File does not exist.');
            return [];
        }

        // Read and parse the file
        const fileContent = fs.readFileSync(file_name, 'utf8');
        const data = fileContent ? JSON.parse(fileContent) : {};

        // Return all tasks as an array
        const tasks = Object.values(data);
        console.log('All tasks:', tasks);
        return tasks;
    } catch (error) {
        console.error('Error reading tasks:', error);
        return [];
    }
}

readAllTasks('tasks.json');

function removeTaskById(file_name, taskId) {
    try {
        // Read existing file
        if (!fs.existsSync(file_name)) {
            console.log('File does not exist.');
            return;
        }

        const fileContent = fs.readFileSync(file_name, 'utf8');
        let data = fileContent ? JSON.parse(fileContent) : {};

        // Check if task exists
        if (!data[taskId]) {
            console.log(`Task with ID ${taskId} not found.`);
            return;
        }

        // Remove the task
        delete data[taskId];

        // Write back the updated data
        fs.writeFileSync(file_name, JSON.stringify(data, null, 4), 'utf8');
        
        console.log(`Task with ID ${taskId} removed.`);
    } catch (error) {
        console.error('Error removing task:', error);
    }
}

removeTaskById('tasks.json', '1');

function addTask(file_name, task) {
    try {
        // Read existing file or initialize an empty object
        let data = {};
        if (fs.existsSync(file_name)) {
            const fileContent = fs.readFileSync(file_name, 'utf8');
            data = fileContent ? JSON.parse(fileContent) : {};
        }

        // Determine the next ID
        const nextId = Object.keys(data).length ? Math.max(...Object.keys(data).map(Number)) + 1 : 1;

        // Add new task
        data[nextId] = task;

        // Write back to file
        fs.writeFileSync(file_name, JSON.stringify(data, null, 4), 'utf8');
        
        console.log(`Task added with ID: ${nextId}`);
    } catch (error) {
        console.error('Error writing to file:', error);
    }
}

const newTask = { title: "Finish project", completed: false };
addTask('tasks.json', newTask);
