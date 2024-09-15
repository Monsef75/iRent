<template>

    <div class="BounceRight bc-background">
        <div class="Content">

            <h2 class="Title c-text letter-p-05">Sign In</h2>
            <SocialButtons Sign="In" class="SocialButtons"/>
            <span class="s13 c-grey">or use your Email</span>
            <form class="Form mt-2">

                <fieldset class="Fieldset mx-auto">

                    <div class="Field position-relative" style="margin-bottom: 25px;">
                        <input type="email" placeholder="Email" class="Field-Input c-text s16 letter-p-1 trans3" 
                         v-model="User.Email" @click="ShowEmailErrors = true" required autofocus autocomplete/>
                         <ul v-show="ShowEmailErrors" class="Errors position-absolute c-red s11" style="left: 10px;bottom: -20px;">
                            <li v-show="!Error.IsFixed" class="default" v-for="Error in EmailErrors">
                                <i class="fa-solid fa-xmark me-1"></i>
                                <span>{{ Error.Title }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="Field position-relative" style="margin-bottom: 25px;">
                        <input class="Field-Input c-text s16 letter-p-1 trans3" placeholder="Password" style="padding-right: 30px;" 
                         :type="ShowPassword ? 'text' : 'password'" v-model="User.Password" @click="ShowPasswordErrors = true"  required  autocomplete/>
                        <i class="fa-solid c-grey position-absolute pointer trans2" style="top: 10px;right: 7px;"
                         :class="ShowPassword ? 'fa-eye' : 'fa-eye-slash'" @click="ShowPassword = !ShowPassword"></i>
                         <ul v-show="ShowPasswordErrors" class="Errors position-absolute c-red s11" style="left: 10px;bottom: -20px;">
                            <li v-show="!Error.IsFixed" class="default" v-for="Error in PasswordErrors">
                                <i class="fa-solid fa-xmark me-1"></i>
                                <span>{{ Error.Title }}</span>
                            </li>
                        </ul>
                    </div>

                </fieldset>
                <div class="Buttons d-flex align-items-center justify-content-between mt-3">

                    <button class="ButtonSpinner-accent bc-primary rd-5" style="width: 157.6px;height: 40px;" v-show="Waiting">
                        <span class="Spinner"></span>
                    </button>
                    <button type="submit" class="py-2 px-5 rd-5 letter-p-05 w-400 s17 trans3 w-600" :class="FormValidation ? 'ActiveBttn' : 'InactiveBttn'"
                      @click.prevent="signIn" :disabled="!FormValidation" v-show="!Waiting" >
                        SING IN
                    </button>
                    <input type="button" value="Forgot password?" class="s14 c-light-grey bc-transparent letter-p-05 text-decoration-underline trans2" />

                </div>
                <div class="default d-block mx-auto c-red s13 w-fit mt-1" v-if="ServerError">
                    <i class="fa-solid fa-xmark me-1"></i>
                    <span>{{ ServerError }}</span>
                </div>

            </form>

        </div>
    </div>

</template>

<script>

    import SocialButtons from './CommonElements/SocialButtons.vue'
    import { mapActions } from 'vuex'
    
    export default {
        components: {SocialButtons},
        data() { return {
            User: {
                Email: 'momo8ghannam@gmail.com3',
                Password: 'momo8ghannam3',
            },
            
            EmailErrors: [
                {Title: 'This field is empty', IsFixed: false,},
                {Title: "Email is invalid",    IsFixed: true,},
            ],
            ShowEmailErrors: false,
            
            ShowPassword: false,
            PasswordErrors: [
                {Title: 'This field is empty',                          IsFixed: false,},
                {Title: "Password must contains at least 6 Characters", IsFixed: true,},
            ],
            ShowPasswordErrors: false,

            ServerError: '',
            Waiting: false,
        }},
        methods: {
            signIn() {
                this.Waiting = true
                this.SignIn( this.User ).then( ()=> this.Waiting = false )
                .catch( err => this.ServerError = err)
            },
            ...mapActions(['SignIn',]),
        },
        computed: {
            FormValidation() {
                let EmailValidation = this.EmailErrors.every( Error => Error.IsFixed )
                let PasswordValidation = this.PasswordErrors.every( Error => Error.IsFixed )

                if ( EmailValidation && PasswordValidation ) {
                    return true
                }
                else {
                    return false
                }
            },
        },
        watch: {
            'User.Email'(Value) {
                if ( Value ) {
                    this.EmailErrors[0].IsFixed = true
                    if ( /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(Value) ) {
                        this.EmailErrors[1].IsFixed = true
                        if (this.ServerError) this.ServerError = null
                    }
                    else {
                        this.EmailErrors[1].IsFixed = false
                    }

                }
                else {
                    this.EmailErrors[0].IsFixed = false
                    this.EmailErrors[1].IsFixed = true
                }
            },
            'User.Password'(Value) {
                if ( Value ) {
                    this.PasswordErrors[0].IsFixed = true
                    if ( Value.length < 6 ) {
                        this.PasswordErrors[1].IsFixed = false
                    }
                    else {
                        this.PasswordErrors[1].IsFixed = true
                        if (this.ServerError) this.ServerError = null
                    }
                }
                else {
                    this.PasswordErrors[0].IsFixed = false
                    this.PasswordErrors[1].IsFixed = true
                    
                }
            },
        },
    }
    
</script> 

<style scoped lang="scss">

.BounceRight {
    position: absolute;
    top: 50%;
    right: 30px;
    width: calc(45% - 30px);
    min-height: 450px;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transform: translate3d(0, -50%, 0);
    transition: transform 0.4s ease-in-out;
    .Content{
        position: absolute;
        top: 40px;
        left: 40px;
        width: calc(100% - 80px);
        opacity: 1;
        visibility: visible;
        transform: translate3d(0, 0, 0);
        transition: opacity 0.4s linear, visibility 0.1s ease-in-out;
        .Title {
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1em;
            text-transform: uppercase;
        }
        .Form {
            .Fieldset .Field{
                .Field-Input {
                    width: 100%;
                    border-bottom: 1px solid #ccc;
                    padding: 6px 20px 6px 6px;
                }
                .Field-Input:focus {
                    border-color: var(--Light-Grey);
                }
                input::-moz-placeholder {
                    font-size: 0.85rem;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                    color: #ccc;
                }
                input:-ms-input-placeholder {
                    font-size: 0.85rem;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                    color: #ccc;
                }
                input::placeholder {
                    font-size: 0.85rem;
                    font-weight: 300;
                    letter-spacing: 0.1rem;
                    color: var(--Grey);
                }
                i:hover {
                    color: var(--Scnd-Blue);
                }
            }
            .Buttons {
                .ButtonSpinner {
                    height: 40px;
                    width: 155px;
                }
                input:hover {
                    color: var(--Grey-Text);
                }
            }
        }
    }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
    .BounceRight {
        width: 47%!important;
    }
}
@media screen and (max-width: 768px) {
    .BounceRight {
        width: 50%;
        .Content {
            left: 20px;
            width: calc(100% - 40px);
            .SocialButtons {
                margin: 1rem!important;
            }
            .Form {
                margin: 0 1rem;
                .Buttons {
                    flex-direction: column;
                    justify-content: center!important;
                    gap: 10px;
                    input {
                        width: 100%;
                    }
                }
            }
        }
    }
}
@media screen and (max-width: 576px) {
    .BounceRight {
        right: auto;
    }
}

</style> 