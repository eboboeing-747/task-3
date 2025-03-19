
const fs = require('fs');

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

// Example usage
const updatedTask = { title: "Updated Task Title", completed: true };
updateTaskById('tasks.json', '4', updatedTask);
