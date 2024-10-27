import { series } from './data.js'; // Importar la lista de series

const totalSeasons = series.reduce((acc, serie) => acc + serie.seasons, 0);
const seriesCount = series.length;
const averageSeasons = totalSeasons / seriesCount;

console.log(`El promedio de temporadas de las series es: ${averageSeasons}`);

// Generar el HTML de la tabla con los datos de las series
function generateSeriesTable(series) {
    let tableHTML = `
        <table class="table">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Name</th>
                    <th scope="col">Channel</th>
                    <th scope="col">Seasons</th>
                </tr>
            </thead>
            <tbody>
    `;
    for (const serie of series) {
        tableHTML += `
            <tr class="serie-row" data-id="${serie.id}">
                <th scope="row">${serie.id}</th>
                <td>${serie.name}</td>
                <td>${serie.channel}</td>
                <td>${serie.seasons}</td>
            </tr>
        `;
    }
    
    tableHTML += `
            <tr>
                <td colspan="3" style="text-align: right;"><strong>Promedio de temporadas:</strong></td>
                <td>${averageSeasons.toFixed(2)}</td>
            </tr>
        `;
        
    tableHTML += `
            </tbody>
        </table>
    `;
    return tableHTML;
}

// Función para mostrar los detalles de la serie
function displaySerieDetails(serie) {
    const detailContainer = document.getElementById("seriesDetailContainer");
    if (detailContainer) {
        detailContainer.innerHTML = `
            <div class="card">
                <img src="${serie.imageUrl}" class="card-img-top" alt="${serie.name}">
                <div class="card-header">
                    <h5>${serie.name}</h5>
                </div>
                <div class="card-body">
                    <p><strong>Channel:</strong> ${serie.channel}</p>
                    <p><strong>Seasons:</strong> ${serie.seasons}</p>
                    <p><strong>Description:</strong> ${serie.description || "No description available."}</p>
                    <a href="${serie.link}" class="btn btn-primary" target="_blank">Watch Now</a>
                </div>
            </div>
        `;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const tableContainer = document.getElementById("seriesTableContainer");
    if (tableContainer) {
        tableContainer.innerHTML = generateSeriesTable(series);
        
        // Agregar evento de clic a las filas de la tabla
        const serieRows = document.querySelectorAll('.serie-row');
        serieRows.forEach(row => {
            row.addEventListener('click', () => {
                const serieId = row.getAttribute('data-id');
                const selectedSerie = series.find(serie => serie.id == serieId);
                displaySerieDetails(selectedSerie);
            });
        });
    }
});
