// export default {
//     template: `
//       <div>
//         <div class="row">
//           <div class="col-md-4 offset-md-4">
//             <h3>Professional Search</h3>
  
//             <!-- Validation Errors -->
//             <ul v-if="errors.search_text">
//               <li v-for="(error, index) in errors.search_text" :key="index" style="color: red;">
//                 {{ error }}
//               </li>
//             </ul>
  
//             <!-- Flash Messages -->
//             <div v-if="messages.length" class="flash-messages">
//               <div
//                 v-for="(message, index) in messages"
//                 :key="index"
//                 :class="'alert alert-' + message.category"
//               >
//                 {{ message.text }}
//               </div>
//             </div>
  
//             <!-- Search Form -->
//             <form @submit.prevent="submitSearch">
//               <div class="form-group">
//                 <label for="search_type">Search Type</label>
//                 <select v-model="form.search_type" id="search_type" class="form-control" required>
//                   <option value="date">Date</option>
//                   <option value="location">Location</option>
//                   <option value="pin">PIN</option>
//                 </select>
//               </div>
//               <div class="form-group">
//                 <label for="search_text">Search Text</label>
//                 <input
//                   v-model="form.search_text"
//                   id="search_text"
//                   type="text"
//                   class="form-control"
//                   required
//                 />
//               </div>
//               <div class="form-group text-center">
//                 <button type="submit" class="btn btn-primary btn-sm">Submit</button>
//               </div>
//             </form>
//           </div>
//         </div>
  
//         <br /><br />
  
//         <!-- Search Results -->
//         <div class="container mt-4">
//           <div class="col-md-12">
//             <h3 v-if="searchResults.length">Search Results</h3>
//             <table v-if="searchResults.length" class="table table-striped">
//               <thead>
//                 <tr>
//                   <th>Customer Name</th>
//                   <th>Service</th>
//                   <th>Status</th>
//                   <th>Start Date</th>
//                   <th>Remarks</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr v-for="(result, index) in searchResults" :key="index">
//                   <td>{{ result.customer_name }}</td>
//                   <td>{{ result.service_name }}</td>
//                   <td>{{ result.status }}</td>
//                   <td>{{ result.start_date }}</td>
//                   <td>{{ result.remarks }}</td>
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
//           search_type: "location",
//           search_text: "",
//         },
//         errors: {
//           search_text: [],
//         },
//         messages: [],
//         searchResults: [],
//       };
//     },
//     methods: {
//       async submitSearch() {
//         this.messages = [];
//         this.errors = { search_text: [] };
  
//         try {
//           const res = await fetch(`${location.origin}/professional/search`, {
//             method: "POST",
//             headers: {
//               "Content-Type": "application/json",
//               Authorization: `Bearer ${localStorage.getItem("token")}`,
//             },
//             body: JSON.stringify(this.form),
//           });
  
//           if (res.ok) {
//             const data = await res.json();
//             this.searchResults = data.data?.service_requests || [];
//             this.messages.push({ category: "success", text: data.message });
//           } else {
//             const errorData = await res.json();
//             this.messages.push({
//               category: "danger",
//               text: errorData.message || "An error occurred during the search.",
//             });
//           }
//         } catch (error) {
//           console.error("Unexpected error:", error);
//           this.messages.push({
//             category: "danger",
//             text: "An unexpected error occurred. Please try again later.",
//           });
//         }
//       },
//     },
//   };
export default {
  template: `
    <div style="font-family: Arial, sans-serif; background-color: #f5f7fa; padding: 20px;">
      <div class="row">
        <div class="col-md-4 offset-md-4">
          <div style="background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.1); padding: 30px;">
            <h3 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px; text-align: center; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Professional Search</h3>

            <!-- Validation Errors -->
            <ul v-if="errors.search_text" style="list-style-type: none; padding: 0; margin-bottom: 15px;">
              <li v-for="(error, index) in errors.search_text" :key="index" style="color: #e74c3c; font-size: 14px; margin-bottom: 5px;">
                {{ error }}
              </li>
            </ul>

            <!-- Flash Messages -->
            <div v-if="messages.length" class="flash-messages" style="margin-bottom: 20px;">
              <div
                v-for="(message, index) in messages"
                :key="index"
                :class="'alert alert-' + message.category"
                style="padding: 10px; border-radius: 4px; font-size: 14px; margin-bottom: 10px;"
              >
                {{ message.text }}
              </div>
            </div>

            <!-- Search Form -->
            <form @submit.prevent="submitSearch">
              <div style="margin-bottom: 20px;">
                <label for="search_type" style="display: block; margin-bottom: 5px; color: #34495e; font-weight: bold;">Search Type</label>
                <select v-model="form.search_type" id="search_type" required style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;">
                  <option value="date">Date</option>
                  <option value="location">Location</option>
                  <option value="pin">PIN</option>
                </select>
              </div>
              <div style="margin-bottom: 20px;">
                <label for="search_text" style="display: block; margin-bottom: 5px; color: #34495e; font-weight: bold;">Search Text</label>
                <input
                  v-model="form.search_text"
                  id="search_text"
                  type="text"
                  required
                  style="width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; font-size: 14px;"
                />
              </div>
              <div style="text-align: center;">
                <button type="submit" style="background-color: #3498db; color: white; border: none; padding: 10px 20px; border-radius: 4px; font-size: 16px; cursor: pointer; transition: background-color 0.3s;">Submit</button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <br /><br />

      <!-- Search Results -->
      <div class="container mt-4">
        <div class="col-md-12">
          <h3 v-if="searchResults.length" style="color: #2c3e50; font-size: 22px; margin-bottom: 15px;">Search Results</h3>
          <table v-if="searchResults.length" style="width: 100%; border-collapse: collapse; background-color: white; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
            <thead>
              <tr style="background-color: #3498db; color: white;">
                <th style="padding: 12px; text-align: left;">Customer Name</th>
                <th style="padding: 12px; text-align: left;">Service</th>
                <th style="padding: 12px; text-align: left;">Status</th>
                <th style="padding: 12px; text-align: left;">Start Date</th>
                <th style="padding: 12px; text-align: left;">Remarks</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(result, index) in searchResults" :key="index" style="border-bottom: 1px solid #ecf0f1;">
                <td style="padding: 12px;">{{ result.customer_name }}</td>
                <td style="padding: 12px;">{{ result.service_name }}</td>
                <td style="padding: 12px;">{{ result.status }}</td>
                <td style="padding: 12px;">{{ result.start_date }}</td>
                <td style="padding: 12px;">{{ result.remarks }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  `,
  data() {
    return {
      form: {
        search_type: "location",
        search_text: "",
      },
      errors: {
        search_text: [],
      },
      messages: [],
      searchResults: [],
    };
  },
  methods: {
    async submitSearch() {
      this.messages = [];
      this.errors = { search_text: [] };

      try {
        const res = await fetch(`${location.origin}/professional/search`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(this.form),
        });

        if (res.ok) {
          const data = await res.json();
          this.searchResults = data.data?.service_requests || [];
          this.messages.push({ category: "success", text: data.message });
        } else {
          const errorData = await res.json();
          this.messages.push({
            category: "danger",
            text: errorData.message || "An error occurred during the search.",
          });
        }
      } catch (error) {
        console.error("Unexpected error:", error);
        this.messages.push({
          category: "danger",
          text: "An unexpected error occurred. Please try again later.",
        });
      }
    },
  },
};
