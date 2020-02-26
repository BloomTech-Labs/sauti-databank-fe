import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import { AutoWidthCalculator } from "ag-grid-community";

import gridOptions from "./Gridoptions";

import UsersQuery from "./UsersQuery";
import EditModal from "./EditModal";
import ToolsCreateUser from "./ToolsCreateUser";

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
          headerName: "Organization",
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
          headerName: "Organization Type",
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
          headerName: "Job Position",
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
          headerName: "Country",
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
          headerName: "Interest",
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
          headerName: "Interests",
          field: "interests",
          sortable: true,
          filter: true,
          width: 100,
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
          width: 100,
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
          width: 100,
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
          width: 100,
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
            defaultColDef={this.state.defaultColDef}
            rowSelection={this.state.rowSelection}
            onGridSizeChanged={this.onGridSizeChanged}
          />
        </ToolsGrid>
        {/* <UsersQuery /> */}
      </>
    );
  }
}

export default Tools;
