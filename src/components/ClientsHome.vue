<template>
  <div class="row">
    <div class="col-md-12">
      <table class="table table-striped">
        <thead class="thead-dark">
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Providers</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="client in Clients" :key="client._id">
            <td>{{ client.name }}</td>
            <td>{{ client.email }}</td>
            <td>{{ client.phone }}</td>
            <td>{{ client.providers }}</td>
            <td>
              <router-link  :to="{name:'edit.client' , params: {id: client._id}}">
              <edit-client v-bind="client"
                :showModal="showModalNow"
                @closeModal="closeMyModal" 
              />
              </router-link>
            
              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EditClient from "./EditClient.vue";

export default {
  name: "clientsHome",

  components: {
    "edit-client": EditClient,
  },
  data() {
    return {
      showModalNow: false,
      Clients: []
    };
  },
  created() {
    

    let apiURL = "http://localhost:4000/api/";
    axios.get(apiURL).then((res) => {
        this.Clients = res.data;
      }).catch((error) => {
        console.log(error);
      });
    
  },
  
      
      
    
  methods: {
    
    
    
    closeMyModal() {
      this.showModalNow = false;
    },
    openModal() {
      this.showModalNow = !this.showModalNow;
    },
  },
};
</script>
