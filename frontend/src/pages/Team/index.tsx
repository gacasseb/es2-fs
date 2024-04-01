import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAll } from 'services/api/Times/TimesService';
import '../styles.css';
import TeamList from 'components/TeamList';


function Team() {

    const navigate = useNavigate();
    const [teams, setTeams] = useState([]);

    const getTeams = async () => {
        const response = await getAll();
        if (!response) return;
        setTeams(response.data);
    }

    useEffect(() => {
        getTeams();
    }, []);

    return (

        <div className="pages-form-class-container">
            <div className="pages-card-bottom-container">
                <button onClick={() => navigate('/team/register')} className="btn btn-primary pages-btn">
                    Cadastrar time
                </button>
                <br />
                <TeamList teams={teams} />
            </div >
        </div >

    )
}

export default Team;