import '../styles.css';
import { useNavigate } from 'react-router-dom'
import {ReactComponent as Hocket} from '../../assets/img/lauch.svg';

function Home() {
    return (
        <div className="pages-form-initial-container">
            <div className="pages-menu-initial-container">
                <a href="./project"><h2>Projeto</h2></a>
                <br/>
                <a href="./team"><h2>Time</h2></a>
                <br/>
                <a href="./member"><h2>Membro</h2></a>
            </div >
            <div className="pages-image-initial-container">
                <Hocket />
            </div >
        </div >
    )
}

export default Home;