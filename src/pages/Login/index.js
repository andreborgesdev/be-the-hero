import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css'

import logoImage from '../../assets/logo.svg';
import heroesImage from '../../assets/heroes.png';

export default function Login() {
    const [id, setId] = useState('');
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault();

        try {
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('profile');
        } catch (error) {
            alert('Login failed, try again!');
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImage} alt="Be The Hero"/>

                <form onSubmit={handleLogin}>
                    <h1>Make your login</h1>

                    <input type="text" placeholder="Your ID"
                        value={id} onChange={e => setId(e.target.value)} />
                    <button className="button" type="submit">Login</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#E02041" />
                        I don't have an account
                    </Link>
                </form>
            </section>

            <img src={heroesImage} alt="Heroes"/>
        </div>
    );
}