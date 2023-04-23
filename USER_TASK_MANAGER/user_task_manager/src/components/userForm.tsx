import { useState } from 'react';
import { addNewUser } from '../services/user.service';

const UserForm = () => {
    const [_id, set_id] = useState('');
    const [email, setEmail] = useState('');
    const [pseudo, setPseudo] = useState('');
    const [firstName, setFirstName] = useState('');
    const [surname, setSurname] = useState('');

    const handleSubmit = async (event: any) => {
        event.preventDefault();

        const newUser = { _id, email, pseudo, firstName, surname };
        await addNewUser(newUser);

        set_id('');
        setEmail('');
        setPseudo('');
        setFirstName('');
        setSurname('');

        window.close();
        window.location.reload();
    }

    return (
        <form onSubmit={handleSubmit}>
            * Email:
            <label htmlFor='email'>
                <input type='email' placeholder='Email' name='email' value={email} onChange={(changeEvent) => setEmail(changeEvent.target.value)} required />
            </label>
            * Pseudo: 
            <label htmlFor='pseudo'>
                <input type='text' placeholder='Pseudo' name='pseudo' value={pseudo} onChange={(changeEvent) => setPseudo(changeEvent.target.value)} required />
            </label>
            First name: 
            <label htmlFor='firstName'>
                <input type='text' placeholder='First Name' name='firstName' value={firstName} onChange={(changeEvent) => setFirstName(changeEvent.target.value)} />
            </label>
            Surname: 
            <label htmlFor='surname'>
                <input type='text' placeholder='Surname' name='surname' value={surname} onChange={(changeEvent) => setSurname(changeEvent.target.value)} />
            </label>
            <button type='submit'>SAVE</button>
        </form>
    );
}

export default UserForm;