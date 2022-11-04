<template>
  <div>
    <nav
      class="
        navbar navbar-dark
        bg-primary
        justify-content-between
        flex-nowrap flex-row
        "
    >
      <div class="container">
        <a class="navbar-brand float-left">Clients</a>
        <ul class="nav navbar-nav flex-row float-right">
          <li class="nav-item">
            <add-client :showModal="showModalNow" @closeModal="closeMyModal"/>
          </li>
        </ul>
      </div>
    </nav>
    <div class="container mt-5">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
import addClient from "./components/AddClient";
//import axios from "axios";
//import {eventBus} from '.main;'
export default {
  name: "homeOne",
  components: {
    "add-client": addClient,
  },

  data() {
    return {
      showModalNow: false,
    };
  },

  methods: {
    closeMyModal() {
      this.showModalNow = false;
    },
    toggleModal() {
      this.showModalNow = !this.showModalNow;
    },
  },
};
</script>