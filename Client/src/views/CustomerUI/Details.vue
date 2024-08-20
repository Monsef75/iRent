<template>

    <main>

        <article class="position-relative text-start mx-auto p-5 wow slideInLeft">
            <span class="position-absolute SkyBackground w-100 h-100 start-0 bottom-0" ></span>
            <div class="Text position-relative" >
                <h1 class="c-text mb-2 s60 fw-bolder letter-n-1 ">Property Details</h1>
                <p class="c-grey s17 fw-bold" >Eirmod sed ipsum dolor sit rebum labore magna erat. Tempor ut dolore lorem kasd vero ipsum sit eirmod sit diam justo sed rebum.</p>
            </div>
        </article>

        <section class="container-xxl my-5" >

            <div class="Images d-flex flex-wrap gap-3 mb-5">
                <div ref="DivPrim" class="Img-Primary col-6 bd-dashed-accent rd-10 position-relative trans3 shadow"
                    :style="{'background-image': `url(${ Imgs.PrimImg })`}" >
                </div>
                <div class="Imgs-Secondary d-grid gap-3 flex-grow-1">
                    <div ref="DivScnd" class="bd-dashed-accent rd-5 position-relative trans3 shadow"
                        v-for="Img in Imgs.ScndImgs" :style="{'background-image': `url(${ Img })`}" >
                    </div>
                </div>
            </div>
            <form class="Form d-grid gap-4" style="margin-bottom: 500px;">

                <div class="General bc-light-accent3 p-4 col-12 d-flex flex-wrap gap-2 rd-10 shadow">

                    <h2 class="fw-bold letter-n-05 c-text mb-2" style="flex-basis: 100%;" >General Information</h2>
                    <label for="Gen1" class="rd-5 pointer bc-background" style="flex-basis: calc(50% - .25rem);">
                        <input id="Gen1" type="text" class="s20 bc-transparent px-3" placeholder="Property Name" v-model="Info.General.Name" readonly >
                        <i class="fa fa-pen-to-square s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen2" class="rd-5 pointer bc-background" style="flex-basis: calc(50% - .25rem);">
                        <input id="Gen2" type="text" class="s20 bc-transparent px-3" placeholder="Property Location" v-model="Info.General.Location" readonly >
                        <i class="fa fa-map-marker-alt s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen3" class="rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen3" type="text" class="s20 bc-transparent px-3" placeholder="Property Price" v-model="Info.General.Price" readonly >
                        <i class="fa fa-tag s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen4" class="rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen4" type="text" class="s20 bc-transparent px-3" placeholder="Property Type" v-model="Info.General.Type" readonly >
                        <i class="fa fa-building s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen5" class="rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen5" type="text" class="s20 bc-transparent px-3" placeholder="Property Category" v-model="Info.General.Category" readonly >
                        <i class="fa fa-layer-group s20 t-center bd-l-black c-accent" ></i>
                    </label>

                </div>
                <div class="Offers bc-light-accent3 p-4 rd-10 shadow">

                    <h2 class="fw-bold letter-n-05 c-text mb-3" >Property Offers</h2>
                    <label for="Off1" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-wind s25 px-3 bd-r-black" :class="Info.Offers.AirConditioner ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.AirConditioner}" >AirConditioner</span>
                    </label>
                    <label for="Off2" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-person-booth s25 px-3 bd-r-black" :class="Info.Offers.Bathroom ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.Bathroom}" >Bathroom</span>
                    </label>
                    <label for="Off3" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-wifi s25 px-3 bd-r-black" :class="Info.Offers.Wifi ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.Wifi}" >Wifi</span>
                    </label>
                    <label for="Off4" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-user-tie s25 px-3 bd-r-black" :class="Info.Offers.Waiter ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.Waiter}" >Waiter</span>
                    </label>
                </div>
                <div class="Discription bc-light-accent3 p-4 d-grid gap-2 rd-10 shadow">

                   <h2 class="fw-bold letter-n-05 c-text mb-2" >Discription</h2>
                    <label>
                        <textarea rows="7" class="s20 p-3 rd-5 pointer bc-background w-100" placeholder="Discription..." v-model="Info.Description.Description" required ></textarea>
                    </label>
                    <label for="Disc1" class="rd-5 pointer bc-background">
                        <input id="Disc1" type="number" class="s20 bc-transparent px-3" placeholder="Adults" v-model="Info.Description.Adults" required >
                        <i class="fa fa-user-group s18 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Disc2" class="rd-5 pointer bc-background">
                        <input id="Disc2" type="number" class="s20 bc-transparent px-3" placeholder="Size" v-model="Info.Description.Size" required >
                        <i class="fa fa-ruler-combined s18 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Disc3" class="rd-5 pointer bc-background">
                        <input id="Disc3" type="number" class="s20 bc-transparent px-3" placeholder="Bed" v-model="Info.Description.Bed" required >
                        <i class="fa fa-bed s18 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Disc4" class="rd-5 pointer bc-background">
                        <input id="Disc4" type="number" class="s20 bc-transparent px-3" placeholder="Rooms" v-model="Info.Description.Rooms" required >
                        <i class="fa fa-door-closed s18 t-center bd-l-black c-accent" ></i>
                    </label>

                </div>

            </form>

        </section>
        
    </main>
    
</template>

<script>
    
    import CheckBox from '@/components/CustomerUI/Elements/CheckBox.vue'
    
    export default {
    
        components: {CheckBox,},
        data() { return {
            Info: {
                General: {
                    Name: null,
                    Type: null,
                    Category: null,
                    Location: null,
                    Price: null,
                },
                Offers: {
                    AirConditioner: true,
                    Bathroom: false,
                    Wifi: false,
                    Waiter: false,
                },
                Description: {
                    Description: null,
                    Adults: null,
                    Size: null,
                    Bed: null,
                    Rooms: null,
                },
            },

            Imgs: {
                PrimImg: '/src/assets/Imgs/CustomerUI/Home/property-1.jpg',
                ScndImgs: [null,null,null,null]
            },

        }},
        methods: {
        },
        computed: {
        },
    }
    
</script>

<style scoped lang='scss'>
    
    main {
        background-color: var(--Background);
        .Images {
            .Img-Primary, .Imgs-Secondary div  {
                background-color: rgba(35, 99, 100, 0.2);
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
            }
            .Img-Primary {
                width: 45%;
            } 
            .Imgs-Secondary {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                div {
                    height: 300px;
                }
            }
        }
        .Form {
            grid-template-columns: repeat(2, 1fr);
            label {
                input {
                    height: 50px;
                    width: calc(100% - 50px);
                }
                i {
                    width: 50px;
                }
            }
            .General {
                grid-column: span 2;
            }
            .Discription {
                grid-template-columns: repeat(4, 1fr);
                label:first-of-type, h2 {
                    grid-column: span 4;
                }
                input {
                    width: calc(100% - 50px)
                }
            }
        }
    }

</style>