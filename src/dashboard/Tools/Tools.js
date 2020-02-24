import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
//import 'antd/dist/antd.css'

import gridOptions from "./Gridoptions";

//import { withRouter } from 'react-router'

//import { AiOutlineSearch } from 'react-icons/ai'

//import Archivebutton from 'icons/Archivebutton.svg'
//import './accountGrid.scss'

import EditModal from "./EditModal";

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "id",
          field: "id",
          sortable: true,
          filter: true,
          width: 60,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Email",
          field: "email_address",
          sortable: true,
          filter: true,
          width: 200,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Organization",
          field: "organization",
          sortable: true,
          filter: true,
          width: 150,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Job Position",
          field: "jobPosition",
          sortable: true,
          filter: true,
          width: 120,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Country",
          field: "country",
          sortable: true,
          filter: true,
          width: 120,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },

        {
          headerName: "Government",
          field: "government",
          sortable: true,
          filter: true,
          width: 150,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Interests",
          field: "interests",
          sortable: true,
          filter: true,
          width: 150,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Tier",
          field: "userTier",
          sortable: true,
          filter: true,
          width: 150,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Payment",
          field: "payment",
          sortable: true,
          filter: true,
          width: 150,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Current",
          field: "current",
          sortable: true,
          filter: true,
          width: 150,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },

        {
          headerName: "Edit",
          field: "Edit",
          sortable: true,
          filter: true,
          width: 60,
          cellRendererFramework: params => {
            return (
              <div>
                <EditModal
                  api={params}
                  data={params.data}
                  otherProps={this.props}
                  editAccount={this.props.editAccount}
                />
              </div>
            );
          }
        },

        {
          headerName: "Delete",
          field: "Delete",
          sortable: true,
          filter: true,
          width: 60,
          cellRendererFramework: params => {
            return (
              <div>
                {/* <DeleteAccount
                params={params}
                data={params.data}
                otherProps={this.props}
                deleteAccount={this.props.deleteAccount}/> */}
              </div>
            );
          }
        }
      ]
    };
  }

  componentDidMount = () => {
    //this.props.fetchAccounts()
  };

  onGridSizeChanged = params => {
    var gridWidth = document.getElementById("grid-wrapper").offsetWidth;
    var columnsToShow = [];
    var columnsToHide = [];
    var totalColsWidth = 0;
    var allColumns = params.columnApi.getAllColumns();
    for (var i = 0; i < allColumns.length; i++) {
      var column = allColumns[i];
      totalColsWidth += column.getMinWidth();
      if (totalColsWidth > gridWidth) {
        columnsToHide.push(column.colId);
      } else {
        columnsToShow.push(column.colId);
      }
    }
    params.columnApi.setColumnsVisible(columnsToShow, true);
    params.columnApi.setColumnsVisible(columnsToHide, false);
    params.api.sizeColumnsToFit();
  };

  exportToCsv = function() {
    var params = {
      skipHeader: true,
      skipFooters: true,
      skipGroups: true,
      fileName: "OverviewGrid.csv"
    };
    gridOptions.api.exportDataAsCsv(params);
  };

  // filter function
  onQuickFilterChanged(params) {
    gridOptions.api.setQuickFilter(
      document.getElementById("quickFilterss").value
    );
  }

  render() {
    return (
      <div>
        <div className="accountBody">
          <div className="accountHeader">
            <h1>Accounts</h1>
            <div className="searchContainer">
              <input
                className="searchAccounts"
                type="text"
                onInput={this.onQuickFilterChanged.bind(this)}
                id="quickFilterss"
                placeholder=" search..."
              />
              {/* <AiOutlineSearch className='searchIcon' /> */}
            </div>
            <button
              className="downloadButton"
              type="default"
              icon="download"
              size="small"
              onClick={this.exportToCsv.bind(this)}
            >
              {/* <img src={Archivebutton} alt="download"></img> */}
            </button>
            <div className="modalHeaderAccount">{/* <ModalOperator /> */}</div>
          </div>
          <div
            id="grid-wrapper"
            style={{
              height: "500px",
              width: "100%"
            }}
            className="ag-theme-balham"
          >
            <AgGridReact
              columnDefs={this.state.columnDefs}
              //rowData={this.props.accountReducer}
              gridOptions={gridOptions}
              modules={this.state.modules}
              defaultColDef={this.state.defaultColDef}
              rowSelection={this.state.rowSelection}
              onGridSizeChanged={this.onGridSizeChanged}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default Tools;
