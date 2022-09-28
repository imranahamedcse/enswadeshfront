<template lang="">
    <div>
        <p class="h2">My Shopping Friends</p>
        <div class="mt-4 bg-white">
            <div class="p-4 flex">
                <div @click="shoppingFriend" :class="shopping_friend ? 'bg-green-3':''" class="btn-group rounded-l hover:bg-green-3">
                    Friend list
                </div>
                <div @click="shoppingFindFriend" :class="shopping_find ? 'bg-green-3':''" class="btn-group hover:bg-green-3">
                    Find friends
                </div>
                <div @click="shoppingFriendRequest" :class="shopping_request ? 'bg-green-3':''" class="btn-group rounded-r hover:bg-green-3">
                    Friend requests
                </div>
            </div>
            <div class="divider"></div>

            <friend-list v-if="shopping_friend"></friend-list>
            <find-friend v-if="shopping_find"></find-friend>
            <friend-request v-if="shopping_request"></friend-request>
        </div>
    </div>
</template>
<script>
import FriendList from '~/components/my-account/menus/shopping-friend-items/items/FriendList';
import FindFriend from '~/components/my-account/menus/shopping-friend-items/items/FindFriend';
import FriendRequest from '~/components/my-account/menus/shopping-friend-items/items/FriendRequest';
export default {
    data() {
        return {
            shopping_friend: true,
            shopping_find: false,
            shopping_request: false,
        }
    },
    components: {
        FriendList,
        FindFriend,
        FriendRequest,
    },
    methods: {
        shoppingFriend(){
            this.shopping_friend = true;
            this.shopping_find = false;
            this.shopping_request = false;
        },
        shoppingFindFriend(){
            this.shopping_friend = false;
            this.shopping_find = true;
            this.shopping_request = false;
        },
        shoppingFriendRequest(){
            this.shopping_friend = false;
            this.shopping_find = false;
            this.shopping_request = true;
        },
    }
}
</script>