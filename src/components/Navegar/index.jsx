import './style.css'

function Navegacao (){
    return(
        <nav className='container-navegacao'>
            <p>SLIDE</p>
            <div className='container-navegacao__menu'>
                <input type="checkbox" id="menu" className="container__botao" />
                <label className ="container__menu__hamburguer" htmlFor="menu">
                    <span className="menu-hamburguer"></span>
                </label>
                <ul className="lista-menu">
                    <li className="lista-menu__item">
                        <a href="#" className="lista-menu__link cor-links">PROGRAMAÇÃO</a>
                    </li>
                    <li className="lista-menu__item">
                        <a href="#" className="lista-menu__link cor-links">FRONT-END</a>
                    </li>
                    <li className="lista-menu__item">
                        <a href="#" className="lista-menu__link cor-links">INFRAESTRUTURA</a>
                    </li>
                    <li className="lista-menu__item">
                        <a href="#" className="lista-menu__link cor-links">BUSINESS</a>
                    </li>
                    <li className="lista-menu__item">
                        <a href="#" className="lista-menu__link cor-links">DESIGN & UX</a>
                    </li>
                </ul>
            </div>
            <p>PUZZLE</p>
        </nav>
    )
}
export default Navegacao