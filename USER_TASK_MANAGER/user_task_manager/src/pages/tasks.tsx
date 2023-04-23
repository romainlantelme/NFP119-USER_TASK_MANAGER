import { FC } from 'react';

import ListTasks from '../components/listTasks';

const Tasks: FC = () => {
    return (
        <div className='right-column'>
            <h1>List of All Users Tasks</h1>
            <ListTasks />
        </div>
    );
};

export default Tasks;