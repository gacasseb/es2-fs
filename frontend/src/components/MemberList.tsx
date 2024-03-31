import { AiFillDelete, AiFillEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { deleteById } from '../services/api/Membros/MembrosService'

interface MemberListProps {
  members: any;
}

const MemberList = ({ members }: MemberListProps) => {
  const navigate = useNavigate();

  if (!members) return <></>;

  return (
    <div className='list'>
      <h3 className='list-title'>Lista de Membros</h3>
      <div className='list-table-container'>
        <table className='list-table'>
          <thead className='list-header'>
            <tr>
              <th>Nome do Membro</th>
              <th>Especialidade</th>
              <th>Time</th>
              <th>Editar</th>
              <th>Deletar</th>
            </tr>
          </thead>
          <tbody>
            {members?.map(({ id, name, role, Team }: { id: string, name: any; role: any; Team: any }) => (
              <tr key={id}>
                <td>{name}</td>
                <td>{role}</td>
                <td>{Team?.name}</td>
                <td>
                  <AiFillEdit cursor='pointer' onClick={() => navigate(`/member/update/${id}`)} size={20} className='icon' />
                </td>
                <td>
                  <AiFillDelete
                    size={20}
                    onClick={() => {
                      const confirmDelete = window.confirm(
                        `Confirma deletar ${name}?`
                      );
                      if (confirmDelete) {
                        deleteById(+id)
                        alert('Membro deletado com sucesso!');
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
export default MemberList;