/**
 * print and export sample for smith chart
 */
import * as React from "react";
import * as ReactDOM from "react-dom";
import { DropDownListComponent } from '@syncfusion/ej2-react-dropdowns';
import {
    SmithchartComponent, SmithchartSeriesCollectionDirective, SmithchartSeriesDirective, SmithchartTheme,
    ISmithchartLoadedEventArgs, SmithchartExportType, Inject, TooltipRender, SmithchartLegend
} from '@syncfusion/ej2-react-charts';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';
import { PropertyPane } from '../common/property-pane';
import { SampleBase } from '../common/sample-base';
// custom code start
const SAMPLE_CSS = `
    .control-fluid {
		padding: 0px !important;
    }
    #btn-control {
        width: 100%;
        text-align: center;
        text-transform:none !important;
    }
    .e-play-icon::before {
        content: "\\e728";
    }
    .e-play-icon::before {
        content: "\\e813";
    }`;
    // custom code end
export class Print extends SampleBase<{}, {}> {
    // Code for Property Panel
    private smithchartInstance: SmithchartComponent;
    private positionElement: HTMLInputElement;
    private mode: DropDownListComponent;
    private nameElement: HTMLInputElement;

    private droplist: { [key: string]: Object }[] = [
        { text: 'JPEG', value: 'JPEG' },
        { text: 'PNG', value: 'PNG' },
        { text: 'SVG', value: 'SVG' },
        { text: 'PDF', value: 'PDF' },
    ];

    public onClick2(e: Event): void {
        this.smithchartInstance.print();
    }
    public onClick1(e: Event): void {
        let fileName: string = (document.getElementById('fileName') as HTMLInputElement).value;
        this.smithchartInstance.export((this.mode.value as SmithchartExportType), fileName);
    }
    public load(args: ISmithchartLoadedEventArgs): void {
        let theme: string = location.hash.split('/')[1];
        theme = theme ? theme : 'Material';
        args.smithchart.theme = (theme.charAt(0).toUpperCase() + theme.slice(1)).
            replace(/-dark/i, "Dark") as SmithchartTheme;
    }
    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='col-md-8 control-section'>
                    <SmithchartComponent load={this.load.bind(this)} id='smith-chart' ref={gauge => this.smithchartInstance = gauge}
                        horizontalAxis={{ minorGridLines: { visible: true } }}
                        legendSettings={{ visible: true, shape: 'Circle' }}             //To config the legend for smithchart                        
                        radialAxis={{ minorGridLines: { visible: true } }}>
                        <Inject services={[TooltipRender, SmithchartLegend]} />
                        <SmithchartSeriesCollectionDirective>
                            <SmithchartSeriesDirective
                                points={[
                                    { resistance: 0.15, reactance: 0 }, { resistance: 0.15, reactance: 0.15 },
                                    { resistance: 0.18, reactance: 0.3 }, { resistance: 0.2, reactance: 0.4 },
                                    { resistance: 0.25, reactance: 0.6 }, { resistance: 0.38, reactance: 0.95 },
                                    { resistance: 0.6, reactance: 1.25 }, { resistance: 1, reactance: 1.6 },
                                    { resistance: 1.65, reactance: 1.9 }, { resistance: 2.75, reactance: 2 },
                                    { resistance: 4.5, reactance: 0 }, { resistance: 3, reactance: -2 },
                                    { resistance: 1.65, reactance: -1.95 }, { resistance: 1, reactance: -1.65 },
                                    { resistance: 0.6, reactance: -1.25 }, { resistance: 0.35, reactance: -0.9 },
                                    { resistance: 0.25, reactance: -0.6 }, { resistance: 0.25, reactance: -0.4 },
                                    { resistance: 0.25, reactance: -0.3 }, { resistance: 0.25, reactance: -0.15 },
                                    { resistance: 0.25, reactance: 0 },
                                ]}
                                name='Transmission' enableAnimation={true} tooltip={{ visible: true }}
                                marker={{ shape: 'Circle', visible: true, border: { width: 2 } }}>
                            </SmithchartSeriesDirective>
                        </SmithchartSeriesCollectionDirective>
                    </SmithchartComponent>
                </div>
                {/* Property Panel*/}
                <div className='col-md-4 property-section'>
                    <PropertyPane title='Properties'>
                        <table id='property' title='Properties' className='property-panel-table' style={{ width: '100%', marginBottom: '20px' }}>
                            <tr>
                                <td>
                                    <div>Export Type</div>
                                </td>
                                <td>
                                    <div>
                                        <DropDownListComponent id="mode" width="100px" index={0} placeholder="JPEG" ref={d => this.mode = d} dataSource={this.droplist} fields={{ text: 'text', value: 'value' }} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div>File Name</div>
                                </td>
                                <td>
                                    <div className="e-float-input" style={{ 'margin-top': '0px' }}>
                                        <input id="fileName" ref={d => this.nameElement = d} type="text" defaultValue="Smith chart" style={{ "width": "100px" }} />
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="btn-control" style={{ 'margin-left': '60px' }}>
                                        <ButtonComponent onClick={this.onClick1.bind(this)} style={{width: '80px'}} cssClass= 'e-info' isPrimary={true}>Export</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <div id="btn-control" style={{ 'margin-left': '60px' }}>
                                        <ButtonComponent onClick={this.onClick2.bind(this)} style={{width: '80px'}} cssClass= 'e-info' isPrimary={true}>Print</ButtonComponent>
                                    </div>
                                </td>
                            </tr>
                        </table>
                    </PropertyPane>
                </div>
                <div id="action-description">
                    <p>
                        This sample explores the exporting and printing functionality in Smith chart.
                    </p>
                </div>
                <div id="description">
                    <p>
                        In this example, you can see how to export and print the rendered Smith chart. Smith chart can be exported to JPEG, PNG, SVG, and PDF formats.
                     </p>
                </div>
            </div>
        )
    }
}