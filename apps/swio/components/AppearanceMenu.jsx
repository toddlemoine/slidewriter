import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import TabList from "./TabList";
import Tab from "./Tab";
import AppearanceSettingsTabPanel from "./AppearanceSettingsTabPanel";
import ThemeSettings from "./appearance/ThemeSettings";
import SlideSettings from "./appearance/SlideSettings";
import TextSettings from "./appearance/TextSettings";
import HeadingSettings from "./appearance/HeadingSettings";
import CodeSettings from "./appearance/CodeSettings";
import "./AppearanceMenu.css";

function getProps({ store }) {
  return {
    selectedPanel: store.activeAppearancePanel,
    switchAppearancePanels: store.switchAppearancePanels
  };
}

@inject(getProps)
@observer
class AppearanceMenu extends Component {
  tabs = Object.entries({
    theme: ["Theme", <ThemeSettings />],
    slides: ["Slides", <SlideSettings />],
    headings: ["Headings", <HeadingSettings />],
    text: ["Text", <TextSettings />],
    code: ["Code Blocks", <CodeSettings />]
  });

  handleTabClick = () => {};

  renderPanels() {
    const { selectedPanel } = this.props;
    return this.tabs.map(([id, [label, content]]) => {
      return (
        <AppearanceSettingsTabPanel
          key={id}
          id={`appearance-${id}-panel`}
          heading={`${label} Settings`}
          hidden={id !== selectedPanel}
        >
          {content}
        </AppearanceSettingsTabPanel>
      );
    });
  }

  renderTabs() {
    return (
      <TabList>
        {this.tabs.map(([id, [label, _]]) => (
          <Tab
            id={id}
            onClick={this.props.switchAppearancePanels}
            key={id}
            selected={id === this.props.selectedPanel}
            controls={`appearance-${id}-panel`}
          >
            {label}
          </Tab>
        ))}
      </TabList>
    );
  }

  render() {
    return (
      <section className="appearance-menu">
        {this.renderTabs()}
        {this.renderPanels()}
      </section>
    );
  }
}

export default AppearanceMenu;
