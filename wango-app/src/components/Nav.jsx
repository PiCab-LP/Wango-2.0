import { NavLink } from 'react-router-dom'

function Nav() {
    return (
        <nav className="navegacion-principal">
        <ul>
            <li>
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? 'active' : ''}>
                Página principal
            </NavLink>
            </li>
            <li>
            <NavLink to="/payment-methods" className={({ isActive }) => isActive ? 'active' : ''}>
                Métodos de pago
            </NavLink>
            </li>
            <li>
            <NavLink to="/transactions" className={({ isActive }) => isActive ? 'active' : ''}>
                Transacciones
            </NavLink>
            </li>
            <li>
            <NavLink to="/settings" className={({ isActive }) => isActive ? 'active' : ''}>
                Configuración
            </NavLink>
            </li>
        </ul>
        </nav>
)
}

export default Nav