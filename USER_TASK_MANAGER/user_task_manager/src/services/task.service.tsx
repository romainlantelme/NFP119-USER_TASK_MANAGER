import Task from '../types/task';

export const addNewTask = async (task: Task) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
    }

    try {
        const response = await fetch('http://localhost:8080/addTask', requestOptions);
        const taskAdd = await response.json();
        
        return taskAdd;
    } catch (err) {
        console.log(err);
    }
}

export const deleteTaskByID = async (task: Task) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = await fetch('http://localhost:8080/deleteTask/' + task._id, requestOptions);
        const taskDelete = await response.json();

        return taskDelete;
    } catch (err) {
        console.log(err);
    }
}

export const deleteAllTasksByUserID = async (userID: any) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        const response = await fetch('http://localhost:8080/user/' + userID + '/deleteTasks', requestOptions);
        const tasksDelete = await response.json();

        return tasksDelete;
    } catch (err) {
        console.log(err);
    }
};

export const getAllTasks = async () => {
    try {
        const response = await fetch('http://localhost:8080/getTasks');
        const tasks = await response.json();

        return tasks;
    } catch (err) {
        console.log(err);
    }
};

export const getAllTasksByUserID = async (userID: any) => {
    try {
        const response = await fetch('http://localhost:8080/user/' + userID + '/getTasks');
        const task = await response.json();

        return task;
    } catch (err) {
        console.log(err);
    }
}

export const updateTaskByID = async (taskID: any, task: Task) => {
    const requestOptions = {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(task)
    };
  
    try {
      const response = await fetch('http://localhost:8080/updateTask/' + taskID, requestOptions);
      const updatedTask = await response.json();
  
      return updatedTask;
    } catch (error) {
      console.error('Error updating task:', error);
      throw new Error('An error occurred while updating the task.');
    }
  }
  