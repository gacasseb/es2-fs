import axios, { AxiosRequestConfig } from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { getAll } from 'services/api/Membros/MembrosService';
import '../styles.css';
import MemberList from 'components/MemberList';

function Member() {

    const [membros, setMembros] = useState([]);
    const navigate = useNavigate();

    const getMembros = async () => {
        const response = await getAll();
        if (!response) return;
        setMembros(response.data);
    }

    useEffect(() => {
        getMembros();
    }, [])


    return (

        <div className="pages-form-class-container">
            <div className="pages-card-bottom-container">
                <button onClick={() => navigate('/member/register')} className="btn btn-primary pages-btn">
                    Cadastrar membro
                </button>
                <br />
                <MemberList members={membros} />
            </div >
        </div >

    )
}

export default Member;