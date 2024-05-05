import camelCase from "lodash.camelcase";
import sortBy from "lodash.sortby";
import groupBy from "lodash.groupby";
import { action, autorun, computed, observable, runInAction } from "mobx";
import capitalize from "../helpers/capitalize.js";
import contrastColor from "../helpers/contrastColor.js";
import sanitizeStyle from "../helpers/sanitizeStyle.js";
import themes from "../themes";

const DEFAULT_HEADING_COLOR = "black";
const DEFAULT_TEXT_COLOR = "black";
const modes = ["manual", "slide", "presentation"];
const [MANUAL, SLIDE, PRESENTATION] = modes;
const units = ["s", "m", "h"];
const [SECONDS, MINUTES, HOURS] = units;
const FONT_SCALE_FACTOR = 14;
const ASPECT_RATIO_HD = 16 / 9;
const BG_NONE = "none";
const BG_FILL = "fill";
const alignmentFlexStyles = {
  left: "flex-start",
  center: "center",
  right: "flex-end"
};
const CODE_THEME_DEFAULT = "default";

const defaultTheme = themes.find(x => x.default);

function getTheme(id) {
  const theme = themes.find(t => id === t.id);
  return theme || defaultTheme;
}

function defaultMetadata() {
  return {
    title: "",
    playbackMode: MANUAL,
    slideDuration: 30,
    slideUnit: SECONDS,
    presentationDuration: 5,
    presentationUnit: MINUTES,
    headingFont: defaultTheme.heading.font,
    headingAlignment: defaultTheme.heading.alignment,
    headingColor: defaultTheme.heading.color,
    textFont: defaultTheme.text.font,
    textAlignment: defaultTheme.text.alignment,
    textWidth: defaultTheme.text.width,
    textColor: defaultTheme.text.color,

    // Code
    codeWidth: defaultTheme.code.width,
    codeTheme: CODE_THEME_DEFAULT,
    codeBlockAlignment: defaultTheme.code.blockAlignment,

    backgroundColor: defaultTheme.slide.backgroundColor,
    backgroundImage: defaultTheme.slide.backgroundImage,
    contentPosition: defaultTheme.slide.contentPosition,
    theme: defaultTheme.id,
    fontScaleFactor: FONT_SCALE_FACTOR,
    // Footer
    footerText: "",
    footerBackground: BG_NONE, // none | fill
    footerBackgroundColor: "",
    footerIcon: "",
    footerAlignment: "right",
    footerOpacity: 1,
    
    // Chart
    chartPatterns: false,
    chartLegend: 'right', // top, bottom, left, right, off
    chartAnimation: false,
    chartDatalabels: false
  };

}

class MetadataStore {
  @observable metadata = defaultMetadata(); 
  @observable width = 0;
  @observable aspectRatio = ASPECT_RATIO_HD;
  @observable draggingTextWidthRange = false;
  @observable draggingCodeWidthRange = false;

  defaultFontScaleFactor = FONT_SCALE_FACTOR;
  availableHeight = 0;
  screenHeight = 0;

  constructor(hub) {
    this.hub = hub;
    autorun(() => {
      this.setPropsFromMetadata(hub.presentation.metadata);
    });
  }

  asJS() {
    const props = Object.keys(this.metadata);

    return props.reduce((acc, curr) => {
      acc[curr] = this.metadata[curr];
      return acc;
    }, {});
  }

  
  @action
  setPropsFromMetadata(metadata) {
    runInAction(() => {
      const newMetadata = { ...defaultMetadata(), ...metadata }
      console.log('new metadata', newMetadata)
      this.metadata = newMetadata;
    });
  }

  save = () => {
    this.hub.saveMetadata(this.metadata);
  };
  
  @action 
  setTitle = title => {
    this.metadata.title = title;
    this.save();
  }

  @action
  setPlayback = mode => {
    this.metadata.playbackMode = mode;
    this.save();
  };

  @action
  setDuration = (duration, unit) => {
    if (this.metadata.playbackMode === SLIDE) {
      this.metadata.slideDuration = duration;
      this.metadata.slideUnit = unit;
    }

    if (this.metadata.playbackMode === PRESENTATION) {
      this.metadata.presentationDuration = duration;
      this.metadata.presentationUnit = unit;
    }

    this.save();
  };
  
  @action 
  setChartProperty = (key, val) => {
    const prop = camelCase(`chart ${key}`);
    this.metadata[prop] = val;
    this.save();
  };

  @computed
  get playbackSettings() {
    const mode = this.metadata.playbackMode;

    if (mode === SLIDE)
      return {
        mode,
        duration: this.metadata.slideDuration,
        unit: this.metadata.slideUnit
      };

    if (mode === PRESENTATION)
      return {
        mode,
        duration: this.metadata.presentationDuration,
        unit: this.metadata.presentationUnit
      };

    return { mode };
  }

  @computed
  get isManualPlayback() {
    return this.metadata.playbackMode === MANUAL;
  }

  @computed
  get isSlidePlayback() {
    return this.metadata.playbackMode === SLIDE;
  }

  @computed
  get isPresentationPlayback() {
    return this.metadata.playbackMode === PRESENTATION;
  }

  @computed
  get playbackEnabled() {
    if (this.metadata.playbackMode === SLIDE)
      return this.metadata.slideDuration !== "";
    if (this.metadata.playbackMode === PRESENTATION)
      return this.metadata.presentationDuration !== "";
    return true;
  }

  @action
  setTheme = id => {
    const theme = themes.find(t => t.id === id);
    
    if (theme.fontScaleFactor) {
      this.metadata.fontScaleFactor = theme.fontScaleFactor;
    }

    this.metadata.textFont = theme.text.font;
    this.metadata.textColor = theme.text.color || '';
    this.metadata.textAlignment = theme.text.alignment;
    this.metadata.textWidth = theme.text.width;

    this.metadata.headingFont = theme.heading.font;
    this.metadata.headingColor = theme.heading.color || '';
    this.metadata.headingAlignment = theme.heading.alignment;

    this.metadata.backgroundColor = theme.slide.backgroundColor || '';
    this.metadata.backgroundImage = theme.slide.backgroundImage || "";

    this.metadata.theme = id;
    this.save();
  };

  @action
  setHeadingStyle = (style, val) => {
    const prop = camelCase(`heading ${style}`);
    this.metadata[prop] = sanitizeStyle(val);
    this.save();
  };

  @action
  setTextStyle = (style, val) => {
    const prop = camelCase(`text ${style}`);
    let safeVal = sanitizeStyle(val);
    this.metadata[prop] = safeVal;
    this.save();
  };

  @action
  setCodeStyle = (style, val) => {
    const prop = camelCase(`code ${style}`);
    let safeVal = sanitizeStyle(val);
    this.metadata[prop] = safeVal;
    this.save();
  };

  @action
  toggleSettingCodeWidth = state => {
    this.draggingCodeWidthRange = Boolean(state);
  };

  @action
  setContentPosition = pinToTop => {
    this.metadata.contentPosition = pinToTop ? "top" : "center";
    this.save();
  };

  @action
  setBackgroundColor = val => {
    this.metadata.backgroundColor = sanitizeStyle(val);
    this.save();
  };

  @action
  setBackgroundImage = val => {
    this.metadata.backgroundImage = sanitizeStyle(val);
    this.save();
  };

  @action
  setTextColor = val => {
    this.metadata.textColor = val === null ? "" : val;
    this.save();
  };

  @action
  resize = (width, screenHeight, availableHeight) => {
    this.screenHeight = screenHeight;
    this.availableHeight = availableHeight;
    this.width = width;
  };

  @action
  setFontScaleFactor = factor => {
    this.metadata.fontScaleFactor = -factor;
    this.save();
  };

  @action
  toggleSettingTextWidth = state => {
    this.draggingTextWidthRange = Boolean(state);
  };

  @action
  setFooterProperty = (prop, value) => {
    this.metadata[`footer${capitalize(prop)}`] = value;
    this.save();
  };

  @computed
  get fontSize() {
    return this.height / this.metadata.fontScaleFactor;
  }

  aspectHeight(width) {
    return width / this.aspectRatio;
  }

  @computed
  get height() {
    return Math.min(this.width / this.aspectRatio, this.screenHeight);
  }

  // @TODO: Remove this block, should be covered by new Presentation.jsx
  styles = width => {
    if (width) {
      let height = width / this.aspectRatio;
      return {
        width,
        height,
        fontSize: height / this.metadata.fontScaleFactor
      };
    }

    if (!this.height || this.height > this.availableHeight) {
      return {
        width: this.availableHeight * this.aspectRatio,
        height: this.availableHeight,
        fontSize: this.availableHeight / this.metadata.fontScaleFactor
      };
    }

    return {
      height: this.height,
      fontSize: this.height / this.metadata.fontScaleFactor
    };
  };
  
  @computed
  get title() {
    return this.metadata.title || 'Untitled';
  }

  @computed
  get useCustomHeadings() {
    const theme = getTheme(this.metadata.theme);
    const headingMap = Object.entries(this.metadata)
      .filter(([key, _]) => key.startsWith("heading"))
      .map(([key, val]) => [key.replace("heading", "").toLowerCase(), val]);

    const hasCustomStyles = headingMap.find(
      ([key, val]) => theme.heading[key] !== val
    );

    return Boolean(hasCustomStyles);
  }

  @computed
  get useCustomSlide() {
    const theme = getTheme(this.metadata.theme);
    const settings = Object.entries(this.metadata)
      .filter(([key, _]) => key.startsWith("slide"))
      .map(([key, val]) => [key.replace("slide", "").toLowerCase(), val]);

    const hasCustomStyles = settings.find(
      ([key, val]) => theme.slide[key] !== val
    );

    return Boolean(hasCustomStyles);
  }

  @computed
  get useCustomText() {
    const theme = getTheme(this.metadata.theme);
    const settings = Object.entries(this.metadata)
      .filter(([key, _]) => key.startsWith("text"))
      .map(([key, val]) => [key.replace("text", "").toLowerCase(), val]);

    const hasCustomStyles = settings.find(
      ([key, val]) => theme.text[key] !== val
    );

    return Boolean(hasCustomStyles);
  }
  @computed
  get themes() {
    const result = groupBy(sortBy(themes, "name"), 'type');
    console.log('themes', result);
    return result; 
  }

  @computed
  get fontScaleFactorForRangeSlider() {
    return -this.metadata.fontScaleFactor;
  }

  @computed
  get fontsToImport() {
    const fonts = new Set(
      [this.metadata.headingFont, this.metadata.textFont].filter(Boolean)
    );
    return Array.from(fonts)
      .map(f => f.replace(" ", "+") + ":400,700")
      .join("|");
  }

  @computed
  get contentIsTopAligned() {
    return this.metadata.contentPosition === "top";
  }

  @computed
  get fullPresentationProps() {
    return {
      playbackSettings: this.playbackSettings,
      theme: this.metadata.theme,
      isDarkTheme: this.isDarkTheme,
      fontScaleFactor: this.metadata.fontScaleFactor,
      footer: this.footerProps,
      chart: this.chartProps
    };
  }
  
  @computed
  get chartProps() {
    return {
      animation: this.metadata.chartAnimation,
      legend: this.metadata.chartLegend,
      patterns: this.metadata.chartPatterns,
      datalabels: this.metadata.chartDatalabels
    };
  }

  // Theme and general presentation
  @computed
  get theme() {
    return this.metadata.theme;
  }
  @computed
  get fontScaleFactor() {
    return this.metadata.fontScaleFactor;
  }

  // Text
  @computed
  get textFont() {
    return this.metadata.textFont;
  }
  @computed
  get textColor() {
    return this.metadata.textColor;
  }
  @computed
  get textWidth() {
    return this.metadata.textWidth;
  }
  @computed
  get textAlignment() {
    return this.metadata.textAlignment;
  }

  // Code
  get codeTheme() {
    return this.metadata.codeTheme;
  }

  // Heading
  @computed
  get headingFont() {
    return this.metadata.headingFont;
  }
  @computed
  get headingColor() {
    return this.metadata.headingColor;
  }
  @computed
  get headingAlignment() {
    return this.metadata.headingAlignment;
  }

  // Slide settings
  @computed
  get backgroundColor() {
    return this.metadata.backgroundColor;
  }
  @computed
  get backgroundImage() {
    return this.metadata.backgroundImage;
  }
  @computed
  get contentPosition() {
    return this.metadata.contentPosition;
  }

  // Playback settings
  @computed
  get playbackMode() {
    return this.metadata.playbackMode;
  }
  @computed
  get slideDuration() {
    return this.metadata.slideDuration;
  }
  @computed
  get slideUnit() {
    return this.metadata.slideUnit;
  }
  @computed
  get presentationDuration() {
    return this.metadata.presentationDuration;
  }
  @computed
  get presentationUnit() {
    return this.metadata.presentationUnit;
  }

  // Footer settings
  @computed
  get footerBackgroundColor() {
    const color = this.metadata.footerBackgroundColor;
    return color === "none" ? "transparent" : color;
  }
  @computed
  get footerText() {
    return this.metadata.footerText;
  }
  @computed
  get footerAlignment() {
    return this.metadata.footerAlignment;
  }
  @computed
  get footerIcon() {
    return this.metadata.footerIcon;
  }
  @computed
  get footerOpacity() {
    return this.metadata.footerOpacity;
  }
  @computed
  get footerStyles() {
    const { metadata } = this;
    const backgroundColor = this.hasFooterBackgroundColor
      ? metadata.footerBackgroundColor
      : "";
    return {
      opacity: metadata.footerOpacity,
      backgroundColor,
      justifyContent: alignmentFlexStyles[metadata.footerAlignment]
    };
  }
  @computed
  get hasFooterBackgroundColor() {
    return this.metadata.footerBackground !== "none";
  }

  @computed
  get footerBrightness() {
    const backgroundColor = this.hasFooterBackgroundColor
      ? this.metadata.footerBackgroundColor
      : this.metadata.backgroundColor;
    return contrastColor(backgroundColor);
  }

  @computed
  get footerProps() {
    const { metadata } = this;
    const backgroundColor = this.hasFooterBackgroundColor
      ? metadata.footerBackgroundColor
      : "transparent";
    return {
      icon: metadata.footerIcon,
      alignment: metadata.footerAlignment,
      text: metadata.footerText,
      backgroundColor,
      opacity: metadata.footerOpacity,
      brightness: this.footerBrightness
    };
  }

  @computed
  get codeSettings() {
    const { metadata } = this;
    return {
      width: metadata.codeWidth,
      theme: metadata.codeTheme,
      blockAlignment: metadata.codeBlockAlignment
    };
  }
  
  @computed
  get isDarkTheme() {
    const theme = getTheme(this.metadata.theme);
    return theme.type === 'dark';
  }
}

export default MetadataStore;
