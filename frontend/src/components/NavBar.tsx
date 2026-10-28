import {NavLink} from "react-router-dom";


function NavBar() {
    return (
        <nav>
            <NavLink to="/">Requester</NavLink>
            <NavLink to="/responder">Responder</NavLink>
            <NavLink to="/dispatcher">Dispatcher</NavLink>
        </nav>

    );
}

export default NavBar;