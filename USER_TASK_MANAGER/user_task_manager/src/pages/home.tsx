import { FC } from 'react';

const Home: FC = () => {
    return (
        <div className='right-column'>
            <h1>Home</h1>
            <p>A user task manager is a software tool that allows users to track and manage their daily tasks. It is a simple and efficient application that helps users organize their work and focus on the most important tasks.</p>
            <p>To view all users, click on the "USERS" navigation button. In this page you can add new users, view the tasks associated with each user or delete them.</p>
            <p>To view all the tasks present in the database, click on the button in the navigation bar "TASKS". You can delete them or all the tasks associated with the user of this same task.</p>
            <p>Finally to finish, when you are on the tasks of a single user, you can add, delete or modify the status of a task associated with the current user.</p>
        </div>
    );
}

export default Home;