var app = angular.module('app', ['ui.grid', 'ui.grid.resizeColumns', 
'ui.grid.moveColumns', 'ui.grid.edit', 'ui.grid.pinning', 'ui.grid.importer', 'ui.grid.pagination', 'ui.grid.importer', 'ui.grid.grouping','ui.grid.exporter']);

app.controller('MainCtrl', function MainCtrl($scope, $http,) {
  var vm = this;
  
  var data1 =[
    {
        firstName: "Cox",
        lastName: "Carney",
        company: "Enormo",
        age: "67",
    },
    {
        firstName: "Lorraine",
        lastName: "Wise",
        company: "Comveyer",
        age: "56",
    },
    {
        firstName: "Nancy",
        lastName: "Waters",
        company: "Fuelton",
        age: "93",
    },
    {
        firstName: "Steve",
        lastName: "Hendricks",
        company: "Intel",
        age: "39",
    }
  ];

  vm.columns = [{ field: 'firstName', width: 100,}, { field: 'lastName', width: 100 }, {field: 'company', width: 100},{field: 'age', width:100}];
  vm.gridOptions = {
    enableSorting: true,
    enableColumnResizing: true,
    enableGridMenu: true,
    enableCellEdit: true,
    enableFiltering: true,
    enableSelectAll: true,
    showColumnFooter: true,
    columnDefs: vm.columns,
    data: data1,
    paginationPageSizes: [5, 10, 25, 50],
    paginationPageSize: 50,
    exporterExcelFilename:'myFile.xlsx',
    exporterExcelSheetname:'Sheet1',


    // down
    exporterCsvFilename: 'myFile.csv',
    exporterPdfDefaultStyle: {fontSize: 9},
    exporterPdfTableStyle: {margin: [30, 30, 30, 30]},
    exporterPdfTableHeaderStyle: {fontSize: 10, bold: true, italics: true, color: 'red'},
    exporterPdfHeader: { text: "My Header", style: 'headerStyle' },
    exporterPdfFooter: function ( currentPage, pageCount ) {
      return { text: currentPage.toString() + ' of ' + pageCount.toString(), style: 'footerStyle' };
    },
    exporterPdfCustomFormatter: function ( docDefinition ) {
      docDefinition.styles.headerStyle = { fontSize: 22, bold: true };
      docDefinition.styles.footerStyle = { fontSize: 10, bold: true };
      return docDefinition;
    },
     exporterPdfOrientation: 'portrait',
    exporterPdfPageSize: 'LETTER',
    exporterPdfMaxGridWidth: 500,
    exporterCsvLinkElement: angular.element(document.querySelectorAll(".custom-csv-link-location")),
    exporterExcelFilename: 'myFile.xlsx',
    exporterExcelSheetName: 'Sheet1',
    onRegisterApi: function(gridApi){
    $scope.gridApi = gridApi;
    },
    // up
    
    importerDataAddCallback: function( grid, newObjects ) {

    }
  };
  

  vm.removeAll = function() {
    vm.columns.splice(0, vm.columns.length);
  };
  
  vm.remove = function() {
    vm.columns.splice(vm.columns.length-1, 1);
  };

  vm.add = function() {
      var data = document.getElementById("input").value;
      vm.columns.push({ field: data, enableSorting: false, width: 100});
  };

  vm.splice = function() {
    vm.columns.splice(1, 0, { field: 'company', enableSorting: false });
  };

  vm.unsplice = function() {
    vm.columns.splice(1, 1);
  };

  vm.addUser = function() {
    vm.gridOptions.data.push(data1);
  }
  
  vm.columnFooter=function(){
    vm.gridOptions.showColumnFooter = !vm.gridOptions.showColumnFooter;
    vm.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
  }

  vm.addHeader=function(){
    
  }

  

  document.getElementById("inputButton").addEventListener("change", function(changeEvent) {
    var reader = new FileReader();

    reader.onload = function (evt) {
    
        var data = evt.target.result;
        
        var workbook = XLSX.read(data, {type: 'binary'});
        
        var headerNames = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]], { header: 1 })[0];
        
        var data = XLSX.utils.sheet_to_json( workbook.Sheets[workbook.SheetNames[0]]);
        
        vm.gridOptions.columnDefs = [];
        headerNames.forEach(function (h) {
          vm.gridOptions.columnDefs.push({ field: h });
        });
        
        vm.gridOptions.data = data;

      };
    
    reader.readAsBinaryString(changeEvent.target.files[0]);
  });

  var view = document.getElementById("ddlViewBy");
  view.onchange =  function clicked() {
    var header = document.getElementById("grid1");
    var id1 = document.getElementById(id1);
    header.style.fontFamily = view.value;
};
  
  
  $scope.$on('$destroy', function() {
    vm.gridApi = null;
  });

  document.getElementsByClassName("dropbtn").onclick = function(){
      document.getElementById("myDropdown").classList.toggle("show");
  };

  
  

  
});
