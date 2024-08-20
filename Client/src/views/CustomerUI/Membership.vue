<template>

    <main class="Container ImgBackGround position-relative d-flex flex-column justify-content-between">

        <article class="Content position-relative" style="width: 900px;margin: 150px auto 0;">
            <div class="Options position-relative d-flex justify-content-between w-100 bc-accent shadow-lg rd-10">
                <span class="Blue-Shape bc-primary position-absolute"></span>
                <div class="Option-Sign-In w-50" style="padding: 75px 45px;">
                    <h1 class="c-white lh-sm s30 w-800 mb-1">Welcome Back to <span class="c-primary s30 w-800">Rent!</span></h1>
                    <p class="lh-base s17 mb-4 c-light-white">Don't have an Account ?</p>
                    <router-link class="ActiveBttn py-2 px-4 letter-p-1 rd-5"
                    :to="{ name:'Membership' , params: { Page: 'Sign-Up' }}">
                        JOIN NOW
                    </router-link>
                </div>
                <div class="Option-Sign-Up w-50" style="padding: 75px 45px;">
                    <h1 class="c-white lh-sm s30 w-800 mb-1">Welcome to <span class="c-primary s30 w-800">Rent!</span></h1>
                    <p class="lh-base s17 mb-4 c-light-white">You Have an Account ?</p>
                    <router-link class="ActiveBttn py-2 px-4 letter-p-1 rd-5"
                    :to="{ name:'Membership' , params: { Page: 'Sign-In' }}">
                        SIGN IN
                    </router-link>
                </div>
            </div>
            <component :is="ActiveComp" class="Form"/>
        </article>
        
        <!-- <Footer class="mt-auto"/> -->
    </main>

</template>

<script>

    // import Footer from '/src/components/CustomerUI/Static/Footer/FooterTransp.vue'
    import SignUpForm  from '@/components/CustomerUI/Membership/SignUpForm.vue'
    import SignInForm  from '@/components/CustomerUI/Membership/SignInForm.vue'

    export default {
        components: {SignUpForm,SignInForm},
        // Footer
        data() { return {
            Page: null,
        }},
        computed: {
            ActiveComp() {
                if (this.Page == 'Sign-In') { return 'SignInForm' }
                else { return 'SignUpForm' }
            }
        },
        watch: {
            $route(Val) {
                this.Page = Val.params.Page;
            },
        },
        mounted() {
            this.Page = this.$route.params.Page
        },
    }
</script> 

<style scoped lang="scss">

.Container {
    min-height: calc(100vh - 55px);

    .Content {
        .Options {
            .Blue-Shape {
                content: "";
                left: 0;
                top: 20%;
                height: 30px;
                width: 6px;
            }
        }
    }
    .UserTypeBox {
        .Boxes {
            .Box {
                border: 1px solid white;
                img {
                    width: 200px;
                }
                i {
                    right: 15px;
                    top: 15px;
                    opacity: 0;
                }
            }
            .Box::before {      
                position: absolute;
                content: "";
                width: 18px;
                height: 18px;
                right: 15px;
                top: 15px;
                border-radius: 50%;
                border: 1px solid #75bffc;
            }
            .Box.Active {
                border-color: #1494ff;
                i {
                    opacity: 1;
                }
            }
        }
        .ButtonSpinner {
            height: 40px;
            width: 164px;
        }
    }
}

@media screen and (max-width: 992px) {
    .Content {
        width: 90%!important;
        .Form {
            max-width: 370px!important;
        }
    }
}
@media screen and (max-width: 768px) {
    .Content .Options {
        .Option-Sign-Up {
            padding: 75px 30px 75px 60px!important;
        }
    }
}
@media screen and (max-width: 576px) {
    .Content {
        margin: 3rem auto!important;
        width: fit-content!important;
        .Options {
            display: none!important;
        }
        .Form {
            position: relative!important;
            width: 270px!important;
            animation: none;
            top: 0;
            transform: translate3d(0, 0, 0);

        }
    }
}

</style> 