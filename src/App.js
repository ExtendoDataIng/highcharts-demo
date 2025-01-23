"use client";

import React, { useMemo, useState, useRef, useCallback } from "react";
import { createRoot } from "react-dom/client";
import { AgGridReact } from "ag-grid-react";
import { ClientSideRowModelModule, CsvExportModule, ModuleRegistry } from "ag-grid-community";

// Registrar los módulos de ag-grid-community
ModuleRegistry.registerModules([ClientSideRowModelModule, CsvExportModule]);

const getValue = (inputSelector) => {
  const text = document.querySelector(inputSelector).value;
  switch (text) {
    case "none":
      return;
    case "tab":
      return "\t";
    default:
      return text;
  }
};

const getParams = () => {
  return {
    columnSeparator: getValue("#columnSeparator"),
  };
};

const GridExample = () => {
  const gridRef = useRef();
  const containerStyle = useMemo(() => ({ width: "100%", height: "100%" }), []);
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const [rowData, setRowData] = useState([
    { make: "Toyota", model: "Celica", price: 35000 },
    { make: "Ford", model: "Mondeo", price: 32000 },
    { make: "Porsche", model: "Boxster", price: 72000 },
  ]);
  
  const defaultColDef = useMemo(() => {
    return {
      editable: true,
      minWidth: 100,
      flex: 1,
    };
  }, []);
  
  const [columnDefs, setColumnDefs] = useState([
    { field: "make" },
    { field: "model" },
    { field: "price" },
  ]);

  const onBtnExport = useCallback(() => {
    const params = getParams();
    if (params.columnSeparator) {
      alert(
        "NOTE: you are downloading a file with non-standard separators - it may not render correctly in Excel."
      );
    }
    gridRef.current.api.exportDataAsCsv(params);
  }, []);

  const onBtnUpdate = useCallback(() => {
    document.querySelector("#csvResult").value =
      gridRef.current.api.getDataAsCsv(getParams());
  }, []);

  return (
    <div style={containerStyle}>
      <div style={{ display: "flex", flexDirection: "column", height: "100%" }}>
        <div style={{ display: "flex" }}>
          <div className="row">
            <label>columnSeparator = </label>
            <select id="columnSeparator">
              <option value="none">(default)</option>
              <option value="tab">tab</option>
              <option value="|">bar (|)</option>
            </select>
          </div>
        </div>

        <div style={{ margin: "10px 0" }}>
          <button onClick={onBtnUpdate}>Show CSV export content text</button>
          <button onClick={onBtnExport}>Download CSV export file</button>
        </div>

        <div
          style={{
            flex: "1 1 0",
            position: "relative",
            display: "flex",
            flexDirection: "row",
            gap: "20px",
          }}
        >
          <div id="gridContainer" style={{ flex: "1" }}>
            <div style={gridStyle}>
              <AgGridReact
                ref={gridRef}
                rowData={rowData}
                defaultColDef={defaultColDef}
                suppressExcelExport={true}
                columnDefs={columnDefs}
              />
            </div>
          </div>
          <textarea
            id="csvResult"
            style={{ flex: "1" }}
            placeholder="Click the Show CSV export content button to view exported CSV here"
          ></textarea>
        </div>
      </div>
    </div>
  );
};

export default GridExample; // Agregar la exportación predeterminada aquí

const root = createRoot(document.getElementById("root"));
root.render(<GridExample />);
window.tearDownExample = () => root.unmount();
