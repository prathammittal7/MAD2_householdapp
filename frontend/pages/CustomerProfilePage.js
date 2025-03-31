// export default {
//     template: `
//     <div class="row">
//         <div class="col-md-4 offset-md-4">        
//             <h3>Customer Profile</h3>         
//             <div v-if="message" :class="'alert alert-' + category" role="alert">
//                 {{ message }}
//             </div>            
//             <form @submit.prevent="handleSubmit">
//                 <div class="form-group">
//                     <label for="user_name">User Name</label>
//                     <input 
//                         type="text" 
//                         id="user_name" 
//                         v-model="form.user_name" 
//                         class="form-control" 
//                         readonly 
//                     />
//                 </div>
                
//                 <div class="form-group">
//                     <label for="full_name">Full Name</label>
//                     <input 
//                         type="text" 
//                         id="full_name" 
//                         v-model="form.full_name" 
//                         class="form-control" 
//                     />
//                 </div>
                
//                 <div class="form-group">
//                     <label for="address">Address</label>
//                     <input 
//                         type="text" 
//                         id="address" 
//                         v-model="form.address" 
//                         class="form-control" 
//                     />
//                 </div>
                
//                 <div class="form-group">
//                     <label for="pin_code">Pin Code</label>
//                     <input 
//                         type="text" 
//                         id="pin_code" 
//                         v-model="form.pin_code" 
//                         class="form-control" 
//                     />
//                 </div>                
//                 <div class="form-group text-center">
//                     <button type="submit" class="btn btn-primary btn-sm">Submit</button>
//                 </div>
//             </form>
//         </div>
//     </div>
//     `,    
//     data() {
//         return {
//             form: {
//                 user_name: '',
//                 full_name: '',
//                 address: '',
//                 pin_code: ''
//             },
//             user_id : '',
//             message: '',
//             category: '',            
//         };
//     },
//     mounted() {
//         this.fetchCustomerProfile();
//     },
//     methods: {
//         async fetchCustomerProfile() {
//             try{
//                 const response = await fetch('/customer/profile', {
//                     method: 'GET',
//                     headers: {  'Content-Type': 'application/json',
//                                 'Authorization': 'Bearer ' + localStorage.getItem('token') }
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     this.user_id = data.user_id;
//                     this.form.user_name = data.username;
//                     this.form.full_name = data.full_name;
//                     this.form.address = data.address;
//                     this.form.pin_code = data.pin_code;
//                 } else {
//                     this.message = 'Failed to load profile data';
//                     this.category = 'danger';
//                 }
//             }catch (error) {
//                 this.message = 'An error occurred while fetching the profile data';
//                 this.category = 'danger';
//             }
//         },
//         async handleSubmit() {
//             try{
//                 const response = await fetch('/customer/profile', {
//                     method: 'POST',
//                     headers: {  'Content-Type': 'application/json',
//                                 'Authorization': 'Bearer ' + localStorage.getItem('token') },
//                     body: JSON.stringify({ 'full_name': this.form.full_name,
//                                            'address': this.form.address,
//                                            'pin_code': this.form.pin_code })
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     this.message = data.message
//                     this.category = data.category;
//                 }else{
//                     this.message = 'Failed to update profile data';
//                     this.category = 'danger';
//                 }
//             }catch (error) {
//                 this.message = 'An error occurred while updating the profile data';
//                 this.category = 'danger';
//             }            
//         }

//     }
// };
export default {
    template: `
    <div class="row">
        <div class="col-md-4 offset-md-4">        
            <div style="
                background-color: #ffffff;
                border-radius: 8px;
                box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                padding: 30px;
                margin-top: 40px;
                margin-bottom: 40px;
            ">
                <h3 style="
                    color: #2c3e50;
                    font-size: 24px;
                    font-weight: 600;
                    text-align: center;
                    margin-bottom: 25px;
                    padding-bottom: 15px;
                    border-bottom: 2px solid #3498db;
                ">Customer Profile</h3>         
                
                <div 
                    v-if="message" 
                    :class="'alert alert-' + category" 
                    role="alert"
                    style="
                        padding: 12px 15px;
                        border-radius: 5px;
                        margin-bottom: 20px;
                        font-size: 14px;
                        animation: fadeIn 0.5s;
                    "
                >
                    {{ message }}
                </div>            
                
                <form @submit.prevent="handleSubmit">
                    <div style="margin-bottom: 20px;">
                        <label for="user_name" style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 500;
                            color: #34495e;
                            font-size: 14px;
                        ">User Name</label>
                        <input 
                            type="text" 
                            id="user_name" 
                            v-model="form.user_name" 
                            class="form-control" 
                            readonly 
                            style="
                                width: 100%;
                                padding: 10px 15px;
                                border: 1px solid #ddd;
                                border-radius: 4px;
                                font-size: 14px;
                                background-color: #f5f5f5;
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
                            type="text" 
                            id="full_name" 
                            v-model="form.full_name" 
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
                    
                    <div style="margin-bottom: 20px;">
                        <label for="address" style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 500;
                            color: #34495e;
                            font-size: 14px;
                        ">Address</label>
                        <input 
                            type="text" 
                            id="address" 
                            v-model="form.address" 
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
                    
                    <div style="margin-bottom: 25px;">
                        <label for="pin_code" style="
                            display: block;
                            margin-bottom: 8px;
                            font-weight: 500;
                            color: #34495e;
                            font-size: 14px;
                        ">Pin Code</label>
                        <input 
                            type="text" 
                            id="pin_code" 
                            v-model="form.pin_code" 
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
                    
                    <div style="text-align: center; margin-top: 10px;">
                        <button 
                            type="submit" 
                            class="btn btn-primary btn-sm"
                            style="
                                background-color: #3498db;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                padding: 12px 30px;
                                font-size: 15px;
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
                address: '',
                pin_code: ''
            },
            user_id : '',
            message: '',
            category: '',            
        };
    },
    mounted() {
        this.fetchCustomerProfile();
    },
    methods: {
        async fetchCustomerProfile() {
            try{
                const response = await fetch('/customer/profile', {
                    method: 'GET',
                    headers: {  'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                if (response.ok) {
                    const data = await response.json();
                    this.user_id = data.user_id;
                    this.form.user_name = data.username;
                    this.form.full_name = data.full_name;
                    this.form.address = data.address;
                    this.form.pin_code = data.pin_code;
                } else {
                    this.message = 'Failed to load profile data';
                    this.category = 'danger';
                }
            }catch (error) {
                this.message = 'An error occurred while fetching the profile data';
                this.category = 'danger';
            }
        },
        async handleSubmit() {
            try{
                const response = await fetch('/customer/profile', {
                    method: 'POST',
                    headers: {  'Content-Type': 'application/json',
                                'Authorization': 'Bearer ' + localStorage.getItem('token') },
                    body: JSON.stringify({ 'full_name': this.form.full_name,
                                           'address': this.form.address,
                                           'pin_code': this.form.pin_code })
                });
                if (response.ok) {
                    const data = await response.json();
                    this.message = data.message
                    this.category = data.category;
                }else{
                    this.message = 'Failed to update profile data';
                    this.category = 'danger';
                }
            }catch (error) {
                this.message = 'An error occurred while updating the profile data';
                this.category = 'danger';
            }            
        }
    }
};
