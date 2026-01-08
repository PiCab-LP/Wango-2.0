////////// Pantalla de carga//////////////////////////
if (document.getElementById('pantallaCarga')) {
    window.addEventListener('load', function() {
        var pantalla = document.getElementById('pantallaCarga');
        
        if (sessionStorage.getItem('cargaCompletada')) {
            pantalla.remove();
            document.body.classList.add('cargado');
            return;
        }
        
        setTimeout(function() {
            pantalla.classList.add('ocultar');
            
            setTimeout(function() {
                pantalla.remove();
                document.body.classList.add('cargado');
                sessionStorage.setItem('cargaCompletada', 'true');
            }, 500);
        }, 500);
    });
}

var notificacionActiva = false;
var colaNotificaciones = [];



///////Página principal///////////////////////////////////////////////////
if (document.querySelector('.saldo-monto')) {
    var botonOcultarSaldo = document.querySelector('.boton-ocultar-saldo');
    var saldoMonto = document.querySelector('.saldo-monto');
    var saldoOculto = false;
    var saldoTotal = 0;
    var saldoOriginal = '';


    function actualizarSaldo() {
        var saldoTexto = 'S/. ' + saldoTotal.toFixed(2);
        saldoMonto.textContent = saldoTexto;
        saldoOriginal = saldoTexto;
    }


    botonOcultarSaldo.addEventListener('click', function() {
        if (saldoOculto) {
            saldoMonto.textContent = saldoOriginal;
            saldoOculto = false;
        } else {
            saldoMonto.textContent = 'S/. ******';
            saldoOculto = true;
        }
    });


    function generarCodigo() {
        var caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        var codigo = '';
        for (var i = 0; i < 7; i++) {
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        return codigo;
    }


function mostrarNotificacion(mensaje, tipo) {
    var notificacionExistente = document.querySelector('.notificacion-toast');
    if (notificacionExistente) {
        notificacionExistente.remove();
        notificacionActiva = false;
    }
    
    if (notificacionActiva) {
        colaNotificaciones.push({mensaje: mensaje, tipo: tipo});
        return;
    }
    
    notificacionActiva = true;
    var notificacion = document.createElement('div');
    notificacion.className = 'notificacion-toast';
    notificacion.textContent = mensaje;
    document.body.appendChild(notificacion);
    
    if (tipo === 'confeti') {
        crearConfeti();
    }
    
    setTimeout(function() {
        notificacion.classList.add('mostrar');
    }, 100);
    
    setTimeout(function() {
        notificacion.classList.remove('mostrar');
        setTimeout(function() {
            notificacion.remove();
            notificacionActiva = false;
            
            if (colaNotificaciones.length > 0) {
                var siguiente = colaNotificaciones.shift();
                mostrarNotificacion(siguiente.mensaje, siguiente.tipo);
            }
        }, 300);
    }, 2000);
}


    function crearConfeti() {
        var colores = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#ffa07a', '#98d8c8', '#f7dc6f'];
        
        for (var i = 0; i < 30; i++) {
            var confeti = document.createElement('div');
            confeti.className = 'confeti';
            confeti.style.left = Math.random() * 100 + '%';
            confeti.style.background = colores[Math.floor(Math.random() * colores.length)];
            confeti.style.animationDelay = Math.random() * 0.5 + 's';
            document.body.appendChild(confeti);
            
            setTimeout(function(elemento) {
                elemento.remove();
            }, 3000, confeti);
        }
    }


    var linkActual = 'Wango.wallet.com/' + generarCodigo();


    var botonCopiar = document.querySelector('.boton-copiar-link');
    botonCopiar.addEventListener('click', function() {
        navigator.clipboard.writeText(linkActual);
        mostrarNotificacion('📋 Link copiado al portapapeles');
    });


    var botonGenerar = document.querySelector('.boton-generar-link');
    botonGenerar.addEventListener('click', function() {
        linkActual = 'Wango.wallet.com/' + generarCodigo();
        mostrarNotificacion('🎉 ¡Has generado otro link de pago con éxito!', 'confeti');
    });


    var tarjetas = [];
    var maxTarjetas = 10;
    var botonAnadirMetodo = document.querySelector('.boton-anadir-metodo');
    var modal = document.getElementById('modalAgregarTarjeta');
    var cerrarModal = document.getElementById('cerrarModal');
    var tarjetaAEliminar = null;
    var elementoAEliminar = null;
    var contenedorTarjetas = document.getElementById('contenedorTarjetas');
    var seccionMetodos = document.querySelector('.seccion-metodos-pago');


    // Cargar tarjetas desde localStorage
var tarjetasGuardadas = localStorage.getItem('tarjetasWango');
if (tarjetasGuardadas) {
    tarjetas = JSON.parse(tarjetasGuardadas);


    if (tarjetas.length > 0) {
        for (var i = 0; i < tarjetas.length; i++) {
            var t = tarjetas[i];
            saldoTotal += t.saldo;
            var ultimos4 = t.numero.substring(12);
            var alias = t.alias || 'Visa Debito Clasica Compras';
            var tarjetaDiv = document.createElement('div');
            tarjetaDiv.className = 'tarjeta-contenedor';
            tarjetaDiv.setAttribute('data-numero', t.numero);
            tarjetaDiv.setAttribute('data-saldo', t.saldo);
            tarjetaDiv.innerHTML = '<img src="./logos and imgs/tarjeta-de-credito.png" alt="tarjeta"><div class="tarjeta-info"><p>' + alias + ' •••• ' + ultimos4 + '</p><p>' + t.fecha + '</p></div><button class="boton-eliminar-tarjeta">✕</button>';
            
            contenedorTarjetas.appendChild(tarjetaDiv);


            tarjetaDiv.querySelector('.boton-eliminar-tarjeta').addEventListener('click', function() {
                var tarj = this.parentElement;
                tarjetaAEliminar = tarj.getAttribute('data-numero');
                elementoAEliminar = tarj;
                document.getElementById('modalEliminar').classList.add('activo');
            });
        }


        actualizarSaldo();


        if (tarjetas.length >= maxTarjetas) {
            botonAnadirMetodo.classList.add('desactivado');
        }
    } else {
        actualizarSaldo();
        seccionMetodos.classList.add('vacio');
    }
} else {
    actualizarSaldo();
    seccionMetodos.classList.add('vacio');
}


    // Abrir modal para agregar tarjeta
    botonAnadirMetodo.addEventListener('click', function() {
        if (tarjetas.length >= maxTarjetas) {
            mostrarNotificacion('⚠️ Has alcanzado el máximo de 10 tarjetas');
            return;
        }
        modal.classList.add('activo');
    });


    // Cerrar modal
    cerrarModal.addEventListener('click', function() {
        modal.classList.remove('activo');
        document.getElementById('formTarjeta').reset();
    });


    // Solo numeros en tarjeta
    document.getElementById('numeroTarjeta').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });


    // Solo numeros en CVV
    document.getElementById('codigoSeguridad').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });


    // Formato de fecha MM/AA
    document.getElementById('fechaVencimiento').addEventListener('input', function() {
        var valor = this.value.replace(/\D/g, '');
        if (valor.length >= 2) {
            var mes = valor.substring(0, 2);
            var anio = valor.substring(2, 4);


            if (parseInt(mes) < 1) mes = '01';
            if (parseInt(mes) > 12) mes = '12';


            this.value = mes + (anio ? '/' + anio : '/');
        } else {
            this.value = valor;
        }
    });


    // Guardar nueva tarjeta
    document.getElementById('formTarjeta').addEventListener('submit', function(e) {
        e.preventDefault();
        
        var numero = document.getElementById('numeroTarjeta').value;
        var fecha = document.getElementById('fechaVencimiento').value;
        var codigo = document.getElementById('codigoSeguridad').value;
        
        if (numero.length !== 16) {
            mostrarNotificacion('⚠️ Ingresa los 16 dígitos de la tarjeta');
            return;
        }
        
        if (fecha.length !== 5 || !fecha.includes('/')) {
            mostrarNotificacion('⚠️ Ingresa la fecha en formato MM/AA');
            return;
        }


        var mes = parseInt(fecha.split('/')[0]);
        if (mes < 1 || mes > 12) {
            mostrarNotificacion('⚠️ El mes debe estar entre 01 y 12');
            return;
        }
        
        if (codigo.length !== 3) {
            mostrarNotificacion('⚠️ El código debe tener 3 dígitos');
            return;
        }
        
        for (var i = 0; i < tarjetas.length; i++) {
            if (tarjetas[i].numero === numero) {
                mostrarNotificacion('⚠️ Esta tarjeta ya ha sido agregada');
                return;
            }
        }
        
        var saldoAleatorio = Math.floor(Math.random() * 1000) + 1;
        tarjetas.push({numero: numero, fecha: fecha, saldo: saldoAleatorio});
        localStorage.setItem('tarjetasWango', JSON.stringify(tarjetas));
        
        saldoTotal += saldoAleatorio;
        actualizarSaldo();
        
        var ultimos4 = numero.substring(12);
        
        var tarjetaDiv = document.createElement('div');
        tarjetaDiv.className = 'tarjeta-contenedor';
        tarjetaDiv.setAttribute('data-numero', numero);
        tarjetaDiv.setAttribute('data-saldo', saldoAleatorio);
        tarjetaDiv.innerHTML = '<img src="./logos and imgs/tarjeta-de-credito.png" alt="tarjeta"><div class="tarjeta-info"><p>Visa Debito Clasica Compras •••• ' + ultimos4 + '</p><p>' + fecha + '</p></div><button class="boton-eliminar-tarjeta">✕</button>';
        
        contenedorTarjetas.appendChild(tarjetaDiv);
        seccionMetodos.classList.remove('vacio');
        
        tarjetaDiv.querySelector('.boton-eliminar-tarjeta').addEventListener('click', function() {
            tarjetaAEliminar = tarjetaDiv.getAttribute('data-numero');
            elementoAEliminar = tarjetaDiv;
            document.getElementById('modalEliminar').classList.add('activo');
        });
        
        if (tarjetas.length >= maxTarjetas) {
            botonAnadirMetodo.classList.add('desactivado');
        }
        
        modal.classList.remove('activo');
        this.reset();
        mostrarNotificacion('✓ Tarjeta agregada con éxito');
    });


    // Cancelar eliminacion
    document.getElementById('btnCancelar').addEventListener('click', function() {
        document.getElementById('modalEliminar').classList.remove('activo');
    });


    // Confirmar eliminacion
    document.getElementById('btnConfirmar').addEventListener('click', function() {
        var saldoEliminado = parseFloat(elementoAEliminar.getAttribute('data-saldo'));
        
        for (var i = 0; i < tarjetas.length; i++) {
            if (tarjetas[i].numero === tarjetaAEliminar) {
                tarjetas.splice(i, 1);
                break;
            }
        }
        
        saldoTotal -= saldoEliminado;
        actualizarSaldo();
        
        localStorage.setItem('tarjetasWango', JSON.stringify(tarjetas));
        elementoAEliminar.remove();
        
        if (tarjetas.length === 0) {
            seccionMetodos.classList.add('vacio');
        }
        
        if (tarjetas.length < maxTarjetas) {
            botonAnadirMetodo.classList.remove('desactivado');
        }
        
        document.getElementById('modalEliminar').classList.remove('activo');
        mostrarNotificacion('✓ Tarjeta eliminada');
    });
}


///////////////// Métodos de pago//////////////////
if (document.getElementById('listaTarjetas')) {
    var tarjetasPago = [];
    var maxTarjetasPago = 10;
    var botonAnadirPago = document.querySelector('.boton-anadir-metodo');
    var modalPago = document.getElementById('modalAgregarTarjeta');
    var cerrarModalPago = document.getElementById('cerrarModal');
    var listaTarjetas = document.getElementById('listaTarjetas');
    var tarjetaAEliminarPago = null;
    var elementoAEliminarPago = null;
    var modalSaldo = document.getElementById('modalVerSaldo');
    var modalEditarAlias = document.getElementById('modalEditarAlias');
    var tarjetaSeleccionada = null;


    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje) {
        var notificacion = document.createElement('div');
        notificacion.className = 'notificacion-toast';
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        
        setTimeout(function() {
            notificacion.classList.add('mostrar');
        }, 100);
        
        setTimeout(function() {
            notificacion.classList.remove('mostrar');
            setTimeout(function() {
                notificacion.remove();
            }, 300);
        }, 3000);
    }


    // Cargar tarjetas desde localStorage
    var tarjetasGuardadasPago = localStorage.getItem('tarjetasWango');
    if (tarjetasGuardadasPago) {
        tarjetasPago = JSON.parse(tarjetasGuardadasPago);


        if (tarjetasPago.length > 0) {
            for (var i = 0; i < tarjetasPago.length; i++) {
                var t = tarjetasPago[i];
                var ultimos4 = t.numero.substring(12);
                var alias = t.alias || 'Visa Debito Clasica Compras';
                var tarjetaDiv = document.createElement('div');
                tarjetaDiv.className = 'tarjeta-contenedor';
                tarjetaDiv.setAttribute('data-numero', t.numero);
                tarjetaDiv.setAttribute('data-saldo', t.saldo);
                tarjetaDiv.innerHTML = '<img src="./logos and imgs/tarjeta-de-credito.png" alt="tarjeta"><div class="tarjeta-info"><p class="tarjeta-alias">' + alias + ' •••• ' + ultimos4 + '</p><p>' + t.fecha + '</p></div><div class="tarjeta-acciones"><button class="boton-ver-saldo" title="Ver saldo">💰</button><button class="boton-editar-alias" title="Editar alias">✏️</button><button class="boton-eliminar-tarjeta" title="Eliminar">✕</button></div>';
                
                listaTarjetas.appendChild(tarjetaDiv);
            }


            if (tarjetasPago.length >= maxTarjetasPago) {
                botonAnadirPago.classList.add('desactivado');
            }
        }
    }


    // Abrir modal para agregar tarjeta
    botonAnadirPago.addEventListener('click', function() {
        if (tarjetasPago.length >= maxTarjetasPago) {
            mostrarNotificacion('⚠️ Has alcanzado el máximo de 10 tarjetas');
            return;
        }
        modalPago.classList.add('activo');
    });


    // Cerrar modales
    cerrarModalPago.addEventListener('click', function() {
        modalPago.classList.remove('activo');
        document.getElementById('formTarjeta').reset();
    });


    document.getElementById('cerrarModalSaldo').addEventListener('click', function() {
        modalSaldo.classList.remove('activo');
    });


    document.getElementById('cerrarModalAlias').addEventListener('click', function() {
        modalEditarAlias.classList.remove('activo');
        document.getElementById('formEditarAlias').reset();
    });


    // Solo numeros en tarjeta
    document.getElementById('numeroTarjeta').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });


    // Solo numeros en CVV
    document.getElementById('codigoSeguridad').addEventListener('input', function() {
        this.value = this.value.replace(/\D/g, '');
    });


    // Formato de fecha MM/AA
    document.getElementById('fechaVencimiento').addEventListener('input', function() {
        var valor = this.value.replace(/\D/g, '');
        if (valor.length >= 2) {
            var mes = valor.substring(0, 2);
            var anio = valor.substring(2, 4);


            if (parseInt(mes) < 1) mes = '01';
            if (parseInt(mes) > 12) mes = '12';


            this.value = mes + (anio ? '/' + anio : '/');
        } else {
            this.value = valor;
        }
    });


    // Guardar nueva tarjeta
    document.getElementById('formTarjeta').addEventListener('submit', function(e) {
        e.preventDefault();
        
        var numero = document.getElementById('numeroTarjeta').value;
        var fecha = document.getElementById('fechaVencimiento').value;
        var codigo = document.getElementById('codigoSeguridad').value;
        
        if (numero.length !== 16) {
            mostrarNotificacion('⚠️ Ingresa los 16 dígitos de la tarjeta');
            return;
        }
        
        if (fecha.length !== 5 || !fecha.includes('/')) {
            mostrarNotificacion('⚠️ Ingresa la fecha en formato MM/AA');
            return;
        }


        var mes = parseInt(fecha.split('/')[0]);
        if (mes < 1 || mes > 12) {
            mostrarNotificacion('⚠️ El mes debe estar entre 01 y 12');
            return;
        }
        
        if (codigo.length !== 3) {
            mostrarNotificacion('⚠️ El código debe tener 3 dígitos');
            return;
        }
        
        for (var i = 0; i < tarjetasPago.length; i++) {
            if (tarjetasPago[i].numero === numero) {
                mostrarNotificacion('⚠️ Esta tarjeta ya ha sido agregada');
                return;
            }
        }
        
        var saldoAleatorio = Math.floor(Math.random() * 1000) + 1;
        tarjetasPago.push({numero: numero, fecha: fecha, saldo: saldoAleatorio});
        localStorage.setItem('tarjetasWango', JSON.stringify(tarjetasPago));
        
        var ultimos4 = numero.substring(12);
        
        var tarjetaDiv = document.createElement('div');
        tarjetaDiv.className = 'tarjeta-contenedor';
        tarjetaDiv.setAttribute('data-numero', numero);
        tarjetaDiv.setAttribute('data-saldo', saldoAleatorio);
        tarjetaDiv.innerHTML = '<img src="./logos and imgs/tarjeta-de-credito.png" alt="tarjeta"><div class="tarjeta-info"><p class="tarjeta-alias">Visa Debito Clasica Compras •••• ' + ultimos4 + '</p><p>' + fecha + '</p></div><div class="tarjeta-acciones"><button class="boton-ver-saldo" title="Ver saldo">💰</button><button class="boton-editar-alias" title="Editar alias">✏️</button><button class="boton-eliminar-tarjeta" title="Eliminar">✕</button></div>';
        
        listaTarjetas.appendChild(tarjetaDiv);
        
        if (tarjetasPago.length >= maxTarjetasPago) {
            botonAnadirPago.classList.add('desactivado');
        }
        
        modalPago.classList.remove('activo');
        this.reset();
        mostrarNotificacion('✓ Tarjeta agregada con éxito');
    });


    // Botones de ver saldo y editar alias
    listaTarjetas.addEventListener('click', function(e) {
        if (e.target.classList.contains('boton-ver-saldo')) {
            var tarjeta = e.target.closest('.tarjeta-contenedor');
            var saldo = parseFloat(tarjeta.getAttribute('data-saldo'));
            var alias = tarjeta.querySelector('.tarjeta-alias').textContent;
            
            document.getElementById('tarjetaNombreSaldo').textContent = alias;
            document.getElementById('montoSaldoTarjeta').textContent = 'S/. ' + saldo.toFixed(2);
            modalSaldo.classList.add('activo');
        }
        
        if (e.target.classList.contains('boton-editar-alias')) {
            var tarjeta = e.target.closest('.tarjeta-contenedor');
            tarjetaSeleccionada = tarjeta;
            modalEditarAlias.classList.add('activo');
        }
        
        if (e.target.classList.contains('boton-eliminar-tarjeta')) {
            var tarjeta = e.target.closest('.tarjeta-contenedor');
            tarjetaAEliminarPago = tarjeta.getAttribute('data-numero');
            elementoAEliminarPago = tarjeta;
            document.getElementById('modalEliminar').classList.add('activo');
        }
    });


    // Guardar nuevo alias
    document.getElementById('formEditarAlias').addEventListener('submit', function(e) {
        e.preventDefault();
        
        var nuevoAlias = document.getElementById('nuevoAlias').value.trim();
        
        if (nuevoAlias.length < 3) {
            mostrarNotificacion('⚠️ El alias debe tener al menos 3 caracteres');
            return;
        }
        
        var numeroTarjeta = tarjetaSeleccionada.getAttribute('data-numero');
        
        for (var i = 0; i < tarjetasPago.length; i++) {
            if (tarjetasPago[i].numero === numeroTarjeta) {
                tarjetasPago[i].alias = nuevoAlias;
                break;
            }
        }
        
        localStorage.setItem('tarjetasWango', JSON.stringify(tarjetasPago));
        
        var ultimos4 = numeroTarjeta.substring(12);
        tarjetaSeleccionada.querySelector('.tarjeta-alias').textContent = nuevoAlias + ' •••• ' + ultimos4;
        
        modalEditarAlias.classList.remove('activo');
        this.reset();
        mostrarNotificacion('✓ Alias actualizado con éxito');
    });


    // Cancelar eliminacion
    document.getElementById('btnCancelar').addEventListener('click', function() {
        document.getElementById('modalEliminar').classList.remove('activo');
    });


    // Confirmar eliminacion
    document.getElementById('btnConfirmar').addEventListener('click', function() {
        for (var i = 0; i < tarjetasPago.length; i++) {
            if (tarjetasPago[i].numero === tarjetaAEliminarPago) {
                tarjetasPago.splice(i, 1);
                break;
            }
        }
        
        localStorage.setItem('tarjetasWango', JSON.stringify(tarjetasPago));
        elementoAEliminarPago.remove();
        
        if (tarjetasPago.length < maxTarjetasPago) {
            botonAnadirPago.classList.remove('desactivado');
        }
        
        document.getElementById('modalEliminar').classList.remove('activo');
        mostrarNotificacion('✓ Tarjeta eliminada');
    });
}

//////////////////////// Configuración////////////////
if (document.querySelector('.contenido-configuracion')) {
    
    // Función para mostrar notificaciones
    function mostrarNotificacion(mensaje) {
        var notificacionExistente = document.querySelector('.notificacion-toast');
        if (notificacionExistente) {
            notificacionExistente.remove();
            notificacionActiva = false;
        }
        
        if (notificacionActiva) {
            colaNotificaciones.push({mensaje: mensaje});
            return;
        }
        
        notificacionActiva = true;
        var notificacion = document.createElement('div');
        notificacion.className = 'notificacion-toast';
        notificacion.textContent = mensaje;
        document.body.appendChild(notificacion);
        
        setTimeout(function() {
            notificacion.classList.add('mostrar');
        }, 100);
        
        setTimeout(function() {
            notificacion.classList.remove('mostrar');
            setTimeout(function() {
                notificacion.remove();
                notificacionActiva = false;
                
                if (colaNotificaciones.length > 0) {
                    var siguiente = colaNotificaciones.shift();
                    mostrarNotificacion(siguiente.mensaje);
                }
            }, 300);
        }, 2000);
    }
    
    var toggleAyuda = document.getElementById('toggle-ayuda');
    var togglePromociones = document.getElementById('toggle-promociones');
    var toggleOfertas = document.getElementById('toggle-ofertas');
    
    var cargandoEstados = true;
    
    // Cargar estados guardados
    var estadoAyuda = localStorage.getItem('config-ayuda');
    var estadoPromociones = localStorage.getItem('config-promociones');
    var estadoOfertas = localStorage.getItem('config-ofertas');
    
    if (estadoAyuda !== null) {
        toggleAyuda.checked = estadoAyuda === 'true';
    } else {
        localStorage.setItem('config-ayuda', 'true');
    }
    
    if (estadoPromociones !== null) {
        togglePromociones.checked = estadoPromociones === 'true';
    } else {
        localStorage.setItem('config-promociones', 'true');
    }
    
    if (estadoOfertas !== null) {
        toggleOfertas.checked = estadoOfertas === 'true';
    } else {
        localStorage.setItem('config-ofertas', 'true');
    }
    
    cargandoEstados = false;
    
    // Toggle Ayuda
    toggleAyuda.addEventListener('change', function() {
        if (cargandoEstados) return;
        localStorage.setItem('config-ayuda', this.checked);
        if (this.checked) {
            mostrarNotificacion('✅ Ya estás recibiendo consejos sobre Wango');
        } else {
            mostrarNotificacion('🔕 Dejaste de recibir consejos sobre Wango');
        }
    });
    
    // Toggle Promociones
    togglePromociones.addEventListener('change', function() {
        if (cargandoEstados) return;
        localStorage.setItem('config-promociones', this.checked);
        if (this.checked) {
            mostrarNotificacion('🎉 Ya estás recibiendo promociones de Wango');
        } else {
            mostrarNotificacion('🔕 Dejaste de recibir promociones de Wango');
        }
    });
    
    // Toggle Ofertas
    toggleOfertas.addEventListener('change', function() {
        if (cargandoEstados) return;
        localStorage.setItem('config-ofertas', this.checked);
        if (this.checked) {
            mostrarNotificacion('🎁 Ya estás recibiendo ofertas exclusivas de Wango');
        } else {
            mostrarNotificacion('🔕 Dejaste de recibir ofertas de Wango');
        }
    });
}

// Modal de información de usuario
if (document.querySelector('.usuario-contenedor img')) {
    var usuarioImg = document.querySelector('.usuario-contenedor img');
    var modalUsuario = document.getElementById('modalInfoUsuario');
    var cerrarModalUsuario = document.getElementById('cerrarModalUsuario');
    
    usuarioImg.addEventListener('click', function() {
        modalUsuario.classList.add('activo');
    });
    
    cerrarModalUsuario.addEventListener('click', function() {
        modalUsuario.classList.remove('activo');
    });
}