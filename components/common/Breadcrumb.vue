<template>
    <div>
        <!-- BreadCrumbs -->
        <div class="hidden md:contents">
            <div class="flex py-3">
                <div class="" v-for="(breadCrumb, i) in breadCrumbs" :key="i">
                    <div class="flex items-center justify-center" v-if="breadCrumb.url != ''">
                        <n-link :to="breadCrumb.url" class="text-blue-1">{{ breadCrumb.title }}</n-link>
                        <i class="sm:px-2 px-1 ri-arrow-right-s-fill"></i>
                    </div>
                    <div v-if="breadCrumb.url == ''">
                        <p>{{ breadCrumb.title }}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    props: ['breadCrumbs'],
}
</script>
