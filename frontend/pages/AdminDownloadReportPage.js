// export default {
//     template: `
//         <div>
//             <div class="row">
//                 <div class="col-md-12">  
//                     <h3>Export Service Requests</h3>
//                     <!-- Input for professional ID -->
//                     <label for="professionalId">Enter Professional ID:</label>
//                     <input type="number" id="professionalId" v-model="professionalId" placeholder="Enter Professional ID" required :disabled="isProcessing" />                   
//                     <!-- Export Button -->
//                     <button @click="triggerExport" :disabled="isProcessing || !professionalId">
//                         {{ isProcessing ? 'Processing...' : 'Export Service Requests' }}
//                     </button> 
//                     <!-- List of available downloads -->
//                     <h3>Available Downloads</h3>
//                     <ul>
//                     <li v-for="(file, index) in downloads" :key="index">
//                         <a :href="file" @click.prevent="downloadFile(file)"">{{ file }}</a>
//                     </li>
//                     </ul>
//                 <div>
//             </div>
//         </div>
//     `,
//     data() {
//       return {
//         isProcessing: false,     // Track if the process is ongoing
//         downloads: [],           // List of available downloads
//         professionalId: '',      // Professional ID input by the user
//         timer: null,
//       };
//     },
//     methods: {
//       // Method to trigger the export task
//       async triggerExport() {
//         if (!this.professionalId) {
//           alert('Please enter a valid professional ID!');
//           return;
//         }
  
//         this.isProcessing = true; // Disable button to prevent multiple clicks
  
//         try {
//           // Make an API call to start the Celery task
//           const response = await fetch('/admin/export/'+ this.professionalId, {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': 'Bearer ' + localStorage.getItem('token'),
//             },
//           });
//           if(response.ok){
//             alert('Export triggered successfully!');      
//           }
//         } catch (error) {
//           console.error('Error triggering export:', error);
//           alert('Failed to trigger the export. Please try again.');
//         } finally {
//           this.isProcessing = false; // Enable the button again
//         }
//       },
//       // Method to fetch the list of available downloads
//       async fetchDownloads() {
//         try {
//           const response = await fetch('/admin/reports/list',{
//             method: 'GET',
//             headers: {
//                 Authorization: 'Bearer ' + localStorage.getItem('token')
//             }
//           })
//           if(response.ok){
//             const data = await response.json();
//             this.downloads = data.downloads;
//           }else{

//           }
//         } catch (error) {
//           console.error('Error fetching downloads:', error);
//         }
//       },
//       async downloadFile(filename) {
//         try {
//             const response = await fetch(`/admin/reports/download/${filename}`,
//                 {
//                     method: 'GET',
//                     headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
//                 }
//             );
//             if (!response.ok) {
//                 alert("Error downloading file.");
//                 return;
//             }
//             const blob = await response.blob();
//             const link = document.createElement("a");
//             link.href = window.URL.createObjectURL(blob);
//             link.download = filename;
//             link.click();    
//             // Clean up the object URL to free memory
//             window.URL.revokeObjectURL(link.href);
//         }catch (error) {
//             console.error("Error downloading file:", error);
//             alert("An error occurred while downloading the file.");
//         }
//       },
//     },
//     mounted() {
//         this.fetchDownloads();
//         this.timer = setInterval(() => {
//             this.fetchDownloads();
//         }, 5000);
//     },
//     beforeDestroy() {
//         clearInterval(this.timer)
//     }
// };
export default {
  template: `
      <div class="export-container">
          <div class="row">
              <div class="col-md-12">  
                  <h3 class="page-title">Export Service Requests</h3>
                  <div class="input-group">
                      <label for="professionalId">Enter Professional ID:</label>
                      <input 
                          type="number" 
                          id="professionalId" 
                          v-model="professionalId" 
                          placeholder="Enter Professional ID" 
                          required 
                          :disabled="isProcessing"
                          class="form-input" 
                      />                   
                      <button 
                          @click="triggerExport" 
                          :disabled="isProcessing || !professionalId"
                          class="export-button"
                          :class="{'processing': isProcessing}"
                      >
                          {{ isProcessing ? 'Processing...' : 'Export Service Requests' }}
                      </button>
                  </div>
                  
                  <div class="downloads-section">
                      <h3 class="section-title">Available Downloads</h3>
                      <div class="downloads-list-container">
                          <ul class="downloads-list">
                              <li v-for="(file, index) in downloads" :key="index" class="download-item">
                                  <a 
                                      :href="file" 
                                      @click.prevent="downloadFile(file)" 
                                      class="download-link"
                                  >
                                      <span class="file-icon">📄</span>
                                      <span class="file-name">{{ file }}</span>
                                  </a>
                              </li>
                              <li v-if="downloads.length === 0" class="no-downloads">
                                  No downloads available
                              </li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>
      </div>
  `,
  data() {
    return {
      isProcessing: false,     // Track if the process is ongoing
      downloads: [],           // List of available downloads
      professionalId: '',      // Professional ID input by the user
      timer: null,
    };
  },
  methods: {
    // Method to trigger the export task
    async triggerExport() {
      if (!this.professionalId) {
        alert('Please enter a valid professional ID!');
        return;
      }

      this.isProcessing = true; // Disable button to prevent multiple clicks

      try {
        // Make an API call to start the Celery task
        const response = await fetch('/admin/export/'+ this.professionalId, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if(response.ok){
          alert('Export triggered successfully!');      
        }
      } catch (error) {
        console.error('Error triggering export:', error);
        alert('Failed to trigger the export. Please try again.');
      } finally {
        this.isProcessing = false; // Enable the button again
      }
    },
    // Method to fetch the list of available downloads
    async fetchDownloads() {
      try {
        const response = await fetch('/admin/reports/list',{
          method: 'GET',
          headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
          }
        })
        if(response.ok){
          const data = await response.json();
          this.downloads = data.downloads;
        }else{

        }
      } catch (error) {
        console.error('Error fetching downloads:', error);
      }
    },
    async downloadFile(filename) {
      try {
          const response = await fetch(`/admin/reports/download/${filename}`,
              {
                  method: 'GET',
                  headers: {'Authorization': 'Bearer ' + localStorage.getItem('token')},
              }
          );
          if (!response.ok) {
              alert("Error downloading file.");
              return;
          }
          const blob = await response.blob();
          const link = document.createElement("a");
          link.href = window.URL.createObjectURL(blob);
          link.download = filename;
          link.click();    
          // Clean up the object URL to free memory
          window.URL.revokeObjectURL(link.href);
      }catch (error) {
          console.error("Error downloading file:", error);
          alert("An error occurred while downloading the file.");
      }
    },
  },
  mounted() {
      this.fetchDownloads();
      this.timer = setInterval(() => {
          this.fetchDownloads();
      }, 5000);
  },
  beforeDestroy() {
      clearInterval(this.timer)
  },
  // Adding CSS styles
  style: `
      <style>
          .export-container {
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
              max-width: 800px;
              margin: 0 auto;
              padding: 20px;
              background-color: #f9f9f9;
              border-radius: 8px;
              box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
          }
          
          .page-title {
              color: #2c3e50;
              margin-bottom: 25px;
              font-size: 28px;
              font-weight: 600;
              border-bottom: 2px solid #3498db;
              padding-bottom: 10px;
          }
          
          .input-group {
              display: flex;
              flex-direction: column;
              margin-bottom: 25px;
              background-color: white;
              padding: 20px;
              border-radius: 6px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .input-group label {
              font-weight: 500;
              margin-bottom: 8px;
              color: #555;
          }
          
          .form-input {
              padding: 10px 15px;
              border: 1px solid #ddd;
              border-radius: 4px;
              font-size: 16px;
              margin-bottom: 15px;
              transition: border-color 0.3s;
          }
          
          .form-input:focus {
              outline: none;
              border-color: #3498db;
              box-shadow: 0 0 0 2px rgba(52, 152, 219, 0.2);
          }
          
          .form-input:disabled {
              background-color: #f5f5f5;
              cursor: not-allowed;
          }
          
          .export-button {
              background-color: #3498db;
              color: white;
              border: none;
              padding: 12px 20px;
              border-radius: 4px;
              font-size: 16px;
              font-weight: 500;
              cursor: pointer;
              transition: background-color 0.3s, transform 0.1s;
              align-self: flex-start;
          }
          
          .export-button:hover:not(:disabled) {
              background-color: #2980b9;
              transform: translateY(-2px);
          }
          
          .export-button:active:not(:disabled) {
              transform: translateY(0);
          }
          
          .export-button:disabled {
              background-color: #95a5a6;
              cursor: not-allowed;
              opacity: 0.7;
          }
          
          .export-button.processing {
              background-color: #e67e22;
              animation: pulse 1.5s infinite;
          }
          
          @keyframes pulse {
              0% { opacity: 1; }
              50% { opacity: 0.7; }
              100% { opacity: 1; }
          }
          
          .downloads-section {
              background-color: white;
              padding: 20px;
              border-radius: 6px;
              box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
          }
          
          .section-title {
              color: #2c3e50;
              font-size: 22px;
              margin-bottom: 15px;
              font-weight: 600;
          }
          
          .downloads-list-container {
              max-height: 300px;
              overflow-y: auto;
              border: 1px solid #eee;
              border-radius: 4px;
          }
          
          .downloads-list {
              list-style-type: none;
              padding: 0;
              margin: 0;
          }
          
          .download-item {
              padding: 0;
              border-bottom: 1px solid #eee;
          }
          
          .download-item:last-child {
              border-bottom: none;
          }
          
          .download-link {
              display: flex;
              align-items: center;
              padding: 12px 15px;
              color: #3498db;
              text-decoration: none;
              transition: background-color 0.2s;
          }
          
          .download-link:hover {
              background-color: #f5f9fc;
          }
          
          .file-icon {
              margin-right: 10px;
              font-size: 18px;
          }
          
          .file-name {
              font-size: 15px;
              word-break: break-all;
          }
          
          .no-downloads {
              padding: 20px;
              text-align: center;
              color: #7f8c8d;
              font-style: italic;
          }
      </style>
  `
};
