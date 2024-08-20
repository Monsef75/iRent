<template>
    
    <article class="UserInfo d-flex align-items-center gap-4 w-fit mx-auto p-4 mb-4 bd-b-light-grey">
        <label class="Img position-relative pointer d-block" for="InpImg">
            <img :src="NewPhoto ? NewPhoto : GetImage()" alt="">
            <!-- User.Photo -->
            <i class="fa-solid fa-camera-rotate s30 c-bold-grey position-absolute center opacity-0 trans3"></i>
            <input type="file" class="position-absolute" id="InpImg" @change="EditPhoto( $event )"/>
        </label>
        <div class="Text">
            <span class="s25 fw-bolder letter-n-1 c-text d-block"> Name </span>
            <!--  User.Name  -->
            <span class="s18 fw-bold fst-italic c-grey letter-p-05"> Email@gmail.com </span>
            <!-- User.Email -->
        </div>
        <div class="w-100 mb-3" :class="NewPhoto ? 'd-block' : 'd-none'">
            <button class="ActiveBttn w-fit ms-4 px-3 py-1 rd-5 s15" @click="UpdatePhoto">Save</button>
            <button class="CancelBttn w-fit ms-2 px-3 py-1 rd-5 s15" @click="NewPhoto = null">Cancel</button>
        </div>
    </article>
    
    <Properties class="container-xxl mb-5" :Delete="true" />

</template>

<script>
    
    import Properties from '@/components/CustomerUI/Properties/Properties.vue'
    
    export default {
    
        components: {Properties,},
        data() { return {
            NewPhoto: null,
            PhotoFile: null,

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
                else return '/src/assets/Imgs/Common/Avatar.png'
            },
            EditPhoto( Event ) {
                this.PhotoFile = Event.target.files[0]
                const Reader = new FileReader()
                Reader.readAsDataURL(this.PhotoFile)
                Reader.onload = (event) => {
                    this.NewPhoto = event.target.result
                }
            },
        },
        computed: {
            
        },
        watch: {
            
        },
    }
    
</script>

<style scoped lang='scss'>
    
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

</style>