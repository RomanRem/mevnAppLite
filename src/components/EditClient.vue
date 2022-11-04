<template>
  <div>
    <div>
      <button type="button"  class="btn btn-link" @click="toggleModal">
        Edit
      </button>
      <div
        ref="modal"
        class="modal fade"
        :class="{ show, 'd-block': active }"
        tabindex="-1"
        role="dialog"
      >
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Edit Client</h5>
              <button
                type="button"
                class="close"
                data-dismiss="modal"
                aria-label="Close"
                @click="toggleModal"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="justify-content-center row">
                <div class="col-md-8">
                  <form @submit.prevent="handleSubmit">
                    <div class="form-group row mb-3">
                      <label for="inputName" class="col-sm-2 col-form-label"
                        >Name:</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="text"
                          id="inputName"
                          class="form-control"
                          v-model="client.name"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label for="inputEmail" class="col-sm-2 col-form-label"
                        >Email:</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="email"
                          id="inputEmail"
                          class="form-control"
                          v-model="client.email"
                          required
                        />
                      </div>
                    </div>

                    <div class="form-group row mb-3">
                      <label for="inputPhone" class="col-sm-2 col-form-label"
                        >Phone:</label
                      >
                      <div class="col-sm-10">
                        <input
                          type="text"
                          id="inputPhone"
                          class="form-control"
                          v-model="client.phone"
                          required
                        />
                      </div>
                    </div>
                    
                    <div class="input-append row mb-3">
                      <label
                        for="inputProviders"
                        class="col-sm-2 col-form-label"
                        >Providers:</label>
                      
                      <div class="col-sm-10">
                      
                        <input
                          type="text"
                          id="inputProviders"
                          class="form-control"
                          v-model="client.providers"
                          required/>
                                                       
                      </div>
                       
                      </div>
                      
                    <div class="modal-footer justify-content-between">
                      
                        <button
                          @click.prevent="deleteClient(client._id)"
                          class="btn btn-danger btn-sm" 
                        >
                          Delete
                        </button>
                        <div>
                        <button type="button" 
                         aria-label="Close"
                         @click="toggleModal"
                         class="btn btn-outline-info btn-sm"
                         data-dismiss="modal">Chancel
                         </button>
                         
                        <button
                          @click.prevent="handleUpdateForm"
                          class="btn btn-outline-info btn-sm">
                          Save Client
                        </button>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div v-if="active" class="modal-backdrop fade show"></div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "editClient",
  props:['email','name','phone','providers'],
  data() {
    return {
      active: false,
      show: false,
      client: {
        name: this.name,
        email: this.email,
        phone: this.phone,
        providers: this.providers
        },
      
    };
  },
  
  created() {
   
    let apiURL = `http://localhost:4000/api/edit-client/${this.$route.params.id}`;

      axios.get(apiURL).then((res) => {
      
      this.client = res.data;
      
    });
   
  },
  
  methods: {
    handleUpdateForm() {
      let apiURL = `http://localhost:4000/api/update-client/${this.$route.params.id}`;

      axios.post(apiURL, this.client).then((res) => {
          console.log(res);
          this.$router.push("/");
        })
        .catch((error) => {
          console.log(error);
        });
    },
    deleteClient(id) {
      let apiURL = `http://localhost:4000/api/delete-client/${id}`;
      let indexOfArrayItem = this.Clients.findIndex(i => i._id === id); //работало в начальном варианте

      if (window.confirm("Do you really want to delete?")) {
        axios.delete(apiURL).then(() => {
            this.$router.push("/"); // в родителе не требовалось
            this.Clients.splice(indexOfArrayItem, 1); // работало в родителе(indexOfArrayItem, 1)
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
    toggleModal() {
      const body = document.querySelector("body");
      this.active = !this.active;
      this.active
        ? body.classList.add("modal-open")
        : body.classList.remove("modal-open");
      setTimeout(() => (this.show = !this.show), 10);
    },
  },
};
</script>
<style>


</style>