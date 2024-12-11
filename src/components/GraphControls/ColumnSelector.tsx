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



interface ColumnSelectorProps {
  columns: string[];
  selectedColumns: string[];
  onColumnSelect: (column: string, axis: 'x' | 'y') => void;
  disabled?: boolean;
  chartType?: string;
}

const ColumnSelector: React.FC<ColumnSelectorProps> = ({
  columns,
  selectedColumns,
  onColumnSelect,
  disabled = false,
  chartType = 'bar'
}) => {
  return (
    <div className="space-y-4">
      {chartType === 'pie' ? (
        // For pie chart, show only one column selection
        <div className="flex items-center space-x-4">
          <label className="text-sm font-medium text-gray-700"></label>
          <div className="relative flex-1">
            <select
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md disabled:bg-gray-100"
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
            <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
          </div>
        </div>
      ) : (
        // For other chart types, show both x and y axis selections side by side
        <div className="flex items-center space-x-4">
          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              X-Axis Column
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md disabled:bg-gray-100"
                onChange={(e) => onColumnSelect(e.target.value, 'x')}
                value={selectedColumns[0] || ''}
                disabled={disabled}
              >
                <option value="">Select X-Axis</option>
                {columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex-1">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Y-Axis Column
            </label>
            <div className="relative">
              <select
                className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md disabled:bg-gray-100"
                onChange={(e) => onColumnSelect(e.target.value, 'y')}
                value={selectedColumns[1] || ''}
                disabled={disabled}
              >
                <option value="">Select Y-Axis</option>
                {columns.map((column) => (
                  <option key={column} value={column}>
                    {column}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ColumnSelector;