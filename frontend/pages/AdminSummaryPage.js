// export default {
//     template: `
//       <div class="container">
//         <div class="row">
//           <div class="col-md-12 text-center">        
//             <h3 class="mt-5">Admin Summary</h3>
//           </div>
//         </div>
//         <div class="row">
//           <div class="col-md-6">
//             <h3>Overall Customer Ratings</h3>
//             <canvas id="reviewsDoughnutChart" width="400" height="200"></canvas>
//           </div>
//           <div class="col-md-6">
//             <h3>Service Request Summary</h3>
//             <canvas id="serviceRequests" width="400" height="400"></canvas>
//           </div>
//         </div>
//       </div>
//     `,
//     data() {
//       return {
//         reviewsDoughnutChart: null,
//         serviceRequestsChart: null,
//       };
//     },
//     methods: {
//       async fetchReviewsData() {
//         try {
//           const response = await fetch(`${location.origin}/admin/summary/reviews`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           }
//           );
//           const data = await response.json();
//           const labels = data.map(item => item.full_name);
//           const reviews = data.map(item => item.reviews);
//           this.updateDoughnutChart(labels, reviews);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       },
//       updateDoughnutChart(labels, data) {
//         const ctx = document.getElementById('reviewsDoughnutChart').getContext('2d');
//         if (this.reviewsDoughnutChart) this.reviewsDoughnutChart.destroy();
//         this.reviewsDoughnutChart = new Chart(ctx, {
//           type: 'doughnut',
//           data: {
//             labels: labels,
//             datasets: [{
//               label: 'Reviews of Professionals',
//               data: data,
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)'
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)'
//               ],
//               borderWidth: 1
//             }]
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: { position: 'top' },
//               tooltip: {
//                 callbacks: {
//                   label: tooltipItem => `Reviews: ${tooltipItem.raw}`
//                 }
//               }
//             }
//           }
//         });
//       },
//       async fetchServiceRequests() {
//         try {
//           const response = await fetch(`${location.origin}/admin/summary/service_requests`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           }
//           );
//           const data = await response.json();
//           const labels = data.map(item => item.date);
//           const count = data.map(item => item.count);
//           this.updateServiceRequestChart(labels, count);
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       },
//       updateServiceRequestChart(labels, data) {
//         const ctx = document.getElementById('serviceRequests').getContext('2d');
//         if (this.serviceRequestsChart) this.serviceRequestsChart.destroy();
//         this.serviceRequestsChart = new Chart(ctx, {
//           type: 'bar',
//           data: {
//             labels: labels,
//             datasets: [{
//               label: 'Service Request Summary',
//               data: data,
//               backgroundColor: [
//                 'rgba(255, 99, 132, 0.2)',
//                 'rgba(54, 162, 235, 0.2)',
//                 'rgba(255, 206, 86, 0.2)',
//                 'rgba(75, 192, 192, 0.2)'
//               ],
//               borderColor: [
//                 'rgba(255, 99, 132, 1)',
//                 'rgba(54, 162, 235, 1)',
//                 'rgba(255, 206, 86, 1)',
//                 'rgba(75, 192, 192, 1)'
//               ],
//               borderWidth: 1
//             }]
//           },
//           options: {
//             responsive: true,
//             plugins: {
//               legend: { position: 'top' },
//               tooltip: {
//                 callbacks: {
//                   label: tooltipItem => `Count: ${tooltipItem.raw}`
//                 }
//               }
//             }
//           }
//         });
//       }
//     },
//     mounted() {
//       this.fetchReviewsData();
//       this.fetchServiceRequests();
//     }
//   };
export default {
  template: `
    <div style="font-family: 'Arial', sans-serif; background-color: #f5f7fa; padding: 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="row">
          <div class="col-md-12 text-center">        
            <h3 style="
              color: #2c3e50;
              font-size: 32px;
              font-weight: 700;
              margin: 30px 0;
              position: relative;
              display: inline-block;
              padding-bottom: 15px;
            ">
              Admin Summary
              <span style="
                position: absolute;
                bottom: 0;
                left: 50%;
                transform: translateX(-50%);
                width: 80px;
                height: 3px;
                background: linear-gradient(to right, #3498db, #2ecc71);
                border-radius: 2px;
              "></span>
            </h3>
          </div>
        </div>
        <div class="row" style="margin-top: 30px;">
          <div class="col-md-6" style="
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
          ">
            <h3 style="
              color: #3498db;
              font-size: 24px;
              margin-bottom: 20px;
              text-align: center;
            ">Overall Customer Ratings</h3>
            <div style="position: relative; height: 300px;">
              <canvas id="reviewsDoughnutChart" width="400" height="300"></canvas>
            </div>
          </div>
          <div class="col-md-6" style="
            background-color: #ffffff;
            border-radius: 10px;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
            padding: 20px;
            margin-bottom: 20px;
          ">
            <h3 style="
              color: #2ecc71;
              font-size: 24px;
              margin-bottom: 20px;
              text-align: center;
            ">Service Request Summary</h3>
            <div style="position: relative; height: 300px;">
              <canvas id="serviceRequests" width="400" height="300"></canvas>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      reviewsDoughnutChart: null,
      serviceRequestsChart: null,
    };
  },
  methods: {
    async fetchReviewsData() {
      try {
        const response = await fetch(`${location.origin}/admin/summary/reviews`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        const labels = data.map(item => item.full_name);
        const reviews = data.map(item => item.reviews);
        this.updateDoughnutChart(labels, reviews);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateDoughnutChart(labels, data) {
      const ctx = document.getElementById('reviewsDoughnutChart').getContext('2d');
      if (this.reviewsDoughnutChart) this.reviewsDoughnutChart.destroy();
      this.reviewsDoughnutChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: labels,
          datasets: [{
            label: 'Reviews of Professionals',
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              'rgba(54, 162, 235, 0.7)',
              'rgba(255, 206, 86, 0.7)',
              'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
              'rgba(255, 159, 64, 0.7)'
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 2
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              position: 'right',
              labels: {
                font: {
                  size: 12
                },
                padding: 20
              }
            },
            tooltip: {
              callbacks: {
                label: tooltipItem => `Reviews: ${tooltipItem.raw}`
              },
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 10,
              cornerRadius: 6
            }
          }
        }
      });
    },
    async fetchServiceRequests() {
      try {
        const response = await fetch(`${location.origin}/admin/summary/service_requests`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        const data = await response.json();
        const labels = data.map(item => item.date);
        const count = data.map(item => item.count);
        this.updateServiceRequestChart(labels, count);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateServiceRequestChart(labels, data) {
      const ctx = document.getElementById('serviceRequests').getContext('2d');
      if (this.serviceRequestsChart) this.serviceRequestsChart.destroy();
      this.serviceRequestsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Service Requests',
            data: data,
            backgroundColor: 'rgba(46, 204, 113, 0.7)',
            borderColor: 'rgba(46, 204, 113, 1)',
            borderWidth: 2,
            borderRadius: 5,
            maxBarThickness: 50
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { 
              position: 'top',
              labels: {
                font: {
                  size: 14,
                  weight: 'bold'
                }
              }
            },
            tooltip: {
              callbacks: {
                label: tooltipItem => `Count: ${tooltipItem.raw}`
              },
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 10,
              cornerRadius: 6
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: {
                color: 'rgba(200, 200, 200, 0.2)'
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                }
              }
            }
          }
        }
      });
    }
  },
  mounted() {
    this.fetchReviewsData();
    this.fetchServiceRequests();
  }
};
