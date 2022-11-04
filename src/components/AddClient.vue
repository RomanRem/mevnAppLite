<template>
  <div>
    <button type="button" class="btn btn-success" @click="toggleModal">
      Create Client
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
            <h5 class="modal-title">New Client</h5>
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
                <form name="addClient">
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
                    <label for="inputProviders" class="col-sm-2 col-form-label"
                      >Providers:</label
                    >

                    <div class="col-sm-10">
                      <input
                        type="text"
                        id="inputProviders"
                        class="form-control"
                        v-model="client.providers"
                        required
                      />
                    </div>
                    
                    
                  </div>
                  <div class="form-group modal-footer">
                    <button
                      class="btn btn-outline-secondary btn-sm"
                      type="button"
                      data-dismiss="modal"
                      aria-label="Close"
                      @click="toggleModal"
                    >
                      Chancel
                    </button>
                    <button
                      @click.prevent="handleSubmitForm"
                      class="btn btn-outline-primary btn-sm"
                    >
                      Add Client
                    </button>
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
</template>

<script>
import axios from "axios";

export default {
  name: "addClient",

  data() {
    return {
      active: false,
      show: false,
      client: {
        name: "",
        email: "",
        phone: "",
        providers: "",
      },
    };
  },
  methods: {
    handleSubmitForm() {
      let apiURL = "http://localhost:4000/api/create-client";

      axios
        .post(apiURL, this.client)
        .then(() => {
          this.$router.push("/");
          this.client = {
            name: "",
            email: "",
            phone: "",
            providers: "",
          };
        })
        .catch((error) => {
          console.log(error);
        });
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
