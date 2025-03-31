// export default {
//     template: `
//     <div class="row">
//         <div class="col-md-4 offset-md-4">        
//             <h3>Admin Login</h3>
//             <div v-if="message" :class="'alert alert-' + category" role="alert">
//                 {{ message }}
//             </div>
//             <form @submit.prevent="submitLogin"> <!-- Prevent default form submission -->
//                 <div class="form-group">
//                     <label for="username">Username:</label>
//                     <input type="text" id="username" v-model="username" required> <!-- Use v-model to bind input -->
//                 </div>
//                 <div class="form-group">    
//                     <label for="password">Password:</label>
//                     <input type="password" id="password" v-model="password" required> <!-- Use v-model to bind input -->
//                 </div> 
//                 <div class="form-group">       
//                     <input type="submit" value="Login" class="btn btn-primary btn-sm btn-spacing">
//                 </div>    
//             </form>
//         </div>
//     </div>
//     `,
//     data() {
//         return {
//             username: null,
//             password: null,
//             message: null,      
//             category: null,     
//         };
//     },
//     methods: {
//         async submitLogin() {
//             try {
//                 const res = await fetch(location.origin + '/admin/login', 
//                     {
//                         method: 'POST', 
//                         headers: {'Content-Type': 'application/json'}, 
//                         body: JSON.stringify({ 'username': this.username, 'password': this.password })
//                     });                
//                 if (res.ok) {
//                     const data = await res.json();
//                     this.$root.login('admin',data.access_token);
//                     this.$router.push('/admin/dashboard');
//                 } else {
//                     const errorData = await res.json();  
//                     this.message = errorData.message; 
//                     this.category = errorData.category; 
//                 }                
//             } catch (error) {
//                 this.message = 'An unexpected error occurred.';
//                 this.category = 'danger';
//             }
//         }
//     }
//};
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
                ">
                    <h3 style="
                        color: #2c3e50;
                        font-size: 28px;
                        font-weight: 600;
                        text-align: center;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #3498db;
                    ">Admin Login</h3>
                    
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
                    
                    <form @submit.prevent="submitLogin">
                        <div style="margin-bottom: 20px;">
                            <label for="username" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Username:</label>
                            <input 
                                type="text" 
                                id="username" 
                                v-model="username" 
                                required
                                style="
                                    width: 100%;
                                    padding: 12px 15px;
                                    border: 1px solid #ddd;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    transition: border-color 0.3s, box-shadow 0.3s;
                                    outline: none;
                                "
                                onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                                onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
                            >
                        </div>
                        
                        <div style="margin-bottom: 25px;">    
                            <label for="password" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Password:</label>
                            <input 
                                type="password" 
                                id="password" 
                                v-model="password" 
                                required
                                style="
                                    width: 100%;
                                    padding: 12px 15px;
                                    border: 1px solid #ddd;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    transition: border-color 0.3s, box-shadow 0.3s;
                                    outline: none;
                                "
                                onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                                onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
                            >
                        </div> 
                        
                        <div style="text-align: center; margin-top: 10px;">       
                            <input 
                                type="submit" 
                                value="Login" 
                                class="btn btn-primary btn-sm btn-spacing"
                                style="
                                    background-color: #3498db;
                                    color: white;
                                    border: none;
                                    border-radius: 5px;
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
                        </div>    
                    </form>
                    
                    <div style="
                        text-align: center;
                        margin-top: 25px;
                        padding-top: 20px;
                        border-top: 1px solid #eee;
                    ">
                        <router-link 
                            to="/"
                            style="
                                color: #3498db;
                                text-decoration: none;
                                font-size: 14px;
                                transition: color 0.3s;
                            "
                            onmouseover="this.style.color='#2980b9';"
                            onmouseout="this.style.color='#3498db';"
                        >
                            Back to Home
                        </router-link>
                    </div>
                </div>
                
                <div style="
                    text-align: center;
                    margin-top: 20px;
                    color: #7f8c8d;
                    font-size: 13px;
                ">
                    A-Z Household Services © 2025 | Admin Portal
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
            username: null,
            password: null,
            message: null,      
            category: null,     
        };
    },
    methods: {
        async submitLogin() {
            try {
                const res = await fetch(location.origin + '/admin/login', 
                    {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json'}, 
                        body: JSON.stringify({ 'username': this.username, 'password': this.password })
                    });                
                if (res.ok) {
                    const data = await res.json();
                    this.$root.login('admin',data.access_token);
                    this.$router.push('/admin/dashboard');
                } else {
                    const errorData = await res.json();  
                    this.message = errorData.message; 
                    this.category = errorData.category; 
                }                
            } catch (error) {
                this.message = 'An unexpected error occurred.';
                this.category = 'danger';
            }
        }
    }
};
