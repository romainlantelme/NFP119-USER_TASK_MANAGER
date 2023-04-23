import { FC } from 'react';
import { Link } from 'react-router-dom';
import '../assets/navbar.css';

const NavBar: FC = () => {
    return (
        <div className='left-column'>
            <nav>
                <ul>
                    <h1>TASK MANAGER</h1>
                    <li>
                        <Link to='/'>
                            HOME
                        </Link>
                    </li>
                    <li>
                        <Link to='/getUsers'>
                            USERS
                        </Link>
                    </li>
                    <li>
                        <Link to='/getTasks'>
                            TASKS
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}

export default NavBar;