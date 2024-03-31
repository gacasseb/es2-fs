import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { deleteById } from 'services/api/Times/TimesService';
import { Link } from 'react-router-dom';

interface TeamListProps {
  teams: any;
}

const TeamList = ({ teams }: TeamListProps) => {
  if (!teams) return <></>
  return (
    <div className='list'>
      <h3 className='list-title'>Lista de Times</h3>
      <div className='list-table-container'>
        <table className='list-table'>
          <thead className='list-header'>
            <tr>
              <th>Nome do Time</th>
              <th>Projeto</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {teams?.map(({ id, name, Project }: { id: any; name: any; Project: any }, index: number) => (
              <tr key={index}>
                <td>{name}</td>
                <td>{Project?.name}</td>
                <td>
                  <Link to={`/team/update/${id}`}>
                    <AiFillEdit cursor='pointer' size={20} className='icon' />
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
                        deleteById(id)
                        alert('Time deletado com sucesso!');
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
export default TeamList;