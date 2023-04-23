
import { Link } from 'react-router-dom';
import { FC, useEffect, useState } from 'react';
import { deleteTaskByID, getAllTasks } from '../services/task.service';
import { BsFillEyeFill, BsFillTrashFill } from 'react-icons/bs';

import Task from '../types/task';

const ListTasks: FC = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [refresh, setRefresh] = useState(0);

    useEffect(() => {
        const getTasks = async () => {
            const tasks: Task[] = await getAllTasks();
            setTasks(tasks);
        } 
        getTasks();
    }, [refresh]);

    const deleteTask = async (task: Task) => {
        await deleteTaskByID(task);
        setRefresh(refresh + 1);
    }

    return (
        <div>
            {tasks.length > 0 ? (
            <table>
                <thead>
                    <tr>
                        <th>User</th>
                        <th>Title</th>
                        <th>Category</th>
                        <th>Description</th>
                        <th>Carried Out</th>
                        <th>Start</th>
                        <th>Estimated</th>
                        <th>End</th>
                        <th>See</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {tasks?.map((val, key) => {
                        return (
                            <tr key={key}>
                                <td>{val.user.pseudo}</td>
                                <td>{val.title}</td>
                                <td>{val.category}</td>
                                <td>{val.description}</td>
                                <td><input className='checkbox' type='checkbox' checked={val.carriedOut} readOnly /></td>
                                <td>{new Date(val.startDate).toLocaleDateString('fr-FR')}</td>
                                <td>{new Date(val.estimatedDate).toLocaleDateString('fr-FR')}</td>
                                <td>{val.endDate ? new Date(val.endDate).toLocaleDateString('fr-FR') : ''}</td>
                                <td><Link to={'/users/' + val.user._id + '/getTasks'}><BsFillEyeFill /></Link></td>
                                <td><Link to='' onClick={() => deleteTask(val)}><BsFillTrashFill /></Link></td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            ) : (
                <p>No task is specified!</p>
            )}
        </div>

    );
}

export default ListTasks;