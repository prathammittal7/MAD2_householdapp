export default {
    data() {
        return {
            services: [], // Fetch from API or store
            professionalProfile: [], // Fetch from API or store
            serviceType: {}, // Fetch from API or store
            userDict: {}, // Fetch from API or store
            users: [], // Fetch from API or store
            serviceRequests: [], // Fetch from API or store
            profDict: {}, // Fetch from API or store
        };
    },
    template: `
    <div style="padding: 20px; background-color: #f8f9fa;"> <!-- Root element wrapping all content -->
        <div class="row">
            <div class="col-md-12">
                <h3 class="text-center" style="color: #007bff; margin-bottom: 20px;">Manage Services</h3>
                <div class="d-flex justify-content-end mb-3">
                    <router-link to="/admin/services/create_services" class="btn btn-outline-success mr-2">Create Service</router-link>
                    <router-link to="/admin/downloadReport" class="btn btn-outline-primary">Download Report</router-link>
                </div>
                <table class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Base Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="service in services" :key="service.id">
                            <td>{{ service.id }}</td>
                            <td>{{ service.name }}</td>
                            <td>{{ service.price }}</td>
                            <td>
                                <router-link :to="'/admin/services/update/' + service.id" class="btn btn-warning btn-sm">Edit</router-link>
                                <button @click="deleteService(service.id)" class="btn btn-danger btn-sm ml-2">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="text-center mt-4" style="color: #007bff;">Manage Professionals</h3>
                <table class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Experience</th>
                            <th>Reviews</th>
                            <th>Doc</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="professional in professionalProfile" :key="professional.id">
                            <td>{{ professional.id }}</td>
                            <td>{{ professional.full_name }}</td>
                            <td>{{ serviceType[professional.user_id].name }}</td>
                            <td>{{ professional.experience }}</td>
                            <td>{{ professional.reviews }}</td>
                            <td><a :href="'uploads/' + professional.filename" @click.prevent="downloadFile(professional.filename)">{{ professional.filename }}</a></td>
                            <td>
                                <button 
                                    @click="toggleApproval(professional.user_id)" 
                                    :class="userDict[professional.user_id].approve ? 'btn btn-secondary btn-sm' : 'btn btn-success btn-sm'"
                                >
                                    {{ userDict[professional.user_id].approve ? 'Reject' : 'Approve' }}
                                </button>

                                <button 
                                    @click="toggleBlock(professional.user_id)" 
                                    :class="userDict[professional.user_id].blocked ? 'btn btn-success btn-sm' : 'btn btn-danger btn-sm'"
                                >
                                    {{ userDict[professional.user_id].blocked ? 'Unblock' : 'Block' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="text-center mt-4" style="color: #007bff;">Manage Customers</h3>
                <table class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>User Name</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="user in users" :key="user.id">
                            <td>{{ user.id }}</td>
                            <td>{{ user.username }}</td>
                            <td>
                                <button 
                                    @click="toggleCustomerApproval(user)" 
                                    :class="user.approve ? 'btn btn-secondary btn-sm' : 'btn btn-success btn-sm'"
                                >
                                    {{ user.approve ? 'Reject' : 'Approve' }}
                                </button>

                                <button 
                                    @click="toggleCustomerBlock(user)" 
                                    :class="user.blocked ? 'btn btn-success btn-sm' : 'btn btn-danger btn-sm'"
                                >
                                    {{ user.blocked ? 'Unblock' : 'Block' }}
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>

                <h3 class="text-center mt-4" style="color: #007bff;">Service Requests</h3>
                <table class="table table-striped table-bordered">
                    <thead class="thead-dark">
                        <tr>
                            <th>ID</th>
                            <th>Assigned Professional</th>
                            <th>Requested Date</th>
                            <th>Status</th>
                            <th>Customer Remarks</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="serviceRequest in serviceRequests" :key="serviceRequest.id">
                            <td>{{ serviceRequest.id }}</td>
                            <td>{{ profDict[serviceRequest.professional_id].full_name }}</td>
                            <td>{{ serviceRequest.date_of_request }}</td>
                            <td>{{ serviceRequest.service_status }}</td>
                            <td>{{ serviceRequest.remarks || "" }}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
    `,
    mounted() {
        this.fetchAdminDashboard();
    },
    methods: { /* methods remain unchanged */ }
};
