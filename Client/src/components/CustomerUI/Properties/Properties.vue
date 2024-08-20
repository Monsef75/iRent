<template>
    
    <div class="Properties d-grid gap-4 wow fadeInUp" >

        <div class="property-item" v-for="Property in Properties">

            <div class="position-relative overflow-hidden">
                <router-link to="/Details"><img class="img-fluid" :src="`/src/assets/Imgs/CustomerUI/Home/${Property.Img}`" ></router-link>
                <div class="position-absolute bc-accent rounded c-primary s17 start-0 top-0 m-4 py-1 px-3">For {{ Property.Category }}</div>
                <div class="position-absolute bc-white rounded-top w-400 s17 c-accent start-0 bottom-0 mx-4 pt-1 px-3">{{ Property.Type }}</div>
            </div>
            <div class="p-4 pb-0">
                <h5 class="c-accent mb-2 fw-bold">{{ Property.Price }}<i class="s13">Dz</i> </h5>
                <h5 class="d-block c-light-black mb-3 fs-4 fw-bold letter-n-05">{{ Property.Name }}</h5>
                <p class="c-accent s17" ><i class="fa fa-map-marker-alt c-accent me-2"></i>{{ Property.Location }}</p>
            </div>

            <div v-if="Delete" >
                <button class="CancelBttn px-3 py-1 my-3 rd-5 d-block mx-auto" >Delete</button>
            </div>
            <div class="d-flex border-top fw-light mt-3" v-else >
                <small class="c-accent flex-fill text-center border-end py-2"><i class="fa fa-ruler-combined c-accent me-2"></i>{{ Property.Size }} Sqft</small>
                <small class="c-accent flex-fill text-center border-end py-2"><i class="fa fa-bed c-accent me-2"></i>{{ Property.Bed }} Bed</small>
                <small class="c-accent flex-fill text-center py-2"><i class="fa fa-bath c-accent me-2"></i>{{ Property.Bath }} Bath</small>
            </div>
        </div>

    </div>
    
</template>

<script>
    
    
    
    export default {
    
    
        components: {},
        props: ['Delete'],
        data() { return {
            Properties: [
                {Img : 'property-1.jpg', Category: 'Rent', Type: 'Appartment', Price: '12,345',
                  Name: 'Golden Urban House For Rent', Location: '123 Street, Oum El Bouaghi', Size: 1000, Bed: 2, Bath: 3},
                {Img : 'property-2.jpg', Category: 'Sale', Type: 'Villa',      Price: '12,345',
                  Name: 'Golden Urban House For Sell', Location: '123 Street, Oum El Bouaghi', Size: 1000, Bed: 2, Bath: 3},
                {Img : 'property-3.jpg', Category: 'Rent', Type: 'Office',     Price: '12,345',
                  Name: 'Golden Urban House For Rent', Location: '123 Street, Oum El Bouaghi', Size: 1000, Bed: 2, Bath: 3},
                {Img : 'property-4.jpg', Category: 'Sale', Type: 'Building',   Price: '12,345',
                  Name: 'Golden Urban House For Sell', Location: '123 Street, Oum El Bouaghi', Size: 1000, Bed: 2, Bath: 3},
                {Img : 'property-5.jpg', Category: 'Rent', Type: 'Home',       Price: '12,345',
                  Name: 'Golden Urban House For Rent', Location: '123 Street, Oum El Bouaghi', Size: 1000, Bed: 2, Bath: 3},
                {Img : 'property-6.jpg', Category: 'Rent', Type: 'Shop',       Price: '12,345',
                  Name: 'Golden Urban House For Rent', Location: '123 Street, Oum El Bouaghi', Size: 1000, Bed: 2, Bath: 3},
            ],
        }},
        methods: {
        },
        computed: {
            
        },
        watch: {
            
        },
    }
    
</script>

<style scoped lang='scss'>

.Properties {
    grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));

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