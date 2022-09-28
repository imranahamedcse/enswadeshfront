<template>
    <div>
        <!-- Tabs -->
        <div class="">
            <div class="hidden md:contents">
                <span v-for="(tab, i) in tabs" :key="i">
                    <button @click="changeTab(tab.name)" :class="active == tab.name ? 'border-l-2 border-t-2 border-r-2 rounded-t-lg border-green-4 bg-gray-5':''" class="focus:outline-none sm:font-bold lg:px-6 md:px-4 sm:px-2 px-1 md:py-2 py-1">{{ tab.name }}</button>
                </span>
            </div>
            <div class="md:hidden">
                <select @change="getTabName()" v-model="tabName" class="border border-green-4 py-1 font-bold w-full focus:outline-none">
                    <option class="font-semibold" v-for="(tab, i) in tabs" :key="i">{{ tab.name }}</option>
                </select>
            </div>

            <div style="margin-top: -2px;" class="border-t-2 border-green-4 xl:py-8 lg:py-4 py-2">
                <span v-for="(tab, i) in tabs" :key="i" :class="active == tab.name ? '':'hidden'">

                    <!-- Home Tabs -->
                    <div v-if="tab.view == 'Videos'">
                        <videos></videos>
                    </div>
                    <div v-if="tab.view == 'Templates'">
                        <templates></templates>
                    </div>
                    <div v-if="tab.view == 'Experiences'">
                        <experiences></experiences>
                    </div>
                    <div v-if="tab.view == 'Memes'">
                        <memes></memes>
                    </div>
                    <div v-if="tab.view == 'Stories'">
                        <stories></stories>
                    </div>

                    <!-- My shop tabs components -->
                    <div v-if="tab.view == 'Products'">
                        <products></products>
                    </div>
                    <div v-if="tab.view == 'Orders'">
                        <orders></orders>
                    </div>
                    <div v-if="tab.view == 'Tutorials'">
                        <tutorials></tutorials>
                    </div>
                    <div v-if="tab.view == 'Calculator'">
                        <calculator></calculator>
                    </div>

                    <!-- Product details component -->
                    <div v-if="tab.view == 'Information'">
                        <information></information>
                    </div>
                    <div v-if="tab.view == 'Features'">
                        <features></features>
                    </div>
                    <div v-if="tab.view == 'Reviews'">
                        <reviews></reviews>
                    </div>


                    <!-- Product Preview component -->
                    <div v-if="tab.view == 'Informations'">
                        <preview-information></preview-information>
                    </div>
                    <div v-if="tab.view == 'Feature'">
                        <preview-feature></preview-feature>
                    </div>

                </span>
            </div>
        </div>

    </div>
</template>

<script>
// Home tabs components
import Videos from '~/components/home/tabs/Videos.vue';
import Templates from '~/components/home/tabs/Templates.vue';
import Experiences from '~/components/home/tabs/Experiences.vue';
import Memes from '~/components/home/tabs/Memes.vue';
import Stories from '~/components/home/tabs/Stories.vue';
// My shop tabs component
import Calculator from '~/components/my-shop/tabs/Calculator.vue';
import Orders from '~/components/my-shop/tabs/Orders.vue';
import Products from '~/components/my-shop/tabs/TabProducts.vue';
import Tutorials from '~/components/my-shop/tabs/Tutorials.vue';
// Product Details tabs component
import Information from '../product-details/tabs/Information.vue';
import Features from '../product-details/tabs/Features.vue';
import Reviews from '../product-details/tabs/Reviews.vue';
// Product Add Preview tabs component
import PreviewInformation from '../my-shop/product-preview/tab/Informations.vue';
import PreviewFeature from '../my-shop/product-preview/tab/Feature.vue';

export default {
    data() {
        return {
            tabName: '',
            active: this.showTab,
        }
    },
    components: {
        // Home Tabs
        Videos,
        Templates,
        Experiences,
        Memes,
        Stories,
        // My Shops tabs
        Calculator,
        Orders,
        Products,
        Tutorials,
        // Product Details
        Information,
        Features,
        Reviews,
        // Product Add Preview
        PreviewInformation,
        PreviewFeature,
    },
    props: ['showTab','tabs'],
    
    methods: {
        changeTab(name){
            this.active = name;
        },
        getTabName(){
            this.changeTab(this.tabName)
        }
    },
}
</script>
