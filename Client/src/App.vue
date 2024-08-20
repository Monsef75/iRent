<template>

    <Header />
    <div style="margin-top: 55px;">
        <router-view></router-view>
        <SuccessCard/>
    </div>

</template>

<script>

    import Header from '@/components/Common/Header.vue'
    import SuccessCard from '@/components/Common/SuccessCard.vue'
    import { mapActions } from 'vuex'

    export default {
    
        components: {Header, SuccessCard,},
        data() { return {
            
        }},
        methods: {
            ...mapActions(['StaySignedIn',]), 
        },
        computed: {
            
        },
        created() {
            this.StaySignedIn()
        },
    }
    
</script>

<style scoped lang='scss'>
    
</style>
