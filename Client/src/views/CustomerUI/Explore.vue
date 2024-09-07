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

    export default {
    
        components: {Properties,},
        data() { return {
            PropertyTypes: [
                { Name: 'Apartment', Img: '', Active: true,},
                { Name: 'Villa',     Img: '', Active: true,},
                { Name: 'Home',      Img: '', Active: true,},
                { Name: 'Office',    Img: '', Active: true,},
                { Name: 'Building',  Img: '', Active: true,},
                { Name: 'Garage',    Img: '', Active: true,},
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
            const Types = ['apartment','villa','house','housing','building','luxury',]
            this.PropertyTypes = this.PropertyTypes.map( (Property, Index) => ({
                ...Property,
                Img: `/src/assets/Imgs/CustomerUI/Home/icon-${Types[Index]}.png`,
            }))
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