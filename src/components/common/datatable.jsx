import React from 'react';
import LoadingSpinner from './loadingspinner';

const DataTable = ({ 
  columns, 
  data, 
  loading = false, 
  onRowClick = null,
  emptyMessage = 'No data available'
}) => {
  if (loading) {
    return <LoadingSpinner />;
  }
  
  if (!data || data.length === 0) {
    return (
      <div className="empty-state">
        <p>{emptyMessage}</p>
      </div>
    );
  }
  
  return (
    <div className="data-table-container">
      <table className="data-table">
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th key={index}>{column.header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr 
              key={rowIndex} 
              onClick={onRowClick ? () => onRowClick(row) : undefined}
              className={onRowClick ? 'clickable' : ''}
            >
              {columns.map((column, colIndex) => (
                <td key={colIndex}>
                  {column.render 
                    ? column.render(row[column.accessor], row) 
                    : row[column.accessor]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default DataTable;