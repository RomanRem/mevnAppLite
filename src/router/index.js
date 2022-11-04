import Vue from 'vue';
import VueRouter from 'vue-router';
import AddClient from '../components/AddClient';
import EditClient from '../components/EditClient';
import ClientsHome from '../components/ClientsHome';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'home',
    component: ClientsHome,
    props: true,
  
    children:[
          {
           path: '/add-client/',
           name: 'add.client',
           component: AddClient,
           props: true
          },
  
        
        {
          path: '/edit-client/:id',
          name: 'edit.client',
          component: EditClient,
          props: true
         }]   
  }];
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err);
};
const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
