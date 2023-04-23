import User from '../types/user';
import { deleteAllTasksByUserID } from './task.service';

export const addNewUser = async (user: User) => {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    }

    try {
        const response = await fetch('http://localhost:8080/addUser', requestOptions);
        const userAdd = await response.json();

        return userAdd;
    } catch (err) {
        console.log(err);
    }
}

export const deleteUserByID = async (user: User) => {
    const requestOptions = {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    };

    try {
        deleteAllTasksByUserID(user._id);

        const response = await fetch('http://localhost:8080/deleteUser/' + user._id, requestOptions);
        const userDelete = await response.json();

        return userDelete;
    } catch (err) {
        console.log(err);
    }
}

export const getAllUsers = async () => {
    try {
        const response = await fetch('http://localhost:8080/getUsers');
        const users = await response.json();

        return users;
    } catch (err) {
        console.log(err);
    }
}