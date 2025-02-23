/**
 * Sample for Range Area Series
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import {
    ChartComponent, SeriesCollectionDirective, DateTime, SeriesDirective, Inject,
    Category, RangeAreaSeries, ILoadedEventArgs, ISeriesRenderEventArgs, Zoom, ChartTheme
} from '@syncfusion/ej2-react-charts';
import { SampleBase } from '../common/sample-base';
import { Browser } from '@syncfusion/ej2-base';

let series1: Object[] = [];
let value: number = 35;
let point1: Object;

for (let i: number = 1; i < 100; i++) {
    if (Math.random() > .5) {
        value += Math.random();
    } else {
        value -= Math.random();
    }
    point1 = { x: new Date(2017, 1, 1 + i), high: value, low: value - 10 };
    series1.push(point1);
}

const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
	}`;
export class RangeArea extends SampleBase<{}, {}> {
    private chartInstance: ChartComponent;

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <ChartComponent id='charts' ref={chart => this.chartInstance = chart} style={{ textAlign: "center" }}
                        load={this.load.bind(this)}
                        seriesRender={this.seriesRender.bind(this)}
                        primaryXAxis={{
                            valueType: 'DateTime',
                            edgeLabelPlacement: 'Shift',
                            majorGridLines: { width: 0 }
                        }}
                        legendSettings={{ visible: false }}
                        zoomSettings={{
                            enableSelectionZooming: true,
                            mode: 'X'
                        }}
                        primaryYAxis={
                            {
                                labelFormat: '{value}˚C',
                                lineStyle: { width: 0 },
                                majorTickLines: { width: 0 }
                            }}
                        chartArea={{ border: { width: 0 } }}
                        width={Browser.isDevice ? '100%' : '80%'}
                        title='Temperature Variation' loaded={this.onChartLoad.bind(this)}>
                        <Inject services={[RangeAreaSeries, Category, DateTime, Zoom]} />
                        <SeriesCollectionDirective>
                            <SeriesDirective dataSource={series1} border={{
                                width: 2
                            }} xName='x' high='high' opacity={0.4}
                                marker={{
                                    visible: false,
                                    height: 8, width: 8, opacity: 1,
                                    dataLabel: { visible: false, position: 'Outer' }
                                }} low='low' animation={{ enable: true }} name='India' type='RangeArea'>
                            </SeriesDirective>
                        </SeriesCollectionDirective>
                    </ChartComponent>
                </div>
                <div id="action-description">
                <p>
                This sample visualizes the maximum and minimum temperatures  of different months with default range area series in the chart. Zoom the chart to check the temperature for week or day.
            </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to render and configure the range area type charts.
                       You can use <code>border</code>, <code>fill</code> properties to customize the vertical rect. <code>dataLabel</code> is used to represent individual data and its value.
                   </p>
                    <p>
                        Tooltip is enabled in this example, to see the tooltip in action, hover a point or tap on a point in touch enabled devices.
                   </p>
                    <br></br>
                    <p><b>Injecting Module</b></p>
                    <p>
                        Chart component features are segregated into individual feature-wise modules. To use RangeArea series, we need to inject
                       <code>RangeAreaSeries</code> module into <code>services</code>.
                  </p>
                    <p>
                        More information on the range area series can be found in this &nbsp;
                      <a target="_blank" href="http://ej2.syncfusion.com/react/documentation/chart/api-series.html#type-chartseriestype">documentation section</a>.
                  </p>
                </div>
            </div>
        )
    }
    public onChartLoad(args: ILoadedEventArgs): void {
        let chart: Element = document.getElementById('charts');
        chart.setAttribute('title', '');
    };
        
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = (selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark") as ChartTheme;
    };
        
    public seriesRender(args: ISeriesRenderEventArgs) {
        var areathemes = ['bootstrap5', 'bootstrap5dark', 'tailwind', 'tailwinddark', 'material', 'materialdark', 'bootstrap4', 'bootstrap', 'bootstrapdark', 'fabric', 'fabricdark', 'highcontrast'];
        var borderColor = ['#262E0B', '#5ECB9B', '#5A61F6', '#8B5CF6', '#00bdae', '#9ECB08', '#a16ee5', '#a16ee5', '#a16ee5', '#4472c4', '#4472c4', '#79ECE4'];
        args.series.border.color = borderColor[areathemes.indexOf(args.series.chart.theme.toLowerCase())];
    }
}
