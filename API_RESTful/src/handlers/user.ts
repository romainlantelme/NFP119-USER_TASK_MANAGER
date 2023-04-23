import mongoose from 'mongoose'; // Importation de la bibliothèque mongoose
import { Request, Response } from "express"; // Importation de la bibliothèque express pour les types Request et Response
import { IUser, User } from "../models/user"; // Importation du modèle User depuis le fichier user.ts dans le dossier models

// Cette fonction asynchrone ajoute un nouvel utilisateur à une base de données MongoDB
export const addUser = async (req: Request, res: Response) => {
    try {
        // On extrait les données de la requête
        const { email, pseudo, firstName, surname } = req.body;

        // On vérifie que l'email et le pseudo sont bien présents dans la requête
        if (!email || !pseudo) {
            return res.status(400).json({ message: 'Email and username are required.' });
        }

        // On vérifie que l'utilisateur n'existe pas déjà dans la base de données
        const existingUser = await User.findOne({ $or: [{ email }, { pseudo }] });
        if (existingUser) {
            return res.status(400).json({ message: 'The user already exists.' });
        }

        // On crée un nouvel utilisateur avec les données de la requête
        const newUser = new User({ email, pseudo, firstName, surname });

        // On enregistre le nouvel utilisateur dans la base de données
        const savedUser = await newUser.save();

        // On envoie une réponse JSON avec un message de confirmation et l'utilisateur nouvellement ajouté
        res.status(201).json({ message: 'User added successfully.', user: savedUser });
    } catch (error) {
        // Si une erreur se produit, on affiche un message d'erreur dans la console et on envoie une réponse avec un code d'erreur 500
        console.error('Error adding user:', error);
        res.status(500).json({ message: 'An error occurred while adding the user.' });
    }
};

// Cette fonction asynchrone supprime un utilisateur de la base de données MongoDB en utilisant son ID
export const deleteUserByID = async (req: Request, res: Response) => {
    try {
        // On récupère l'ID de l'utilisateur depuis les paramètres de la requête
        const userID = req.params.userID;

        // On vérifie que l'ID est valide
        if (!mongoose.Types.ObjectId.isValid(userID)) {
            return res.status(400).json({ message: 'Invalid user ID.' });
        }

        // On cherche l'utilisateur dans la base de données et on le supprime
        const deletedUser = await User.findByIdAndDelete(userID);

        // Si l'utilisateur n'existe pas, on envoie une réponse avec un code d'erreur 404
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found.' });
        }

        // On envoie une réponse avec un message de confirmation
        res.status(200).json({ message: 'User deleted successfully.' });
    } catch (error) {
        // Si une erreur se produit, on affiche un message d'erreur dans la console et on envoie une réponse avec un code d'erreur 500
        console.error('Error deleting user:', error);
        res.status(500).json({ message: 'An error occurred while deleting the user.' });
    }
};


// Cette fonction asynchrone récupère tous les utilisateurs de la base de données MongoDB
export const getAllUsers = async (req: Request, res: Response) => {
    try {
        // On récupère tous les utilisateurs de la base de données
        const users: IUser[] = await User.find();

        // Si des utilisateurs sont trouvés, on envoie une réponse avec un code de succès 200 et la liste des utilisateurs
        // Sinon, on envoie une réponse avec un code d'erreur 404 et un message indiquant que les utilisateurs n'ont pas été trouvés
        users ? res.status(200).json(users) : res.status(404).json({ message: "Users not found." });
    } catch (error) {
        // Si une erreur se produit, on affiche un message d'erreur dans la console et on envoie une réponse avec un code d'erreur 500
        console.error('Error retrieving users:', error);
        res.status(500).json({ message: 'An error occurred while retrieving users.' });
    }
};
