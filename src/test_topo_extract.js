const fs = require('fs-extra');
const _ = require('lodash');

// Ruta al archivo topo.json original
const topoJsonPath = './topo.json';

// Ruta donde guardar el JSON específico de NC
const ncTopoJsonPath = './nc-topo.json';

// Cargar el archivo topo.json
fs.readFile(topoJsonPath, 'utf8')
  .then((data) => {
    const topoData = JSON.parse(data);

    // Filtrar geometrías para NC
    const ncGeometries = _.filter(topoData.objects.default.geometries, (g) => {
      const stateAbbr = g.properties['hc-key'].substr(3, 2).toUpperCase();
      return stateAbbr === 'NC';
    });

    // Construir objeto para el archivo nc-topo.json
    const ncTopoData = {
      ...topoData,
      objects: {
        ...topoData.objects,
        default: {
          ...topoData.objects.default,
          geometries: ncGeometries,
        },
      },
    };

    // Guardar el archivo nc-topo.json
    fs.writeFile(ncTopoJsonPath, JSON.stringify(ncTopoData, null, 2))
      .then(() => console.log(`Archivo nc-topo.json generado correctamente en ${ncTopoJsonPath}`))
      .catch((err) => console.error('Error al guardar el archivo nc-topo.json:', err));
  })
  .catch((err) => console.error('Error al leer el archivo topo.json:', err));
