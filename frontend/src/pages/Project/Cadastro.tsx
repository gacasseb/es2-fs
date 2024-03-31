import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { create } from "../../services/api/Projetos/ProjetosService";
import {ReactComponent as Edit} from '../../assets/img/edit.svg';

import '../styles.css';

function CadastroProject() {

    const [project, setProject] = useState({});
    const [teams, setTeams] = useState([]);
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await create(project);
        if (response) {
            alert('Projeto cadastrado com sucesso!');
            navigate('/project');
        } else {
            alert('Erro ao cadastrar projeto!');
        }
    }
    
    const handleChange = (event: any) => {
        setProject({ ...project, [event.target.name]: event.target.value })
    }

    return (
        <div className="pages-form-register-container">
            <div className="pages-form-container">
            <div className="pages-card-bottom-container">
                <h3>Cadastro de Projeto</h3>
                <form className="pages-form" onSubmit={handleSubmit}>
                    <div className="form-group pages-form-group">
                        <label htmlFor="name">Nome do projeto</label>
                        <input name="name" className="form-control" id="project_name" onChange={handleChange} required/>
                        
                        <label htmlFor="client_name">Nome do cliente</label>
                        <input name="client_name" type="client_name" className="form-control" id="project_name" onChange={handleChange} required/>

                        <label htmlFor="goal">Objetivo do projeto</label>
                        <input name="goal" className="form-control" id="goal" onChange={handleChange} required/>

                        <label htmlFor="startDate">Data inicial</label>
                        <input name="startDate" type="date" className="form-control" id="startDate" onChange={handleChange} required/>

                        <label htmlFor="finalDate">Data final</label>
                        <input name="finalDate" type="date" className="form-control" id="finalDate" onChange={handleChange} required/>

                        <label htmlFor="price">Preço do projeto</label>
                        <input name="price" type="price" className="form-control" id="price" onChange={handleChange} required/>
                    </div>
                    <div className="pages-form-btn-container">
                        <button type="submit" className="btn btn-primary pages-btn">Salvar</button>
                    </div>
                </form >
                <Link to="/">
                    <button className="btn btn-primary pages-btn mt-3">Cancelar</button>
                </Link>
            </div >
            
        </div >
        <div className="pages-image-register-container">
                <Edit />
            </div>
        </div>
        
    )
}

export default CadastroProject;
