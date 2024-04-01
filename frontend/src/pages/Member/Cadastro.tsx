import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import { create } from 'services/api/Membros/MembrosService';
import { getAll } from "services/api/Times/TimesService";
import '../styles.css';

function CadastroMembro() {
    const navigate = useNavigate();

    const [membro, setMembro] = useState({});
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        getTimes();
    }, []);

    const getTimes = async () => {
        const response = await getAll();
        if (!response) return;
        setTeams(response.data.map((team: any) => ({ name: team.name, id: team.id })))
    }

    const getTeamList = () => {
        if (teams.length === 0) return <option value="">Nenhum projeto cadastrado</option>

        let options = [<option value="" key={0}>Selecione um time</option>]
        teams.map((project: any) => options.push(<option key={project.id} value={project.id}>{project.name}</option>))
        return options
    }

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const response = await create(membro);
        if (response) {
            alert('Membro cadastrado com sucesso!');
            navigate('/member');
        } else {
            alert('Erro ao cadastrar membro!');
        }
    }

    const handleChange = (event: any) => {
        setMembro({ ...membro, [event.target.name]: event.target.value })
    }

    return (

        <div className="pages-form-container">
            <div className="pages-card-bottom-container">
                <h3>Cadastro de Membro</h3>
                <form className="pages-form" onSubmit={handleSubmit}>
                    <div className="form-group pages-form-group">
                        <label htmlFor="member_name">Nome</label>
                        <input name="name" type="text" className="form-control" id="member_name" onChange={handleChange} required />

                        <label htmlFor="address">Endereço</label>
                        <input name="address" className="form-control" id="member_address" onChange={handleChange} required />

                        <label htmlFor="birthdate">Data de aniversário</label>
                        <input name="birthdate" type="date" className="form-control" id="member_birthdate" onChange={handleChange} required />

                        <label htmlFor="member_gender">Gênero</label>
                        <select name="gender" onChange={handleChange} required>
                            <option value="">Selecione um gênero</option>
                            <option value="Masculino">Masculino</option>
                            <option value="Feminino">Feminino</option>
                        </select>
                        <br />

                        <label htmlFor="member_race">Raça</label>
                        <select name="race" onChange={handleChange} required>
                            <option value="">Selecione uma raça</option>
                            <option value="Branco">Branco</option>
                            <option value="Preto">Preto</option>
                            <option value="Pardo">Pardo</option>
                            <option value="Indígena">Indígena</option>
                            <option value="Amarelo">Amarelo</option>
                        </select>
                        <br />

                        <label htmlFor="member_role">Especialidade</label>
                        <select name="role" onChange={handleChange} required>
                            <option value="">Selecione uma especialidade</option>
                            <option value="Analista">Analista</option>
                            <option value="Desenvolvedor">Desenvolvedor</option>
                            <option value="DBA">DBA</option>
                            <option value="Designer">Designer</option>
                            <option value="QA">QA</option>
                            <option value="Delivery">Delivery</option>
                            <option value="PO">PO</option>
                        </select>
                        <br />

                        <label htmlFor="team_id">Time</label>
                        <select name="team" onChange={handleChange}>
                            {getTeamList()}
                        </select>
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

export default CadastroMembro;