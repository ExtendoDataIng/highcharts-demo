import React from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css"; // Base styles
import "ag-grid-community/styles/ag-theme-alpine.css"; // Alpine theme

const DynamicHeatmap = () => {
  // Generate dynamic data for the 10x4 matrix
  const generateData = () => {
    const rows = [];
    for (let i = 1; i <= 10; i++) {
      const row = { row: `Clinical ${i}` }; // Row legends
      for (let j = 1; j <= 4; j++) {
        // Randomly decide whether to generate a value or null (10% chance for null)
        const value = Math.random() < 0.1 ? null : (Math.random() * 200 - 100).toFixed(2); // 10% chance to be null
        row[`Facility ${j}`] = value;
      }
      rows.push(row);
    }
    return rows;
  };

  // Generate column definitions dynamically
  const generateColumns = (data) => {
    if (!data || data.length === 0) return [];

    return Object.keys(data[0]).map((key, index) => ({
      headerName: key === "row" ? "Legend" : key, // Use "Legend" for the first column, dynamic headers for others
      field: key,
      filter: key === "row" ? false : "agNumberColumnFilter", // Enable filters for numeric columns
      cellStyle: key === "row" ? { fontWeight: "bold", textAlign: "left" } : heatmapStyle, // Heatmap for numeric
      sortable: true, // Enable sorting
      resizable: true, // Allow resizing
    }));
  };

  // Heatmap style for blue gradient (negative to positive)
  const heatmapStyle = (params) => {
    const value = parseFloat(params.value);
    if (isNaN(value)) return null; // Skip styling for non-numeric cells

    // Normalizing values between -100 and 100
    const normalizedValue = Math.min(Math.max(value, -100), 100) / 100;

    // Adjust color intensity
    const opacity = Math.abs(normalizedValue); // Use absolute value for intensity
    const isPositive = normalizedValue >= 0;

    return {
      backgroundColor: isPositive
        ? `rgba(0, 0, 255, ${opacity})` // Positive: blue with intensity
        : `rgba(200, 200, 255, ${opacity / 2})`, // Negative: light blue-gray
      color: "black", // Text color for better readability
      fontWeight: "", // Bold text
      textAlign: "center", // Center text
    };
  };

  // Generate data and columns
  const data = generateData();
  const columns = generateColumns(data);

  return (
    <div
      className="ag-theme-alpine"
      style={{
        height: 500, // Grid height
        width: "100%", // Full width
      }}
    >
      <AgGridReact
        rowData={data} // Pass generated data
        columnDefs={columns} // Pass generated columns
        animateRows={true} // Animate row changes
        defaultColDef={{
          sortable: true, // Enable sorting by default
          resizable: true, // Allow resizing by default
        }}
      />
    </div>
  );
};

// Example usage
const App = () => {
  return <DynamicHeatmap />;
};

export default App;
