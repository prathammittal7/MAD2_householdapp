// export default {
//     template: `
//     <div>
//         <div class="row">
//             <div class="col-md-12">        
//                 <h3>Today's Services</h3>
//                 <div v-if="message" :class="'alert alert-' + category" role="alert">
//                         {{ message }}
//                 </div>        
//                 <table class="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Customer Name</th>
//                             <th>Service</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr v-for="serviceRequest in serviceRequests" :key="serviceRequest.id">
//                             <td>{{ custDict[serviceRequest.customer_id].full_name }}</td>
//                             <td>{{ serviceDict[serviceRequest.service_id].name }}</td>
//                             <td>{{ serviceRequest.service_status }}</td>
//                             <td>
//                                 <button @click="updateRequestStatus('accept', serviceRequest.id)" class="btn btn-success">Accept</button>
//                                 <button @click="updateRequestStatus('reject', serviceRequest.id)" class="btn btn-danger">Reject</button>
//                             </td>
//                         </tr>
//                     </tbody>
//                 </table>

//                 <h3>Rejected/Accepted/Closed Services</h3>
//                 <table class="table table-striped">
//                     <thead>
//                         <tr>
//                             <th>Customer Name</th>
//                             <th>Service</th>
//                             <th>Status</th>
//                             <th>Completion Date</th>
//                             <th>Remarks</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         <tr v-for="serviceRequestClosed in serviceRequestsClosed" :key="serviceRequestClosed.id">
//                             <td>{{ custDict[serviceRequestClosed.customer_id].full_name }}</td>
//                             <td>{{ serviceDict[serviceRequestClosed.service_id].name }}</td>
//                             <td>{{ serviceRequestClosed.service_status }}</td>
//                             <td>{{ serviceRequestClosed.date_of_completion || '' }}</td>
//                             <td>{{ serviceRequestClosed.remarks || '' }}</td>
//                         </tr>
//                     </tbody>
//                 </table>
//             </div>
//         </div>
//     </div>
//     `,
//     data() {
//         return {
//             message : null,
//             category : null,
//             serviceRequests: [], // Load from API or parent component
//             serviceRequestsClosed: [], // Load from API or parent component
//             custDict: {}, // Load from API or parent component
//             serviceDict: {} // Load from API or parent component
//         };
//     },
//     mounted() {
//         this.fetchProfessionalDashboard();
//     },
//     methods: {
//         async fetchProfessionalDashboard() {
//             try {
//                 const res = await fetch(location.origin + '/professional/dashboard', 
//                     {
//                         method: 'POST', 
//                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
//                     });                
//                 if (res.ok) {
//                     const data = await res.json();
//                     this.serviceRequests= data.service_requests;
//                     this.serviceRequestsClosed= data.service_requests_closed;
//                     this.custDict= data.cust_dict;
//                     this.serviceDict= data.service_dict;                
//                 } else {
//                     res.json().then(data => {
//                         console.log(data);
//                     });
//                     console.log("Error"); 
//                 }                
//             } catch (error) {
//                 console.log("Error"+error);
//             }
//         },
//         async updateRequestStatus(status, serviceRequestId) {
//             try {
//                 const res = await fetch(location.origin + '/professional/update_request_status/' + status + '/' + serviceRequestId, 
//                     {
//                         method: 'PUT', 
//                         headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
//                     });                
//                 if (res.ok) {
//                     const data = await res.json();
//                     this.message = data.message;
//                     this.category = data.category;
//                     this.fetchProfessionalDashboard();
//                 } else {
//                     res.json().then(data => {
//                         console.log(data);
//                     });
//                     console.log("Error"); 
//                 }                
//             } catch (error) {
//                 console.log("Error"+error);
//             }
//         }
//     }
// };
export default {
    template: `
    <div style="font-family: Arial, sans-serif; padding: 20px; background-color: #f5f7fa;">
        <div class="row">
            <div class="col-md-12">        
                <h3 style="color: #2c3e50; font-size: 24px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Today's Services</h3>
                <div v-if="message" :class="'alert alert-' + category" role="alert" style="padding: 10px; border-radius: 5px; margin-bottom: 20px;">
                    {{ message }}
                </div>        
                <table style="width: 100%; border-collapse: collapse; background-color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 5px; overflow: hidden;">
                    <thead>
                        <tr style="background-color: #3498db; color: #fff;">
                            <th style="padding: 15px; text-align: left;">Customer Name</th>
                            <th style="padding: 15px; text-align: left;">Service</th>
                            <th style="padding: 15px; text-align: left;">Status</th>
                            <th style="padding: 15px; text-align: left;">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="serviceRequest in serviceRequests" :key="serviceRequest.id" style="border-bottom: 1px solid #ecf0f1;">
                            <td style="padding: 15px;">{{ custDict[serviceRequest.customer_id].full_name }}</td>
                            <td style="padding: 15px;">{{ serviceDict[serviceRequest.service_id].name }}</td>
                            <td style="padding: 15px;">{{ serviceRequest.service_status }}</td>
                            <td style="padding: 15px;">
                                <button @click="updateRequestStatus('accept', serviceRequest.id)" style="background-color: #2ecc71; color: #fff; border: none; padding: 8px 12px; margin-right: 5px; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">Accept</button>
                                <button @click="updateRequestStatus('reject', serviceRequest.id)" style="background-color: #e74c3c; color: #fff; border: none; padding: 8px 12px; border-radius: 3px; cursor: pointer; transition: background-color 0.3s;">Reject</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3 style="color: #2c3e50; font-size: 24px; margin-top: 30px; margin-bottom: 20px; border-bottom: 2px solid #3498db; padding-bottom: 10px;">Rejected/Accepted/Closed Services</h3>
                <table style="width: 100%; border-collapse: collapse; background-color: #fff; box-shadow: 0 2px 10px rgba(0,0,0,0.1); border-radius: 5px; overflow: hidden;">
                    <thead>
                        <tr style="background-color: #3498db; color: #fff;">
                            <th style="padding: 15px; text-align: left;">Customer Name</th>
                            <th style="padding: 15px; text-align: left;">Service</th>
                            <th style="padding: 15px; text-align: left;">Status</th>
                            <th style="padding: 15px; text-align: left;">Completion Date</th>
                            <th style="padding: 15px; text-align: left;">Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="serviceRequestClosed in serviceRequestsClosed" :key="serviceRequestClosed.id" style="border-bottom: 1px solid #ecf0f1;">
                            <td style="padding: 15px;">{{ custDict[serviceRequestClosed.customer_id].full_name }}</td>
                            <td style="padding: 15px;">{{ serviceDict[serviceRequestClosed.service_id].name }}</td>
                            <td style="padding: 15px;">{{ serviceRequestClosed.service_status }}</td>
                            <td style="padding: 15px;">{{ serviceRequestClosed.date_of_completion || '' }}</td>
                            <td style="padding: 15px;">{{ serviceRequestClosed.remarks || '' }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    data() {
        return {
            message : null,
            category : null,
            serviceRequests: [],
            serviceRequestsClosed: [],
            custDict: {},
            serviceDict: {}
        };
    },
    mounted() {
        this.fetchProfessionalDashboard();
    },
    methods: {
        async fetchProfessionalDashboard() {
            try {
                const res = await fetch(location.origin + '/professional/dashboard', 
                    {
                        method: 'POST', 
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
                    });                
                if (res.ok) {
                    const data = await res.json();
                    this.serviceRequests= data.service_requests;
                    this.serviceRequestsClosed= data.service_requests_closed;
                    this.custDict= data.cust_dict;
                    this.serviceDict= data.service_dict;                
                } else {
                    res.json().then(data => {
                        console.log(data);
                    });
                    console.log("Error"); 
                }                
            } catch (error) {
                console.log("Error"+error);
            }
        },
        async updateRequestStatus(status, serviceRequestId) {
            try {
                const res = await fetch(location.origin + '/professional/update_request_status/' + status + '/' + serviceRequestId, 
                    {
                        method: 'PUT', 
                        headers: {'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('token')}, 
                    });                
                if (res.ok) {
                    const data = await res.json();
                    this.message = data.message;
                    this.category = data.category;
                    this.fetchProfessionalDashboard();
                } else {
                    res.json().then(data => {
                        console.log(data);
                    });
                    console.log("Error"); 
                }                
            } catch (error) {
                console.log("Error"+error);
            }
        }
    }
};
