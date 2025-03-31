// export default {
//     template: `
//       <div>
//         <div class="row">
//           <div class="col-md-4 offset-md-4">
//             <h3>Admin Search</h3>
//             <div v-if="messages.length" class="flash-messages">
//               <div v-for="(message, index) in messages" :key="index" :class="'alert alert-' + message.category">
//                 {{ message.text }}
//               </div>
//             </div>
//             <form @submit.prevent="submitSearch">
//               <div class="form-group">
//                 <label for="search_type">Search Type</label>
//                 <select v-model="form.search_type" id="search_type" class="form-control" required>
//                   <option value="customer">Customer</option>
//                   <option value="service">Service</option>
//                   <option value="professional">Professional</option>
//                 </select>
//               </div>
//               <div class="form-group">
//                 <label for="search_text">Search Text</label>
//                 <input v-model="form.search_text" id="search_text" type="text" class="form-control" />
//               </div>
//               <div class="form-group text-center">
//                 <button type="submit" class="btn btn-primary btn-sm">Submit</button>
//                 <router-link to="/admin/dashboard" class="btn btn-secondary btn-sm">Cancel</router-link>
//               </div>
//             </form>
//           </div>
//         </div>
  
//         <br /><br />
  
//         <div class="container mt-4">
//           <div class="col-md-12">
//             <h3 v-if="services.length">Services</h3>
//             <table v-if="services.length" class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Base Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="service in services" :key="service.id">
//                   <td>{{ service.id }}</td>
//                   <td>{{ service.name }}</td>
//                   <td>{{ service.price }}</td>
//                 </tr>
//               </tbody>
//             </table>
  
//             <h3 v-if="professionals.length">Manage Professionals</h3>
//             <table v-if="professionals.length" class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Name</th>
//                   <th>Service</th>
//                   <th>Experience</th>
//                   <th>Reviews</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="professional in professionals" :key="professional.id">
//                   <td>{{ professional.id }}</td>
//                   <td>{{ professional.full_name }}</td>
//                   <td>{{ serviceType[professional.user_id]?.name }}</td>
//                   <td>{{ professional.experience }}</td>
//                   <td>{{ professional.reviews }}</td>
//                 </tr>
//               </tbody>
//             </table>
  
//             <h3 v-if="serviceRequests.length && !customers.length">Service Requests</h3>
//             <table v-if="serviceRequests.length && !customers.length" class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>ID</th>
//                   <th>Assigned Professional</th>
//                   <th>Requested Date</th>
//                   <th>Status</th>
//                   <th>Customer Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="request in serviceRequests" :key="request.id">
//                   <td>{{ request.id }}</td>
//                   <td>{{ profDict[request.professional_id]?.full_name }}</td>
//                   <td>{{ request.date_of_request }}</td>
//                   <td>{{ request.service_status }}</td>
//                   <td>{{ request.remarks || '' }}</td>
//                 </tr>
//               </tbody>
//             </table>
  
//             <h3 v-if="customers.length">Customer</h3>
//             <table v-if="customers.length" class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Customer Name</th>
//                   <th>Address</th>
//                   <th>Pin Code</th>
//                   <th>Service</th>
//                   <th>Status</th>
//                   <th>Start Date</th>
//                   <th>Completed Date</th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="request in serviceRequests" :key="request.id">
//                   <td>{{ custDict[request.customer_id]?.full_name }}</td>
//                   <td>{{ custDict[request.customer_id]?.address }}</td>
//                   <td>{{ custDict[request.customer_id]?.pin_code }}</td>
//                   <td>{{ serviceDict[request.service_id]?.name }}</td>
//                   <td>{{ request.service_status }}</td>
//                   <td>{{ request.date_of_request || '' }}</td>
//                   <td>{{ request.date_of_completion || '' }}</td>
//                   <td>{{ request.remarks || '' }}</td>
//                 </tr>
//               </tbody>
//             </table>
//           </div>
//         </div>
//       </div>
//     `,
//     data() {
//       return {
//         form: {
//           search_type: "",
//           search_text: ""
//         },
//         services: [],
//         professionals: [],
//         serviceRequests: [],
//         customers: [],
//         messages: [],
//         profDict: {},
//         serviceType: {},
//         custDict: {},
//         serviceDict: {}
//       };
//     },
//     methods: {
//       async submitSearch() {
//         this.messages = [];  // Clear previous messages
//         try {
//           const res = await fetch(`${location.origin}/admin/search`, {
//             method: 'POST',
//             headers: {
//               'Content-Type': 'application/json',
//               'Authorization': 'Bearer ' + localStorage.getItem('token')
//             },
//             body: JSON.stringify({
//               search_type: this.form.search_type,
//               search_text: this.form.search_text
//             })
//           });
  
//           if (res.ok) {
//             const data = await res.json();
//             this.customers = data.data.customers;
//             this.professionals = data.data.professionals;
//             this.services = data.data.services;
//             this.serviceRequests = data.data.service_requests;
//             this.serviceType = data.data.service_type;
//             this.profDict = data.data.prof_dict;
//             this.custDict = data.data.cust_dict;
//             this.serviceDict = data.data.service_dict;
//             this.messages.push({ category: 'success', text: data.message });
//           } else {
//             const errorData = await res.json();
//             console.log(errorData)
//             this.messages.push({
//               category: errorData.category || 'danger',
//               text: errorData.message || 'An error occurred during the search.'
//             });
//           }
//         } catch (error) {
//           console.error('Unexpected error:', error);
//           this.messages.push({
//             category: 'danger',
//             text: 'An unexpected error occurred. Please try again later.'
//           });
//         }
//       },
//     }
//   };
export default {
  template: `
    <div style="font-family: 'Arial', sans-serif; background-color: #f5f7fa; padding: 20px;">
      <div class="container" style="max-width: 1200px; margin: 0 auto;">
        <div class="row">
          <div class="col-md-4 offset-md-4">
            <div style="
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
              padding: 30px;
              margin-bottom: 30px;
            ">
              <h3 style="
                color: #2c3e50;
                font-size: 24px;
                font-weight: 600;
                text-align: center;
                margin-bottom: 25px;
                padding-bottom: 15px;
                border-bottom: 2px solid #3498db;
              ">Admin Search</h3>
              
              <div v-if="messages.length" class="flash-messages" style="margin-bottom: 20px;">
                <div 
                  v-for="(message, index) in messages" 
                  :key="index" 
                  :class="'alert alert-' + message.category"
                  style="
                    padding: 12px 15px;
                    border-radius: 5px;
                    margin-bottom: 10px;
                    font-size: 14px;
                  "
                >
                  {{ message.text }}
                </div>
              </div>
              
              <form @submit.prevent="submitSearch">
                <div style="margin-bottom: 20px;">
                  <label for="search_type" style="
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #34495e;
                    font-size: 14px;
                  ">Search Type</label>
                  <select 
                    v-model="form.search_type" 
                    id="search_type" 
                    class="form-control" 
                    required
                    style="
                      width: 100%;
                      padding: 10px 15px;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 14px;
                    "
                  >
                    <option value="customer">Customer</option>
                    <option value="service">Service</option>
                    <option value="professional">Professional</option>
                  </select>
                </div>
                
                <div style="margin-bottom: 25px;">
                  <label for="search_text" style="
                    display: block;
                    margin-bottom: 8px;
                    font-weight: 500;
                    color: #34495e;
                    font-size: 14px;
                  ">Search Text</label>
                  <input 
                    v-model="form.search_text" 
                    id="search_text" 
                    type="text" 
                    class="form-control"
                    style="
                      width: 100%;
                      padding: 10px 15px;
                      border: 1px solid #ddd;
                      border-radius: 4px;
                      font-size: 14px;
                    "
                  />
                </div>
                
                <div style="
                  text-align: center;
                  margin-top: 10px;
                  display: flex;
                  justify-content: center;
                  gap: 10px;
                ">
                  <button 
                    type="submit" 
                    class="btn btn-primary btn-sm"
                    style="
                      background-color: #3498db;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      padding: 10px 20px;
                      font-size: 14px;
                      cursor: pointer;
                      transition: background-color 0.3s;
                    "
                  >Submit</button>
                  <router-link 
                    to="/admin/dashboard" 
                    class="btn btn-secondary btn-sm"
                    style="
                      background-color: #95a5a6;
                      color: white;
                      border: none;
                      border-radius: 4px;
                      padding: 10px 20px;
                      font-size: 14px;
                      text-decoration: none;
                      transition: background-color 0.3s;
                    "
                  >Cancel</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>

        <div class="container mt-4">
          <div class="col-md-12">
            <div v-if="services.length" style="
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin-bottom: 30px;
            ">
              <h3 style="
                color: #2c3e50;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
              ">Services</h3>
              <div style="overflow-x: auto;">
                <table class="table table-striped" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #3498db; color: white;">
                      <th style="padding: 12px; text-align: left;">ID</th>
                      <th style="padding: 12px; text-align: left;">Name</th>
                      <th style="padding: 12px; text-align: left;">Base Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="service in services" :key="service.id" style="border-bottom: 1px solid #ecf0f1;">
                      <td style="padding: 12px;">{{ service.id }}</td>
                      <td style="padding: 12px;">{{ service.name }}</td>
                      <td style="padding: 12px;">{{ service.price }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-if="professionals.length" style="
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin-bottom: 30px;
            ">
              <h3 style="
                color: #2c3e50;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
              ">Manage Professionals</h3>
              <div style="overflow-x: auto;">
                <table class="table table-striped" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #3498db; color: white;">
                      <th style="padding: 12px; text-align: left;">ID</th>
                      <th style="padding: 12px; text-align: left;">Name</th>
                      <th style="padding: 12px; text-align: left;">Service</th>
                      <th style="padding: 12px; text-align: left;">Experience</th>
                      <th style="padding: 12px; text-align: left;">Reviews</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="professional in professionals" :key="professional.id" style="border-bottom: 1px solid #ecf0f1;">
                      <td style="padding: 12px;">{{ professional.id }}</td>
                      <td style="padding: 12px;">{{ professional.full_name }}</td>
                      <td style="padding: 12px;">{{ serviceType[professional.user_id]?.name }}</td>
                      <td style="padding: 12px;">{{ professional.experience }}</td>
                      <td style="padding: 12px;">{{ professional.reviews }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-if="serviceRequests.length && !customers.length" style="
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin-bottom: 30px;
            ">
              <h3 style="
                color: #2c3e50;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
              ">Service Requests</h3>
              <div style="overflow-x: auto;">
                <table class="table table-striped" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #3498db; color: white;">
                      <th style="padding: 12px; text-align: left;">ID</th>
                      <th style="padding: 12px; text-align: left;">Assigned Professional</th>
                      <th style="padding: 12px; text-align: left;">Requested Date</th>
                      <th style="padding: 12px; text-align: left;">Status</th>
                      <th style="padding: 12px; text-align: left;">Customer Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="request in serviceRequests" :key="request.id" style="border-bottom: 1px solid #ecf0f1;">
                      <td style="padding: 12px;">{{ request.id }}</td>
                      <td style="padding: 12px;">{{ profDict[request.professional_id]?.full_name }}</td>
                      <td style="padding: 12px;">{{ request.date_of_request }}</td>
                      <td style="padding: 12px;">{{ request.service_status }}</td>
                      <td style="padding: 12px;">{{ request.remarks || '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div v-if="customers.length" style="
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
              padding: 20px;
              margin-bottom: 30px;
            ">
              <h3 style="
                color: #2c3e50;
                font-size: 20px;
                font-weight: 600;
                margin-bottom: 20px;
              ">Customer</h3>
              <div style="overflow-x: auto;">
                <table class="table table-striped" style="width: 100%; border-collapse: collapse;">
                  <thead>
                    <tr style="background-color: #3498db; color: white;">
                      <th style="padding: 12px; text-align: left;">Customer Name</th>
                      <th style="padding: 12px; text-align: left;">Address</th>
                      <th style="padding: 12px; text-align: left;">Pin Code</th>
                      <th style="padding: 12px; text-align: left;">Service</th>
                      <th style="padding: 12px; text-align: left;">Status</th>
                      <th style="padding: 12px; text-align: left;">Start Date</th>
                      <th style="padding: 12px; text-align: left;">Completed Date</th>
                      <th style="padding: 12px; text-align: left;">Remarks</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="request in serviceRequests" :key="request.id" style="border-bottom: 1px solid #ecf0f1;">
                      <td style="padding: 12px;">{{ custDict[request.customer_id]?.full_name }}</td>
                      <td style="padding: 12px;">{{ custDict[request.customer_id]?.address }}</td>
                      <td style="padding: 12px;">{{ custDict[request.customer_id]?.pin_code }}</td>
                      <td style="padding: 12px;">{{ serviceDict[request.service_id]?.name }}</td>
                      <td style="padding: 12px;">{{ request.service_status }}</td>
                      <td style="padding: 12px;">{{ request.date_of_request || '' }}</td>
                      <td style="padding: 12px;">{{ request.date_of_completion || '' }}</td>
                      <td style="padding: 12px;">{{ request.remarks || '' }}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      form: {
        search_type: "",
        search_text: ""
      },
      services: [],
      professionals: [],
      serviceRequests: [],
      customers: [],
      messages: [],
      profDict: {},
      serviceType: {},
      custDict: {},
      serviceDict: {}
    };
  },
  methods: {
    async submitSearch() {
      this.messages = [];  // Clear previous messages
      try {
        const res = await fetch(`${location.origin}/admin/search`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
          },
          body: JSON.stringify({
            search_type: this.form.search_type,
            search_text: this.form.search_text
          })
        });

        if (res.ok) {
          const data = await res.json();
          this.customers = data.data.customers;
          this.professionals = data.data.professionals;
          this.services = data.data.services;
          this.serviceRequests = data.data.service_requests;
          this.serviceType = data.data.service_type;
          this.profDict = data.data.prof_dict;
          this.custDict = data.data.cust_dict;
          this.serviceDict = data.data.service_dict;
          this.messages.push({ category: 'success', text: data.message });
        } else {
          const errorData = await res.json();
          console.log(errorData)
          this.messages.push({
            category: errorData.category || 'danger',
            text: errorData.message || 'An error occurred during the search.'
          });
        }
      } catch (error) {
        console.error('Unexpected error:', error);
        this.messages.push({
          category: 'danger',
          text: 'An unexpected error occurred. Please try again later.'
        });
      }
    },
  }
};
