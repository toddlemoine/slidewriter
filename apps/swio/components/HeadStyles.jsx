import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Helmet } from "react-helmet";
import alignmentToFlex from "../../shared/helpers/alignmentToFlex";

@inject("metadataStore")
@observer
class HeadStyles extends Component {
  render() {
    const {
      headingFont,
      headingColor,
      headingAlignment,
      textFont,
      textColor,
      textAlignment,
      textWidth,
      fontsToImport,
      backgroundColor,
      backgroundImage,
      codeSettings,
      theme,
      useCustomText,
      useCustomHeadings,
      useCustomSlide,
      contentIsTopAligned
    } = this.props.metadataStore;
    return (
      <Helmet>
        <link
          data-custom-code
          rel="stylesheet"
          href={`/assets/hljs-styles/${codeSettings.theme}.css`}
        />
        <style data-code-styles type="text/css">
          {`
                .slide-content pre {
                  justify-content: ${alignmentToFlex(
                    codeSettings.blockAlignment
                  )} !important;
                }
                .slide-content code.hljs {
                    width: ${codeSettings.width}% !important;
                }
            `}
        </style>
        {theme && (
          <style
            data-custom-styles
            type="text/css"
          >{` @import '/themes/${theme}.css'; `}</style>
        )}
        {useCustomText && (
          <style data-custom-styles type="text/css">{`
            @import url('https://fonts.googleapis.com/css?family=${fontsToImport}');
            .slide p, .slide ul, .slide ol, .slide table {
                font-family: ${textFont} !important;
                color: ${textColor} !important;
                }
            .slide p, .slide-content>ul, .slide-content>ol {
                width: ${textWidth}% !important;
            }
            .slide p {
                text-align: ${textAlignment} !important;
                }
            #slide-0 p {
                text-align: inherit !important;
                }
            .slide-content>ol, .slide-content>ul {
            ${textWidth >= 90 ? "padding-left: 1em;" : ""}
            }
        `}</style>
        )}
        {useCustomHeadings && (
          <style data-custom-heading-styles type="text/css">{`
            @import url('https://fonts.googleapis.com/css?family=${fontsToImport}');
            .slide h1, .slide h2, .slide h3, .slide h4, .slide h5 {
                font-family: ${headingFont} !important;
                text-align: ${headingAlignment} !important;
                color: ${headingColor} !important;
                }
        `}</style>
        )}
        {useCustomSlide && (
          <style data-custom-slide type="text/css">
            {`
                .slide { background-color: ${backgroundColor} !important; }
            `}
          </style>
        )}
        {useCustomSlide &&
          contentIsTopAligned && (
            <style data-custom-content-position type="text/css">
              {`
                    .slide-content { justify-content: start !important; }
                    #slide-0 .slide-content { justify-content: center !important; }
                `}
            </style>
          )}
        {useCustomSlide &&
          backgroundImage && (
            <style data-custom-slide-background-image type="text/css">
              {`
                .presentation, .full-presentation {
                background-image: url('${backgroundImage}') !important;
                background-size: cover !important;
                }
            `}
            </style>
          )}
      </Helmet>
    );
  }
}

export default HeadStyles;
