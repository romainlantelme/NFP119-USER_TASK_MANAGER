import { FC } from 'react';
import { useParams } from 'react-router-dom';
import ListTasksUser from '../components/listTasksUser';

const TasksUser: FC = () => {
    const { userID } = useParams();

    return (
        <div className='right-column'>
            <h1>List of All Tasks User</h1>
            {userID && <ListTasksUser userID={userID} />}
        </div>
    );
}

export default TasksUser;