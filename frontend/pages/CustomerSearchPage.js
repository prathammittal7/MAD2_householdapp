// export default {
//     template: `
//       <div>
//         <div class="row">
//           <div class="col-md-4 offset-md-4">
//             <h3>Customer Search</h3>
//             <!-- Flash Messages -->
//             <div v-if="messages.length" class="flash-messages">
//               <div v-for="(message, index) in messages" :key="index" :class="'alert alert-' + message.category">
//                 {{ message.text }}
//               </div>
//             </div>
//             <!-- Search Form -->
//             <form @submit.prevent="submitSearch">
//               <div class="form-group">
//                 <label for="search_type">Search Type</label>
//                 <select v-model="form.search_type" id="search_type" class="form-control" required>
//                   <option value="service">Service Name</option>
//                   <option value="location">Location</option>
//                   <option value="pin">PIN</option>
//                 </select>
//               </div>
//               <div class="form-group">
//                 <label for="search_text">Search Text</label>
//                 <input v-model="form.search_text" id="search_text" type="text" class="form-control" />
//               </div>
//               <div class="form-group text-center">
//                 <button type="submit" class="btn btn-primary btn-sm">Submit</button>
//                 <router-link to="/customer/dashboard" class="btn btn-secondary btn-sm">Cancel</router-link>
//               </div>
//             </form>
//           </div>
//         </div>
  
//         <br /><br />
  
//         <!-- Search Results -->
//         <div class="container mt-4">
//           <div class="col-md-12">
//             <h3 v-if="service_professional.length">Services</h3>
//             <table v-if="service_professional.length" class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Name</th>
//                   <th>Description</th>
//                   <th>Location</th>
//                   <th>Pin Code</th>
//                   <th>Base Price</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="(service, index) in service_professional" :key="index">
//                   <td>{{ service.service_name }}</td>
//                   <td>{{ service.service_description }}</td>
//                   <td>{{ service.address }}</td>
//                   <td>{{ service.pin_code }}</td>
//                   <td>{{ service.service_price }}</td>
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
//           search_type: "service", // Default value
//           search_text: ""
//         },
//         service_professional: [],
//         messages: []
//       };
//     },
//     methods: {
//       async submitSearch() {
//         this.messages = [];
//         try {
//           const res = await fetch(`${location.origin}/customer/search`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: "Bearer " + localStorage.getItem("token")
//             },
//             body: JSON.stringify({
//               search_type: this.form.search_type,
//               search_text: this.form.search_text
//             })
//           });
  
//           const data = await res.json();
//           if (res.ok) {
//             this.service_professional = data.data.service_professional;
//             this.messages.push({ category: "success", text: data.message });
//           } else {
//             this.service_professional = [];
//             this.messages.push({
//               category: data.category || "danger",
//               text: data.message || "An error occurred during the search."
//             });
//           }
//         } catch (error) {
//           console.error("Unexpected error:", error);
//           this.service_professional = [];
//           this.messages.push({
//             category: "danger",
//             text: "An unexpected error occurred. Please try again later."
//           });
//         }
//       }
//     }
//   };
export default {
  template: `
    <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; padding: 20px;">
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
            ">Customer Search</h3>
            
            <!-- Flash Messages -->
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
                  animation: fadeIn 0.5s;
                "
              >
                {{ message.text }}
              </div>
            </div>
            
            <!-- Search Form -->
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
                    appearance: none;
                    background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23333\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>');
                    background-repeat: no-repeat;
                    background-position: right 10px center;
                    background-color: white;
                    transition: border-color 0.3s, box-shadow 0.3s;
                  "
                  onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                  onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
                >
                  <option value="service">Service Name</option>
                  <option value="location">Location</option>
                  <option value="pin">PIN</option>
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
                    transition: border-color 0.3s, box-shadow 0.3s;
                  "
                  onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                  onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
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
                    transition: background-color 0.3s, transform 0.2s;
                    box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
                  "
                  onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='translateY(-2px)';"
                  onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='translateY(0)';"
                >Submit</button>
                
                <router-link 
                  to="/customer/dashboard" 
                  class="btn btn-secondary btn-sm"
                  style="
                    background-color: #95a5a6;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    padding: 10px 20px;
                    font-size: 14px;
                    cursor: pointer;
                    text-decoration: none;
                    transition: background-color 0.3s, transform 0.2s;
                    box-shadow: 0 2px 5px rgba(149, 165, 166, 0.3);
                    display: inline-flex;
                    align-items: center;
                    justify-content: center;
                  "
                  onmouseover="this.style.backgroundColor='#7f8c8d'; this.style.transform='translateY(-2px)';"
                  onmouseout="this.style.backgroundColor='#95a5a6'; this.style.transform='translateY(0)';"
                >Cancel</router-link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <!-- Search Results -->
      <div class="container mt-4">
        <div class="col-md-12">
          <h3 
            v-if="service_professional.length" 
            style="
              color: #2c3e50;
              font-size: 22px;
              margin-bottom: 15px;
              padding-bottom: 10px;
              border-bottom: 1px solid #eee;
            "
          >Services</h3>
          
          <div v-if="service_professional.length" style="
            background-color: #ffffff;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.08);
            overflow: hidden;
          ">
            <table class="table table-striped" style="
              width: 100%;
              border-collapse: collapse;
              margin-bottom: 0;
            ">
              <thead>
                <tr style="background-color: #3498db; color: white;">
                  <th style="padding: 15px; text-align: left; font-weight: 500;">Name</th>
                  <th style="padding: 15px; text-align: left; font-weight: 500;">Description</th>
                  <th style="padding: 15px; text-align: left; font-weight: 500;">Location</th>
                  <th style="padding: 15px; text-align: left; font-weight: 500;">Pin Code</th>
                  <th style="padding: 15px; text-align: left; font-weight: 500;">Base Price</th>
                </tr>
              </thead>
              <tbody>
                <tr 
                  v-for="(service, index) in service_professional" 
                  :key="index"
                  style="border-bottom: 1px solid #ecf0f1;"
                >
                  <td style="padding: 12px 15px; font-size: 14px;">{{ service.service_name }}</td>
                  <td style="padding: 12px 15px; font-size: 14px;">{{ service.service_description }}</td>
                  <td style="padding: 12px 15px; font-size: 14px;">{{ service.address }}</td>
                  <td style="padding: 12px 15px; font-size: 14px;">{{ service.pin_code }}</td>
                  <td style="padding: 12px 15px; font-size: 14px;">{{ service.service_price }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <div 
            v-if="service_professional.length === 0 && messages.length > 0" 
            style="
              text-align: center;
              padding: 30px;
              background-color: #f8f9fa;
              border-radius: 8px;
              margin-top: 20px;
              color: #7f8c8d;
            "
          >
            No services found matching your search criteria.
          </div>
        </div>
      </div>
    </div>
    <style>
      @keyframes fadeIn {
        from { opacity: 0; transform: translateY(-10px); }
        to { opacity: 1; transform: translateY(0); }
      }
      
      .alert-success {
        background-color: #d4edda;
        border-color: #c3e6cb;
        color: #155724;
      }
      
      .alert-danger {
        background-color: #f8d7da;
        border-color: #f5c6cb;
        color: #721c24;
      }
      
      .alert-warning {
        background-color: #fff3cd;
        border-color: #ffeeba;
        color: #856404;
      }
      
      .alert-info {
        background-color: #d1ecf1;
        border-color: #bee5eb;
        color: #0c5460;
      }
    </style>
  `,
  data() {
    return {
      form: {
        search_type: "service", // Default value
        search_text: ""
      },
      service_professional: [],
      messages: []
    };
  },
  methods: {
    async submitSearch() {
      this.messages = [];
      try {
        const res = await fetch(`${location.origin}/customer/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token")
          },
          body: JSON.stringify({
            search_type: this.form.search_type,
            search_text: this.form.search_text
          })
        });

        const data = await res.json();
        if (res.ok) {
          this.service_professional = data.data.service_professional;
          this.messages.push({ category: "success", text: data.message });
        } else {
          this.service_professional = [];
          this.messages.push({
            category: data.category || "danger",
            text: data.message || "An error occurred during the search."
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        this.service_professional = [];
        this.messages.push({
          category: "danger",
          text: "An unexpected error occurred. Please try again later."
        });
      }
    }
  }
};
