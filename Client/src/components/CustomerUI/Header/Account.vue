<template>

    <div class="Account position-relative">

        <a class="Account-Icon c-white position-relative pointer trans2">

            <img :src="GetImage( User.Photo )" class="rounded-circle" alt="" @click="HideBoxes" v-if="IsLoggedIn">
            <i class="fa-solid fa-user s20 pointer trans3" :class="{'c-prim-blue' : !HideBox}"  @click="HideBoxes" v-else ></i>

            <i class="fa-solid fa-chevron-down position-absolute s10 c-white trans3" :class="HideBox ? 'Arrow-Up' : 'Arrow-Down c-prim-blue'"></i>

        </a>

        <div class="Account-Box bc-accent position-relative position-absolute bd-b-prim-5 p-3 rd-10 shadow-lg zindex-p-1 trans3"
        :class="{'opacity-0 invisible' : HideBox}">
            <CloseIcon @click="HideBox = !HideBox" />

            <article v-if="IsLoggedIn" >

                <h5 class="c-white letter-p-05 t-center fw-bold mb-3"> Hello ! </h5>
                <routerLink class="Profile d-flex align-items-center justify-content-between p-2 pointer trans3"
                 to="/Profile">
                    <div class="Info d-flex align-items-center gap-2 c-white">
                        <div class="Img me-2">
                            <img :src="GetImage( User.Photo )" class="rounded-circle" alt="">
                        </div>
                        <span class="s14 fw-bold">{{ User.Name }}</span>
                    </div>
                    <i class="fa-solid fa-circle-chevron-right s20 c-light-white trans3"></i>
                </routerLink>
                <section class="py-2 my-3 bd-t-white bd-b-white" >
                    <routerLink to="/AdminPanel" class="mb-1 bc-panel c-primary t-center w-100 s16 fw-bold py-1 d-block trans3" >Admin Panel</routerLink>
                </section>
                <button class="ActiveBttn w-100 s16 fw-bold py-1" @click="SignOut()">Log Out</button>

            </article>

            <article v-else>
                <h4 class="c-white letter-n-05 t-center fw-bold mb-3">Welcome !</h4>
                <div class="LogIn mb-3">
                    <router-link :to="{ name:'Membership' , params: { Page: 'Sign-In' }}">
                        <button class="Bttn w-100 ActiveBttn mb-2 s16">Sign In</button>
                    </router-link>
                    <p class="s13 c-white mb-1">New Customer ?</p>
                    <router-link :to="{ name:'Membership' , params: { Page: 'Sign-Up' }}">
                        <button class="Bttn w-100 bc-white c-text s16">Join Us</button>
                    </router-link>
                </div>
            </article>

        </div>

    </div>

</template>

<script>

    import CloseIcon from '/src/components/CustomerUI/Elements/CloseIcon.vue'
    import { mapState  } from 'vuex'

    export default {
        props:['BoxStatus'],
        components: { CloseIcon },
        data() { return {
            HideBox: true,
        }},
        methods: {
            GetImage( Photo ) {
                if (Photo) return `data:${Photo.fileType};base64,${Photo.data}`
                else return '/src/assets/Imgs/Common/Avatar.png'
            },
            HideBoxes() {
                if (this.HideBox) {
                    this.HideBox = false
                }
                else {
                    this.HideBox = true
                }
                this.$emit( 'CloseOpnedBoxes' )
            },
            SignOut() {
                this.emitter.emit('ClearCart')
                this.emitter.emit('ClearFavorites')
                this.$store.commit('SignOut')
            }
        },
        computed: {
            ...mapState(['User','IsLoggedIn',])
        },
        watch: {
            BoxStatus(Val) {
                this.HideBox = Val
            },
        },
    }
    
</script> 

<style scoped lang="scss">


.Account {
    .Account-Icon {
        img {
            width: 30px
        }
    }
    .Account-Icon:hover i {
        color: var(--Primary);
    }
    .Account-Box {
        width: 230px;
        top: 50px;
        right: -27px;
        .Profile {
            background-color: rgba(255, 255, 255, 0.25);
            .Img {
                width: 60px;
                height: 60px;
                img {
                    width: 100%,
                }
            }
            span {
                text-wrap: nowrap;
            }
        }
        .Profile:hover {
            background-color: rgba(255, 255, 255, 0.25);
            i {
                color: white;
            }
        }
        a:not(.Profile):hover {
            color: white;
        }
        .Line {
            span {
                content: "";
                left: 0;
                height: 0.7px;
            }
        }
    }
    .Account-Box::before {
        position: absolute;
        content: "";
        width: 10px;
        height: 10px;
        background-color: var(--Accent);
        transform: rotate(45deg);
        top: -3px;
        right: 15px;
    }
}

@media screen and (max-width:576px) {
    .Account {
        position: static!important;
        .Account-Box{
            right: 20px;
            top: 65px;
            border-radius: 5px;
        }
        .Account-Box::before {
            right: 15px;
        }
    }
}

</style> 