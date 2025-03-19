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

// readTaskById('tasks.json', '3');

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

// readAllTasks('tasks.json');

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

// removeTaskById('tasks.json', '1');

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

// addTask('tasks.json', newTask);

function updateTaskById(file_name, taskId, updatedTask) {
    try {
        // Check if the file exists
        if (!fs.existsSync(file_name)) {
            console.log('File does not exist.');
            return;
        }

        // Read and parse the file
        const fileContent = fs.readFileSync(file_name, 'utf8');
        let data = fileContent ? JSON.parse(fileContent) : {};

        // Check if the task exists
        if (!data[taskId]) {
            console.log(`Task with ID ${taskId} not found.`);
            return;
        }

        // Update the task
        data[taskId] = { ...data[taskId], ...updatedTask };

        // Write back the updated data
        fs.writeFileSync(file_name, JSON.stringify(data, null, 4), 'utf8');

        console.log(`Task with ID ${taskId} updated.`);
    } catch (error) {
        console.error('Error updating task:', error);
    }
}



const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

// Swagger документация
const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Task Management API',
            version: '1.0.0',
            description: 'API для управления задачами',
        },
        servers: [
            {
                url: 'http://localhost:3000',
            },
        ],
    },
    apis: ['openapi.yaml'], // укажите путь к файлам с аннотациями
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Middleware для парсинга JSON
app.use(bodyParser.json());

// Получить список задач
app.get('/tasks', (req, res) => {
    let tasks = readAllTasks(file_path);
    res.json(tasks);
});

// Создать новую задачу
app.post('/tasks', (req, res) => {
    const { title, completed } = req.body;
    const newTask = { title: title, completed: completed || false };

    addTask(file_path, newTask);
    res.status(201).json(newTask);
});

// Получить задачу по ID
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = readTaskById(file_path, taskId);
    if (task) {
        res.json(task);
    } else {
        res.status(404).json({ message: 'Task not found' });
    }
});

// Обновить задачу по ID
app.put('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const { title, completed } = req.body;
    const newTask = { title: title, completed: completed || false };
    updateTaskById(file_path, taskId, newTask);
    res.status(200).send();
});

// Удалить задачу по ID
app.delete('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    removeTaskById(file_path, taskId);
    res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:", PORT);
});
