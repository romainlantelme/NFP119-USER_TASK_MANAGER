import Modal from './modal';
import Task from '../types/task';
import TaskForm from './taskForm';

import { Link } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { deleteTaskByID, getAllTasksByUserID, updateTaskByID } from '../services/task.service';
import { BsFillTrashFill } from 'react-icons/bs';



interface Props {
    userID: string;
}

const ListTasksUser: FC<Props> = (props: Props) => {
    const [isPseudoDisplayed, setIsPseudoDisplayed] = useState(false); 
    const [tasksUser, setTasksUser] = useState<Task[]>([]);
    const [isOpenForm, setOpenForm] = useState(false);
    const [refresh, setRefresh] = useState(0);
    const [pseudo, setPseudo] = useState('');

    useEffect(() => {
        const getTasksUser = async (userID: any) => {
            const tasksUser: Task[] = await getAllTasksByUserID(userID);
            setTasksUser(tasksUser);
        }
        getTasksUser(props.userID);
    }, [refresh]);

    useEffect(() => {
        if (!isPseudoDisplayed && tasksUser.length > 0) {
            setPseudo(tasksUser[0].user.pseudo);
            setIsPseudoDisplayed(true);
        }
    }, [tasksUser, isPseudoDisplayed]);

    const deleteTask = async(task: Task) => {
        await deleteTaskByID(task);
        setRefresh(refresh + 1);
    }

    const editTask = async (task: Task) => {
        const carriedOut = !task.carriedOut;
        const endDate = carriedOut && task.endDate === null ? new Date() : '';
        const updatedTask: Task = { ...task, carriedOut: !task.carriedOut, endDate: new Date(endDate) };
        await updateTaskByID(task._id, updatedTask);
        setRefresh(refresh + 1);
    }

    return (
        <div>
            {isPseudoDisplayed && <h2>{pseudo}</h2>}
            {tasksUser.length > 0 ? (
            <table className='test'>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Carried Out</th>
                        <th>Start</th>
                        <th>Estimated</th>
                        <th>End</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tasksUser?.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.title}</td>
                                <td>{val.category}</td>
                                <td>{val.description}</td>
                                <td><input className='checkbox' type='checkbox' checked={val.carriedOut} onClick={ () => editTask(val)} /></td>
                                <td>{new Date(val.startDate).toLocaleDateString('fr-FR')}</td>
                                <td>{new Date(val.estimatedDate).toLocaleDateString('fr-FR')}</td>
                                <td>{val.endDate ? new Date(val.endDate).toLocaleDateString('fr-FR') : ''}</td>
                                <td><Link to='' onClick={() => deleteTask(val)}><BsFillTrashFill /></Link></td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
            ) : (
                <p>No task is specified!</p>
            )}
            <button className='add' onClick={() => setOpenForm(true)}>ADD TASK</button>
            <Modal
                isOpen={isOpenForm}
                onClose={() => setOpenForm(false)}
                title='ADD NEW TASK'
                content={props.userID && <TaskForm userID={props.userID} />}
            />
        </div>
    );
}

export default ListTasksUser;