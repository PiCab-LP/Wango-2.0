import { Link } from 'react-router-dom'
import '../styles/hero.css'

function Landing() {
  return (
    <section className="hero">
      <div className="content">
        <h1>Wango</h1>
        <p>Tu nueva billetera favorita, que almacena tus tarjetas favoritas</p>
        <p>Pagos seguros y rápidos en segundos</p>
        <p>Genera links de pago temporales y protege tus datos</p>
        <Link className="cta" to="/dashboard">Comenzar Ahora</Link>
      </div>
    </section>
  )
}

export default Landing