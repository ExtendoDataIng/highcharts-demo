let gridApi;

const gridOptions = {
  defaultColDef: {
    editable: true,
    minWidth: 100,
    flex: 1,
  },

  suppressExcelExport: true,
  popupParent: document.body,

  columnDefs:   [
		{
			"field": "DGR"
		},
		{
			"field": "Description"
		},
		{
			"field": "St  Anthony Hospital"
		},
		{
			"field": "Harborview Medical Center"
		},
		{
			"field": "St  Joseph Medical Center"
		},
		{
			"field": "Swedish First Hill Campus"
		},
		{
			"field": "UW Medical Center - Montlake"
		}
	],

  rowData:  [
		{
			"DGR": "MS-DRG 418",
			"Description": "[418] LAPAROSCOPIC CHOLECYSTECTOMY W/O C.D.E. W CC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": null,
			"St  Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"DGR": "MS-DRG 419",
			"Description": "[419] LAPAROSCOPIC CHOLECYSTECTOMY W/O C.D.E. W/O CC/MCC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": null,
			"St  Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"DGR": "MS-DRG 620",
			"Description": "[620] O.R. PROCEDURES FOR OBESITY W CC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": 2.14,
			"St  Joseph Medical Center": 2.14,
			"Swedish First Hill Campus": 2.24,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"DGR": "MS-DRG 621",
			"Description": "[621] O.R. PROCEDURES FOR OBESITY W/O CC/MCC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": 2.36,
			"St  Joseph Medical Center": 2.36,
			"Swedish First Hill Campus": 2.38,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"DGR": "MS-DRG 661",
			"Description": "[661] KIDNEY & URETER PROCEDURES FOR NON-NEOPLASM W/O CC/MCC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": null,
			"St  Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"DGR": "MS-DRG 853",
			"Description": "[853] INFECTIOUS & PARASITIC DISEASES W O.R. PROCEDURES W MCC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": null,
			"St  Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"DGR": "MS-DRG 854",
			"Description": "[854] INFECTIOUS & PARASITIC DISEASES W O.R. PROCEDURES W CC",
			"Harborview Medical Center": 4.77,
			"St  Anthony Hospital": null,
			"St  Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		}
	],
};

function getValue(inputSelector) {
  const text = document.querySelector(inputSelector).value;
  switch (text) {
    case "none":
      return;
    case "tab":
      return "\t";
    default:
      return text;
  }
}

function getParams() {
  return {
    columnSeparator: getValue("#columnSeparator"),
  };
}

function onBtnExport() {
  const params = getParams();
  if (params.columnSeparator) {
    alert(
      "NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel.",
    );
  }
  gridApi.exportDataAsCsv(params);
}

// setup the grid after the page has finished loading
document.addEventListener("DOMContentLoaded", function () {
  const gridDiv = document.querySelector("#myGrid");
  gridApi = agGrid.createGrid(gridDiv, gridOptions);
});
