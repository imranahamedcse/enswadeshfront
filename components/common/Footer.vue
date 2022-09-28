<template>
  <div>
    <div class="bg-green-4 w-full lg:py-20 md:py-10 py-6">
      <div class="max-w-screen-xl xl:px-10 px-2 m-auto grid lg:grid-cols-6 grid-cols-2 gap-3 text-white">
        <div class="py-3 lg:py-0">
          <p class="block font-bold">Menu Name</p>
          <n-link :to="menu.url" class="block" v-for="(menu, i) in menus" :key="i">{{ menu.name }}</n-link>
        </div>
        <div class="py-3 lg:py-0">
          <p class="block font-bold">About Company</p>
          <n-link :to="about.url" class="block" v-for="(about, i) in abouts" :key="i">{{ about.name }}</n-link>
        </div>
        <div class="py-3 lg:py-0">
          <p class="block font-bold">Contact us</p>
          <n-link :to="contact.url" class="block" v-for="(contact, i) in contacts" :key="i">{{ contact.name }}</n-link>
        </div>
        <div class="py-4 lg:py-0 lg:col-span-2 lg:col-start-5">
          <p class="block font-bold">Stay in touch</p>
          <div class="flex border-b-2 border-white">
            <input class="bg-green-4 w-full focus:outline-none" type="email" placeholder="Email Address">
            <div class="md:border-2 border border-orange-1 md:px-3 px-2 mb-2 rounded">
              <img class="md:h-6 h-4" src="~/assets/icons/right_arrow.png" alt="Button">
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-green-5 w-full lg:py-6 md:py-4 py-2">
      <div class="max-w-screen-xl xl:px-10 px-2 m-auto grid lg:grid-cols-3 lg:gap-3 items-center">
        <div class="lg:col-span-2 text-gray-2">
          <span>&copy; 2021 swadesh</span>
          <span class="pl-3">All Rights Reserved</span>
          <span class="pl-3">Privacy Policy</span>
          <span class="pl-3">Terms & Conditions</span>
        </div>
        <div class="flex text-white items-center">
          <n-link to=""><span class="border-b-2 border-orange-1">Facebook</span></n-link>
          <n-link to="" class="pl-3"><span class="border-b-2 border-orange-1">Instagram</span></n-link>
          <n-link to="" class="pl-3"><span class="border-b-2 border-orange-1">Twitter</span></n-link>
          <n-link to="" class="ml-auto bg-green-3 text-green-4 font-bold md:py-2 py-1 md:px-5 px-3 rounded-3xl">
            <div class="flex">
              <i class="ri-question-line"></i>
              <span class="pl-2">Help</span>
            </div>
          </n-link>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data: () => ({
    menus: [
      {name: 'About Company', url: '/about'},
      {name: 'Terms & Conditions', url: '/terms-conditions'},
      {name: 'FAQ', url: '/faq'},
      {name: 'Privacy and Confidentiality', url: '/privacy-confidentiality'},
    ],
    abouts: [
      {name: 'FAQ', url: ''},
      {name: 'Media', url: ''},
      {name: 'Menu Name', url: ''},
      {name: 'Additional Menu', url: ''},
    ],
    contacts: [
      {name: 'hello@email.com', url: ''},
      {name: 'support@email.com', url: ''},
      {name: '+880 01XXXXXXXXX', url: ''},
    ],
  })
}
</script>
