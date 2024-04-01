import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { updateById, getById } from 'services/api/Times/TimesService';
import { getAll } from 'services/api/Projetos/ProjetosService';

import '../styles.css';

function UpdateTeam() {

    const navigate = useNavigate();

    const [time, setTime] = useState<any>({
        name: '',
        ProjectId: ''
    });
    const [projetos, setProjetos] = useState([]);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = window.location.pathname.split('/').pop();
        if (!id) return;
        const response = await updateById(+id, {
            name: time.name,
            project: time.ProjectId
        });
        if (response) {
            alert('Time atualizado com sucesso!');
            navigate('/team');
        } else {
            alert('Erro ao cadastrar time!');
        }
    }

    const handleChange = (event: any) => {
        setTime({ ...time, [event.target.name]: event.target.value })
    }

    const getProjetos = async () => {
        const response = await getAll();
        if (!response) return;
        setProjetos(response.data.map((project: any) => ({ name: project.name, id: project.id })))
    }

    const getProjectList = () => {
        if (projetos.length === 0) return <option value="">Nenhum projeto cadastrado</option>

        let options = [<option value="" key={0}>Selecione um projeto</option>]
        projetos.map((project: any) => options.push(<option key={project.id} value={project.id}>{project.name}</option>))
        return options
    }


    const getTeam = async (id: string) => {
        const team = await getById(+id);
        if (!team) return;
        setTime({
            ...team,
            ProjectId: team.ProjectId || ''
        });
    }

    useEffect(() => {
        getProjetos();
        const id = window.location.pathname.split('/').pop();
        if (id) {
            getTeam(id);
        }
    }, [])

    const { name, ProjectId } = time;

    return (
        <div className="pages-form-container">
            <div className="pages-card-bottom-container">
                <h3>Atualização de Time</h3>
                <form className="pages-form" onSubmit={handleSubmit}>
                    <div className="form-group pages-form-group">
                        <label htmlFor="teamName">Informe o nome do time</label>
                        <input name="name" className="form-control" id="teamName" onChange={handleChange} value={name} />
                        <label htmlFor="project_id">Projeto</label>
                        <select name="ProjectId" onChange={handleChange} value={ProjectId}>
                            {getProjectList()}
                        </select>
                    </div>
                    <div className="pages-form-btn-container">
                        <button type="submit" className="btn btn-primary pages-btn">Salvar</button>
                    </div>
                </form >
                <Link to="/team">
                    <button className="btn btn-primary pages-btn mt-3">Cancelar</button>
                </Link>
            </div >
        </div >
    )
}

export default UpdateTeam;