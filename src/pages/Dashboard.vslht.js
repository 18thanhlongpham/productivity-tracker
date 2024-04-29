import wixData from 'wix-data';
import { Chart } from 'chart.js';

$w.onReady(function () {
  // Query the 'Expected' dataset
  wixData.query('Expected')
    .find()
    .then(results => {
      // Extract the data and filter out undefined values
      const dates = results.items.map(item => item.dateA1).filter(item => item !== undefined);
      const expectedTasks = results.items.map(item => item.expectedTasksCompleted).filter(item => item !== undefined);
      const actualTasks = results.items.map(item => item.actualTasksCompleted).filter(item => item !== undefined);

      // Log the data for debugging
      console.log('dates:', dates);
      console.log('expectedTasks:', expectedTasks);
      console.log('actualTasks:', actualTasks);

      // Create the chart
      const ctx = $w('#myChart').getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: dates,
          datasets: [{
            label: 'Expected Tasks Completed',
            data: expectedTasks,
            borderColor: 'rgb(75, 192, 192)',
            fill: false
          }, {
            label: 'Actual Tasks Completed',
            data: actualTasks,
            borderColor: 'rgb(255, 99, 132)',
            fill: false
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    })
    .catch(err => {
      console.error(err);
    });
});