import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { PivotViewComponent, IDataOptions, IDataSet, VirtualScroll, Inject } from '@syncfusion/ej2-react-pivotview';
import { SampleBase } from '../common/sample-base';
import { ButtonComponent } from '@syncfusion/ej2-react-buttons';

/**
 * PivotView Default Sample.
 */

const SAMPLE_CSS = `
.e-pivotview {
    width: 100%;
    height: 100%;
}

.image {
    position: absolute;
    background-repeat: no-repeat;
    background-image: url('src/grid/images/spinner.gif');
    background-position: center;
    width: 16px;
    height: 28px;
}

.e-bigger .image {
    height: 36px;
}

#popup {
    position: absolute;
    background-color: transparent;
    display: none;
    z-index: 100;
}

#performanceTime {
    float: right;
    margin-top: 3px;
    margin-right: 27px;
}

.e-bigger #performanceTime{
    margin-top: 8px;
}`;

let dataSourceSettings: IDataOptions = {
    dataSource: [],
    enableSorting: false,
    expandAll: true,
    formatSettings: [{ name: 'Price', format: 'C0' }],
    rows: [{ name: 'ProductID' }],
    columns: [{ name: 'Year' }],
    values: [{ name: 'Price', caption: 'Unit Price' }, { name: 'Sold', caption: 'Unit Sold' }]
};

let customername: string[] = ['TOM', 'Hawk', 'Jon', 'Chandler', 'Monica', 'Rachel', 'Phoebe', 'Gunther',
    'Ross', 'Geller', 'Joey', 'Bing', 'Tribbiani', 'Janice', 'Bong', 'Perk', 'Green', 'Ken', 'Adams'];
let city: string[] = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'Austin',
    'San Francisco', 'Columbus', 'Washington', 'Portland', 'Oklahoma', 'Las Vegas', 'Virginia', 'St. Louis', 'Birmingham'];
let applyBtn: ButtonComponent;
let pivotGridObj: PivotViewComponent;
let date1: number;
let date2: number;
let isInit: boolean;
function data(count: number) {
    let result: Object[] = [];
    let dt: number = 0;
    for (let i: number = 1; i < (count + 1); i++) {
        dt++;
        let round: string;
        let toString: string = i.toString();
        if (toString.length === 1) {
            round = '0000' + (i);
        }
        else if (toString.length === 2) {
            round = '000' + i;
        }
        else if (toString.length === 3) {
            round = '00' + i;
        } else if (toString.length === 4) {
            round = '0' + i;
        } else {
            round = toString;
        }
        result.push({
            ProductID: 'PRO-' + round,
            City: city[Math.round(Math.random() * city.length)] || city[0],
            Year: "FY " + (dt + 2013),
            CustomerName: customername[Math.round(Math.random() * customername.length)] || customername[0],
            Price: Math.round(Math.random() * 5000) + 5000,
            Sold: Math.round(Math.random() * 80) + 10,
        });
        if (dt / 4 == 1) {
            dt = 0;
        }
    }
    return result;
};

function show(): void {
    document.getElementById('popup').style.display = 'inline-block';
};

export class VirtualScrolling extends SampleBase<{}, {}> {

    onClick(args: any): void {
        show();
        isInit = true;
        pivotGridObj.dataSourceSettings.dataSource = data(100000) as IDataSet[];
        date1 = new Date().getTime();
    }

    onDataBound(): void {
        if (date1 && isInit) {
            date2 = new Date().getTime();
            document.getElementById('performanceTime').innerHTML = 'Time Taken: ' + (date2 - date1) / 1000 + ' sec';
        }
        isInit = false;
        applyBtn.disabled = true;
        document.getElementById('popup').style.display = 'none';
    }

    render() {
        return (
            <div className='control-pane'>
                <style>
                    {SAMPLE_CSS}
                </style>
                <div className='control-section'>
                    <div id="btn-control" style={{ marginBottom: '5px' }}>
                        <ButtonComponent id='apply' className='e-info' ref={(scope) => { applyBtn = scope; }} onClick={this.onClick.bind(this)} isPrimary={true}>Load 100K Data</ButtonComponent>
                        <span id="popup">
                            <span id="gif" className="image"></span>
                        </span>
                        <span id="performanceTime">Time Taken: 0 sec</span>
                    </div>
                    <PivotViewComponent id='PivotView' ref={(pivotview) => { pivotGridObj = pivotview }} dataSourceSettings={dataSourceSettings} enableVirtualization={true} width={860} height={300}
                        gridSettings={{ columnWidth: 140 }} dataBound={this.onDataBound}>
                        <Inject services={[VirtualScroll]} />
                    </PivotViewComponent>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates virtual scrolling option available vertically and horizontally to load large records with ease.</p>
                </div>
                <div id="description">
                    <p>The pivot grid widget provides an optimized way to render rows and columns inside the view-port alone without calculating the value of the entire pivot.
                        To enable virtual scrolling, set <code> enableVirtualization</code> property to true.
                    </p>
                    <p>
                        <strong>NOTE:</strong> The <code> height</code> and <code> width</code> properties must be defined when enabling virtual
                        scrolling option.
                    </p>
                    <br />
                    <p>
                        <strong>Injecting Module:</strong>
                    </p>
                    <p>
                        The pivotgrid widget features are segregated into individual modules. To use the virtual scrolling option, inject
                        <code> VirtualScroll</code> module using the
                        <code> services</code> tag.
                    </p>
                </div>
            </div>
        )
    }
}