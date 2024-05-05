import fscreen from 'fscreen';
import React, { Component } from 'react';
import Chart from 'chart.js';
import dataLabelsPlugin from 'chartjs-plugin-datalabels';
import bestChartFontSize from '../helpers/bestChartFontSize';
import {
    swatches,
    defaultAnimationDuration,
} from '../constants/chartConstants';
import './Slide.css';

class Slide extends Component {
    componentDidMount() {
        fscreen.addEventListener('fullscreenchange', this.helpImages);
    }
    componentWillUnmount() {
        fscreen.removeEventListener('fullscreenchange', this.helpImages);
    }
    componentDidUpdate() {
        this.highlightCode();
        this.helpImages();
        this.addChart();
    }

    setBackgroundImageOnNode(node, url) {
        node.style['backgroundImage'] = `url(${url})`;
    }

    addChart = () => {
        const { chartSettings } = this.props;
        const chartScripts = this.node.querySelectorAll('[data-chart]');

        Array.from(chartScripts).forEach(node => {
            let json;
            try {
                json = JSON.parse(node.getAttribute('data-chart'));
            } catch (err) {
                json = {};
            }

            // Set dataset options.
            const usePatterns =
                json.options.patterns !== 'off' &&
                (chartSettings.patterns || json.options.patterns === 'on');

            json.data.datasets.forEach(set => {
                set.borderWidth = 0;
                if (usePatterns) {
                    set.backgroundColor = swatches;
                }
            });

            // Set chart options
            const transparent = 'rgba(0,0,0,0)';
            const usesGridLines = !/pie|doughnut/.test(json.type);
            const wrapper = node.parentNode;

            // Default font settings
            Chart.defaults.global.defaultFontSize = bestChartFontSize(
                wrapper.offsetHeight,
            );
            Chart.defaults.global.defaultFontColor = 'rgba(0,0,0,.8)';
            // Tooltip defaults
            Chart.defaults.global.tooltips.enabled = false;
            // Line
            Chart.defaults.line.lineTension = 0;
            // Datalabels
            Chart.defaults.global.plugins.datalabels = {
                borderRadius: 0,
                backgroundColor: '#000',
                color: '#fff',
                font: {
                    weight: 'bold',
                },
                padding: 5,
            };

            json.options.responsive = false;

            // Legend position
            if (!json.options.legend) {
                json.options.legend = {
                    display: chartSettings.legend !== 'off',
                    position: chartSettings.legend,
                };
            }

            // Animations
            if (!json.options.animation) {
                json.options.animation = {
                    duration: chartSettings.animation
                        ? defaultAnimationDuration
                        : 0,
                };
            }

            if (usesGridLines) {
                json.options.scales.xAxes[0].gridLines = {
                    color: transparent,
                };
            }

            if (this.props.isDarkTheme) {
                Chart.defaults.global.defaultFontColor = 'white';
                if (usesGridLines) {
                    json.options.scales.yAxes[0].gridLines = {
                        color: 'rgba(255,255,255,.1)',
                    };
                }
            }

            json.plugins = [dataLabelsPlugin];
            if (!json.options.plugins.datalabels) {
                json.options.plugins.datalabels = {
                    display: chartSettings.datalabels,
                };
            }

            node.setAttribute('height', wrapper.offsetHeight);
            node.setAttribute('width', wrapper.offsetWidth);

            try {
                return new Chart(node, json);
            } catch (err) {
                console.log(err);
            }
        });
    };

    helpImages = () => {
        const images = this.node.querySelectorAll('img');
        Array.from(images)
            .map(img => img.parentNode)
            .forEach(node => {
                const originalOverflow = node.style.overflow;
                node.style.overflow = 'hidden';
                node.style.height = node.clientHeight;
                node.style.overflow = originalOverflow;
            });
    };

    highlightCode = () => {
        const codeElements = this.node.querySelectorAll('pre code');
        Array.from(codeElements).forEach(el => hljs.highlightBlock(el));
    };

    setRef = node => {
        this.node = node;
    };

    render() {
        return (
            <div
                id={`slide-${this.props.current}`}
                ref={this.setRef}
                className="slide"
            >
                <div className="slide-upper-padding" />
                <div
                    className="slide-content"
                    dangerouslySetInnerHTML={{ __html: this.props.html }}
                />
                <div className="slide-lower-padding" />
            </div>
        );
    }
}

Slide.defaultProps = {
    current: 0,
    html: '',
};

export default Slide;
