import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId');

    async function handleNewIncident(e) {
        e.preventDefault();

        const data = {
            title,
            description,
            value
        };

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            });

            history.push('/profile');
        } catch (error) {
            alert('Error trying to register a case, try again');
        }
    }

    return (
        <div className="new-incident-container">
        <div className="content">
            <section>
                <img src={logoImage} alt="Be The Hero"/>

                <h1>Register a new case</h1>
                <p>Describe the case with details to find an hero to solve it.</p>

                <Link className="back-link" to="/profile">
                    <FiArrowLeft size={16} color="#E02041" />
                    Home
                </Link> 
            </section>

            <form onSubmit={handleNewIncident}>
                <input type="text" placeholder="Case title" value={title} onChange={e => setTitle(e.target.value)} />
                <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)}></textarea>
                <input type="text" placeholder="Value" value={value} onChange={e => setValue(e.target.value)} />

                <button className="button" type="submit">Register</button>
            </form>
        </div>
        </div>
    );
}