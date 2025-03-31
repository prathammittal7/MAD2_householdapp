// export default {
//     template: `
//       <div class="row">
//         <div class="col-md-4 offset-md-4">
//           <h3>Professional Profile</h3>
          
//           <!-- Flash Messages -->
//           <div v-if="messages.length" class="flash-messages">
//             <div
//               v-for="(message, index) in messages"
//               :key="index"
//               :class="'alert alert-' + message.category"
//             >
//               {{ message.text }}
//             </div>
//           </div>
          
//           <!-- Form -->
//           <form @submit.prevent="submitForm" enctype="multipart/form-data">
//             <div class="form-group">
//               <label for="user_name">User Name</label>
//               <input
//                 id="user_name"
//                 v-model="form.user_name"
//                 class="form-control"
//                 type="text"
//                 readonly
//               />
//             </div>  
//             <div class="form-group">
//               <label for="full_name">Full Name</label>
//               <input
//                 id="full_name"
//                 v-model="form.full_name"
//                 class="form-control"
//                 type="text"
//               />
//             </div>
  
//             <div class="form-group">
//               <label for="service_type">Service Type</label>
//               <select
//                 id="service_type"
//                 v-model="form.service_type"
//                 class="form-control"
//               >
//                 <option disabled value="">Select a service type</option>
//                 <option v-for="service in serviceOptions" :key="service.id" :value="service.id">
//                   {{ service.name }}
//                 </option>
//               </select>
//             </div>
  
//             <div class="form-group">
//               <label for="experience">Experience</label>
//               <input
//                 id="experience"
//                 v-model="form.experience"
//                 class="form-control"
//                 type="text"
//               />
//             </div>
  
//             <div class="form-group">
//               <label for="file">File</label>
//               <input
//                 id="file"
//                 type="file"
//                 class="form-control"
//                 @change="handleFileUpload"
//               />
//             </div>
  
//             <div class="form-group">
//               <label for="address">Address</label>
//               <textarea
//                 id="address"
//                 v-model="form.address"
//                 class="form-control"
//               ></textarea>
//             </div>
  
//             <div class="form-group">
//               <label for="pin_code">Pin Code</label>
//               <input
//                 id="pin_code"
//                 v-model="form.pin_code"
//                 class="form-control"
//                 type="text"
//               />
//             </div>
  
//             <div class="form-group">
//               <button type="submit" class="btn btn-primary btn-sm btn-spacing">
//                 Submit
//               </button>
//             </div>
//           </form>
//         </div>
//       </div>
//     `,
//     data() {
//       return {
//         form: {
//           user_name: '', 
//           full_name: '',
//           service_type: '',
//           experience: '',
//           address: '',
//           pin_code: '',
//           file: null, // File for upload
//         },
//         serviceOptions: [], 
//         messages: [], // Flash messages
//         errors: {}, // Validation errors
//       };
//     },
//     mounted() {
//       this.fetchProfileData(); // Fetch data when the component mounts
//     },
//     methods: {
//       // Fetch the professional profile data from the server
//       async fetchProfileData() {
//         try {
//           const response = await fetch('/professional/profile', {
//             method: 'GET',
//             headers: {
//               Authorization: 'Bearer ' + localStorage.getItem('token'),
//             },
//           });
//           if (response.ok) {
//             const result = await response.json();
//             this.serviceOptions = result.services;
//             // Populate the form with the fetched data
//             this.form.user_name = result.profile.username;
//             this.form.full_name = result.profile.full_name;
//             this.form.service_type = result.profile.service_type;
//             this.form.experience = result.profile.experience;
//             this.form.address = result.profile.address;
//             this.form.pin_code = result.profile.pin_code;
//           } else {
//             this.messages.push({
//               category: result.category || 'danger',
//               text: result.message || 'An error occurred while fetching profile data.',
//             });
//           }
//         } catch (error) {
//           this.messages.push({
//             category: 'danger',
//             text: 'An unexpected error occurred. Please try again later.',
//           });
//         }
//       },
//       handleFileUpload(event) {
//         this.form.file = event.target.files[0]; // Store the uploaded file
//       },
//       async submitForm() {
//         this.messages = [];
//         this.errors = {};
  
//         // Prepare form data for submission
//         const formData = new FormData();
//         for (const key in this.form) {
//           formData.append(key, this.form[key]);
//         }
//         try {
//           const response = await fetch('/professional/profile', {
//             method: 'POST',
//             headers: {
//               Authorization: 'Bearer ' + localStorage.getItem('token'),
//             },
//             body: formData,
//           });
  
//           const result = await response.json();
  
//           if (response.ok) {
//             this.messages.push({ category: 'success', text: result.message });
//           } else {
//             this.errors = result.errors || {};
//             this.messages.push({
//               category: result.category || 'danger',
//               text: result.message || 'An error occurred.',
//             });
//           }
//         } catch (error) {
//           this.messages.push({
//             category: 'danger',
//             text: 'An unexpected error occurred. Please try again later.',
//           });
//         }
//       },
//     },
//   };
export default {
  template: `
    <div class="row">
      <div class="col-md-4 offset-md-4">
        <div style="
          background-color: #ffffff;
          border-radius: 8px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
          padding: 30px;
          margin-top: 30px;
          margin-bottom: 30px;
        ">
          <h3 style="
            color: #2c3e50;
            font-size: 24px;
            font-weight: 600;
            margin-bottom: 25px;
            text-align: center;
            padding-bottom: 15px;
            border-bottom: 2px solid #3498db;
          ">Professional Profile</h3>
          
          <!-- Flash Messages -->
          <div v-if="messages.length" style="
            margin-bottom: 20px;
            animation: fadeIn 0.5s ease-in-out;
          ">
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
          
          <!-- Form -->
          <form @submit.prevent="submitForm" enctype="multipart/form-data">
            <div style="margin-bottom: 20px;">
              <label for="user_name" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">User Name</label>
              <input
                id="user_name"
                v-model="form.user_name"
                class="form-control"
                type="text"
                readonly
                style="
                  width: 100%;
                  padding: 10px 15px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  background-color: #f5f5f5;
                  font-size: 14px;
                "
              />
            </div>  
            <div style="margin-bottom: 20px;">
              <label for="full_name" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">Full Name</label>
              <input
                id="full_name"
                v-model="form.full_name"
                class="form-control"
                type="text"
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
  
            <div style="margin-bottom: 20px;">
              <label for="service_type" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">Service Type</label>
              <select
                id="service_type"
                v-model="form.service_type"
                class="form-control"
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
                  transition: border-color 0.3s, box-shadow 0.3s;
                "
                onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
              >
                <option disabled value="">Select a service type</option>
                <option v-for="service in serviceOptions" :key="service.id" :value="service.id">
                  {{ service.name }}
                </option>
              </select>
            </div>
  
            <div style="margin-bottom: 20px;">
              <label for="experience" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">Experience</label>
              <input
                id="experience"
                v-model="form.experience"
                class="form-control"
                type="text"
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
  
            <div style="margin-bottom: 20px;">
              <label for="file" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">File</label>
              <div style="
                position: relative;
                border: 1px dashed #3498db;
                border-radius: 4px;
                padding: 20px;
                text-align: center;
                background-color: #f8fafc;
                transition: background-color 0.3s;
              "
              onmouseover="this.style.backgroundColor='#eef5fd';"
              onmouseout="this.style.backgroundColor='#f8fafc';"
              >
                <input
                  id="file"
                  type="file"
                  class="form-control"
                  @change="handleFileUpload"
                  style="
                    opacity: 0;
                    position: absolute;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    cursor: pointer;
                  "
                />
                <div style="pointer-events: none;">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#3498db" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-bottom: 10px;">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                    <polyline points="17 8 12 3 7 8"></polyline>
                    <line x1="12" y1="3" x2="12" y2="15"></line>
                  </svg>
                  <p style="margin: 0; color: #7f8c8d; font-size: 14px;">
                    {{ form.file ? form.file.name : 'Click to upload or drag and drop' }}
                  </p>
                </div>
              </div>
            </div>
  
            <div style="margin-bottom: 20px;">
              <label for="address" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">Address</label>
              <textarea
                id="address"
                v-model="form.address"
                class="form-control"
                style="
                  width: 100%;
                  padding: 10px 15px;
                  border: 1px solid #ddd;
                  border-radius: 4px;
                  font-size: 14px;
                  min-height: 100px;
                  resize: vertical;
                  transition: border-color 0.3s, box-shadow 0.3s;
                "
                onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
              ></textarea>
            </div>
  
            <div style="margin-bottom: 25px;">
              <label for="pin_code" style="
                display: block;
                margin-bottom: 8px;
                font-weight: 500;
                color: #34495e;
                font-size: 14px;
              ">Pin Code</label>
              <input
                id="pin_code"
                v-model="form.pin_code"
                class="form-control"
                type="text"
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
  
            <div style="text-align: center;">
              <button type="submit" style="
                background-color: #3498db;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 12px 30px;
                font-size: 16px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.3s, transform 0.2s;
                box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
              "
              onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='translateY(-2px)';"
              onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='translateY(0)';"
              >
                Save Profile
              </button>
            </div>
          </form>
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
        user_name: '', 
        full_name: '',
        service_type: '',
        experience: '',
        address: '',
        pin_code: '',
        file: null, // File for upload
      },
      serviceOptions: [], 
      messages: [], // Flash messages
      errors: {}, // Validation errors
    };
  },
  mounted() {
    this.fetchProfileData(); // Fetch data when the component mounts
  },
  methods: {
    // Fetch the professional profile data from the server
    async fetchProfileData() {
      try {
        const response = await fetch('/professional/profile', {
          method: 'GET',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
        });
        if (response.ok) {
          const result = await response.json();
          this.serviceOptions = result.services;
          // Populate the form with the fetched data
          this.form.user_name = result.profile.username;
          this.form.full_name = result.profile.full_name;
          this.form.service_type = result.profile.service_type;
          this.form.experience = result.profile.experience;
          this.form.address = result.profile.address;
          this.form.pin_code = result.profile.pin_code;
        } else {
          this.messages.push({
            category: result.category || 'danger',
            text: result.message || 'An error occurred while fetching profile data.',
          });
        }
      } catch (error) {
        this.messages.push({
          category: 'danger',
          text: 'An unexpected error occurred. Please try again later.',
        });
      }
    },
    handleFileUpload(event) {
      this.form.file = event.target.files[0]; // Store the uploaded file
    },
    async submitForm() {
      this.messages = [];
      this.errors = {};

      // Prepare form data for submission
      const formData = new FormData();
      for (const key in this.form) {
        formData.append(key, this.form[key]);
      }
      try {
        const response = await fetch('/professional/profile', {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ' + localStorage.getItem('token'),
          },
          body: formData,
        });

        const result = await response.json();

        if (response.ok) {
          this.messages.push({ category: 'success', text: result.message });
        } else {
          this.errors = result.errors || {};
          this.messages.push({
            category: result.category || 'danger',
            text: result.message || 'An error occurred.',
          });
        }
      } catch (error) {
        this.messages.push({
          category: 'danger',
          text: 'An unexpected error occurred. Please try again later.',
        });
      }
    },
  },
};
