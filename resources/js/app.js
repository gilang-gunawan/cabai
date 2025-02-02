import './bootstrap'
import auth from './auth'
import router from './router'

// import dependecies tambahan
import VueRouter from 'vue-router';
import VueAxios from 'vue-axios';
import axios from 'axios';
import Vue from 'vue';
import 'es6-promise/auto'
import VueAuth from '@websanova/vue-auth'

// Set Vue globally
window.Vue = require('vue');

// import vform library create these global variable
// Doc = https://github.com/cretueusebiu/vform
import {
    Form,
    HasError,
    AlertError
} from 'vform'
Vue.component(HasError.name, HasError)
Vue.component(AlertError.name, AlertError)
window.Form = Form;

// import progress bar library
// Doc = https://github.com/hilongjw/vue-progressbar
import VueProgressBar from 'vue-progressbar'
const options = {
    color: '#8BC44A',
    failedColor: '#874b4b',
    thickness: '5px',
    transition: {
        speed: '0.2s',
        opacity: '0.6s',
        termination: 300
    },
    autoRevert: true,
    location: 'top',
    inverse: false
}
Vue.use(VueProgressBar, options)

// Import Sweet Alert Library
// Doc = https://sweetalert2.github.io/
// import Swal from 'sweetalert2'
import Swal from 'sweetalert2'
window.swal = Swal
const toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    onOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})
window.toast = toast

// Set Vue router
Vue.router = router
Vue.use(VueRouter)

// filter string supaya char selain firstchar lowercase
Vue.filter('customFilter', function (value) {
    if (!value) return ''

    var firstChar = value.charAt(0)
    value = value.toString().toLowerCase()
    return firstChar + value.substring(1, value.length)

})

// Set Vue authentication
Vue.use(VueAxios, axios)
axios.defaults.baseURL = `${process.env.MIX_APP_URL}/api`
// console.log(process.env.MIX_APP_URL)
Vue.use(VueAuth, auth)

// Create new vue instance with name Update data, for custom event
let UpdateData = new Vue();
window.UpdateData = UpdateData;

const app = new Vue({
    el: '#app',
    router,
});
