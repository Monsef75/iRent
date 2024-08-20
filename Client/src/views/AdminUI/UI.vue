<template>
    <div class="d-flex">
        <SideBar @ShowPage="(Index) => CurrentPage = Pages[Index]"/>
        <component class="Component" :is="ShowPage"></component>
    </div>
</template>

<script>

    import SideBar from '@/components/AdminUI/SideBar.vue'

    import Properties from '@/views/AdminUI/Properties.vue'
    import Users from '@/views/AdminUI/Users.vue'
    import Offers from '@/views/AdminUI/Offers.vue'

    export default {
        components: {SideBar,Users,Properties,Offers,},            
        data() { return {
            Pages: ["Properties","Users" ,"Offers",],
            CurrentPage: 'Properties',
        } },
        computed: {
            ShowPage() {
                return this.CurrentPage
            },
        },
    }

</script>

<style>

.Component {
    flex-basis: calc(100% - 250px)!important;
    min-height: calc(100vh - 55px);
    margin-left: 250px;
}

@media screen and (max-width: 768px) {
    .Component {
        flex-basis: calc(100% - 45px)!important;
    }
}

</style>