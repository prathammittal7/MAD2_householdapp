// export default {
//     template : `
//         <div class="row">
//             <div class="col-md-4 offset-md-4">        
//                 <h3>Register</h3>
//                 <div v-if="message" :class="'alert alert-' + category" role="alert">
//                     {{ message }}
//                 </div>
//                 <form @submit.prevent="submitRegister">
//                     <div class="form-group">
//                         <label for="username">Username:</label>
//                         <input type="text" id="username" v-model="username" required> 
//                     </div>
//                     <div class="form-group">    
//                         <label for="password">Password:</label>
//                         <input type="password" id="password" v-model="password" required> 
//                     </div> 
//                     <div class="form-group">
//                         <label for="role">Select Role:</label>
//                         <select v-model="role" id="role" >
//                             <option value="customer">Customer</option>
//                             <option value="professional">Professional</option>
//                         </select>
//                     </div>    
//                     <div class="form-group text-center">       
//                         <input type="submit" value="Register" class="btn btn-primary btn-sm btn-spacing">
//                         <router-link to="/login" class="btn btn-secondary btn-sm btn-spacing">Cancel</router-link>  
//                     </div>    
//                 </form>
//             </div>
//         </div>
//     `,
//     data(){
//         return {
//             username: null,
//             password: null,
//             role : null,
//             message: null,      
//             category: null,            
//         } 
//     },
//     methods : {
//         async submitRegister(){
//             try{
//                 const res = await fetch(location.origin+'/register', 
//                     {method : 'POST', 
//                         headers: {'Content-Type' : 'application/json'}, 
//                         body : JSON.stringify({'username': this.username,'password': this.password, 'role' : this.role})
//                     })
//                 if (res.ok){
//                     const data = await res.json();
//                     this.message = data.message; 
//                     this.category = data.category;
//                 }else{
//                     const errorData = await res.json();  
//                     this.message = errorData.message; 
//                     this.category = errorData.category;
//                 }
//             }catch (error){
//                     this.message = 'An unexpected error occurred.';
//                     this.category = 'danger';
//             }            
//         }
//     }
// }
export default {
    template : `
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
                        position: relative;
                    ">
                        Register
                        <span style="
                            display: block;
                            width: 50px;
                            height: 3px;
                            background: linear-gradient(to right, #3498db, #2ecc71);
                            margin: 10px auto 0;
                            border-radius: 3px;
                        "></span>
                    </h3>
                    
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
                    
                    <form @submit.prevent="submitRegister">
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
                        
                        <div style="margin-bottom: 20px;">    
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
                        
                        <div style="margin-bottom: 25px;">
                            <label for="role" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Select Role:</label>
                            <select 
                                v-model="role" 
                                id="role"
                                style="
                                    width: 100%;
                                    padding: 12px 15px;
                                    border: 1px solid #ddd;
                                    border-radius: 5px;
                                    font-size: 14px;
                                    appearance: none;
                                    background-image: url('data:image/svg+xml;utf8,<svg fill=\"%23333\" height=\"24\" viewBox=\"0 0 24 24\" width=\"24\" xmlns=\"http://www.w3.org/2000/svg\"><path d=\"M7 10l5 5 5-5z\"/><path d=\"M0 0h24v24H0z\" fill=\"none\"/></svg>');
                                    background-repeat: no-repeat;
                                    background-position: right 10px center;
                                    background-color: white;
                                    transition: border-color 0.3s, box-shadow 0.3s;
                                    outline: none;
                                "
                                onfocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                                onblur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
                            >
                                <option value="customer">Customer</option>
                                <option value="professional">Professional</option>
                            </select>
                        </div>    
                        
                        <div style="
                            text-align: center;
                            margin-top: 10px;
                            display: flex;
                            justify-content: center;
                            gap: 10px;
                        ">       
                            <input 
                                type="submit" 
                                value="Register" 
                                class="btn btn-primary btn-sm btn-spacing"
                                style="
                                    background-color: #3498db;
                                    color: white;
                                    border: none;
                                    border-radius: 5px;
                                    padding: 12px 25px;
                                    font-size: 15px;
                                    font-weight: 500;
                                    cursor: pointer;
                                    transition: background-color 0.3s, transform 0.2s;
                                    box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
                                "
                                onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='translateY(-2px)';"
                                onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='translateY(0)';"
                            >
                            
                            <router-link 
                                to="/login" 
                                class="btn btn-secondary btn-sm btn-spacing"
                                style="
                                    background-color: #95a5a6;
                                    color: white;
                                    border: none;
                                    border-radius: 5px;
                                    padding: 12px 25px;
                                    font-size: 15px;
                                    font-weight: 500;
                                    cursor: pointer;
                                    text-decoration: none;
                                    display: inline-block;
                                    transition: background-color 0.3s, transform 0.2s;
                                    box-shadow: 0 2px 5px rgba(149, 165, 166, 0.3);
                                "
                                onmouseover="this.style.backgroundColor='#7f8c8d'; this.style.transform='translateY(-2px)';"
                                onmouseout="this.style.backgroundColor='#95a5a6'; this.style.transform='translateY(0)';"
                            >
                                Cancel
                            </router-link>  
                        </div>    
                    </form>
                    
                    <div style="
                        text-align: center;
                        margin-top: 25px;
                        font-size: 13px;
                        color: #7f8c8d;
                    ">
                        Already have an account? 
                        <router-link 
                            to="/login"
                            style="
                                color: #3498db;
                                text-decoration: none;
                                transition: color 0.3s;
                            "
                            onmouseover="this.style.color='#2980b9';"
                            onmouseout="this.style.color='#3498db';"
                        >
                            Sign in
                        </router-link>
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
    data(){
        return {
            username: null,
            password: null,
            role : null,
            message: null,      
            category: null,            
        } 
    },
    methods : {
        async submitRegister(){
            try{
                const res = await fetch(location.origin+'/register', 
                    {method : 'POST', 
                        headers: {'Content-Type' : 'application/json'}, 
                        body : JSON.stringify({'username': this.username,'password': this.password, 'role' : this.role})
                    })
                if (res.ok){
                    const data = await res.json();
                    this.message = data.message; 
                    this.category = data.category;
                }else{
                    const errorData = await res.json();  
                    this.message = errorData.message; 
                    this.category = errorData.category;
                }
            }catch (error){
                    this.message = 'An unexpected error occurred.';
                    this.category = 'danger';
            }            
        }
    }
}
