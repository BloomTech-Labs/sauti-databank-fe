const gridOptions = {
  enableCharts: true,
  enableRangeSelection: true,
  onRowClicked(event) {},
  onQuickFilterChanged: function(event) {},
  onGridReady: function(event) {
    console.log("the grid is now ready");
  },
  setQuickFilter: function(event) {},
  rowHeight: 40
};

export default gridOptions;
