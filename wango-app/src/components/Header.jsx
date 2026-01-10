import { Link } from 'react-router-dom';

export default function Header({ onUserClick }) {
  return (
    <header className="header-principal">
      <button className="boton-menu">
        <img src="/logos and imgs/menu.png" alt="Menú" />
      </button>
      
      <Link to="/" className="logo-link">
        <div className="logo-contenedor">
          <img src="/logos and imgs/ewallet.png" alt="Logo Wango" className="logo" />
          <h1>Wango</h1>
        </div>
      </Link>

      <div className="usuario-contenedor" onClick={onUserClick} style={{ cursor: 'pointer' }}>
        <img src="/logos and imgs/usuario.png" alt="Usuario" />
      </div>
    </header>
  );
}

