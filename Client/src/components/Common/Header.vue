<template>
    <header class="px-5 w-100 d-flex justify-content-between align-items-center" style="height: 55px;"
     :class="Dashboard ? 'bc-panel bd-b-light-white' : 'bc-accent'">

        <div class="Logo">
            <router-link to="/" class="d-flex align-items-center gap-1" >
                <img class="LogoShape" src="/src/assets/Imgs/CustomerUI/Common/LogoShape.png" alt="">
                <span class="s25 c-white fw-bolder fst-italic letter-n-1" >iRent</span>
            </router-link>
        </div>
        <div class="QuickAccess gap-4" :class=" Dashboard ? 'd-none' : 'd-flex align-items-center' ">

            <ul class="d-flex gap-1 bd-r-white pe-4" >
                <li class="fw-bold letter-n-05 pointer" >
                    <router-link to="/" class="px-3 c-light-white trans3" :class="{'Active': Routers[0].Active}"  > Home </router-link> 
                </li>
                <li class="fw-bold letter-n-05 pointer" >
                    <router-link to="/Explore" class="px-3 c-light-white trans3" :class="{'Active': Routers[1].Active}"  > Explore </router-link> 
                </li>
                <li class="fw-bold letter-n-05 pointer" >
                    <router-link :to="IsLoggedIn ? '/List' : '/Membership/Sign-In'" class="px-3 c-light-white trans3" :class="{'Active': Routers[2].Active}"  > List Your Property </router-link>
                </li>
                <li class="fw-bold letter-n-05 pointer" v-show="IsLoggedIn" >
                    <router-link to="/Profile" class="px-3 c-light-white trans3" :class="{'Active': Routers[3].Active}" > Profile </router-link> 
                </li>
            </ul>
            <Favorites  @CloseOpnedBoxes="Favorites()"  :BoxStatus="FavoritesBoxStatus"/>
            <Account    @CloseOpnedBoxes="Account()"    :BoxStatus="AccountBoxStatus"/>

        </div>

    </header>
</template>

<script>

    import Favorites from '/src/components/CustomerUI/Header/Favorites.vue'
    import Account from '/src/components/CustomerUI/Header/Account.vue'
    import { mapGetters } from 'vuex'

    export default {
        components: { Account,Favorites },
        data() { return {
            AccountBoxStatus: true,
            FavoritesBoxStatus: true,
            Routers: [
                { Name: 'Home',    Active: true },
                { Name: 'Explore', Active: false },
                { Name: 'List',    Active: false },
                { Name: 'Profile', Active: false },
            ],
        }},
        methods: {
            Favorites() {
                this.FavoritesBoxStatus = false
                this.AccountBoxStatus = true
            },
            Account() {
                this.FavoritesBoxStatus = true
                this.AccountBoxStatus = false
            },
        },
        computed: {
            Dashboard() {
                if (this.$route.name == 'AdminPanel') return true
                else return false
            },
            ...mapGetters(['IsLoggedIn',]),
        },
        watch: {
            $route(Val) {
                this.Routers.forEach( Router => Router.Active = false )
                this.Routers.forEach( Router => {
                    if (Router.Name == Val.name) return Router.Active = true
                })
            },
        }
    }
</script> 

<style scoped lang="scss">

header {
    position: fixed;
    top: 0;
    z-index: 5;
    padding: 15px 0;
    .Logo {

        .LogoShape {
            width: 40px;
        }
        .LogoText {
            width: 65px;
        }
    }
    .QuickAccess {
        ul {
            li:hover a{
                background-color: var(--Secondary);
                color: var(--Text);
            }
            li a.Active{
                background-color: var(--Primary);
                color: var(--Text);
            }

        }
    }
    .Dashboard span:hover {
        color: var(--Prim-Blue);
    }

}

@media screen and (max-width:576px) {
  header .Dashboard {
    display: none!important;
  }
  
}

</style> 