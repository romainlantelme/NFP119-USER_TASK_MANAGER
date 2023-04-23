import { useState } from 'react';
import { addNewTask } from '../services/task.service';

import { Types } from 'mongoose';

interface Props {
    userID: string;
}

const TaskForm = (props: Props) => {
    const currentDate = new Date(Date.now());
    const [_id, set_id] = useState('');
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [carriedOut, setCarriedOut] = useState(false);
    const [startDate, setStartDate] = useState(currentDate.toISOString().substr(0, 10));
    const [estimatedDate, setEstimatedDate] = useState(new Date(currentDate.getTime() + (15 * 24 * 60 * 60 * 1000)).toISOString().substr(0, 10));
    const [endDate, setEndDate] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();
        
        const newTask = { _id, title, category, description, carriedOut, startDate: new Date(startDate), estimatedDate: new Date(estimatedDate), endDate: new Date(endDate), user: new Types.ObjectId(props.userID) };
        await addNewTask(newTask);

        set_id('');
        setTitle('');
        setCategory('');
        setDescription('');
        setCarriedOut(false);
        setStartDate('');
        setEstimatedDate('');
        setEndDate('');

        window.close();
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit}>
            * Title:
            <label htmlFor='title'>
                <input type='text' name='title' value={title} onChange={(changeEvent) => setTitle(changeEvent.target.value)} required />
            </label>
            * Category:
            <select name='category' value={category} onChange={(changeEvent) => setCategory(changeEvent.target.value)}>
                <option value='Undefind'>Undefined</option>
                <option value='Work'>WORK</option>
                <option value='Home'>HOME</option>
                <option value='Hobby'>HOBBY</option>
            </select>
            Description:
            <label htmlFor='description'>
                <input type='text' name='description' value={description} onChange={(changeEvent) => setDescription(changeEvent.target.value)} />
            </label>
            * Start Date:
            <label htmlFor='startDate'>
                <input type='date' name='startDate' value={startDate} onChange={(changeEvent) => setStartDate(changeEvent.target.value)} />
            </label>
            Estimated Date:
            <label htmlFor='estimatedDate'>
                <input type='date' name='estimatedDate' value={estimatedDate} onChange={(changeEvent) => setEstimatedDate(changeEvent.target.value)} />
            </label>
            <button type='submit'>SAVE</button>
        </form>
    );
}

export default TaskForm;