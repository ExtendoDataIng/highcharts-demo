import jStat from 'jstat';

function processDensity(step, precision, densityWidth, ...args) {
  // Convertir los valores a enteros
  const argsInt = args.map(arr => arr.map(val => Math.round(val)));

  let xiData = [];

  // Procesar el xi
  function processXi(args) {
    let tempXdata = [];
    let tileSteps = 6;
    let min = Infinity,
      max = -Infinity;

    args.forEach((e) => {
      min = Math.min(min, Math.min(...e));
      max = Math.max(max, Math.max(...e));
    });

    for (let i = min - tileSteps * step; i < max + tileSteps * step; i++) {
      tempXdata.push(i);
    }
    return tempXdata;
  }
  xiData = processXi(argsInt);

  // Función de kernel gaussiano para KDE
  function kdeProcess(xi, u) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(Math.pow(xi - u, 2) / -2);
  }

  let gap = -1;

  // Calcular la media geométrica de un conjunto de datos
  // function calculateGeomean(data) {
  //   return Math.exp(data.reduce((sum, value) => sum + Math.log(value), 0) / data.length);
  // }

  // Crear la línea superior e inferior de la densidad
  function density(dataSource) {
    let data = [];
    let N = dataSource.length;
    gap++;

    for (let i = 0; i < xiData.length; i++) {
      let temp = 0;
      let frequency = 0; // Calcular la frecuencia
      for (let j = 0; j < dataSource.length; j++) {
        temp = temp + kdeProcess(xiData[i], dataSource[j]);
        if (xiData[i] === Math.round(dataSource[j])) {
          frequency++;
        }
      }

      // data.push({
      //   x: xiData[i],
      //   density: (1 / N) * temp,
      //   frequency,
      // });
      data.push([xiData[i], (1 / N) * temp, frequency]);
    }

  //   return data.map((densityPoint) => {
  //     if (densityPoint.density > precision) {
  //       return {
  //         x: densityPoint.x,
  //         low: gap,
  //         high: densityPoint.density * densityWidth + gap,
  //         frequency: densityPoint.frequency,
  //       };
  //     } else {
  //       return {
  //         x: densityPoint.x,
  //         low: null,
  //         high: null,
  //         frequency: null,
  //       };
  //     }
  //   });
  // }
      return data.map((densityPoint, i) => {
        if (densityPoint[1] > precision) {
          return [xiData[i], gap, densityPoint[1] * densityWidth + gap, densityPoint[2]];
        } else {
          return [xiData[i], null, null, null];
        }
      });
    }

  let results = [];
  let stat = [];
  let index = 0;

  argsInt.forEach((e) => {
    results.push([]);
    stat.push([]);
    results[index] = density(e).slice();
    stat[index].push(
      Math.min(...e),
      jStat.quartiles(e)[0],
      jStat.quartiles(e)[1],
      jStat.quartiles(e)[2],
      Math.max(...e)
    );
    // stat[index].push(calculateGeomean(e));
    index++;
  });

  return { xiData, results, stat };
}

export default processDensity;
