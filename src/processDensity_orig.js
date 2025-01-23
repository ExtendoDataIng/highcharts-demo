function processDensity(step, precision, densityWidth, ...args) {
  let xiData = [];

  // Process the xi
  function processXi(args) {
    let tempXdata = [];
    let tileSteps = 10; // Increase the number of additional points
    let min = Infinity, max = -Infinity;

    // Determine the range of the data set
    args.forEach((e) => {
      min = Math.min(min, Math.min(...e));
      max = Math.max(max, Math.max(...e));
    });

    for (let i = min - tileSteps * step; i <= max + tileSteps * step; i += step / 2) { // Increase the resolution
      tempXdata.push(i);
    }
    return tempXdata;
  }
  xiData = processXi(args);

  // Gaussian KDE function with adjustable bandwidth
  function kdeProcess(xi, u, bandwidth = 1) {
    const scale = 1 / (Math.sqrt(2 * Math.PI) * bandwidth);
    const exponent = Math.pow((xi - u) / bandwidth, 2) / -2;
    return scale * Math.exp(exponent);
  }

  let gap = -1;

  // Create the density curve
  function density(dataSource) {
    let data = [];
    let N = dataSource.length;
    const bandwidth = 0.6; // Adjust this to control smoothing

    gap++;
    for (let i = 0; i < xiData.length; i++) {
      let temp = 0;
      for (let j = 0; j < dataSource.length; j++) {
        temp += kdeProcess(xiData[i], dataSource[j], bandwidth);
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
    // Min, Q1, Median, Q3, Max
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
