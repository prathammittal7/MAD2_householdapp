// export default {
//     template: `
//         <div class="row">
//             <div class="col-md-4 offset-md-4">        
//                 <h3>Service - Remarks</h3>
                
//                 <!-- Flash Messages -->
//                 <div v-if="flashMessages.length" class="flash-messages">
//                     <div 
//                         v-for="(message, index) in flashMessages" 
//                         :key="index" 
//                         class="alert" 
//                         :class="'alert-' + message.category">
//                         {{ message.text }}
//                     </div>
//                 </div>

//                 <!-- Service Remarks Form -->
//                 <form @submit.prevent="submitForm">
//                     <div class="form-group">
//                         <label for="requestId">Request ID</label>
//                         <input 
//                             type="text" 
//                             id="requestId" 
//                             v-model="formData.request_id" 
//                             class="form-control" 
//                             readonly>
//                     </div>
//                     <div class="form-group">
//                         <label for="serviceName">Service Name</label>
//                         <input 
//                             type="text" 
//                             id="serviceName" 
//                             v-model="formData.service_name" 
//                             class="form-control" 
//                             readonly>
//                     </div>
//                     <div class="form-group">
//                         <label for="fullName">Full Name</label>
//                         <input 
//                             type="text" 
//                             id="fullName" 
//                             v-model="formData.full_name" 
//                             class="form-control" 
//                             readonly>
//                     </div>
//                     <div class="form-group">
//                         <label for="serviceDescription">Service Description</label>
//                         <input 
//                             type="text" 
//                             id="serviceDescription" 
//                             v-model="formData.service_description" 
//                             class="form-control" 
//                             readonly>
//                     </div>
//                     <div class="form-group">
//                         <label for="remarks">Remarks</label>
//                         <textarea 
//                             id="remarks" 
//                             v-model="formData.remarks" 
//                             class="form-control">
//                         </textarea>
//                     </div>
//                     <div class="form-group">
//                         <label for="rating">Rating</label>
//                         <input 
//                             type="number" 
//                             id="rating" 
//                             v-model="formData.rating" 
//                             class="form-control">
//                     </div>
//                     <div class="form-group text-center">
//                         <button type="submit" class="btn btn-primary btn-sm btn-spacing">Submit</button>
//                         <button @click="cancel" type="button" class="btn btn-secondary btn-sm">Cancel</button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     `,
//     props: {
//         id: {
//             type: [String, Number],
//             default: null
//         }
//     },
//     created() {
//         if (this.id) {
//             this.fetchServiceRequest();
//         }else{
//             alert('No service request provided');
//             this.$router.push('/customer/dashboard');
//         }
//     },
//     data() {
//         return {
//             flashMessages: [], // Array to hold flash messages
//             formData: {
//                 request_id: '', 
//                 service_name: '',
//                 full_name: '',
//                 service_description: '',
//                 remarks: '',
//                 rating: 0,
//             },
//         };
//     },
//     methods: {
//         async submitForm() {
//             try {
//                 const response = await fetch(`/customer/close_service_request/${this.formData.request_id}`, {
//                     method: 'PUT',
//                     headers: {
//                         'Content-Type' : 'application/json',
//                         'Authorization' : `Bearer ${localStorage.getItem('token')}`,
//                     },
//                     body: JSON.stringify(this.formData),
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     this.flashMessages = [{ text:data.message, category: data.category }];
//                     this.$router.push('/customer/dashboard');
//                 } else {
//                     const errorData = await response.json();
//                     this.flashMessages = [{ text: errorData.message, category: data.category }];
//                 }
//             } catch (error) {
//                 this.flashMessages = [{ text: 'An error occurred. Please try again later.', category: 'danger' }];
//                 console.log(error);
//             }
//         },
//         cancel() {
//             this.$router.push('/customer/dashboard'); // Navigate to the dashboard
//         },
//         async fetchServiceRequest() {
//             try {
//                 const response = await fetch(`customer/close_service_request/${this.id}`, {
//                     method : 'GET',
//                     headers: {  'Authorization': `Bearer ${localStorage.getItem('token')}` }
//                 });
//                 if (response.ok) {
//                     const data = await response.json();
//                     this.formData = data;
//                 } else {
//                     this.flashMessages = [{ text: 'Failed to load service request data', category: 'danger' }];
//                 }
//             } catch (error) {
//                 this.flashMessages = [{ text: 'An error occurred. Please try again later.', category: 'danger' }];
//                 console.error(error);
//             }
//         }    
//     },
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
                ">
                    <h3 style="
                        color: #2c3e50;
                        font-size: 24px;
                        font-weight: 600;
                        text-align: center;
                        margin-bottom: 25px;
                        padding-bottom: 15px;
                        border-bottom: 2px solid #3498db;
                    ">Service - Remarks</h3>
                    
                    <!-- Flash Messages -->
                    <div v-if="flashMessages.length" class="flash-messages" style="margin-bottom: 20px;">
                        <div 
                            v-for="(message, index) in flashMessages" 
                            :key="index" 
                            class="alert" 
                            :class="'alert-' + message.category"
                            style="
                                padding: 12px 15px;
                                border-radius: 5px;
                                margin-bottom: 10px;
                                font-size: 14px;
                            ">
                            {{ message.text }}
                        </div>
                    </div>

                    <!-- Service Remarks Form -->
                    <form @submit.prevent="submitForm">
                        <div style="margin-bottom: 20px;">
                            <label for="requestId" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Request ID</label>
                            <input 
                                type="text" 
                                id="requestId" 
                                v-model="formData.request_id" 
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
                            >
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="serviceName" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Service Name</label>
                            <input 
                                type="text" 
                                id="serviceName" 
                                v-model="formData.service_name" 
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
                            >
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="fullName" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Full Name</label>
                            <input 
                                type="text" 
                                id="fullName" 
                                v-model="formData.full_name" 
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
                            >
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="serviceDescription" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Service Description</label>
                            <input 
                                type="text" 
                                id="serviceDescription" 
                                v-model="formData.service_description" 
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
                            >
                        </div>
                        <div style="margin-bottom: 20px;">
                            <label for="remarks" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Remarks</label>
                            <textarea 
                                id="remarks" 
                                v-model="formData.remarks" 
                                class="form-control"
                                style="
                                    width: 100%;
                                    padding: 10px 15px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                    min-height: 100px;
                                    resize: vertical;
                                "
                            ></textarea>
                        </div>
                        <div style="margin-bottom: 25px;">
                            <label for="rating" style="
                                display: block;
                                margin-bottom: 8px;
                                font-weight: 500;
                                color: #34495e;
                                font-size: 14px;
                            ">Rating</label>
                            <input 
                                type="number" 
                                id="rating" 
                                v-model="formData.rating" 
                                class="form-control"
                                style="
                                    width: 100%;
                                    padding: 10px 15px;
                                    border: 1px solid #ddd;
                                    border-radius: 4px;
                                    font-size: 14px;
                                "
                            >
                        </div>
                        <div style="
                            text-align: center;
                            margin-top: 10px;
                            display: flex;
                            justify-content: center;
                            gap: 10px;
                        ">
                            <button type="submit" style="
                                background-color: #3498db;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                padding: 10px 20px;
                                font-size: 14px;
                                cursor: pointer;
                                transition: background-color 0.3s;
                            " onmouseover="this.style.backgroundColor='#2980b9'" onmouseout="this.style.backgroundColor='#3498db'">Submit</button>
                            <button @click="cancel" type="button" style="
                                background-color: #95a5a6;
                                color: white;
                                border: none;
                                border-radius: 4px;
                                padding: 10px 20px;
                                font-size: 14px;
                                cursor: pointer;
                                transition: background-color 0.3s;
                            " onmouseover="this.style.backgroundColor='#7f8c8d'" onmouseout="this.style.backgroundColor='#95a5a6'">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    `,
    props: {
        id: {
            type: [String, Number],
            default: null
        }
    },
    created() {
        if (this.id) {
            this.fetchServiceRequest();
        } else {
            alert('No service request provided');
            this.$router.push('/customer/dashboard');
        }
    },
    data() {
        return {
            flashMessages: [], // Array to hold flash messages
            formData: {
                request_id: '', 
                service_name: '',
                full_name: '',
                service_description: '',
                remarks: '',
                rating: 0,
            },
        };
    },
    methods: {
        async submitForm() {
            try {
                const response = await fetch(`/customer/close_service_request/${this.formData.request_id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    },
                    body: JSON.stringify(this.formData),
                });
                if (response.ok) {
                    const data = await response.json();
                    this.flashMessages = [{ text: data.message, category: data.category }];
                    this.$router.push('/customer/dashboard');
                } else {
                    const errorData = await response.json();
                    this.flashMessages = [{ text: errorData.message, category: errorData.category }];
                }
            } catch (error) {
                this.flashMessages = [{ text: 'An error occurred. Please try again later.', category: 'danger' }];
                console.log(error);
            }
        },
        cancel() {
            this.$router.push('/customer/dashboard'); // Navigate to the dashboard
        },
        async fetchServiceRequest() {
            try {
                const response = await fetch(`customer/close_service_request/${this.id}`, {
                    method: 'GET',
                    headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
                });
                if (response.ok) {
                    const data = await response.json();
                    this.formData = data;
                } else {
                    this.flashMessages = [{ text: 'Failed to load service request data', category: 'danger' }];
                }
            } catch (error) {
                this.flashMessages = [{ text: 'An error occurred. Please try again later.', category: 'danger' }];
                console.error(error);
            }
        }    
    },
};
