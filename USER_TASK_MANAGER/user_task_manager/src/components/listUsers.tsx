import Modal from './modal';
import UserForm from './userForm';
import { Link } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { deleteUserByID, getAllUsers } from '../services/user.service';
import { BsFillEyeFill, BsFillTrashFill } from 'react-icons/bs';

import User from '../types/user';

const ListUsers: FC = () => {
    const [isOpenForm, setOpenForm] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const getUsers = async () => {
            const users: User[] = await getAllUsers();
            console.log(users);
            setUsers(users);
        }
        getUsers();
    }, [refresh]);

    const deleteUser = async (user: User) => {
        await deleteUserByID(user);
        setRefresh(refresh + 1);
    }

    return (
        <div>
            {users.length > 0 ? (
                <table>
                    <thead>
                        <tr>
                            <th>Pseudo</th>
                            <th>First Name</th>
                            <th>Surname</th>
                            <th>Email</th>
                            <th>See</th>
                            <th>Delete</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users?.map((val, key) => {
                            return (
                                <tr key={key}>
                                    <td>{val.pseudo}</td>
                                    <td>{val.firstName}</td>
                                    <td>{val.surname}</td>
                                    <td>{val.email}</td>
                                    <td><Link to={'/users/' + val._id + '/getTasks'}><BsFillEyeFill /></Link></td>
                                    <td><Link to='' onClick={() => deleteUser(val)}><BsFillTrashFill /></Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            ) : (
                <p>No user is specified!</p>
            )}
            <button className='add' onClick={() => setOpenForm(true)}>ADD USER</button>
            <Modal
                isOpen={isOpenForm}
                onClose={() => setOpenForm(false)}
                title='ADD NEW USER'
                content={<UserForm />}
            />
        </div>
    );
};

export default ListUsers;