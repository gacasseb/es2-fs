import {ReactComponent as ProjectIcon} from 'assets/img/manager.svg';
import './styles.css';
import { useNavigate } from 'react-router-dom';

function NavBar() {

    const navigate = useNavigate();

    return (
        <header>
            <nav className='container'>
                <div className='project-nav-content'>
                    <h1 onClick={() => navigate('/')}>Cadastro de Projetos</h1>
                    <a href="/">
                        <div className='project-contact-container'>
                            <ProjectIcon />
                            <p className='project-contact-link'>Página Inicial</p>
                        </div>

                    </a>
                </div>
            </nav>
        </header>
    )

}

export default NavBar;