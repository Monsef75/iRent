<template>
    
    <main class="p-4" >

        <header class="d-flex gap-2 mx-auto w-fit pb-5" >
            <div class="Box py-3 pointer trans3" v-for="(Type, Index) in PropertyTypes" :class="{'Active' : Type.Active }" @click="TypeSlected(Index)">
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

        <Properties :Properties="Properties"  class="container-xxl mb-5" />

    </main>
    
</template>

<script>
    
    import Properties from '@/components/CustomerUI/Properties/Properties.vue'
    import { mapActions } from 'vuex'
    import Apartment from '@/assets/Imgs/CustomerUI/Home/icon-apartment.png';
    import Villa from '@/assets/Imgs/CustomerUI/Home/icon-villa.png';
    import Home from '@/assets/Imgs/CustomerUI/Home/icon-house.png';
    import Office from '@/assets/Imgs/CustomerUI/Home/icon-housing.png';
    import Building from '@/assets/Imgs/CustomerUI/Home/icon-building.png';
    import Garage from '@/assets/Imgs/CustomerUI/Home/icon-luxury.png';

    export default {
    
        components: {Properties,},
        data() { return {
            PropertyTypes: [
                { Name: 'Apartment', Img: Apartment, Active: true,},
                { Name: 'Villa',     Img: Villa,     Active: true,},
                { Name: 'Home',      Img: Home,      Active: true,},
                { Name: 'Office',    Img: Office,    Active: true,},
                { Name: 'Building',  Img: Building,  Active: true,},
                { Name: 'Garage',    Img: Garage,    Active: true,},
            ],
            Properties: [],
        }},
        methods: {
            TypeSlected( Index ) {
                this.PropertyTypes.forEach( Type => Type.Active = false )
                this.PropertyTypes[Index].Active = true
            },
            ...mapActions(['SetProperties']),
        },
        created() {
            this.SetProperties().then( res => {
                this.Properties = res
            })
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