import { ChartConfiguration } from 'chart.js';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,

  
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
} from 'chart.js';
import { Chart } from 'react-chartjs-2';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  RadialLinearScale,
  Filler
);


const getColor = (index: number, alpha = 0.7) => 
  `hsla(${index * 137.5}, 70%, 50%, ${alpha})`;

// export const generateChartConfig = (
//   type: string,
//   data: any[],
//   columns: string[]
// ): ChartConfiguration => {
//   const baseConfig = {
//     responsive: true,
//     maintainAspectRatio: true,
//     plugins: {
//       legend: {
//         position: 'top' as const,
//       },
//       tooltip: {
//         mode: 'index' as const,
//         intersect: false,
//       },
//     },
//   };

//   switch (type) {
//     case 'bar':
//       return {
//         type: 'bar',
//         data: {
//           labels: data.map(item => String(item[columns[0]])),
//           datasets: columns.slice(1).map((col, i) => ({
//             label: col,
//             data: data.map(item => Number(item[col])),
//             backgroundColor: getColor(i),
//             borderColor: getColor(i, 1),
//             borderWidth: 1,
//           })),
//         },
//         options: {
//           ...baseConfig,
//           scales: {
//             x: {
//               type: 'category',
//               title: { display: true, text: columns[0] }
//             },
//             y: {
//               type: 'linear',
//               title: { display: true, text: columns[1] }
//             }
//           }
//         }
//       };

//     case 'line':
//       return {
//         type: 'line',
//         data: {
//           labels: data.map(item => String(item[columns[0]])),
//           datasets: columns.slice(1).map((col, i) => ({
//             label: col,
//             data: data.map(item => Number(item[col])),
//             borderColor: getColor(i, 1),
//             backgroundColor: getColor(i, 0.1),
//             fill: true,
//           })),
//         },
//         options: {
//           ...baseConfig,
//           scales: {
//             x: {
//               type: 'category',
//               title: { display: true, text: columns[0] }
//             },
//             y: {
//               type: 'linear',
//               title: { display: true, text: columns[1] }
//             }
//           }
//         }
//       };

//     case 'pie':
//       return {
//         type: 'pie',
//         data: {
//           labels: data.map(item => String(item[columns[0]])),
//           datasets: [{
//             data: data.map(item => Number(item[columns[1]])),
//             backgroundColor: data.map((_, i) => getColor(i)),
//           }],
//         },
//         options: baseConfig
//       };

//     case 'scatter':
//       return {
//         type: 'scatter',
//         data: {
//           datasets: [{
//             label: `${columns[0]} vs ${columns[1]}`,
//             data: data.map(item => ({
//               x: Number(item[columns[0]]),
//               y: Number(item[columns[1]]),
//             })),
//             backgroundColor: getColor(0, 0.6),
//           }],
//         },
//         options: {
//           ...baseConfig,
//           scales: {
//             x: {
//               type: 'linear',
//               position: 'bottom',
//               title: { display: true, text: columns[0] }
//             },
//             y: {
//               type: 'linear',
//               title: { display: true, text: columns[1] }
//             }
//           }
//         }
//       };

//     case 'radar':
//       return {
//         type: 'radar',
//         data: {
//           labels: columns,
//           datasets: data.slice(0, 3).map((item, i) => ({
//             label: `Dataset ${i + 1}`,
//             data: columns.map(col => Number(item[col])),
//             backgroundColor: getColor(i, 0.2),
//             borderColor: getColor(i, 1),
//           })),
//         },
//         options: baseConfig
//       };

//     default:
//       return generateChartConfig('bar', data, columns);
//   }
// };


import { ChartConfiguration } from 'chart.js';

const getColor = (index: number, alpha = 0.7) => 
  `hsla(${index * 137.5}, 70%, 50%, ${alpha})`;

export function createChartData(
  type: string, 
  data: any[], 
  xColumn: string, 
  yColumn: string | string[]
) {
  // Define a default color palette
  const defaultColors = [
    'rgba(255, 99, 132, 0.7)',
    'rgba(54, 162, 235, 0.7)',
    'rgba(255, 206, 86, 0.7)',
    'rgba(75, 192, 192, 0.7)',
    'rgba(153, 102, 255, 0.7)',
    'rgba(255, 159, 64, 0.7)'
  ];

  // Pie chart specific handling
  if (type === 'pie') {
    // Ensure yColumn is treated as a single column
    const columnToUse = Array.isArray(yColumn) ? yColumn[0] : yColumn;
    
    // Check if we need to count frequencies (when yColumn is not provided or same as xColumn)
    const shouldCountFrequencies = !columnToUse || columnToUse === xColumn;

    let groupedData;
    
    if (shouldCountFrequencies) {
    
      groupedData = data.reduce((acc, item) => {
        const key = item[xColumn];
        if (key) { // Ensure the location exists
          acc[key] = (acc[key] || 0) + 1;
        }
        return acc;
      }, {});
    } else {
      // Original logic for summing numeric values
      groupedData = data.reduce((acc, item) => {
        const key = item[xColumn];
        const value = Number(item[columnToUse]) || 0;
        if (key) {
          acc[key] = (acc[key] || 0) + value;
        }
        return acc;
      }, {});
    }

    // Convert grouped data to arrays for chart.js
    const labels = Object.keys(groupedData);
    const values = Object.values(groupedData);

    // Sort data by value in descending order
    const sortedIndices = values
      .map((_, i) => i)
      .sort((a, b) => (values[b] as number) - (values[a] as number));

    return {
      labels: sortedIndices.map(i => labels[i]),
      datasets: [{
        data: sortedIndices.map(i => values[i]),
        backgroundColor: sortedIndices.map(
          (_, i) => defaultColors[i % defaultColors.length]
        )
      }]
    };
  }

  // Rest of the code remains the same for other chart types...
  if (type === 'bar' || type === 'line' || type === 'scatter') {
    if (Array.isArray(yColumn)) {
      return {
        labels: data.map(item => item[xColumn]),
        datasets: yColumn.map((column, index) => ({
          label: column,
          data: data.map(item => Number(item[column]) || 0),
          borderColor: defaultColors[index % defaultColors.length],
          backgroundColor: defaultColors[index % defaultColors.length]
        }))
      };
    }
    
    return {
      labels: data.map(item => item[xColumn]),
      datasets: [{
        label: yColumn,
        data: data.map(item => Number(item[yColumn]) || 0),
        borderColor: defaultColors[0],
        backgroundColor: defaultColors[0]
      }]
    };
  }

  return {
    labels: [],
    datasets: []
  };
}