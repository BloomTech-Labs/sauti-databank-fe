import React, { Component } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-balham.css";
import gridOptions from "./Gridoptions";
import EditModal from "./EditModal";
import DeleteAccount from "./DeleteAccount";
import CreateUserModal from "./CreateUserModal";

import styled from "styled-components";

import { AutoWidthCalculator } from "ag-grid-community";

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
          width: 80,
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
          headerName: "Registration Date",
          field: "registration_date",
          sortable: true,
          filter: true,
          width: 110,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Found By",
          field: "found_by",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Plan",
          field: "paypal_plan",
          sortable: true,
          filter: true,
          width: 100,
          cellStyle: {
            "font-size": "2rem",
            "padding-top": ".75rem"
          }
        },
        {
          headerName: "Billing Cycle",
          field: "p_next_billing_time",
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
          <ButtonsDiv>
            <UserDownloadButton
              type="default"
              icon="download"
              size="small"
              onClick={this.exportToCsv.bind(this)}
            >
              Download
              {/* <img src={Archivebutton} alt="download"></img> */}
            </UserDownloadButton>
            <CreateUserModal />
          </ButtonsDiv>
        </ToolsHeader>
        <ToolsGrid id="grid-wrapper" className="ag-theme-balham">
          <AgGridReact
            columnDefs={this.state.columnDefs}
            rowData={this.props.allUsers}
            gridOptions={gridOptions}
            modules={this.state.modules}
            rowSelection="multiple"
            defaultColDef={this.state.defaultColDef}
            onGridSizeChanged={this.onGridSizeChanged}
          />
        </ToolsGrid>
      </>
    );
  }
}

export default Tools;

const ToolsHeader = styled.div`
  width: 95%;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  margin-bottom: 14px;
`;
const ToolsTitle = styled.h1`
  margin-top: 14px;
  font-size: 4.2rem;
  font-family: Helvetica;
  font-style: normal;
  font-weight: bold;
`;
const ToolsInput = styled.input`
  border: 2px solid grey;
  border-radius: 5px;
  text-align: right;
  display: block;
  width: 315px;
  height: 32px;
  margin-top: 14px;
`;
const ButtonsDiv = styled.div`
  width: 300px;
  display: flex;
  justify-content: space-between;
`;
const UserDownloadButton = styled.button`
  width: 130px;
  height: 32px;
  border: 2px solid #eb5e52;
  border-radius: 5px;
  background-color: white;
  margin-top: 14px;
  &:hover {
    background-color: #eb5e52;
    color: white;
    cursor: pointer;
  }
`;
const ToolsGrid = styled.div`
  height: 750px;
  width: 95%;
  margin: 0 auto;
`;
