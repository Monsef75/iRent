<template>
    
    <main class="p-4" >

    
        <article class="UserInfo d-flex align-items-center gap-4 w-fit mx-auto px-4 pb-4 mb-4 bd-b-light-grey">
            <label class="Img position-relative pointer d-block overflow-hidden" for="InpImg">
                <img :src="NewPhoto ? NewPhoto : GetImage($store.state.User.Photo)" alt="">
                <!-- User.Photo -->
                <i class="fa-solid fa-camera-rotate s30 c-bold-grey position-absolute center opacity-0 trans3"></i>
                <input type="file" class="position-absolute" id="InpImg" @change="EditPhoto( $event )"/>
            </label>
            <div class="Text">
                <span class="s25 fw-bolder letter-n-1 c-text d-block"> {{ User.Name }} </span>
                <!--  User.Name  -->
                <span class="s18 fw-bold fst-italic c-grey letter-p-05"> {{ User.Email }} </span>
                <!-- User.Email -->
            </div>
            <div :class="NewPhoto ? 'd-block' : 'd-none'">
                <button class="ActiveBttn w-fit ms-4 px-3 py-1 rd-5 s15" @click="UpdatePhoto">Save</button>
                <button class="CancelBttn w-fit ms-2 px-3 py-1 rd-5 s15" @click="NewPhoto = null">Cancel</button>
            </div>
        </article>

        <div class="EmptyPage t-center" v-if="NoProperties">
            <img src="/src/assets/Imgs/AdminUI/Common/Docs.png" alt="">
            <p class="c-light-grey2 fw-bold letter-p-1 t-center pb-4" style="font-size: 40px;">No Properties Yet</p>
            <router-link to="/List" class="ActiveBttn py-2 px-4 s20 fw-bold" > Have a Property to List ?  </router-link>
        </div>
        <Properties :Properties="Properties" :Delete="true" @DeleteProperty="DeleteProperty" class="container-xxl mb-5" v-else />


    </main>
</template>

<script>
    
    import Properties from '@/components/CustomerUI/Properties/Properties.vue'
    import Avatar from '@/assets/Imgs/Common/Avatar.png'
    import { mapActions,mapGetters } from 'vuex'

    export default {
    
        components: {Properties,},
        data() { return {
            NewPhoto: null,
            PhotoFile: null,
            Properties: [],
            NoProperties: false,
        }},
        methods: {
            UpdatePhoto() {
                const Form = new FormData()
                Form.append( 'Photo',this.PhotoFile )
                Form.append( 'Id',this.$store.state.User.Id )
                this.UpdateUser( Form ).then( ()=> {
                    this.NewPhoto = null
                })
            },
            GetImage( Photo ) {
                if (Photo) return `data:${Photo.fileType};base64,${Photo.data}`
                else return Avatar
            },
            EditPhoto( Event ) {
                this.PhotoFile = Event.target.files[0]
                const Reader = new FileReader()
                Reader.readAsDataURL(this.PhotoFile)
                Reader.onload = (event) => {
                    this.NewPhoto = event.target.result
                }
            },

            DeleteProperty( PropertyId, Index ) {
                this.Properties[Index].Waiting = true
                this.RemoveProperty({ PropertyId: PropertyId, UserId: this.User.Id }).then( ()=> {
                    this.Properties.splice( Index,1 )
                    if (this.Properties.length == 0) this.NoProperties = true
                })
            },
            ...mapActions(['UpdateUser', 'Vendor_SetProperties',  'RemoveProperty']),

        },
        computed: {
            ...mapGetters(['User',]),
        },
        created() {
            const SetUp = () => {
                this.Vendor_SetProperties({ UserId: this.User.Id}).then( res =>{
                    if (res.length != 0) {
                        res.forEach( Property => Property.Waiting = false )
                        this.Properties = res 
                    } 
                    else this.NoProperties = true
                })
            }
            if ( this.User.Id ) SetUp()
            else this.$store.subscribe( SetUp )
        },
    }
    
</script>

<style scoped lang='scss'>
    
main {
    background-color: var(--Background);
    .UserInfo {
        .Img {
            width: 100px;
            height: 100px;
            img {
                border-radius: 50%;
                width: 100%;
            }
        }
        .Img::after {
            position: absolute;
            content: '';
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
            border-radius: 50%;
            opacity: 0;
            background-color: rgba(19, 46, 53, 0.2);
            transition: 0.3s linear;
        }
        .Img:hover::after , .Img:hover i {
            opacity: 1 !important;
        }
        input {
            visibility: hidden;
            width: 5px;
        }
    }
}

</style>