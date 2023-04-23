import {FC } from 'react';

import ListUsers from '../components/listUsers';

const Users: FC = () => {
    return (
        <div className='right-column'>
            <h1>List of All Users</h1>
            <ListUsers />
        </div>
    );
}

export default Users;