import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AutoWidthCalculator } from "ag-grid-community";

import gridOptions from "./Gridoptions";

import EditModal from "./EditModal";
import ToolsCreateUser from "./ToolsCreateUser";

import DeleteAccount from "./DeleteAccount";

import {
  ToolsInput,
  ToolsTitle,
  ToolsHeader,
  UserDownloadButton,
  ToolsGrid
} from "../styledComponents/Index";

class Tools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      columnDefs: [
        {
          headerName: "ID",
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
          headerName: "EMAIL",
          field: "email",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "ORGANIZATION",
          field: "organization",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "ORG TITLE",
          field: "organization_type",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "JOB POSITION",
          field: "job_position",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "COUNTRY",
          field: "country",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },

        {
          headerName: "INTEREST",
          field: "interest",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "TIER",
          field: "tier",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "PAYMENT",
          field: "payment",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "STATUS",
          field: "current",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },

        {
          headerName: "EDIT",
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
          headerName: "DELETE",
          field: "Delete",
          sortable: true,
          filter: true,
          width: 60,
          cellRendererFramework: params => {
            return (
              <div>
                <DeleteAccount
                  params={params}
                  data={params.data}
                  otherProps={this.props}
                  deleteAccount={this.props.deleteAccount}
                />
              </div>
            );
          }
        }
      ]
    };
  }

  componentDidMount = () => {
    console.log(this.props);
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
      <>
        <ToolsHeader>
          <ToolsTitle>User Accounts</ToolsTitle>
          <ToolsInput
            type="text"
            onInput={this.onQuickFilterChanged.bind(this)}
            id="quickFilterss"
            placeholder=" search..."
          />
          {/* <AiOutlineSearch className='searchIcon' /> */}
          <UserDownloadButton
            type="default"
            icon="download"
            size="small"
            onClick={this.exportToCsv.bind(this)}
          >
            Download
            {/* <img src={Archivebutton} alt="download"></img> */}
          </UserDownloadButton>
          <ToolsCreateUser />
        </ToolsHeader>
        <ToolsGrid id="grid-wrapper" className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.props.allUsers}
            gridOptions={gridOptions}
            modules={this.state.modules}
            rowSelection="multiple"
            defaultColDef={this.state.defaultColDef}
            rowSelection={this.state.rowSelection}
            onGridSizeChanged={this.onGridSizeChanged}
          />
        </ToolsGrid>
      </>
    );
  }
}

export default Tools;
