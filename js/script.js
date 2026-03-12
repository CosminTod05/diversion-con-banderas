// Elementos del DOM que vamos a usar
const countriesList = document.getElementById('countries-list');
const overlay = document.getElementById('overlay');
const countryModal = document.getElementById('country-modal');
const modalContent = document.getElementById('modal-content');
const closeBtn = document.getElementById('close-btn');

// Función que se encarga de llamar a la API y pintar los países
async function obtenerPaises() {
  try {
    // Pedimos solo los campos que necesitamos
    const respuesta = await fetch('https://restcountries.com/v3.1/all?fields=name,flags,car,population,capital');
    const datos = await respuesta.json();

    // Ordenar los países alfabéticamente (usamos name.common)
    datos.sort((a, b) => {
      const nombreA = a.name.common.toUpperCase();
      const nombreB = b.name.common.toUpperCase();
      if (nombreA < nombreB) {
        return -1;
      }
      if (nombreA > nombreB) {
        return 1;
      }
      return 0;
    });

    // Pintar cada país en el contenedor
    datos.forEach(pais => {
      const divPais = document.createElement('div');
      divPais.classList.add('country-card');

      divPais.innerHTML = `
        <img src="${pais.flags.png}" alt="Bandera de ${pais.name.common}">
        <p>${pais.name.common}</p>
      `;

      // Al hacer click, mostramos el modal con más info
      divPais.onclick = () => {
        mostrarDetalles(pais);
      };

      countriesList.appendChild(divPais);
    });

  } catch (error) {
    console.error('Ha ocurrido un error al obtener los datos:', error);
  }
}

// Función para mostrar el modal con los detalles del país
function mostrarDetalles(pais) {
  // Lado de conducción (pista del profesor)
  const ladoCoche = pais.car.side === 'right' ? 'Derecho' : 'Izquierdo';

  modalContent.innerHTML = `
    <img src="${pais.flags.png}" style="width: 150px; border: 1px solid #ccc;">
    <h2>${pais.name.common}</h2>
    <p><strong>Capital:</strong> ${pais.capital ? pais.capital[0] : 'No tiene'}</p>
    <p><strong>Población:</strong> ${pais.population.toLocaleString()}</p>
    <p><strong>Lado de la carretera:</strong> ${ladoCoche}</p>
  `;

  // Activar el modal y el fondo oscuro
  countryModal.classList.add('active');
  overlay.classList.add('active');
}

// Cerrar el modal al darle al botón
closeBtn.onclick = () => {
  countryModal.classList.remove('active');
  overlay.classList.remove('active');
};

// Cerrar el modal al darle fuera (en el overlay)
overlay.onclick = () => {
  countryModal.classList.remove('active');
  overlay.classList.remove('active');
};

// Llamamos a la función principal al cargar la página
obtenerPaises();
