import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi'

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function Register() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [whatsapp, setContact] = useState('');
    const [city, setCity] = useState('');
    const [uf, setCountry] = useState('');

    const history = useHistory();

    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        };

        console.log(data);

        try {
            const response = await api.post('ongs', data);

            alert(`Your access ID: ${response.data.id}`);

            history.push('/');
        } catch (error) {
            alert('There was an error trying to register a new NGO!');
        }
    }

    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImage} alt="Be The Hero"/>

                    <h1>Register</h1>
                    <p>Make your registration, access the platform and help people find new cases of your NGO.</p>

                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#E02041" />
                        I don't have an account
                    </Link> 
                </section>

                <form onSubmit={handleRegister}>
                    <input type="text" placeholder="NGO name" 
                    value={name} onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail" 
                    value={email} onChange={e => setEmail(e.target.value)} />
                    <input type="text" placeholder="Contact" 
                    value={whatsapp} onChange={e => setContact(e.target.value)} />
                    <div className="input-group">
                        <input type="text" placeholder="City" 
                        value={city} onChange={e => setCity(e.target.value)} />
                        <input type="text" placeholder="Ctr" style={{ width: 80 }} 
                        value={uf} onChange={e => setCountry(e.target.value)} />
                    </div>

                    <button className="button" type="submit">Register</button>
                </form>
            </div>
        </div>
    );
}