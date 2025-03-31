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
                transition: all 0.3s ease;
            ">
                <h3 style="
                    color: #2c3e50;
                    font-size: 24px;
                    font-weight: 600;
                    margin-bottom: 25px;
                    text-align: center;
                    position: relative;
                ">
                    Login
                    <span style="
                        display: block;
                        height: 3px;
                        width: 50px;
                        background: linear-gradient(to right, #3498db, #2ecc71);
                        margin: 8px auto 0;
                        border-radius: 2px;
                    "></span>
                </h3>
                
                <div 
                    v-if="message" 
                    :class="'alert alert-' + category" 
                    role="alert"
                    style="
                        padding: 12px 15px;
                        border-radius: 5px;
                        font-size: 14px;
                        margin-bottom: 20px;
                        animation: fadeIn 0.5s;
                    "
                >
                    {{ message }}
                </div>
                
                <form @submit.prevent="submitLogin" style="margin-bottom: 10px;">
                    <div class="form-group" style="margin-bottom: 20px;">
                        <label for="username" style="
                            display: block;
                            margin-bottom: 8px;
                            color: #555;
                            font-weight: 500;
                            font-size: 14px;
                        ">Username (e-mail):</label>
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
                                font-size: 15px;
                                transition: border-color 0.3s, box-shadow 0.3s;
                                outline: none;
                            "
                            onFocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                            onBlur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
                        >
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 25px;">
                        <label for="password" style="
                            display: block;
                            margin-bottom: 8px;
                            color: #555;
                            font-weight: 500;
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
                                font-size: 15px;
                                transition: border-color 0.3s, box-shadow 0.3s;
                                outline: none;
                            "
                            onFocus="this.style.borderColor='#3498db'; this.style.boxShadow='0 0 0 3px rgba(52, 152, 219, 0.2)';"
                            onBlur="this.style.borderColor='#ddd'; this.style.boxShadow='none';"
                        >
                    </div>
                    
                    <div class="form-group" style="margin-bottom: 20px;">
                        <input 
                            type="submit" 
                            value="Login" 
                            class="btn btn-primary btn-sm btn-spacing"
                            style="
                                width: 100%;
                                background-color: #3498db;
                                color: white;
                                border: none;
                                border-radius: 5px;
                                padding: 12px;
                                font-size: 16px;
                                font-weight: 500;
                                cursor: pointer;
                                transition: background-color 0.3s, transform 0.2s;
                                box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
                            "
                            onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='translateY(-2px)';"
                            onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='translateY(0)';"
                        >
                    </div>
                    
                    <div class="form-group" style="text-align: center;">
                        <router-link 
                            to="/register"
                            style="
                                color: #3498db;
                                text-decoration: none;
                                font-size: 14px;
                                transition: color 0.3s;
                                display: inline-block;
                                padding: 5px;
                                position: relative;
                            "
                            onmouseover="this.style.color='#2980b9';"
                            onmouseout="this.style.color='#3498db';"
                        >
                            Register Customer/Professional
                            <span style="
                                position: absolute;
                                bottom: 0;
                                left: 0;
                                width: 100%;
                                height: 1px;
                                background-color: #3498db;
                                transform: scaleX(0);
                                transition: transform 0.3s;
                                transform-origin: right;
                            "
                            onmouseover="this.style.transform='scaleX(1)'; this.style.transformOrigin='left';"
                            onmouseout="this.style.transform='scaleX(0)'; this.style.transformOrigin='right';"
                            ></span>
                        </router-link>    
                    </div>    
                </form>
                
                <div style="
                    text-align: center;
                    margin-top: 20px;
                    font-size: 13px;
                    color: #7f8c8d;
                ">
                    A-Z Household Services © 2025
                </div>
            </div>
        </div>
    </div>
    <style>
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(-10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .alert-danger {
            background-color: #f8d7da;
            border-color: #f5c6cb;
            color: #721c24;
        }
        
        .alert-success {
            background-color: #d4edda;
            border-color: #c3e6cb;
            color: #155724;
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
            username : null,
            password : null,
            message: null,      
            category: null,
        } 
    },
    methods: {
        async submitLogin() {
            try {
                var res = await fetch(location.origin + '/login', 
                {
                    method: 'POST', 
                    headers: {'Content-Type': 'application/json'}, 
                    body: JSON.stringify({ 'username': this.username, 'password': this.password })
                });
                if (res.ok) {
                    const data = await res.json();
                    res = await fetch(location.origin + '/get-claims', 
                        {
                            method: 'GET', 
                            headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + data.access_token}, 
                        });                
                    if (res.ok) {
                        const claim_data =await res.json();
                        this.$root.login(claim_data.claims.role,data.access_token);
                        if (claim_data.claims.role === 'customer' && claim_data.claims.redirect === 'customer_dashboard') {
                            this.$router.push('/customer/dashboard');
                        } else if (claim_data.claims.role === 'professional' && claim_data.claims.redirect === 'professional_dashboard') {
                            this.$router.push('/professional/dashboard');
                        } else if (claim_data.claims.role === 'professional' && claim_data.claims.redirect === 'professional_profile') {
                            this.$router.push('/professional/profile');
                        } else if (claim_data.claims.role === 'customer' && claim_data.claims.redirect === 'customer_profile') {
                            this.$router.push('/customer/profile');
                        }else{
                            this.message = 'An unexpected error occurred.';
                            this.category = 'danger';
                        }
                    }else{
                        this.message = 'An unexpected error occurred.';
                        this.category = 'danger';
                    }                            
                }else {
                        const errorData = await res.json();  
                        this.message = errorData.message; 
                        this.category = errorData.category; 
                }                
            } catch (error) {
                console.log(error)
                this.message = 'An unexpected error occurred.';
                this.category = 'danger';
            }
        }
    }
}
