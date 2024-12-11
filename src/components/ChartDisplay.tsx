// import React from 'react';

// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   BarController,
//   PieController,
//   LineController,
//   ScatterController,
//   RadarController,
//   BarController,
//   BubbleController, 
//   ArcElement,
//   RadialLinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   Colors
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   BarController,
//   PieController,
//   LineController,
//   ScatterController,
//   RadarController,
//   BarController,
//   BubbleController, 
//   ArcElement,
//   RadialLinearScale,
//   Title,
//   Tooltip,
//   Legend,
//   Colors
// );

// interface ChartDisplayProps {
//   type: string;
//   data: any[];
//   columns: string[];
// }




// import React from 'react';
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   RadialLinearScale,
//   Filler,
//   ChartOptions
// } from 'chart.js';
// import { Chart } from 'react-chartjs-2';
// import { createChartData } from '../utils/chartDataUtils';

// // Register Chart.js components
// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   PointElement,
//   LineElement,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   ArcElement,
//   RadialLinearScale,
//   Filler
// );

// interface ChartDisplayProps {
//   type: string;
//   data: any[];
//   columns: string[];
//   xAxisLabel?: string;
//   yAxisLabel?: string | string[]; // Allow single or multiple Y-axis labels
//   multiYAxis?: boolean; // New prop to enable multi-column Y-axis
// }

// const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
//   type, 
//   data = [], 
//   columns = [],
//   xAxisLabel,
//   yAxisLabel,
//   multiYAxis = false // Default to false for backward compatibility
// }) => {
//   // if (!data.length || !columns.length) {
//   //   return (
//   //     <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center h-64">
//   //       <p className="text-gray-500">No data available for visualization</p>
//   //     </div>
//   //   );
//   // }

//   // Handle single or multiple Y-axis columns
//   const yColumns = Array.isArray(yAxisLabel) 
//     ? yAxisLabel 
//     : [yAxisLabel || columns[1]];

//   // Create chart data with support for multiple Y-axis columns
//   const chartData = multiYAxis
//     ? createChartData(type, data, columns[0], yColumns)
//     : createChartData(type, data, columns[0], columns[1]);

//   const options: ChartOptions = {
//     responsive: true,
//     maintainAspectRatio: true,
//     plugins: {
//       legend: {
//         position: 'top',
//         display: true
//       },
//       tooltip: {
//         mode: 'index',
//         intersect: false,
//         callbacks: {
//           label: function(context) {
//             if (type === 'pie') {
//               const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
//               const value = context.raw as number;
//               const percentage = ((value / total) * 100).toFixed(1);
//               return `${context.label}: ${value} (${percentage}%)`;
//             }
//             return `${context.dataset.label}: ${context.formattedValue}`;
//           }
//         }
//       }
//     },
//     scales: type !== 'pie' ? {
//       x: {
//         type: 'category',
//         display: true,
//         title: {
//           display: true,
//           text: xAxisLabel || columns[0]
//         },
//         ticks: {
//           maxRotation: 45,
//           minRotation: 45
//         }
//       },
//       y: {
//         type: 'linear',
//         display: true,
//         title: {
//           display: true,
//           text: multiYAxis ? yColumns.join(' / ') : (yAxisLabel || columns[1])
//         },
//         beginAtZero: true
//       }
//     } : undefined
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">
//       <Chart 
//         type={type as 'bar' | 'line' | 'pie' | 'scatter'} 
//         data={chartData} 
//         options={options}
//       />
//     </div>
//   );
// };

// export default ChartDisplay;

















import React from 'react';

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
import { Chart } from 'react-chartjs-2';

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


interface ChartDisplayProps {
  type: string;
  data: any[];
  columns: string[];
  xAxisLabel?: string;
  yAxisLabel?: string | string[]; // Allow single or multiple Y-axis labels
  multiYAxis?: boolean; // New prop to enable multi-column Y-axis
}

const ChartDisplay: React.FC<ChartDisplayProps> = ({ 
  type, 
  data = [], 
  columns = [],
  xAxisLabel,
  yAxisLabel,
  multiYAxis = false // Default to false for backward compatibility
}) => {
  if (!data.length || !columns.length) {
    return (
      <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center h-64">
        <p className="text-gray-500">No data available for visualization</p>
      </div>
    );
  }

  // Handle single or multiple Y-axis columns
  const yColumns = Array.isArray(yAxisLabel) 
    ? yAxisLabel 
    : [yAxisLabel || columns[1]];

  // Create chart data with support for multiple Y-axis columns
  const chartData = multiYAxis
    ? createChartData(type, data, columns[0], yColumns)
    : createChartData(type, data, columns[0], columns[1]);

  const options: ChartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      legend: {
        position: 'top',
        display: true
      },
      tooltip: {
        mode: 'index',
        intersect: false,
        callbacks: {
          label: function(context) {
            if (type === 'pie') {
              const total = context.dataset.data.reduce((a: number, b: number) => a + b, 0);
              const value = context.raw as number;
              const percentage = ((value / total) * 100).toFixed(1);
              return `${context.label}: ${value} (${percentage}%)`;
            }
            return `${context.dataset.label}: ${context.formattedValue}`;
          }
        }
      }
    },
    scales: type !== 'pie' ? {
      x: {
        type: 'category',
        display: true,
        title: {
          display: true,
          text: xAxisLabel || columns[0]
        },
        ticks: {
          maxRotation: 45,
          minRotation: 45
        }
      },
      y: {
        type: 'linear',
        display: true,
        title: {
          display: true,
          text: multiYAxis ? yColumns.join(' / ') : (yAxisLabel || columns[1])
        },
        beginAtZero: true
      }
    } : undefined
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg">
      <Chart 
        type={type as 'bar' | 'line' | 'pie' | 'scatter'} 
        data={chartData} 
        options={options}
      />
    </div>
  );
};

export default ChartDisplay;



























// const ChartDisplay: React.FC<ChartDisplayProps> = ({ type, data = [], columns = [] }) => {
//   if (!data.length || !columns.length) {
//     return (
//       <div className="bg-white p-6 rounded-xl shadow-lg flex items-center justify-center h-64">
//         <p className="text-gray-500">No data available for visualization</p>
//       </div>
//     );
//   }

//   const getColor = (index: number, alpha = 0.7) => 
//     `hsla(${index * 137.5}, 70%, 50%, ${alpha})`;

//   const chartConfig = {
//     labels: data.map(item => String(item[columns[0]] || '')),
//     datasets: type === 'scatter' ? [
//       {
//         label: `${columns[0]} vs ${columns[1]}`,
//         data: data.map(item => ({
//           x: Number(item[columns[0]]) || 0,
//           y: Number(item[columns[1]]) || 0
//         })),
//         backgroundColor: getColor(0, 0.6),
//         borderColor: getColor(0),
//       }
//     ] : columns.slice(1).map((col, i) => ({
//       label: col,
//       data: data.map(item => Number(item[col]) || 0),
//       backgroundColor: getColor(i),
//       borderColor: getColor(i, 1),
//       borderWidth: 1,
//       fill: type === 'line',
//       tension: type === 'line' ? 0.4 : undefined
//     }))
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//         display: true
//       },
//       tooltip: {
//         mode: 'index' as const,
//         intersect: false
//       }
//     },
//     scales: type !== 'pie' ? {
//       x: {
//         type: 'category' as const,
//         display: true,
//         title: {
//           display: true,
//           text: columns[0]
//         }
//       },
//       y: {
//         type: 'linear' as const,
//         display: true,
//         title: {
//           display: true,
//           text: columns[1]
//         }
//       }
//     } : undefined
//   };

//   return (
//     <div className="bg-white p-6 rounded-xl shadow-lg">
//       <Chart type={type as ChartType} data={chartConfig} options={options} />
//     </div>
//   );
// };

// export default ChartDisplay;