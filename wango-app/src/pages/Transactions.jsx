import { useState } from 'react';
import Header from '../components/Header';
import Nav from '../components/Nav';
import Footer from '../components/Footer';
import UserInfoModal from '../components/UserInfoModal';

export default function Transactions() {
  const [transactions] = useState([]);
  const [showUserModal, setShowUserModal] = useState(false);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Header onUserClick={() => setShowUserModal(true)} />
      <Nav />
      
      <main className="contenido-transacciones" style={{ flex: 1 }}>
        <h2>Transacciones</h2>
        <p>Consulta pagos, compras y otras transacciones con Wango.</p>

        {transactions.length === 0 ? (
          <div className="contenedor-vacio-transacciones">
            <img src="https://www.gstatic.com/gpay/web/transactions_empty_2.svg" alt="Sin transacciones" />
            <p>No hay transacciones que mostrar</p>
            <p>Cuando las transacciones estén disponibles, podrás verlas aquí</p>
          </div>
        ) : (
          <div className="lista-transacciones">
            {transactions.map(transaction => (
              <div key={transaction.id} className="transaccion-item">
              </div>
            ))}
          </div>
        )}

        <aside className="nota-informativa">
          <img src="/logos and imgs/lampara.png" alt="Información" />
          <p>
            Todas las transacciones son visibles junto a la tarjeta que fue utilizada para realizar el cobro. 
            Verás el cargo en la tarjeta utilizada bajo el concepto de Wango.Company.
          </p>
        </aside>
      </main>

      <Footer />

      {showUserModal && (
        <UserInfoModal
          isOpen={showUserModal}
          onClose={() => setShowUserModal(false)}
        />
      )}
    </div>
  );
}
