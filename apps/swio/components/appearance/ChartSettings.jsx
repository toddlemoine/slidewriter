import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Field from "../../../shared/components/Field";
import dattr from "../../helpers/dattr";
import Fieldset from "../Fieldset";
import CheckboxField from "../CheckboxField";
import HelpText from "../../../shared/components/HelpText";

function props({ metadataStore }) {
  return {
    setChartProperty: metadataStore.setChartProperty,
    animation: metadataStore.metadata.chartAnimation,
    patterns: metadataStore.metadata.chartPatterns,
    legend: metadataStore.metadata.chartLegend,
    datalabels: metadataStore.metadata.chartDatalabels
  };
}

@inject(props)
@observer
class ChartSettings extends Component {
  handleLegendChange = e => {
    this.props.setChartProperty("legend", e.target.value);
  };

  handleAnimationChange = e => {
    this.props.setChartProperty("animation", e.target.checked);
  };

  handlePatternChange = e => {
    this.props.setChartProperty("patterns", e.target.checked);
  };

  handleDatalabelsChange = e => {
    this.props.setChartProperty("datalabels", e.target.checked);
  };

  render() {
    const { legend, animation, patterns, datalabels } = this.props;
    return (
      <Fieldset legend="Charts" className="chart-settings">
        <HelpText>
          Set default chart settings below. These can be overridden per-chart by
          specifying options on the chart's line in your slides.
        </HelpText>
        <Field label="Legend" htmlFor="chart-settings-legend">
          <select
            name="chart-settings-legend"
            id="chart-settings-legend"
            value={legend}
            onChange={this.handleLegendChange}
          >
            <option value="top">Top</option>
            <option value="bottom">Bottom</option>
            <option value="left">Left</option>
            <option value="right">Right</option>
            <option value="off">Hidden</option>
          </select>
        </Field>
        <Field label="Show data labels" htmlFor="chart-settings-datalabels">
          <input
            id="chart-settings-datalabels"
            type="checkbox"
            onChange={this.handleDatalabelsChange}
            checked={datalabels}
          />
        </Field>
        <Field label="Use patterns" htmlFor="chart-settings-patterns">
          <input
            id="chart-settings-patterns"
            type="checkbox"
            onChange={this.handlePatternChange}
            checked={patterns}
          />
        </Field>
        <Field label="Animate charts" htmlFor="chart-settings-animation">
          <input
            id="chart-settings-animation"
            type="checkbox"
            onChange={this.handleAnimationChange}
            checked={animation}
          />
        </Field>
      </Fieldset>
    );
  }
}

export default ChartSettings;
