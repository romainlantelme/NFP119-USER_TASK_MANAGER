import { FC } from 'react';
import { Routes, Route } from 'react-router-dom';

import './assets/App.css';

import Header from './components/header';
import NavBar from './components/navbar';
import Footer from './components/footer';

import Home from './pages/home';
import Users from './pages/users';
import Tasks from './pages/tasks';
import TasksUser from './pages/tasksUser';


const App: FC = () => {
    return (
        <div className='App'>
            <Header />
            <NavBar />
            <div className='routes'>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/getUsers' element={<Users />} />
                    <Route path='/getTasks' element={<Tasks />} />
                    <Route path='/users/:userID/getTasks' element={<TasksUser />} />
                </Routes>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    );
};

export default App