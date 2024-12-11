import React from 'react';
import { ChevronDown } from 'lucide-react';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  PieController,
  LineController,
  ScatterController,
  RadarController,
  BarController,
  BubbleController, 
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  BarController,
  PieController,
  LineController,
  ScatterController,
  RadarController,
  BarController,
  BubbleController, 
  ArcElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Colors
);
import { Chart } from 'react-chartjs-2';


import React from 'react';
import { ChevronDown } from 'lucide-react';


interface ColumnSelectorProps {
  columns: string[];
  selectedColumns: string[];
  onColumnSelect: (column: string, axis: 'x' | 'y') => void;
  disabled?: boolean;
  chartType?: string; // New prop
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  selectedColumns,
  onColumnSelect,
  disabled = false,
  chartType = 'bar' // Default to bar if not specified
}) => {
  return (
    <div>
      {chartType === 'pie' ? (
        // For pie chart, show only one column selection
        <div>
          <label>Select Column</label>
          <select
            value={selectedColumns[0] || ''}
            onChange={(e) => onColumnSelect(e.target.value, 'y')}
            disabled={disabled}
          >
            <option value="">Select a column</option>
            {columns.map(column => (
              <option key={column} value={column}>
                {column}
              </option>
            ))}
          </select>
        </div>
      ) : (
        // For other chart types, show both x and y axis selections
        <>
          <div>
            <label>X-Axis</label>
            <select
              value={selectedColumns[0] || ''}
              onChange={(e) => onColumnSelect(e.target.value, 'x')}
              disabled={disabled}
            >
              <option value="">Select X-Axis</option>
              {columns.map(column => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Y-Axis</label>
            <select
              value={selectedColumns[1] || ''}
              onChange={(e) => onColumnSelect(e.target.value, 'y')}
              disabled={disabled}
            >
              <option value="">Select Y-Axis</option>
              {columns.map(column => (
                <option key={column} value={column}>
                  {column}
                </option>
              ))}
            </select>
          </div>
        </>
      )}
    </div>
  );
};

export default ColumnSelector;

