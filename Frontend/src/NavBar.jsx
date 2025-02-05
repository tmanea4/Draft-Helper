import './NavBar.css';

const NavBar = ({ user, logout }) => {
    return (
        <div className='nav-bar'>
            <div className='nav-content'>
                <div className='nav-title'>Draft Helper</div>
                <div className='nav-user'>Current user: {user} <button onClick={logout}>Log Out</button></div>
            </div>
        </div>
    );
}

export default NavBar;