// export default {
//     template: `
//     <div class="row">
//         <div class="col-md-4 offset-md-4">   
//             <h3>A-Z Household Services</h3>
//             <div class="form-group">
//                 <router-link to="/admin/login">Admin Login</router-link>
//             </div>
//             <div class="form-group">
//                 <router-link to="/login">Customer/Professional Login</router-link>
//             </div>
//         </div>    
//     </div>
//     `,
// }
export default {
    template: `
    <div class="row">
        <div class="col-md-4 offset-md-4">   
            <div class="welcome-container" style="
                text-align: center;
                padding: 40px 30px;
                margin-top: 50px;
                background-color: #ffffff;
                border-radius: 10px;
                box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
                transition: transform 0.3s ease;
            ">
                <h3 style="
                    color: #2c3e50;
                    font-size: 28px;
                    font-weight: 700;
                    margin-bottom: 30px;
                    position: relative;
                    padding-bottom: 15px;
                ">
                    A-Z Household Services
                    <span style="
                        display: block;
                        width: 60px;
                        height: 3px;
                        background-color: #3498db;
                        margin: 15px auto 0;
                    "></span>
                </h3>
                
                <div class="form-group" style="
                    margin-bottom: 20px;
                ">
                    <router-link to="/admin/login" style="
                        display: block;
                        text-decoration: none;
                        background-color: #3498db;
                        color: white;
                        padding: 14px 20px;
                        border-radius: 5px;
                        font-weight: 600;
                        transition: background-color 0.3s, transform 0.2s;
                        box-shadow: 0 2px 5px rgba(52, 152, 219, 0.3);
                    " onmouseover="this.style.backgroundColor='#2980b9'; this.style.transform='translateY(-2px)'" 
                       onmouseout="this.style.backgroundColor='#3498db'; this.style.transform='translateY(0)'">
                        Admin Login
                    </router-link>
                </div>
                
                <div class="form-group" style="
                    margin-bottom: 10px;
                ">
                    <router-link to="/login" style="
                        display: block;
                        text-decoration: none;
                        background-color: #2ecc71;
                        color: white;
                        padding: 14px 20px;
                        border-radius: 5px;
                        font-weight: 600;
                        transition: background-color 0.3s, transform 0.2s;
                        box-shadow: 0 2px 5px rgba(46, 204, 113, 0.3);
                    " onmouseover="this.style.backgroundColor='#27ae60'; this.style.transform='translateY(-2px)'" 
                       onmouseout="this.style.backgroundColor='#2ecc71'; this.style.transform='translateY(0)'">
                        Customer/Professional Login
                    </router-link>
                </div>
                
                <div style="
                    margin-top: 30px;
                    font-size: 14px;
                    color: #7f8c8d;
                ">
                    Your one-stop solution for all household services
                </div>
            </div>
        </div>    
    </div>
    `,
}
