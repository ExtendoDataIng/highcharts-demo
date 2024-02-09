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
  function calculateGeomean(data) {
    return Math.exp(data.reduce((sum, value) => sum + Math.log(value), 0) / data.length);
  }

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

      data.push({
        x: xiData[i],
        density: (1 / N) * temp,
        frequency,
      });
    }

    return data.map((densityPoint) => {
      if (densityPoint.density > precision) {
        return {
          x: densityPoint.x,
          low: gap,
          high: densityPoint.density * densityWidth + gap,
          frequency: densityPoint.frequency,
        };
      } else {
        return {
          x: densityPoint.x,
          low: null,
          high: null,
          frequency: null,
        };
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
    stat[index].push(calculateGeomean(e));
    index++;
  });

  return { xiData, results, stat };
}

export default processDensity;


const data_array_fake = [[10.1, 15.14, 30, 93.41, 94.57, 102.52, 102.71, 104.76, 106.46, 107.99, 110.61, 110.83, 113.63, 115.34, 116.28, 117.07, 117.11, 118.08, 119.32, 120.47, 130.88, 133.53, 134.06, 135.43, 135.89, 137.05, 142, 149.19, 156.36, 159.24, 173.9, 201.52, 238.22, 21.94, 26.75, 37.5, 50.48, 67.5, 94.46, 98.99, 103.43, 107.45, 107.6, 110.4, 111.12, 114.41, 114.64, 117, 117.73, 118.77, 124.21, 124.52, 125.27, 128, 132.02, 136.34, 137.22, 139.43, 142.86, 149.81, 164.01, 171.81, 174.16, 321.44, 360.96, 23.82, 30.6, 31.2, 31.5, 32.4, 35.73, 45, 45.63, 77, 85, 91.24, 94.27, 97.59, 100.96, 102.39, 109.13, 112.94, 116.63, 120.95, 129.12, 131.94, 135.14, 135.42, 142.03, 159.82, 165.03, 177.44, 241.71, 260, 267.52, 9.13, 10.25, 13.69, 30.9, 33, 35.4, 90.63, 92, 94.69, 95.07, 101.97, 101.98, 102.34, 105.81, 108.67, 110.01, 116.21, 127.43, 134.86, 141.49, 146.86, 155.05, 158.76, 335.23, 15.38, 34.5, 51.26, 91.26, 105.22, 106.66, 111.9, 112.42, 115.06, 116.19, 118.89, 122.66, 126.66, 128.64, 130.95, 132.26, 133.76, 137, 145.94, 150, 177.41, 189.4, 211.68, 14.63, 36, 73.13, 97.52, 98.88, 118.87, 120.51, 126.29, 128.86, 135.9, 141.27, 141.77, 142.47, 154.1, 161.89, 161.9, 168.66, 180.7, 208, 31.8, 101.33, 114.23, 119.11, 127.05, 133.9, 150.82, 24.85, 32.1, 40.13, 104.69, 121.68, 146.26, 146.34, 177.76, 183.05, 42, 92.85, 110.41, 132.99, 136.4, 151.02, 246.68, 87, 131.65],
 [30.6, 31.5, 35.4, 74.9, 279.77, 293.8, 294.62, 308, 314.18, 324.3, 335.11, 338.34, 339.96, 344.19, 344.96, 356.9, 357.72, 381.07, 386.72, 445.91, 466, 515.97, 748.96, 752.65, 283.2, 288.9, 304.03, 314.2, 314.88, 319.74, 326.24, 327.75, 332.64, 337.81, 354.11, 356.48, 378.28, 396.68, 408.35, 416.21, 444.93, 454.82, 511.08, 702, 830, 32.4, 33, 262.54, 277.94, 311.67, 318.28, 324.89, 345.76, 355, 459.8, 473.48, 474.45, 536.85, 652.13, 857.7, 1300, 264.67, 265.05, 273.69, 287.24, 302.62, 307.31, 328.89, 331.9, 346.73, 349.88, 362.19, 369.32, 373.16, 387.26, 424.22, 424.47, 489.91, 30, 30.9, 36, 267.64, 269.31, 276.31, 276.69, 282.11, 295.51, 297.51, 308.23, 318.05, 335.04, 342.76, 343.35, 347.2, 374.48, 397.57, 416.42, 418.75, 454.41, 464.76, 622.3, 31.2, 112.34, 252.1, 299.13, 301.19, 307.93, 313.24, 323.18, 350.82, 361.43, 365.07, 394.57, 398.89, 416.41, 454.47, 265.84, 320.32, 329.68, 340.32, 340.52, 400.95, 281.09, 338.29, 364.52, 426.03, 31.8, 326.47, 342.11, 417.95, 327.16, 337.33, 489.66],
 [1.9, 2.18, 2.97, 3.27, 3.77, 3.79, 4.25, 4.4, 4.53, 5.9, 5.91, 5.94, 6.62, 6.67, 6.86, 6.93, 7.57, 11.27, 18.99, 37.92, 39.59, 41.74, 44.02, 45.78, 45.88, 60.67, 76.4, 2.85, 3.87, 4.17, 4.23, 4.36, 4.38, 4.62, 5.81, 6.07, 6.33, 6.6, 6.88, 10.28, 16.9, 27.32, 36.15, 37.67, 39.06, 39.44, 43.21, 64.46, 71.5, 111.86, 112.69, 2.9, 3.94, 4.32, 4.55, 4.58, 4.88, 6.2, 6.83, 7, 7.32, 7.64, 21.79, 38.71, 49.3, 50.43, 68.56, 1.98, 2.38, 3.99, 4.05, 4.29, 4.93, 5.65, 6.35, 6.87, 19.8, 39.9, 42.33, 43.75, 45.29, 46.22, 46.65, 59.07, 70.15, 3.62, 4.1, 4.22, 5.92, 6.56, 19.32, 23.76, 40.46, 45.5, 68.26, 2.73, 3.56, 4.59, 5.31, 5.42, 6.43, 6.48, 7.15, 11.46, 39.38, 41.35, 42.86, 3.96, 4.45, 4.67, 5.04, 5.99, 6.26, 7.39, 7.96, 8.86, 10.73, 42.17, 42.53, 43.6, 44.11, 44.47, 50.9, 53.09, 4.13, 5.09, 5.69, 6.54, 6.79, 39.35, 1.93, 3.91, 4.14, 5.86, 6.38, 48.83, 75.84, 4.41, 7.63],
 [26.22, 31.59, 32.24, 35.35, 36.18, 39.69, 49.85, 50.18, 50.66, 52.89, 63.18, 65.44, 65.6, 66.47, 67.57, 68.22, 75.44, 79.38, 86.24, 91.84, 119.1, 131.09, 155.13, 165.7, 165.84, 170.56, 176.3, 297.74, 331.67, 344.4, 353.49, 361.81, 34.11, 34.44, 34.76, 37.72, 39.33, 42.64, 46.54, 49.75, 55.1, 59.53, 64.39, 64.48, 66.91, 69.53, 180.91, 183.68, 188.6, 321.93, 334.56, 337.71, 354.24, 396.88, 426.4, 459.2, 574.9, 656, 967.6, 31.03, 33.77, 36.74, 48.36, 52.44, 53.14, 73.8, 87.25, 89.32, 98.4, 161.21, 168.86, 172.2, 198.44, 213.22, 310.25, 347.63, 352.6, 367.36, 31.46, 33.14, 33.23, 33.46, 47.34, 47.38, 49.2, 49.71, 53.02, 56.58, 62.92, 63.63, 63.97, 66.28, 78.72, 95.45, 157.81, 176.75, 177.12, 213.2, 262.18, 314.62, 328, 341.12, 436.24, 595.48, 32.19, 43.62, 54.27, 59.04, 67.54, 68.88, 70.52, 70.7, 164, 168.92, 315.62, 315.88, 331.4, 332.35, 377.2, 524.8, 557.6, 31.56, 33.17, 33.78, 35.26, 35.42, 45.92, 47.19, 48.29, 57.49, 63.96, 85.28, 85.29, 127.26, 157.31, 157.94, 167.28, 322.42, 337.84, 393.6, 492, 59.55, 63.12, 70.85, 72.36, 73.47, 114.98, 160.97, 173.82, 196.8, 287.45, 318.16, 32.8, 50.68, 51.17, 62.05, 66.33, 218.12, 246, 590.4, 606.8, 39.36, 51.66, 52.14, 166.17, 229.6, 636.32, 426.44],
 [737.38, 739.15, 761.01, 761.33, 769.56, 894.37, 983.07, 398.33, 423.42, 768.72, 774.24, 792.68, 847.99, 1106.07, 1430.52, 1776.36, 655.87, 726, 740.52, 825.87, 886.98, 391.56, 508.1, 602.54, 674.26, 675.14, 776.82, 1303.58, 747.14, 774.25, 1221.13, 845.58, 868.04, 724.85, 762.3, 960.9, 1034.81, 584.32, 670.95, 713.66, 796.37, 813.12],
 [60, 227.6, 310, 334.38, 335.5, 349.11, 359.38, 360.18, 366.59, 455, 465, 480.24, 486.71, 535, 708, 750, 857, 955, 1568, 2000, 2199, 2442, 4374, 356.24, 448, 517, 522.13, 527, 552, 558, 561, 573.07, 599, 613.69, 695.5, 800, 812, 985, 1006, 1119, 1397, 1485, 1500, 1600, 1935, 3819, 4662, 72.04, 327.33, 330.24, 340.82, 400, 405.74, 522, 530, 540, 625, 720, 755, 875, 887, 927, 1147, 1308, 1314, 1804, 2501, 2588, 30.9, 48.02, 328, 347.79, 365, 425, 525, 534, 556.2, 600, 725, 835, 1032, 1050, 1238.5, 1614, 1700, 2175, 2277, 6519, 10606, 539, 568, 589.8, 822, 825, 827, 913.57, 1627, 2063, 2446, 4439, 96.05, 500, 560, 591.41, 601.32, 710, 795.6, 847.96, 1682, 1726, 1995, 4150, 6586, 30, 470, 575, 580, 650, 701.66, 775, 809.75, 950, 1100, 2521, 36, 240.12, 450, 550, 628, 675, 1567, 9671, 1101, 520, 2267]]

export default data_array_fake


/*
Density function
Author: Mustapha Mekhatria
*/
import jStat from 'jstat';
function processDensity(step, precision, densityWidth, ...args) {
  let xiData = [];

  //process the xi
  function prcessXi(args) {
    let tempXdata = [];
    let tileSteps = 6; //Nbr of points at the top and end of the density
    let min = Infinity,
      max = -Infinity;

    //process the range of the data set
    args.forEach((e) => {
      min = Math.min(min, Math.min(...e));
      max = Math.max(max, Math.max(...e));
    });

    for (let i = min - tileSteps * step; i < max + tileSteps * step; i++) {
      tempXdata.push(i);
    }
    return tempXdata;
  }
  xiData = prcessXi(args);

  //the KDE gaussian function
  function kdeProcess(xi, u) {
    return (1 / Math.sqrt(2 * Math.PI)) * Math.exp(Math.pow(xi - u, 2) / -2);
  }
  let gap = -1;
  
  //create the upper and lower line of the density
  function density(dataSource) {
    let data = [];
    let N = dataSource.length;

    gap++;
    for (let i = 0; i < xiData.length; i++) {
      let temp = 0;
      for (let j = 0; j < dataSource.length; j++) {
        temp = temp + kdeProcess(xiData[i], dataSource[j]);
      }
      data.push([xiData[i], (1 / N) * temp]);
    }

    return data.map((densityPoint, i) => {
      if (densityPoint[1] > precision) {
        return [xiData[i], gap, densityPoint[1] * densityWidth + gap];
      } else {
        return [xiData[i], null, null];
      }
    });
  }

  let results = [];
  let stat = [];
  let index = 0;

  args.forEach((e) => {
    results.push([]);
    stat.push([]);
    results[index] = density(e).slice();
    //Min, Q1, Median, Q3, Max
    stat[index].push(
      Math.min(...e),
      jStat.quartiles(e)[0],
      jStat.quartiles(e)[1],
      jStat.quartiles(e)[2],
      Math.max(...e)
    );
    index++;
  });
  return { xiData, results, stat };
}

export default processDensity;
