import * as ReactDOM from 'react-dom';
import * as React from 'react';
import { SampleBase } from '../common/sample-base';
import { PropertyPane } from '../common/property-pane';
import {CheckBoxComponent, ChangeEventArgs} from '@syncfusion/ej2-react-buttons';
import { FileManagerComponent, Inject, NavigationPane, Toolbar } from '@syncfusion/ej2-react-filemanager';

const defaultcss = `
#all-property-table .property-panel-section .property-panel-content table#property tr {
    height: 50px;
}`

/**
 * File Manager API sample
 */
export class Default extends SampleBase<{},{}> {

    private hostUrl: string = "https://ej2-aspcore-service.azurewebsites.net/";
    public fmObj: FileManagerComponent;

    public toolCheck(args: ChangeEventArgs): void {
        this.fmObj.toolbarSettings.visible = args.checked;
    }

    public render(): JSX.Element {
        return(
            <div>
                <style>{defaultcss}</style>
                <div className="col-lg-8 control-section">
                    <FileManagerComponent id="api_filemanager" ref={(scope) => { this.fmObj = scope; }}
                     ajaxSettings = {{
                        url: this.hostUrl + "api/FileManager/FileOperations",
                        getImageUrl: this.hostUrl + "api/FileManager/GetImage",
                        uploadUrl: this.hostUrl + 'api/FileManager/Upload',
                        downloadUrl: this.hostUrl + 'api/FileManager/Download'
                    }}
                    view = {"LargeIcons"}
                    navigationPaneSettings={{visible: false}}>
                <Inject services={[ NavigationPane, Toolbar]} />
                    </FileManagerComponent>
                </div>
                <div id="all-property-table" className='col-lg-4 property-section'>
                <PropertyPane title='Properties'>
                <table id="property" title="Properties" className='property-panel-table' style={{ width: "100%" }}>
                    <tbody>
                        <tr>
                            <td style={{ width: '50%' }}>
                                <div style={{ fontSize : '14px' }}>Toolbar</div>
                            </td>
                            <td style={{ width: '50%', paddingRight: '10px' }}>
                                <div>
                                    <CheckBoxComponent id="tool_check" checked={true} change={this.toolCheck.bind(this)}></CheckBoxComponent>
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </PropertyPane>
                </div>
                <div id="action-description">
                    <p>This sample demonstrates the default rendering of the File Manager with minimum configuration.</p>
                </div>
                <div id="description">
                    <p>The File Manager component is used to explore a file system through a web application, similar to the windows explorer for windows.
                        It supports all the basic file operations such as create, rename, delete and so on.</p>

                    <p>
                        <b>Note: </b>File Manager's upload functionality is restricted in the online demo. If you need to test upload functionality, please install 
                        <a target="_blank" href="https://www.syncfusion.com/downloads"> Syncfusion Essential Studio </a>on your machine and run the demo.
                     </p>
                </div>
            </div>
        );
    }
}
