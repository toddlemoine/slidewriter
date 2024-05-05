import { colors } from "../constants/chartConstants";
import escape from "lodash.escape";

const reChart = /\[(pie|line|area|bar|doughnut)chart (with )?(.*)\]$/i;
const reDataPointAttrs = /"(.*)" ([\d\.]*)( [#\w\d]*)?/;
const reData = /(.*)( ?data )(.*)$/;
const aliases = { area: "line", donut: "doughnut" };

const optionReaders = {
  animation: (val, options) => {
    let duration = val;
    if (val === "off") {
      duration = 0;
    }
    options.animation = { duration: parseFloat(duration, 10) };
    return options;
  },
  legend: (val, options) => {
    if (val === "hide") {
      options.legend = { display: false };
    } else {
      options.legend = { position: val };
    }
    return options;
  },
  patterns: (val, options) => {
    options.patterns = val;
    return options;
  },
  rotation: (val, options) => {
    options.rotation = (parseFloat(val) / 180) * Math.PI;
    return options;
  },
  datalabels: (val, options) => {
    options.plugins.datalabels = { display: val === "on" };
    return options;
  },
  min: (val, options) => {
    const yAxis = options.scales.yAxes[0];
    if (!yAxis.ticks) yAxis.ticks = {};
    yAxis.ticks.min = parseFloat(val, 10);
    return options;
  },
  max: (val, options) => {
    const yAxis = options.scales.yAxes[0];
    if (!yAxis.ticks) yAxis.ticks = {};
    yAxis.ticks.max = parseFloat(val, 10);
    return options;
  },
  step: (val, options) => {
    const yAxis = options.scales.yAxes[0];
    if (!yAxis.ticks) yAxis.ticks = {};
    yAxis.ticks.stepSize = parseFloat(val, 10);
    return options;
  }
};

function chartType(chartDef, type) {
  chartDef.swio.type = type;
  chartDef.type = aliases[type] || type;
  return chartDef;
}

function swioOptionsToChartJs(chartDef, swioOptions) {
  const options = Object.entries(swioOptions).reduce((acc, [key, val]) => {
    const reader = optionReaders[key];
    if (!reader) return acc;
    acc = reader(val, acc);
    return acc;
  }, chartDef.options);

  chartDef.options = options;

  return chartDef;
}

function chartOptions(chartDef, str) {
  const swioOptions = str.split(",").reduce((acc, curr) => {
    const [key, val] = curr.trim().split(" ");
    acc[key] = val;
    return acc;
  }, {});
  return swioOptionsToChartJs(chartDef, swioOptions);
}

function chartData(chartDef, str = "") {
  return str.split(",").reduce((acc, curr, index) => {
    const parts = reDataPointAttrs.exec(curr);
    if (parts) {
      acc.data.labels.push(parts[1]);
      acc.data.datasets[0].data.push(parts[2]);
      if (parts[3]) {
        acc.swio.colors.splice(index, 0, parts[3].trim());
      }
    }
    return acc;
  }, chartDef);
}

const chartTypeConfigurationFuncs = {
  bar: chartDef => {
    chartDef.options.legend = { display: false };
    return chartDef;
  },
  pie: chartDef => {
    chartDef.options.scales = {};
    return chartDef;
  },
  doughnut: chartDef => chartTypeConfigurationFuncs.pie(chartDef),
  line: chartDef => {
    const dataset = chartDef.data.datasets[0];
    dataset.fill = false;
    dataset.borderColor = chartDef.swio.colors[0];
    dataset.lineTension = 0;
    return chartDef;
  },
  area: chartDef => {
    const dataset = chartDef.data.datasets[0];
    dataset.backgroundColor = chartDef.swio.colors[0];
    dataset.lineTension = 0;
    return chartDef;
  }
};

function chartTypeConfiguration(chartDef) {
  const fn = chartTypeConfigurationFuncs[chartDef.swio.type];
  return fn ? fn(chartDef) : chartDef;
}

function chartColors(chartDef) {
  const dataset = chartDef.data.datasets[0];
  const { colors } = chartDef.swio;

  if (colors.length) {
    dataset.backgroundColor = colors;
  }
  return chartDef;
}

function chartArgs(chartDef, args = []) {
  const dataIsOnlyArg = args.length === 2 && args[0] === undefined;

  // No special options given, so just return the data
  if (dataIsOnlyArg) {
    return chartTypeConfiguration(chartColors(chartData(chartDef, args.pop())));
  }

  const firstArg = args[0].trim();

  if (firstArg === "with") {
    try {
      const otherArgs = args.pop();
      const [match, optionsStr, _, dataStr] = reData.exec(otherArgs);
      return chartTypeConfiguration(
        chartColors(chartOptions(chartData(chartDef, dataStr), optionsStr))
      );
    } catch (err) {
      console.log(err);
    }
  }

  return chartDef;
}

function emptyChartDefinition() {
  return {
    type: null,
    swio: { type: null, colors: colors.slice(0) },
    data: {
      datasets: [{ data: [] }],
      labels: []
    },
    options: {
      plugins: {},
      scales: {
        yAxes: [{}],
        xAxes: [{}]
      }
    }
  };
}

function cleanup(chartDef) {
  // return chartDef;
  const { swio, ...def } = chartDef;
  return def;
}

function buildChartJson(type, args) {
  let json = "";

  const chartDef = cleanup(
    chartArgs(chartType(emptyChartDefinition(), type), args)
  );
  
  console.log('chartdef', chartDef)

  try {
    json = JSON.stringify(chartDef);
  } catch (err) {
    json = "{}";
  }

  return json;
}

export default function transformChart(/*config*/) {
  return str => {
    const parts = reChart.exec(str);

    if (!parts) return str;

    const [_, chartType, ...chartArgs] = parts;
    const chartJson = buildChartJson(chartType, chartArgs);
    return `<div class="chart-wrapper"><canvas data-chart="${escape(
      chartJson
    )}"></canvas></div>`;
  };
}
