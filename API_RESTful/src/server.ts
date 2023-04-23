// Import des modules et fonctions nécessaires
import { connect } from 'mongoose';
import express, { Application } from 'express';
import { addUser, deleteUserByID, getAllUsers } from './handlers/user';
import { addTask, deleteTaskByID, deleteAllTasksByUserID, getAllTasksByUserID, getAllTasks, updateTaskByID } from './handlers/task';

// Configuration du port et de l'application Express
const port: number = 8080;
const app: Application = express();

// Configuration de l'application Express pour utiliser JSON et CORS
app.use(express.json());
app.use(require('cors')());

// Définition des routes pour les utilisateurs et les tâches
app.get('/getUsers', getAllUsers);
app.post('/addUser', addUser);
app.delete('/deleteUser/:userID', deleteUserByID);

app.get('/user/:userID/getTasks', getAllTasksByUserID);
app.get('/getTasks', getAllTasks);
app.put('/updateTask/:taskID', updateTaskByID);
app.post('/addTask', addTask);
app.delete('/deleteTask/:taskID', deleteTaskByID);
app.delete('/user/:userID/deleteTasks', deleteAllTasksByUserID);

// Connexion à la base de données MongoDB
const dbConnect = async (): Promise<void> => {
    const uri: string = 'mongodb+srv://Romain:ABC123def456@usertaskmanager.fpstpmt.mongodb.net/UserTaskManager?retryWrites=true&w=majority';

    try {
        await connect(uri);
        console.log('MongoDB connected!');
    } catch (err) {
        console.error('Error connecting to database: ', err);
    }
}

// Démarrage du serveur Express
app.listen(port, async () => {
    await dbConnect();
    console.log('Server listening on port: ', port);
});
