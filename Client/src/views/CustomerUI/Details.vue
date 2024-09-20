<template>

    <main>

        <article class="position-relative text-start mx-auto p-5 wow slideInLeft">
            <span class="position-absolute SkyBackground w-100 h-100 start-0 bottom-0" ></span>
            <div class="Text position-relative" >
                <h1 class="c-text mb-2 s60 fw-bolder letter-n-1 ">Property Details</h1>
                <p class="c-grey s20 fw-bold" >This luxurious property features modern amenities, spacious living areas, and a prime location in a prestigious neighborhood.</p>
            </div>
        </article>

        <div class="Loader f-center h-75vh" v-if="Loading">
            <span class="Spinner2" ></span>
        </div> 

        <section class="container-xxl my-5" v-else >

            <div class="Images d-flex flex-wrap gap-3 mb-5">
                <div ref="DivPrim" class="Img-Primary col-6 bd-dashed-accent rd-10 position-relative trans3 shadow"
                    :style="{'background-image': `url(${ GetImage(Imgs.PrimImg) })`}" >
                    <span class="rounded-circle bc-light-red position-absolute f-center pointer trans3" >
                        <i class="fa-regular fa-heart s30 c-white trans3"></i>
                    </span>
                </div>
                <div class="Imgs-Secondary d-grid gap-3 flex-grow-1">
                    <div ref="DivScnd" class="bd-dashed-accent rd-5 position-relative trans3 shadow"
                        v-for="Img in Imgs.ScndImgs" :style="{'background-image': `url(${ GetImage(Img) })`}" >
                    </div>
                </div>
            </div>
            <form class="Form d-grid gap-4">

                <div class="General bc-light-accent3 p-4 col-12 d-flex flex-wrap gap-2 rd-10 shadow">

                    <h2 class="fw-bold letter-n-05 c-text mb-2" style="flex-basis: 100%;" >General Information</h2>
                    <label for="Gen1" class="rd-5 bc-background" style="flex-basis: calc(50% - .25rem);">
                        <input id="Gen1" type="text" class="s20 bc-transparent px-3" placeholder="Property Name" v-model="Info.General.Name" readonly >
                        <i class="fa fa-pen-to-square s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen2" class="rd-5 bc-background" style="flex-basis: calc(50% - .25rem);">
                        <input id="Gen2" type="text" class="s20 bc-transparent px-3" placeholder="Property Location" v-model="Info.General.Location" readonly >
                        <i class="fa fa-map-marker-alt s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen3" class="rd-5 bc-background flex-grow-1">
                        <input id="Gen3" type="text" class="s20 bc-transparent px-3" placeholder="Property Price" v-model="Info.General.Price" readonly >
                        <i class="fa fa-tag s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen4" class="rd-5 bc-background flex-grow-1">
                        <input id="Gen4" type="text" class="s20 bc-transparent px-3" placeholder="Property Type" v-model="Info.General.Type" readonly >
                        <i class="fa fa-building s20 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Gen5" class="rd-5 bc-background flex-grow-1">
                        <input id="Gen5" type="text" class="s20 bc-transparent px-3" placeholder="Property Category" v-model="Info.General.Category" readonly >
                        <i class="fa fa-layer-group s20 t-center bd-l-black c-accent" ></i>
                    </label>

                </div>
                <div class="Offers bc-light-accent3 p-4 rd-10 shadow">

                    <h2 class="fw-bold letter-n-05 c-text mb-3" >Property Offers</h2>
                    <label for="Off1" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-wind s25 px-3 bd-r-black" :class="Info.Offers.AirConditioner == 'true' ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !(Info.Offers.AirConditioner == 'true')}" >AirConditioner</span>
                    </label>
                    <label for="Off2" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-person-booth s25 px-3 bd-r-black" :class="Info.Offers.Bathroom == 'true' ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !(Info.Offers.Bathroom == 'true')}" >Bathroom</span>
                    </label>
                    <label for="Off3" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-wifi s25 px-3 bd-r-black" :class="Info.Offers.Wifi == 'true' ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !(Info.Offers.Wifi == 'true')}" >Wifi</span>
                    </label>
                    <label for="Off4" class="bc-background w-100 mb-2 d-flex align-items-center rd-5">
                        <i class="fa fa-user-tie s25 px-3 bd-r-black" :class="Info.Offers.Waiter == 'true' ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2" :class="{'text-decoration-line-through c-light-accent2' : !(Info.Offers.Waiter == 'true')}" >Waiter</span>
                    </label>
                </div>
                <div class="Discription bc-light-accent3 p-4 d-grid gap-2 rd-10 shadow">

                   <h2 class="fw-bold letter-n-05 c-text mb-2" >Discription</h2>
                    <label>
                        <textarea rows="7" class="s20 p-3 rd-5 bc-background w-100" placeholder="Discription..." v-model="Info.Description.Description" readonly ></textarea>
                    </label>
                    <label for="Disc1" class="rd-5 bc-background d-flex align-items-center">
                        <p class="Input text-nowrap s18 bc-transparent px-3 py-2" > {{ Info.Description.Adults + ' Adults' }} </p>
                        <i class="fa fa-user-group s17 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Disc2" class="rd-5 bc-background d-flex align-items-center">
                        <p class="Input text-nowrap s18 bc-transparent px-3 py-2" > {{ Info.Description.Size + ' m' }} </p>
                        <i class="fa fa-ruler-combined s17 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Disc3" class="rd-5 bc-background d-flex align-items-center">
                        <p class="Input text-nowrap s18 bc-transparent px-3 py-2" > {{ Info.Description.Bed + ' Beds' }} </p>
                        <i class="fa fa-bed s17 t-center bd-l-black c-accent" ></i>
                    </label>
                    <label for="Disc4" class="rd-5 bc-background d-flex align-items-center">
                        <p class="Input text-nowrap s18 bc-transparent px-3 py-2" > {{ Info.Description.Rooms + ' Rooms' }} </p>
                        <i class="fa fa-door-closed s17 t-center bd-l-black c-accent" ></i>
                    </label>

                </div>
                <div class="Contact p-4 bc-accent rd-10 shadow" >

                    <h2 class="fw-bold letter-n-05 c-white mb-3" >Contact Information</h2>
                    <label for="Gen1" class="rd-5 pointer bc-background" style="width: calc(50% - .25rem);" >
                        <input id="Gen1" type="text" class="s20 bc-transparent px-3" placeholder="Owner Name" v-model="Info.Contact.Name" readonly >
                        <i class="fa fa-user s20 t-center bd-l-black c-accent trans3" ></i>
                    </label>
                    <label for="Gen2" class="rd-5 pointer bc-background ms-2" style="width: calc(50% - .25rem);" >
                        <input id="Gen2" type="number" class="s20 bc-transparent px-3" placeholder="Owner Phone Number" v-model="Info.Contact.Phone" readonly >
                        <i class="fa fa-phone s20 t-center bd-l-black c-accent trans3" ></i>
                    </label>

                </div>

            </form>

        </section>
        
        <VueMap />

    </main>
    
</template>

<script>
    
    import CheckBox from '@/components/CustomerUI/Elements/CheckBox.vue'
    import VueMap from '@/components/CustomerUI/Map/Map.vue'
    import { mapActions } from 'vuex'

    export default {
    
        components: {CheckBox,VueMap},
        data() { return {
            Info: {
                Id: null,
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
                Contact: {
                    Name: null,
                    Phone: null,
                },
            },
            Imgs: {
                PrimImg: null,
                ScndImgs: [null,null,null,null]
            },
            Loading: true,
        }},
        methods: {
            GetImage( Image ) {
                return `data:${Image.fileType};base64,${Image.data}`
            },
            ...mapActions(['SetDetails',]),
        },
        created() {
            this.SetDetails({PropertyId: this.$route.params.PropertyId }).then( (res)=> {
                const Info = {
                    Id: res._id,
                    General: res.General,
                    Offers: res.Offers,
                    Description: res.Description,
                    Contact: res.Contact,
                }
                this.Info = Info
                this.Imgs.PrimImg = res.Images[0]
                this.Imgs.ScndImgs = res.Images.slice(1)
                this.Loading = false
            })
        }
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
                span {
                    width: 60px;
                    height: 60px;
                    left: 20px;
                    top: 20px;
                    border: 2px solid white;
                }
                span:hover {
                    background-color: var(--Red);
                    i {
                        transform: translateY(-2px);
                    }
                }
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
                input, .Input {
                    width: calc(100% - 50px);
                }
                input {
                    height: 50px;
                }
                i {
                    width: 50px;
                }
            }
            .General, .Contact {
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