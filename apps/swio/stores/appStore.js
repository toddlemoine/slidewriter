import { action, computed, observable, autorun } from "mobx";
import { SHOW_HELP } from "../constants.js";
import Listener from "../listener.js";

// Order in which panels appear in the UI
const panels = ["slides", "styles", "footer", "playback"];

const [SLIDES_PANEL, STYLES_PANEL, FOOTER_PANEL, PLAYBACK_PANEL] = panels;

class AppStore {
  @observable activePanel = SLIDES_PANEL;
  @observable showFiles = false;
  @observable showKeyboardHelp = false;
  @observable showGeneralHelp = false;
  @observable showWhatsNew = false;
  @observable showAbout = false;
  @observable showMailingList = false;
  @observable preview = false;
  @observable isDragging = false;

  constructor(hub) {
    autorun(() => this.initializeAfterNewPresentation(hub.presentation.metadata))
    this.listener = new Listener();
    this.listener.simple_combo(
      SHOW_HELP[0],
      this.handleShowGeneralHelpCombo
    );
  }
  
  initializeAfterNewPresentation(metadata) {
    this.showFiles = false;
    this.switchPanels(SLIDES_PANEL);
  }

  handleShowGeneralHelpCombo = () => {
    this.toggleGeneralHelp(true);
  };

  toJS() {
    return {
      activePanel: this.activePanel
    };
  }

  @action
  switchPanels = panel => {
    this.activePanel = panel;
  };
  
  nextPanelIn(collection, current) {
    const indexOfCurrentPanel = collection.indexOf(current);
    return collection[indexOfCurrentPanel + 1] || collection[0];
  }

  previousPanelIn(collection, current) {
    const indexOfCurrentPanel = collection.indexOf(current);
    return collection[indexOfCurrentPanel - 1] || collection[collection.length - 1];
  }

  @action
  switchToNextPanel = () => {
    const nextPanel = this.nextPanelIn(panels, this.activePanel); 
    this.switchPanels(nextPanel);
  };

  @action
  switchToPreviousPanel = () => {
    const previousPanel = this.previousPanelIn(panels, this.activePanel);
    this.switchPanels(previousPanel);
  };

  resetSidePanels = () => {
    this.showGeneralHelp = false;
    this.showKeyboardHelp = false;
    this.showWhatsNew = false;
  };

  @action
  toggleWhatsNew = state => {
    this.resetSidePanels();
    this.showWhatsNew = state;
  };

  @action
  toggleKeyboardHelp = state => {
    this.resetSidePanels();
    this.showKeyboardHelp = state;
  };

  @action
  toggleGeneralHelp = state => {
    this.resetSidePanels();
    this.showGeneralHelp = state;
  };

  @action
  toggleAbout = state => {
    this.showAbout = state;
  };
  
  @action 
  toggleFiles = state => {
    this.showFiles = state;
  }

  @action 
  togglePreview = () => {
    this.preview = !this.preview;
    requestAnimationFrame(() => window.dispatchEvent(new Event('resize')));
  }

  @action 
  toggleDropzone = (state) => {
    this.isDragging = state;
  }
  
  @action toggleMailingList = (state) => {
    this.showMailingList = state;
  }

  @computed
  get numberofslides() {
    return this.slides.length;
  }

  @computed
  get sourcePanelActive() {
    return this.activePanel === SLIDES_PANEL;
  }

  @computed
  get stylesPanelActive() {
    return this.activePanel === STYLES_PANEL;
  }

  @computed
  get playbackPanelActive() {
    return this.activePanel === PLAYBACK_PANEL;
  }

  @computed
  get footerPanelActive() {
    return this.activePanel === FOOTER_PANEL;
  }

  @computed
  get isPreviewing() {
    return Boolean(this.preview);
  }

}

export default AppStore;
