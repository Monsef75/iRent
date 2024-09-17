<template>
    
    <main class="p-4" >

        <header class="d-flex justify-content-center flex-wrap gap-3 mx-auto w-fit pb-5" >

            <div class="dropdown d-flex align-items-center" style="flex-basis: 100%;" >
                <input type="text" class="dropdown-toggle s18 bd-b-light-grey py-3 px-4 w-100" data-bs-toggle="dropdown" 
                :value="Query.Location ? Query.Location : 'All Locations'" readonly >
                <ul class="dropdown-menu w-100">
                    <li class="dropdown-item s16 c-text" @click="Query.Location = 'Oum El Bouaghi' " > Oum El Bouaghi </li>
                    <li class="dropdown-item s16 c-text" @click="Query.Location = 'Bejaia' " > Bejaia </li>
                    <li class="dropdown-item s16 c-text" @click="Query.Location = 'Khenchela' " > Khenchela </li>
                    <li class="dropdown-item s16 c-text" @click="Query.Location = null " > All Locations </li>
                </ul>
                <i class="fa-solid fa-chevron-down s15 c-text Arrow-Down" style="margin-left: -35px;" ></i>
            </div>
            <div class="Box py-3 pointer trans3" v-for="(Type, Index) in PropertyTypes" :class="{'Active' : Type.Active }" @click="TypeSlected( Index, Type.Name )">
                <div class="text-center">
                    <div class="rounded">
                        <div class="icon mb-3">
                            <img class="img-fluid" :src="Type.Img" alt="Icon">
                        </div>
                        <h6 class="c-text s18 fw-bold letter-p-05"  >{{ Type.Name }}</h6>
                    </div>
                </div>
            </div>

        </header>

        <div class="EmptyPage t-center" v-if="EmptyPage">
            <img src="/src/assets/Imgs/AdminUI/Common/Docs.png" alt="">
            <p class="c-light-grey2 fw-bold letter-p-1 t-center pb-4" style="font-size: 40px;">No Properties Yet</p>
            <router-link to="/List" class="ActiveBttn py-2 px-4 s20 fw-bold" > Have a Property to List ?  </router-link>
        </div>
        <Properties :Properties="Properties"  class="container-xxl mb-5" v-else="!EmptyPage" />


    </main>
    
</template>

<script>
    
    import Properties from '@/components/CustomerUI/Properties/Properties.vue'
    import Apartment from '@/assets/Imgs/CustomerUI/Home/icon-apartment.png';
    import Villa from '@/assets/Imgs/CustomerUI/Home/icon-villa.png';
    import Home from '@/assets/Imgs/CustomerUI/Home/icon-house.png';
    import Office from '@/assets/Imgs/CustomerUI/Home/icon-housing.png';
    import Building from '@/assets/Imgs/CustomerUI/Home/icon-building.png';
    import Garage from '@/assets/Imgs/CustomerUI/Home/icon-luxury.png';
    import { mapActions } from 'vuex'

    export default {
    
        components: {Properties,},
        data() { return {
            PropertyTypes: [
                { Name: 'All',       Img: Apartment, Active: true,},
                { Name: 'Apartment', Img: Building,  Active: false,},
                { Name: 'Villa',     Img: Villa,     Active: false,},
                { Name: 'Home',      Img: Home,      Active: false,},
                { Name: 'Office',    Img: Office,    Active: false,},
                { Name: 'Garage',    Img: Garage,    Active: false,},
            ],
            Query: {
                Location: null,
                Type: null,
            },
            Properties: [],
            EmptyPage: false,
        }},
        methods: {
            setProperties( Query ) {
                this.SetProperties( Query ).then( res => {
                    if (res.length == 0) this.EmptyPage = true
                    else this.Properties = res
                })
            },
            TypeSlected( Index, Type ) {
                this.PropertyTypes.forEach( Type => Type.Active = false )
                this.PropertyTypes[Index].Active = true
                if (Type == 'All') this.Query.Type = null
                else this.Query.Type = Type
            },
            ...mapActions(['SetProperties']),
        },
        watch: {
            Query: {
                handler( Obj ) {
                    this.EmptyPage = false
                    this.Properties = []
                    this.setProperties( Obj )
                },deep: true
            }
        },
        created() {
            if (this.$route.params.Location != 'Location') {
                this.Query.Location = this.$route.params.Location
            }
            if (this.$route.params.Type != 'Type') {
                this.Query.Type = this.$route.params.Type
                this.PropertyTypes[0].Active = false
                const Index = this.PropertyTypes.findIndex( Property => Property.Name == this.$route.params.Type )
                console.log(Index)
                this.PropertyTypes[Index].Active = true
            } 
            this.setProperties( this.Query )
        },
    }
    
</script>

<style scoped lang='scss'>
    main {
        background-color: var(--Background);
        header {
            .Box {
                opacity: .6;
                width: 110px;
                border-bottom: 3px solid var(--Background);
            }
            .Box:hover {
                opacity: 1;
                border-bottom-color: var(--Accent);
            }
            .Box.Active {
                opacity: 1;
                border-bottom-color: var(--Accent);
                h6 {
                    color: var(--Accent);
                }
            }
        }
    }
    
</style>