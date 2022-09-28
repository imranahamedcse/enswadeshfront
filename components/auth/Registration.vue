<template>
    <div>
        <div @click="closeModal" class="fixed inset-0 z-50 flex flex-col justify-center items-center md:my-12 m-2">
            <div @click="wait" class="focus-in max-w-screen-sm shadow-lg bg-white overflow-auto">
                <div class="grid md:grid-cols-7">
                    <div class="hidden md:contents">
                        <div class="md:col-span-3 bg-green-4 text-white md:p-6 p-2 flex flex-col justify-between">
                            <div>
                                <p class="font-bold text-3xl">Create account</p>
                                <p class="font-bold text-gray-4">Lorem ipsum dolor sit amet, sadipscing elitr, sed diam nonumy</p>
                            </div>

                            <div class="relative pb-2/3">
                                <img class="absolute bottom-0 object-cover" src="~/assets/img/auth.png" alt="">
                            </div>
                        </div>
                    </div>
                    <div class="md:col-span-4">
                        <div class="w-full text-right pr-1 md:bg-white bg-green-4 md:text-green-4 text-white">
                            <button @click="closeRegistrationModal" class="text-2xl focus:outline-none"><i class="ri-close-line"></i></button>
                        </div>
                        <p class="font-bold text-3xl text-center md:hidden md:bg-white bg-green-4 md:text-green-4 text-white md:pb-0 pb-10">Create account</p>
                        <div class="md:p-6 p-2">
                            <form @submit.prevent="submitForm">
                                <div class="mb-2">
                                    <label class="font-bold" for="name">Name</label>
                                    <input class="focus:outline-none input-field" id="name" type="text" placeholder="Adam" v-model.trim="$v.name.$model" :class="{'is-invalid':$v.name.$error}">
                                    <div class="error-message">
                                        <small v-if="!$v.name.required" :class="!$v.name.$error ? 'hidden':''">Field is required.</small>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <label class="font-bold" for="email">Email</label>
                                    <input class="focus:outline-none input-field" id="email" type="email" placeholder="hello@example.com"  v-model.trim="$v.email.$model" :class="{'is-invalid':$v.email.$error}">
                                    <div class="error-message">
                                        <small v-if="!$v.email.required" :class="!$v.email.$error ? 'hidden':''">Field is required.</small>
                                        <small v-if="!$v.email.email">Email must be valid.</small>
                                    </div>
                                </div>
                                <div class="mb-2">
                                    <label class="font-bold" for="phone">Phone</label>
                                    <input class="focus:outline-none input-field" id="phone" type="number" placeholder="hello@example.com"  v-model.trim="$v.phone.$model" :class="{'is-invalid':$v.phone.$error}">
                                    <div class="error-message">
                                        <small v-if="!$v.phone.required" :class="!$v.phone.$error ? 'hidden':''">Field is required.</small>
                                        <small v-if="!$v.phone.minLength">Phone must have at least {{ $v.phone.$params.minLength.min }} digit.</small>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="font-bold" for="name">Password</label>
                                    <div class="relative">
                                        <input class="focus:outline-none input-field pr-6" id="name" :type="show ? 'text':'password' " placeholder="At least 8 characters" v-model.trim="$v.password.$model" :class="{'is-invalid':$v.password.$error}">
                                        <i v-if="!show" @click="showPassword" class="ri-eye-fill absolute top-0 right-0 cursor-pointer pr-2 pt-1 text-xl"></i>
                                        <i v-if="show" @click="showPassword" class="ri-eye-off-fill absolute top-0 right-0 cursor-pointer pr-2 pt-1 text-xl"></i>
                                    </div>
                                    <div class="error-message">
                                        <small v-if="!$v.password.required" :class="!$v.password.$error ? 'hidden':''">Password is required.</small>
                                        <small v-if="!$v.password.minLength">Password must have at least {{ $v.password.$params.minLength.min }} letters.</small>
                                    </div>
                                </div>
                                <div class="mb-3">
                                    <label class="font-bold" for="name">Confirm Password</label>
                                    <div class="relative">
                                        <input class="focus:outline-none input-field" id="name" type="password" placeholder="Enter your password" v-model.trim="$v.password_confirmation.$model" :class="{'is-invalid':$v.password_confirmation.$error}">
                                    </div>
                                    <div class="error-message">
                                        <small v-if="!$v.password_confirmation.required" :class="!$v.password_confirmation.$error ? 'hidden':''">Confirm Password is required.</small>
                                        <small v-if="!$v.password_confirmation.sameAsPassword && $v.password_confirmation.required">Passwords must be identical.</small>
                                    </div>
                                </div>
                                <button v-if="!btnAction" type="submit" class="focus:outline-none w-full mb-2" :class="this.$v.$invalid ? 'btn-disabled':'btn-active'">Create your swades account</button>
                                <p v-if="btnAction" class="focus:outline-none w-full mb-2 btn-disabled cursor-wait">Please wait...</p>
                            </form>

                            <p class="leading-tight mb-3">By creating an account, you agree to Swades's <n-link to="" class="font-semibold text-blue-1">Conditions of Use</n-link> and <n-link class="font-semibold text-blue-1" to="">Privacy Notice</n-link>.</p>

                            <div class="border-t text-gray-3 mb-3"></div>

                            <div class="flex items-center mb-3">
                                <p>Quick access with</p>
                                <n-link to="">
                                    <i class="ri-facebook-circle-fill text-2xl ml-4"></i>
                                </n-link>
                                <n-link to="">
                                    <i class="ri-google-fill text-2xl ml-4"></i>
                                </n-link>
                            </div>

                            <div class="border-t text-gray-3 mb-6"></div>

                            <p class="mb-6" v-if="currentRouteName != 'login'">I have already an account. <button @click="openLoginModal" class="focus:outline-none ml-4 text-orange-1 font-bold">Login</button></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div @click="closeModal" class="opacity-50 fixed inset-0 z-40 bg-green-4"></div>
    </div>
</template>
<script>
import { required, minLength, sameAs, email  } from 'vuelidate/lib/validators';
export default {
    data() {
        return {
            name: '',
            phone: '',
            email: '',
            password: '',
            password_confirmation: '',
            btnAction: false,
            show: false,
            close_modal: 'closeModal',
        }
    },
    validations: {
        name:{
            required,
        },
        phone:{
            required,
            minLength: minLength(11),
        },
        email:{
            required,
            email,
        },
        password:{
            required,
            minLength: minLength(8),
        },
        password_confirmation:{
            required,
            sameAsPassword: sameAs('password')
        },
    },
    computed: {
        currentRouteName() {
            return this.$route.name;
        }
    },
    methods: {
        closeModal()
        {
            if(this.close_modal == 'closeModal')
            {
                this.closeRegistrationModal();
            }
        },
        wait()
        {
            this.close_modal = 'wait';
            setTimeout(() => this.close_modal = 'closeModal', 500);
        },

        closeRegistrationModal(){
            this.$emit('closeRegistrationModal');
        },
        openLoginModal(){
            this.$emit('openLoginModal');
        },
        showPassword(){
            this.show = !this.show;
        },
        submitForm(){
            this.$v.$touch();
            if(!this.$v.$invalid){
                var formData = new FormData();
                formData.append("name", this.name);
                formData.append("email", this.email);
                formData.append("phone_number", this.phone);
                formData.append("password", this.password);
                formData.append("password_confirmation", this.password_confirmation);

                this.$axios.post("api/register", formData)
                .then(response => {
                    this.$toast.success('Success !');
                    this.closeRegistrationModal();
                })
                .catch(error => {
                    this.btnAction = false;
                    this.$toast.error("Oops..!-" + error.response.data.message);
                    // this.$toast.error('Oops..! Something wrong...!');
                });
                this.btnAction = true;
                this.$toast.info('Thanks for your submission!');
            }else{
                this.$toast.error('Please fill the form correctly!')
            }
        },
    },
}
</script>
