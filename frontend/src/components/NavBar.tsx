import {NavLink} from "react-router-dom";


function NavBar() {
    const linkStyle = ({ isActive }: { isActive: boolean }) =>
        `rounded-md px-5 py-2 font-medium transition-colors
    ${
            isActive
                ? "bg-[#FFCE00] text-black"
                : "text-white hover:bg-[#383838] hover:text-[#FFCE00]"
        }`;
    return (
        <nav className="w-full bg-[#242424] px-6">
            <div className="flex flex-wrap items-center justify-between gap-4">

                <h1 className="text-xl font-bold text-white">9 Line App</h1>

                <div className="flex items-center gap-4">
                    <NavLink className={linkStyle} to="/" end>Requester</NavLink>
                    <NavLink className={linkStyle} to="/responder">Responder</NavLink>
                    <NavLink className={linkStyle} to="/dispatcher">Dispatcher</NavLink>
                </div>
            </div>
        </nav>
    );
}

export default NavBar;