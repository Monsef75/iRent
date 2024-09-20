<template>

    <main class="pb-5" >

        <article class="position-relative text-start mx-auto px-5 py-4" style="height: 200px;">
            <span class="position-absolute SkyBackground w-100 h-100 start-0 bottom-0" ></span>
            <div class="Text position-relative d-block my-auto" >
                <h1 class="c-text mb-2 s60 fw-bolder letter-n-1 ">Property Listing</h1>
                <p class="c-grey s20 fw-bold" >List your property with us to reach a broad audience and maximize its potential.</p>
            </div>
        </article>
        <article class="Check d-flex gap-3 zindex-p-1 trans3" :class="{'opacity-0' : InfoValid && ImagesValid}" >

            <div class="Box t-center">
                <i class="fa-solid position-relative trans3" :class=" ImagesValid ? 'fa-circle-check Valid' : 'fa-image c-red' "></i>
            </div>
            <div class="Box t-center">
                <i class="fa-solid position-relative trans3" :class=" InfoValid ? 'fa-circle-check Valid' : 'fa-align-left c-red' "></i>
            </div>

        </article>

        <section class="container-xxl mt-5" >

            <div class="Images d-flex flex-wrap gap-3">
                <h2 class="fw-bold letter-n-05 c-text mb-2" style="flex-basis: 100%;" >Images ({{ ImgsLength }}/5)</h2>
                <div ref="DivPrim" class="Img-Primary col-6 bd-dashed-accent rd-10 position-relative trans3 shadow"
                    :style="{'background-image': `url(${ Imgs.PrimImg })`}" >
                    <label for="Img-Primary" class="position-absolute h-100 w-100 pointer">
                        <input ref="FilePrim" type="file" id="Img-Primary" class="position-absolute" v-on:change="ImgPrimary">
                        <img class="position-absolute start-50 top-50 trans3" src="/src/assets/Imgs/CustomerUI/List/Degrees.png" alt="">
                    </label>
                </div>
                <div class="Imgs-Secondary d-grid gap-3 flex-grow-1">
                    <div ref="DivScnd" class="bd-dashed-accent rd-5 position-relative trans3 shadow"
                        v-for="(Text, Index) in ScndImgsText" :style="{'background-image': `url(${ Imgs.ScndImgs[Index] })`}" >
                        <label :for="Index" class="position-absolute h-100 w-100 t-center pointer">
                            <input ref="FileScnd" type="file" :id="Index" class="position-absolute" v-on:change="ImgSecondary(Index)">
                            <span class="position-absolute s25 fw-bold c-light-black3 trans3">{{ Text }}</span>
                        </label>
                    </div>
                </div>
            </div>
            <form class="Form d-grid gap-4 my-5">

                <div class="General bc-light-accent3 p-4 col-12 d-flex flex-wrap gap-2 rd-10 shadow">

                    <h2 class="fw-bold letter-n-05 c-text mb-2" style="flex-basis: 100%;" >General Information</h2>
                    <label for="Gen1" class="rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen1" type="text" class="s20 bc-transparent px-3" placeholder="Property Name" v-model="Info.General.Name" required >
                        <i class="fa fa-pen-to-square s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Gen6" class="dropdown rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen6" type="text" class="dropdown-toggle s20 bc-transparent px-3" placeholder="Property Loctaion" 
                        :value="Info.General.Location ? Info.General.Location : null" readonly  data-bs-toggle="dropdown">
                        <ul class="dropdown-menu w-100">
                            <li class="dropdown-item" @click="Info.General.Location = 'Oum El Bouaghi' " > Oum El Bouaghi </li>
                            <li class="dropdown-item" @click="Info.General.Location = 'Bejaia' " > Bejaia </li>
                            <li class="dropdown-item" @click="Info.General.Location = 'Khenchela' " > Khenchela </li>
                        </ul>
                        <i class="fa fa-map-marker-alt s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Gen2" class="rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen2" type="text" class="s20 bc-transparent px-3" placeholder="Property Address" v-model="Info.General.Address" required >
                        <i class="fa fa-map-marker-alt s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Gen3" class="rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen3" type="text" class="s20 bc-transparent px-3" placeholder="Property Price (Per Month for Rent)" v-model="Info.General.Price" required >
                        <i class="fa fa-tag s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Gen4" class="dropdown rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen4" type="text" class="dropdown-toggle s20 bc-transparent px-3" placeholder="Property Category" 
                        :value="Info.General.Category ? Info.General.Category : null" readonly  data-bs-toggle="dropdown">
                        <ul class="dropdown-menu w-100">
                            <li class="dropdown-item" @click="Info.General.Category = 'Rent' " > Rent </li>
                            <li class="dropdown-item" @click="Info.General.Category = 'Sale' " > Sale </li>
                        </ul>
                        <i class="fa fa-building s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Gen5" class="dropdown rd-5 pointer bc-background flex-grow-1">
                        <input id="Gen4" type="text" class="dropdown-toggle s20 bc-transparent px-3" placeholder="Property Type" 
                        :value="Info.General.Type ? Info.General.Type : null" readonly  data-bs-toggle="dropdown">
                        <ul class="dropdown-menu w-100">
                            <li class="dropdown-item" @click="Info.General.Type = 'Apartment' " > Apartment </li>
                            <li class="dropdown-item" @click="Info.General.Type = 'Villa' " > Villa </li>
                            <li class="dropdown-item" @click="Info.General.Type = 'Home' " > Home </li>
                            <li class="dropdown-item" @click="Info.General.Type = 'Office' " > Office </li>
                            <li class="dropdown-item" @click="Info.General.Type = 'Garage' " > Garage </li>
                        </ul>
                        <i class="fa fa-layer-group s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>

                </div>
                <div class="Offers bc-light-accent3 p-4 rd-10 shadow">

                    <h2 class="fw-bold letter-n-05 c-text mb-3" >Property Offers</h2>
                    <label for="Off1" class="bc-background w-100 mb-2 d-flex align-items-center pointer rd-5">
                        <i class="fa fa-wind s25 px-3 bd-r-black trans3" :class="Info.Offers.AirConditioner ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2 pointer trans3" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.AirConditioner}" >AirConditioner</span>
                        <CheckBox Id="Off1" :Checked="Info.Offers.AirConditioner" @Emit="Info.Offers.AirConditioner = !Info.Offers.AirConditioner"/>
                    </label>
                    <label for="Off2" class="bc-background w-100 mb-2 d-flex align-items-center pointer rd-5">
                        <i class="fa fa-person-booth s25 px-3 bd-r-black trans3" :class="Info.Offers.Bathroom ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2 pointer trans3" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.Bathroom}" >Bathroom</span>
                        <CheckBox Id="Off2" :Checked="Info.Offers.Bathroom" @Emit="Info.Offers.Bathroom = !Info.Offers.Bathroom"/>
                    </label>
                    <label for="Off3" class="bc-background w-100 mb-2 d-flex align-items-center pointer rd-5">
                        <i class="fa fa-wifi s25 px-3 bd-r-black trans3" :class="Info.Offers.Wifi ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2 pointer trans3" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.Wifi}" >Wifi</span>
                        <CheckBox Id="Off3" :Checked="Info.Offers.Wifi" @Emit="Info.Offers.Wifi = !Info.Offers.Wifi"/>
                    </label>
                    <label for="Off4" class="bc-background w-100 mb-2 d-flex align-items-center pointer rd-5">
                        <i class="fa fa-user-tie s25 px-3 bd-r-black trans3" :class="Info.Offers.Waiter ? 'c-accent' : 'c-light-accent2'" ></i>
                        <span class="s20 px-3 py-2 pointer trans3" :class="{'text-decoration-line-through c-light-accent2' : !Info.Offers.Waiter}" >Waiter</span>
                        <CheckBox Id="Off4" :Checked="Info.Offers.Waiter" @Emit="Info.Offers.Waiter = !Info.Offers.Waiter"/>
                    </label>
                    
                </div>
                <div class="Discription bc-light-accent3 p-4 d-grid gap-2 rd-10 shadow">

                   <h2 class="fw-bold letter-n-05 c-text mb-2" >Discription</h2>
                    <label>
                        <textarea rows="7" class="s20 p-3 rd-5 pointer bc-background w-100" placeholder="Discription..." v-model="Info.Description.Description" required ></textarea>
                    </label>
                    <label for="Disc1" class="rd-5 pointer bc-background">
                        <input id="Disc1" type="number" class="s20 bc-transparent px-3" placeholder="Adults" v-model="Info.Description.Adults" required >
                        <i class="fa fa-user-group s18 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Disc2" class="rd-5 pointer bc-background">
                        <input id="Disc2" type="number" class="s20 bc-transparent px-3" placeholder="Size" v-model="Info.Description.Size" required >
                        <i class="fa fa-ruler-combined s18 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Disc3" class="rd-5 pointer bc-background">
                        <input id="Disc3" type="number" class="s20 bc-transparent px-3" placeholder="Bed" v-model="Info.Description.Bed" required >
                        <i class="fa fa-bed s18 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Disc4" class="rd-5 pointer bc-background">
                        <input id="Disc4" type="number" class="s20 bc-transparent px-3" placeholder="Rooms" v-model="Info.Description.Rooms" required >
                        <i class="fa fa-door-closed s18 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>

                </div>
                <div class="Contact p-4 bc-accent rd-10 shadow" >

                    <h2 class="fw-bold letter-n-05 c-white mb-3" >Contact Information</h2>
                    <label for="Gen1" class="rd-5 pointer bc-background" style="width: calc(50% - .25rem);" >
                        <input id="Gen1" type="text" class="s20 bc-transparent px-3" placeholder="Owner Name" v-model="Info.Contact.Name" required >
                        <i class="fa fa-user s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>
                    <label for="Gen2" class="rd-5 pointer bc-background ms-2" style="width: calc(50% - .25rem);" >
                        <input id="Gen2" type="number" class="s20 bc-transparent px-3" placeholder="Owner Phone Number" v-model="Info.Contact.Phone" required >
                        <i class="fa fa-phone s20 t-center bd-l-black c-light-accent2 trans3" ></i>
                    </label>

                </div>

            </form>


            <button class="ButtonSpinner-accent mt-5 bc-primary mx-auto rd-5" style="width: 300px; height: 53.5px;" v-if="Waiting">
                <span class="Spinner"></span>
            </button>
            <button class="py-2 mt-5 s25 fw-bold d-block mx-auto rd-5" :class="InfoValid && ImagesValid ? 'ActiveBttn' : 'InactiveBttn'" 
             style="width: 300px;" @click="addProperty" :disabled="!(InfoValid && ImagesValid)" v-else >
                Submit
            </button>

        </section>        
    </main>
    
</template>

<script>
    
    import CheckBox from '@/components/CustomerUI/Elements/CheckBox.vue'
    import { mapActions } from 'vuex'
    
    export default {
    
        components: {CheckBox,},
        data() { return {
            Info: {
                General: {
                    Name: null,
                    Type: null,
                    Category: null,
                    Location: null,
                    Address: null,
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
            GenInfoValid : false,
            DescInfoValid : false,
            CntcInfoValid : false,

            ScndImgsText: [
                "Browser Image","Browser Image","Browser Image","Browser Image",
            ],
            Files: [
                null,null,null,null,null,
            ],
            Imgs: {
                PrimImg: null,
                ScndImgs: [null,null,null,null]
            },
            ImgsLength: 0,
            ImagesValid: false,

            Waiting: false,
        }},
        methods: {
            ImgPrimary( Event ) {
                if (this.Files[0] == null) this.ImgsLength += 1
                this.Files[0] = Event.target.files[0]
                // let file = Event.target.files[0]
                // console.log( (file.size / 1048576 ).toFixed(2) + ' MB')
                const Reader = new FileReader()
                Reader.readAsDataURL(this.Files[0])
                Reader.onload = (event) => {
                    this.Imgs.PrimImg = event.target.result
                }
                this.$refs.DivPrim.classList.remove('bd-dashed-light-white')
            },
            ImgSecondary( i ) {
                if (this.Files[i + 1] == null) this.ImgsLength += 1
                this.Files[i + 1] = this.$refs.FileScnd[i].files[0]
                const Reader = new FileReader()
                Reader.readAsDataURL( this.Files[i + 1] )
                Reader.onload = (event) => {
                    this.Imgs.ScndImgs[i] = event.target.result
                }
                this.ScndImgsText[i] = "Change Image"
                this.$refs.DivScnd[i].classList.remove('bd-dashed-light-white')
            },

            addProperty() {
                this.Waiting = true
                const Offer = new FormData()

                this.AppendInfo( Offer, this.Info )
                this.Files.forEach( File => {
                    Offer.append('Images', File )
                })

                Offer.append( 'Added_At' , this.FormatDate(new Date()) )
                Offer.append( 'UserId' , this.$store.state.User.Id )
                Offer.append( 'UserName' , this.$store.state.User.Name )

                this.Vendor_AddProperty( Offer ).then( ()=> this.Waiting = false )
            },
            AppendInfo(formData, data, parentKey = '') {
                for (let key in data) {
                    if (data.hasOwnProperty(key)) {
                        const formKey = parentKey ? `${parentKey}[${key}]` : key;
                        if ( typeof data[key] === 'object' && !Array.isArray(data[key]) ) this.AppendInfo(formData, data[key], formKey)
                        else formData.append(formKey, data[key])
                    }
                }
            },
            FormatDate( Date ) {
                const formattedDate = Date.toLocaleDateString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric'
                })
                const formattedTime = Date.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                })
                return `${formattedDate} : ${formattedTime}`
            },
            ...mapActions(['Vendor_AddProperty']),
        },
        computed: {
            InfoValid() {
                return this.GenInfoValid && this.DescInfoValid & this.CntcInfoValid
            },
        },
        watch: {
            Files: {
                handler( Vals ) {
                    const Filled = Vals.every( File => File !== null )
                    if (Filled) this.ImagesValid = true
                },
                deep: true,
            },

            'Info.General': {
                handler( Vals ) {
                    for (const Val in Vals) {
                        if (!Vals[Val]) { return this.GenInfoValid = false }     
                    }
                    return this.GenInfoValid = true
                },deep: true,
            },
            'Info.Description': {
                handler( Vals ) {
                    for (const Val in Vals) {
                        if (!Vals[Val]) { return this.DescInfoValid = false }                        
                    }
                    return this.DescInfoValid = true
                },deep: true,
            },
            'Info.Contact': {
                handler( Vals ) {
                    for (const Val in Vals) {
                        if (!Vals[Val]) { return this.CntcInfoValid = false }                        
                    }
                    return this.CntcInfoValid = true
                },deep: true,
            },
        },
    }
    
</script>

<style scoped lang='scss'>
    
    main {
        background-color: var(--Background);
        .Check  {
            position: fixed;
            bottom: 40px;
            left: 40px;
            .Box  {
                i {
                    width: 80px;
                    height: 80px;
                    font-size: 40px;
                    border: 3px solid var(--Red);
                    border-radius: 50%;
                }
                i.Valid {
                    border: none;
                    color: #22f322;
                    font-size: 80px;
                }
                i::before {
                    position: absolute;
                    left: 50%;
                    top: 50%;
                    transform: translate(-50% , -50%);
                }
            }
        }
        .Images {
            .Img-Primary, .Imgs-Secondary div  {
                background-color: rgba(35, 99, 100, 0.2);
                background-repeat: no-repeat;
                background-size: cover;
                background-position: center;
                input {
                    visibility: hidden;
                    width: 5px;
                }
                label:hover span {
                    color: var(--Black);
                }
            }
            .Img-Primary {
                width: 45%;
                label {
                    img {
                        width: 400px;
                        transform: translate( -50% , -50% );
                        opacity: .5;
                    }
                }

            } 
            .Imgs-Secondary {
                grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
                div {
                    height: 300px;
                    label span {
                        top: 50%;
                        left: 50%;
                        transform: translate( -50% , -50% );
                    }
                }
            }
            .Imgs-Secondary div:hover {
                border-color: var(--Pirmary);
                span {
                    color: red;
                }
            }
            .Img-Primary:hover img {
                opacity: 1;
            }
        }
        .Form {
            grid-template-columns: repeat(2, 1fr);
            label {
                input {
                    height: 50px;
                    width: calc(100% - 50px);
                }
                input::placeholder, textarea::placeholder {
                    color: var(--Light-Grey2);
                    font-size: 20px;
                }
                input:focus + i, input:valid + i  {
                    color: var(--Accent)
                }
                i {
                    width: 50px;
                }
            }
            .General, .Contact {
                grid-column: span 2;
            }
            .Offers {
                label:hover {
                    :deep(.checkbox-wrapper .check ) {
                        stroke-dashoffset: 0;
                    }
                    i {
                        color: var(--Accent)
                    }
                }
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