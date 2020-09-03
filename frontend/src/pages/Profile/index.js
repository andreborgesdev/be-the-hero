import React, { useState, useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiPower, FiTrash2 } from 'react-icons/fi';

import api from '../../services/api';

import './styles.css';

import logoImage from '../../assets/logo.svg';

export default function Profile() {
    const [incidents, setIncidents] = useState([]);

    const history = useHistory();

    const ongName = localStorage.getItem('ongName');
    const ongId = localStorage.getItem('ongId');

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data);
        })
    }, [ongId]);

    async function handleDeleteIncident(id) {
        try {
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            });

            setIncidents(incidents.filter(incident => incident.id != id));
        } catch (error) {
            alert('Error trying to delete case, try again.');
        }
    }

    function handleLogout() {
        localStorage.clear();
        history.push('/');
    }

    return (
        <div className="profile-container">
            <header>
                <img src={logoImage} alt="Be The Hero"/>
                <span>Welcome, {ongName}</span>

                <Link className="button" to="/incidents/new">Register a new case</Link>
                <button type="button" onClick={handleLogout}>
                    <FiPower size={18} color="#E02041" ></FiPower>
                </button>
            </header>

            <h1>Registered cases</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id} >
                        <strong>CASE:</strong>
                        <p>{incident.title}</p>
                        
                        <strong>DESCRIPTION:</strong>
                        <p>{incident.description}</p>

                        <strong>AMOUNT:</strong>
                        <p>{Intl.NumberFormat('pt-PT', { style: 'currency', currency: 'EUR' }).format(incident.value)}</p>

                        <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                            <FiTrash2 size={20} color="#a8a8b3" />
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}