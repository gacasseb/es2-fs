import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { deleteById } from 'services/api/Projetos/ProjetosService';
import { Link } from 'react-router-dom';

interface ProjectListProps {
  projects: any;
}

function ProjectList({ projects }: ProjectListProps) {
  if (!projects) return <></>

  const getTeamsString = (teams: any) => {
    if (!teams || teams.length === 0) return '';

    return teams.map(({ name }: { name: string }) => name).join(', ');
  }

  return (
    <div className='list'>
      <h3 className='list-title'>Lista de Projetos</h3>
      <div className='list-table-container'>
        <table className='list-table'>
          <thead className='list-header'>
            <tr>
              <th>Nome do Projeto</th>
              <th>Cliente do Projeto</th>
              <th>Times</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {projects?.map(({ id, name, client_name, Teams }: { id: any, name: any; client_name: any; Teams: any }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{client_name}</td>
                <td>{getTeamsString(Teams)}</td>
                <td>
                  <Link to={`/project/update/${id}`}>
                    <AiFillEdit size={20} className='icon' />
                  </Link>
                </td>
                <td>
                  <AiFillDelete
                    cursor='pointer'
                    size={20}
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Confirma deletar ${name}?`
                      );
                      if (confirmDelete) {
                        deleteById(id);
                        alert('Projeto deletado com sucesso!');
                        window.location.reload();
                      }
                    }}
                    className='icon'
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default ProjectList;