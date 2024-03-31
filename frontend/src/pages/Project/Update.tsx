import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import { updateById, getById } from "../../services/api/Projetos/ProjetosService";

import '../styles.css';

function UpdateProject() {

    const [project, setProject] = useState<any>({ name: '', client_name: '', goal: '', startDate: '', finalDate: '', price: '' });
    const navigate = useNavigate();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const id = window.location.pathname.split('/').pop();
        if (!id) return;
        const response = await updateById(+id, project);
        if (response) {
            alert('Projeto atualizado com sucesso!');
            navigate('/project');
        } else {
            alert('Erro ao cadastrar projeto!');
        }
    }

    const handleChange = (event: any) => {
        setProject({ ...project, [event.target.name]: event.target.value })
    }

    const getProject = async () => {
        const id = window.location.pathname.split('/').pop();
        if (!id) return;
        const response = await getById(+id);
        if (!response) return;
        setProject({
            ...response,
            startDate: response.startDate.split('T')[0],
            finalDate: response.finalDate.split('T')[0]
        });
    }

    useEffect(() => {
        getProject();
    }, [])

    const { name, client_name, goal, startDate, finalDate, price } = project

    return (
        <div className="pages-form-container">
            <div className="pages-card-bottom-container">
                <h3>Atualização de Projeto</h3>
                <form className="pages-form" onSubmit={handleSubmit}>
                    <div className="form-group pages-form-group">
                        <label htmlFor="name">Nome do projeto</label>
                        <input name="name" className="form-control" id="project_name" onChange={handleChange} required value={name} />

                        <label htmlFor="client_name">Nome do cliente</label>
                        <input name="client_name" type="client_name" className="form-control" id="project_name" onChange={handleChange} required value={client_name} />

                        <label htmlFor="goal">Objetivo do projeto</label>
                        <input name="goal" className="form-control" id="goal" onChange={handleChange} required value={goal} />

                        <label htmlFor="startDate">Data inicial</label>
                        <input name="startDate" type="date" className="form-control" id="startDate" onChange={handleChange} required value={startDate} />

                        <label htmlFor="finalDate">Data final</label>
                        <input name="finalDate" type="date" className="form-control" id="finalDate" onChange={handleChange} required value={finalDate} />

                        <label htmlFor="price">Preço do projeto</label>
                        <input name="price" type="price" className="form-control" id="price" onChange={handleChange} required value={price} />
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
    )
}

export default UpdateProject;
