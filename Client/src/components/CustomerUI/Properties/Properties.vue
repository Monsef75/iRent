<template>
    
    <div class="Properties d-grid gap-4 wow fadeInUp" >

        <div class="Loader" v-for=" in 6" v-if="Loading" :style="{ height: Delete ? '467px' : '456px' }"></div>

        <div class="property-item" v-for="(Property, Index) in Properties" v-else >

            <div class="position-relative overflow-hidden">
                <router-link :to='`/Details/${Property.Id}`'> <img class="img-fluid" :src="GetImage(Property.Image)" > </router-link>
                <div class="position-absolute bc-accent rounded c-primary s17 start-0 top-0 m-4 py-1 px-3">For {{ Property.Info.Category }}</div>
                <div class="position-absolute bc-white rounded-top w-400 s17 c-accent start-0 bottom-0 mx-4 pt-1 px-3">{{ Property.Info.Type }}</div>
            </div>
            <div class="p-4 pb-0">
                <h5 class="c-accent mb-2 fw-bold">{{ Property.Info.Price }}<i class="s13">Dz</i> </h5>
                <h5 class="d-block c-light-black mb-3 fs-4 fw-bold letter-n-05">{{ Property.Info.Name }}</h5>
                <p class="c-accent s17" ><i class="fa fa-map-marker-alt c-accent me-2"></i>{{ Property.Info.Location }}</p>
            </div>

            <div class="w-fit mx-auto my-3" v-if="Delete" >

                <button class="ButtonSpinner-primary bc-red rd-5" style="width: 79px; height: 32px;" v-if="Property.Waiting" >
                    <span class="Spinner"></span>
                </button>
                <button class="CancelBttn px-3 py-1 rd-5 s16" @click="$emit( 'DeleteProperty', Property.Id, Index )" v-else-if="Property.IsApproved" >Delete</button>

                <span class="c-red py-1 rd-5 fw-bold s16" v-else >Waiting for Approval</span>

            </div>
            <div class="d-flex border-top fw-light mt-3" v-else >
                <small class="c-accent flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined c-accent me-2"></i>{{ Property.Info.Size + ' m' }}</small>
                <small class="c-accent flex-fill text-center border-end py-2"><i class="fa fa-bed c-accent me-2"></i>{{ Property.Info.Bed + ' Beds' }}</small>
                <small class="c-accent flex-fill text-center py-2"><i class="fa fa-door-closed c-accent me-2"></i>{{ Property.Info.Rooms + ' Rooms' }}</small>
            </div>
        </div>
        
    </div>
    
</template>

<script>
    
    
    
    export default {
    
        components: {},
        props: ['Delete','Properties'],
        data() { return {
        }},
        methods: {
            GetImage( Image ) {
                return `data:${Image.fileType};base64,${Image.data}`
            },
        },
        computed: {
            Loading() {
                if ( this.Properties.length != 0 ) return false
                else return true
            }
        },
    }
    
</script>

<style scoped lang='scss'>

.Properties {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
    .Loader {
        box-shadow: .1rem .3rem .5rem rgba(0, 0, 0, .07) ;
        background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, .5) 50%,
            rgba(255, 255, 255, 0) 60%
        ) var(--Light-Grey4);
        background-size: 200% 100%;
        background-position-x: 180%;
        animation: 1s .06s Loader ease-in-out infinite;
    } 
    @keyframes Loader {
        to {
            background-position-x: -20%;
        }
    }

    .property-item {
        box-shadow: 0 0 30px rgba(0, 0, 0, .08);
        img {
            transition: .5s;
        }
        .border-top {
            border-top: 1px dashed rgba(0, 185, 142, .3) !important;
        }
        .border-end {
            border-right: 1px dashed rgba(0, 185, 142, .3) !important;
        }
    }

    .property-item:hover img {
        transform: scale(1.1);
    }

}

</style>