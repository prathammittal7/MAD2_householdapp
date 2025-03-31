// export default {
//     template: `
//       <div class="container">
//         <div class="row">
//           <div class="col-md-12 text-center">        
//             <h3>Customer Summary</h3>
//           </div>
//         </div>
//         <div class="row">
//           <div class="col-md-12">
//             <canvas id="serviceRequests" width="400" height="200"></canvas>
//           </div>
//         </div>
//       </div>
//     `,
//     data() {
//       return {
//         serviceRequestsChart: null,
//       };
//     },
//     methods: {
//       async fetchServiceRequestsCustomer() {
//         try {
//           // First fetch user ID via claims
//           const claimsResponse = await fetch(`${location.origin}/get-claims`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           });
  
//           if (!claimsResponse.ok) {
//             console.error('Error fetching claims:', claimsResponse.statusText);
//             return;
//           }
  
//           const claimData = await claimsResponse.json();
//           const userId = claimData.claims.user_id;
  
//           // Now fetch service request data for this user
//           const serviceResponse = await fetch(`${location.origin}/customer/summary/service_requests/${userId}`, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': `Bearer ${localStorage.getItem('token')}`
//             }
//           });
  
//           if (!serviceResponse.ok) {
//             console.error('Error fetching service request data:', serviceResponse.statusText);
//             return;
//           }
  
//           const serviceData = await serviceResponse.json();
//           const labels = serviceData.map(item => item.date);
//           const counts = serviceData.map(item => item.count);
//           this.updateServiceRequestCustomerChart(labels, counts);
  
//         } catch (error) {
//           console.error('Error fetching data:', error);
//         }
//       },
//       updateServiceRequestCustomerChart(labels, data) {
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
//       this.fetchServiceRequestsCustomer();
//     }
//   };
export default {
  template: `
    <div class="container" style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px; background-color: #f8f9fa; border-radius: 10px; box-shadow: 0 2px 15px rgba(0,0,0,0.05);">
      <div class="row">
        <div class="col-md-12 text-center">        
          <h3 style="
            color: #2c3e50; 
            font-size: 28px; 
            font-weight: 600; 
            margin: 20px 0 30px;
            position: relative;
            display: inline-block;
            padding-bottom: 10px;
          ">
            Customer Summary
            <span style="
              position: absolute;
              bottom: 0;
              left: 50%;
              transform: translateX(-50%);
              width: 80px;
              height: 3px;
              background: linear-gradient(to right, #3498db, #9b59b6);
              border-radius: 2px;
            "></span>
          </h3>
        </div>
      </div>
      
      <div class="row" style="margin-top: 20px;">
        <div class="col-md-12">
          <div style="
            background-color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.08);
            padding: 25px;
            margin-bottom: 20px;
            transition: transform 0.3s ease, box-shadow 0.3s ease;
          " onmouseover="this.style.transform='translateY(-5px)'; this.style.boxShadow='0 8px 20px rgba(0,0,0,0.12)';" 
             onmouseout="this.style.transform='translateY(0)'; this.style.boxShadow='0 4px 12px rgba(0,0,0,0.08)';">
            <h4 style="
              color: #3498db;
              font-size: 18px;
              margin-bottom: 20px;
              padding-bottom: 10px;
              border-bottom: 1px solid #eee;
            ">Service Request History</h4>
            <div style="position: relative; height: 400px;">
              <canvas id="serviceRequests" width="400" height="400"></canvas>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" style="margin-top: 20px;">
        <div class="col-md-12">
          <div style="
            background-color: #f1f8fe;
            border-radius: 8px;
            padding: 15px;
            border-left: 4px solid #3498db;
          ">
            <div style="display: flex; align-items: center;">
              <div style="
                background-color: #3498db;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 50%;
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 10px;
                font-weight: bold;
              ">i</div>
              <p style="margin: 0; color: #2c3e50; font-size: 14px;">
                This chart shows your service request history over time. Each bar represents the number of service requests made on a specific date.
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div class="row" style="margin-top: 30px;">
        <div class="col-md-12">
          <div style="
            text-align: center;
            font-size: 14px;
            color: #7f8c8d;
            padding: 10px;
          ">
            Data last updated: ${new Date().toLocaleString()}
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      serviceRequestsChart: null,
    };
  },
  methods: {
    async fetchServiceRequestsCustomer() {
      try {
        // First fetch user ID via claims
        const claimsResponse = await fetch(`${location.origin}/get-claims`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!claimsResponse.ok) {
          console.error('Error fetching claims:', claimsResponse.statusText);
          return;
        }

        const claimData = await claimsResponse.json();
        const userId = claimData.claims.user_id;

        // Now fetch service request data for this user
        const serviceResponse = await fetch(`${location.origin}/customer/summary/service_requests/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });

        if (!serviceResponse.ok) {
          console.error('Error fetching service request data:', serviceResponse.statusText);
          return;
        }

        const serviceData = await serviceResponse.json();
        const labels = serviceData.map(item => item.date);
        const counts = serviceData.map(item => item.count);
        this.updateServiceRequestCustomerChart(labels, counts);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    },
    updateServiceRequestCustomerChart(labels, data) {
      const ctx = document.getElementById('serviceRequests').getContext('2d');
      if (this.serviceRequestsChart) this.serviceRequestsChart.destroy();
      this.serviceRequestsChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Service Requests',
            data: data,
            backgroundColor: 'rgba(52, 152, 219, 0.7)',
            borderColor: 'rgba(52, 152, 219, 1)',
            borderWidth: 2,
            borderRadius: 6,
            maxBarThickness: 60
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
                },
                padding: 20,
                usePointStyle: true
              }
            },
            tooltip: {
              callbacks: {
                label: tooltipItem => `Count: ${tooltipItem.raw}`
              },
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
              padding: 12,
              cornerRadius: 6,
              titleFont: {
                size: 14
              },
              bodyFont: {
                size: 14
              }
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
                },
                padding: 10
              },
              title: {
                display: true,
                text: 'Number of Requests',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                padding: {top: 10, bottom: 10}
              }
            },
            x: {
              grid: {
                display: false
              },
              ticks: {
                font: {
                  size: 12
                },
                maxRotation: 45,
                minRotation: 45
              },
              title: {
                display: true,
                text: 'Date',
                font: {
                  size: 14,
                  weight: 'bold'
                },
                padding: {top: 20, bottom: 0}
              }
            }
          },
          animation: {
            duration: 2000,
            easing: 'easeOutQuart'
          }
        }
      });
    }
  },
  mounted() {
    this.fetchServiceRequestsCustomer();
  }
};
