// export default {
//     template: `
//     <div class="row">
//         <div class="col-md-4 offset-md-4">        
//             <h3>Admin Profile</h3>
//             <div v-if="message" :class="'alert alert-' + category" role="alert">
//                     {{ message }}
//             </div>
//         </div>
//     </div>
//     `,
//     data() {
//         return {
//             message: '',
//             category: '',
//         };
//     },
//     created() {
//         this.fetchProfileData();
//     },
//     methods: {
//         async fetchProfileData() {
//             try {
//                 const response = await fetch('/admin/profile', {
//                     method: 'POST',
//                     headers: {  'Authorization': 'Bearer ' + localStorage.getItem('token') }
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     this.message = data.message;
//                     this.category = data.category;
//                 } else {
//                     this.message = 'Failed to load profile data';
//                     this.category = 'danger';
//                 }
//             } catch (error) {             
//                 this.message = 'An error occurred while fetching the profile data';
//                 this.category = 'danger';
//             }
//         }
//     },
// }
export default {
    template: `
    <div style="
        font-family: 'Arial', sans-serif;
        background-color: #f5f7fa;
        padding: 40px 0;
        min-height: 100vh;
        display: flex;
        align-items: center;
    ">
        <div class="row" style="width: 100%;">
            <div class="col-md-4 offset-md-4">        
                <div style="
                    background-color: #ffffff;
                    border-radius: 10px;
                    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);
                    padding: 30px;
                    text-align: center;
                ">
                    <h3 style="
                        color: #2c3e50;
                        font-size: 28px;
                        font-weight: 600;
                        margin-bottom: 25px;
                        position: relative;
                        display: inline-block;
                        padding-bottom: 10px;
                    ">
                        Admin Profile
                        <span style="
                            position: absolute;
                            bottom: 0;
                            left: 0;
                            right: 0;
                            height: 3px;
                            background: linear-gradient(to right, #3498db, #2ecc71);
                            border-radius: 2px;
                        "></span>
                    </h3>
                    
                    <div 
                        v-if="message" 
                        :class="'alert alert-' + category" 
                        role="alert"
                        style="
                            padding: 15px;
                            border-radius: 5px;
                            margin: 20px 0;
                            font-size: 16px;
                            text-align: center;
                            animation: fadeIn 0.5s;
                            box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
                        "
                    >
                        {{ message }}
                    </div>
                    
                    <div style="
                        display: flex;
                        justify-content: center;
                        margin-top: 30px;
                    ">
                        <div style="
                            width: 100px;
                            height: 100px;
                            background-color: #3498db;
                            border-radius: 50%;
                            display: flex;
                            align-items: center;
                            justify-content: center;
                            color: white;
                            font-size: 40px;
                            font-weight: bold;
                            box-shadow: 0 4px 10px rgba(52, 152, 219, 0.3);
                        ">A</div>
                    </div>
                    
                    <div style="
                        margin-top: 25px;
                        padding-top: 25px;
                        border-top: 1px solid #eee;
                    ">
                        <p style="
                            color: #7f8c8d;
                            font-size: 14px;
                            margin-bottom: 5px;
                        ">
                            You are logged in as an administrator.
                        </p>
                        <p style="
                            color: #7f8c8d;
                            font-size: 14px;
                        ">
                            Use the navigation menu to manage services, professionals, and view reports.
                        </p>
                    </div>
                    
                    <div style="margin-top: 30px;">
                        <router-link 
                            to="/admin/dashboard" 
                            style="
                                display: inline-block;
                                background-color: #3498db;
                                color: white;
                                text-decoration: none;
                                padding: 10px 20px;
                                border-radius: 5px;
                                font-weight: 500;
                                transition: background-color 0.3s, transform 0.2s;
                                box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
                            "
                            onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='translateY(-2px)';"
                            onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='translateY(0)';"
                        >
                            Go to Dashboard
                        </router-link>
                    </div>
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
            message: '',
            category: '',
        };
    },
    created() {
        this.fetchProfileData();
    },
    methods: {
        async fetchProfileData() {
            try {
                const response = await fetch('/admin/profile', {
                    method: 'POST',
                    headers: {  'Authorization': 'Bearer ' + localStorage.getItem('token') }
                });
                if (response.ok) {
                    const data = await response.json();
                    this.message = data.message;
                    this.category = data.category;
                } else {
                    this.message = 'Failed to load profile data';
                    this.category = 'danger';
                }
            } catch (error) {             
                this.message = 'An error occurred while fetching the profile data';
                this.category = 'danger';
            }
        }
    },
}
