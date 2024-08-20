<template>
    
    <main>

        <header class="d-flex gap-2 mx-auto w-fit py-5" >
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

        <Properties class="container-xxl mb-5" />

    </main>
    
</template>

<script>
    
    import Properties from '@/components/CustomerUI/Properties/Properties.vue'
    
    export default {
    
        components: {Properties,},
        data() { return {
            PropertyTypes: [
                { Name: 'Apartment', Img: '/src/assets/Imgs/CustomerUI/Home/icon-apartment.png', Active: true,},
                { Name: 'Villa',     Img: '/src/assets/Imgs/CustomerUI/Home/icon-villa.png',     Active: false,},
                { Name: 'Home',      Img: '/src/assets/Imgs/CustomerUI/Home/icon-house.png',     Active: false,},
                { Name: 'Office',    Img: '/src/assets/Imgs/CustomerUI/Home/icon-housing.png',   Active: false,},
                { Name: 'Building',  Img: '/src/assets/Imgs/CustomerUI/Home/icon-building.png',  Active: false,},
                { Name: 'Garage',    Img: '/src/assets/Imgs/CustomerUI/Home/icon-luxury.png',    Active: false,},
            ],
        }},
        methods: {
            TypeSlected( Index ) {
                this.PropertyTypes.forEach( Type => Type.Active = false )
                this.PropertyTypes[Index].Active = true
            }
        },
        computed: {
            
        },
        watch: {
            
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