import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Base styles
import "ag-grid-community/styles/ag-theme-alpine.css"; // Alpine theme

const DynamicHeatmap = () => {
  const generateColumns = (data) => {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map((key) => ({
      headerName: key, // Mantener los puntos en los encabezados
      field: key.replace(/\./g, "_"), // Usar un campo sin puntos como identificador interno
      filter: key === "0_Row" ? false : "agNumberColumnFilter",
      cellStyle: key === "0_Row" ? { fontWeight: "bold", textAlign: "left" } : heatmapStyle,
      sortable: true,
      resizable: true,
    }));
  };

  // Estilo de heatmap con gradiente azul
  const heatmapStyle = (params) => {
    const value = parseFloat(params.value);
    if (isNaN(value)) return null;

    const opacity = Math.abs(value);
    const isPositive = value >= 0;

    return {
      backgroundColor: isPositive
        ? `rgba(0, 0, 255, ${opacity})`
        : `rgba(200, 200, 255, ${opacity / 2})`,
      color: "black",
      textAlign: "center",
    };
  };

  // Normalizar claves de datos para que coincidan con los identificadores de columna
  const normalizeDataKeys = (data) => {
    return data.map((row) => {
      const newRow = {};
      Object.keys(row).forEach((key) => {
        const normalizedKey = key.replace(/\./g, "_"); // Reemplazar puntos en las claves de los datos
        newRow[normalizedKey] = row[key];
      });
      return newRow;
    });
  };

  const normalizedData = normalizeDataKeys(staticData);
  const columns = generateColumns(staticData);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 500,
        width: "100%",
      }}
    >
      <AgGridReact
        rowData={normalizedData} // Usar datos normalizados
        columnDefs={columns} // Usar columnas generadas dinámicamente
        animateRows={true}
        defaultColDef={{
          sortable: true,
          resizable: true,
        }}
      />
    </div>
  );
};

  const staticData = [
		{
			"0_Row": "Behavioral Health",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": 0.21,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": 0.45,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "Cardiovascular",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "General Medicine",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": 1.17,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "General Surgery",
			"1_St. Anthony Hospital": 2.25,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": 2.25,
			"Swedish First Hill Campus": 2.31,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "Gynecology",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "Neonatology",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": 0.45,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "Obstetrics",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": 3.1,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "Oncology",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		},
		{
			"0_Row": "Pulmonary",
			"1_St. Anthony Hospital": null,
			"Southwest Medical Center": null,
			"St. Joseph Medical Center": null,
			"Swedish First Hill Campus": null,
			"UW Medical Center - Montlake": 2.64
		}
	];

  const App = () => {
    return <DynamicHeatmap />;
  };
  
  export default App;

	// New version