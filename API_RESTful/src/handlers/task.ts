import mongoose from 'mongoose'; // Importation de la bibliothèque mongoose
import { Request, Response } from "express"; // Importation de la bibliothèque express pour les types Request et Response
import { ITask, Task } from "../models/task"; // Importation du modèle User depuis le fichier task.ts dans le dossier models

// Ajouter une tâche à la base de données
export const addTask = async (req: Request, res: Response) => {
  try {
    // Extraire les données de la requête
    const { title, category, description, carriedOut, startDate, estimatedDate, endDate, user } = req.body;

    // Vérifier que les champs obligatoires sont renseignés
    if (!title || !category || !user) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }

    // Créer une nouvelle tâche et l'enregistrer dans la base de données
    const newTask = new Task({ title, category, description, carriedOut, startDate, estimatedDate, endDate, user });
    const savedTask = await newTask.save();

    // Renvoyer la tâche ajoutée avec un code 201
    res.status(201).json({ message: 'Task added successfully.', task: savedTask });
  } catch (error) {
    // Gérer les erreurs en renvoyant une réponse avec un code 500
    console.error('Error adding task:', error);
    res.status(500).json({ message: 'An error occurred while adding the task.' });
  }
};


// Supprimer une tâche à partir de son ID
export const deleteTaskByID = async (req: Request, res: Response) => {
  try {
    // Extraire l'ID de la tâche à supprimer de la requête
    const taskID = req.params.taskID;

    // Vérifier si l'ID de la tâche est valide
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
      return res.status(400).json({ message: 'Invalid task id.' });
    }

    // Trouver et supprimer la tâche correspondante
    const deletedTask = await Task.findByIdAndDelete(taskID);

    // Gérer le cas où la tâche n'a pas été trouvée
    if (!deletedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Renvoyer une réponse avec un code 200 si la tâche a été supprimée avec succès
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    // Gérer les erreurs en renvoyant une réponse avec un code 500
    console.error('Error deleting task:', error);
    res.status(500).json({ message: 'An error occurred while deleting the task.' });
  }
};

// Supprimer toutes les tâches associées à un utilisateur à partir de son ID
export const deleteAllTasksByUserID = async (req: Request, res: Response) => {
  try {
    // Extraire l'ID de l'utilisateur de la requête
    const userID = req.params.userID;

    // Vérifier si l'ID de l'utilisateur est valide
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid user id.' });
    }

    // Trouver et supprimer toutes les tâches associées à l'utilisateur
    const deletedTasks = await Task.deleteMany({ user: userID });

    // Gérer le cas où aucune tâche n'a été trouvée pour l'utilisateur
    if (deletedTasks.deletedCount === 0) {
      return res.status(404).json({ message: 'No tasks found for the given user.' });
    }

    // Renvoyer une réponse avec un code 200 si les tâches ont été supprimées avec succès
    res.status(200).json({ message: 'Tasks deleted successfully.' });
  } catch (error) {
    // Gérer les erreurs en renvoyant une réponse avec un code 500
    console.error('Error deleting tasks:', error);
    res.status(500).json({ message: 'An error occurred while deleting tasks.' });
  }
};

// Récupérer toutes les tâches
export const getAllTasks = async (req: Request, res: Response) => {
  try {
    // Trouver toutes les tâches et les associer à l'utilisateur correspondant
    const tasks: ITask[] = await Task.find().populate('user');

    // Gérer le cas où aucune tâche n'a été trouvée
    tasks ? res.status(200).json(tasks) : res.status(404).json({ message: 'Tasks not found.' });
  } catch (error) {
    // Gérer les erreurs en renvoyant une réponse avec un code 500
    console.error('Error retrieving all tasks:', error);
    res.status(500).json({ message: 'An error occurred while retrieving tasks.' });
  }
};

// Récupérer toutes les tâches associées à un utilisateur
export const getAllTasksByUserID = async (req: Request, res: Response) => {
  try {
    // Récupérer l'ID de l'utilisateur à partir des paramètres de la requête
    const userID = req.params.userID;

    // Vérifier si l'ID de l'utilisateur est valide
    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({ message: 'Invalid User ID.' });
    }

    // Trouver toutes les tâches associées à l'utilisateur et les associer à l'utilisateur correspondant
    const tasksUser: ITask[] = await Task.find({ user: userID }).populate('user');

    // Gérer le cas où aucune tâche n'a été trouvée
    tasksUser ? res.status(200).json(tasksUser) : res.status(404).json({ message: 'Tasks not found.' });
  } catch (error) {
    // Gérer les erreurs en renvoyant une réponse avec un code 500
    console.error('Error while retrieving tasks associated with the user:', error);
    res.status(500).json({ message: 'An error occurred while retrieving tasks associated with the user.' });
  }
};

// Met à jour une tâche par ID
export const updateTaskByID = async (req: Request, res: Response) => {
  try {
    const taskID = req.params.taskID;

    // Vérifie si l'ID de la tâche est valide
    if (!mongoose.Types.ObjectId.isValid(taskID)) {
      return res.status(400).json({ message: 'Invalid task id.' });
    }

    // Récupère les nouvelles informations de la tâche à partir du corps de la requête
    const { title, category, description, carriedOut, startDate, estimatedDate, endDate } = req.body;

    // Met à jour la tâche avec les nouvelles informations
    const updatedTask = await Task.findByIdAndUpdate(taskID, { title, category, description, carriedOut, startDate, estimatedDate, endDate }, { new: true });

    // Vérifie si la tâche a été mise à jour
    if (!updatedTask) {
      return res.status(404).json({ message: 'Task not found.' });
    }

    // Retourne un message de succès et la tâche mise à jour
    res.status(200).json({ message: 'Task updated successfully.', task: updatedTask });
  } catch (error) {
    // Gère les erreurs et retourne un message d'erreur
    console.error('Error updating task:', error);
    res.status(500).json({ message: 'An error occurred while updating the task.' });
  }
};