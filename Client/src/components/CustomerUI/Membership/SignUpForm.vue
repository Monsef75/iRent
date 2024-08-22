<template>

    <div class="BounceLeft">
        <div class="Content">

            <h2 class="Title c-text letter-p-05" >Sign Up</h2>
            <SocialButtons Sign="Up" class="SocialButtons"/>
            <span class="s13 c-grey t-center mt-2">or use your Email</span>
            <form class="Form mg-t-10">

                <fieldset class="Fieldset mb-2 mx-auto">

                    <div class="Field position-relative" style="margin-bottom: 20px;">
                        <input type="text" placeholder="User Name" class="Field-Input c-text s16 letter-p-1 trans3" 
                         v-model="User.Name" @click="ShowNameErrors = true" required autocomplete/>
                        <ul v-show="ShowNameErrors" class="Errors position-absolute c-red s11" style="left: 10px;bottom: -20px;">
                            <li v-show="!Error.IsFixed" class="default" v-for="Error in NameErrors">
                                <i class="fa-solid fa-xmark me-1"></i>
                                <span>{{ Error.Title }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="Field position-relative" style="margin-bottom: 20px;">
                        <input type="email" placeholder="Email" class="Field-Input c-text s16 letter-p-1 trans3" 
                         v-model="User.Email" @click="ShowEmailErrors = true" required autocomplete/>
                        <ul v-show="ShowEmailErrors" class="Errors position-absolute c-red s11" style="left: 10px;bottom: -20px;">
                            <li v-show="!Error.IsFixed" class="default" v-for="Error in EmailErrors">
                                <i class="fa-solid fa-xmark me-1"></i>
                                <span>{{ Error.Title }}</span>
                            </li>
                        </ul>
                        <ul v-show="ShowEmailErrors" class="Errors position-absolute c-red s11" style="left: 10px;bottom: -20px;">
                            <li v-show="!Error.IsFixed" class="default" v-for="Error in EmailErrors">
                                <i class="fa-solid fa-xmark me-1"></i>
                                <span>{{ Error.Title }}</span>
                            </li>
                        </ul>
                    </div>
                    <div class="Field position-relative" style="margin-bottom: 20px;">
                        <input placeholder="Password" class="Field-Input c-text s16 letter-p-1 trans3" style="padding-right: 30px;" 
                         :type="ShowPassword ? 'text' : 'password'" v-model="User.Password" @click="ShowPasswordErrors = true" required autocomplete/>
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

                <button class="ButtonSpinner-accent mx-auto bc-primary rd-5" style="width: 154px;height: 37px;" v-if="Waiting">
                    <span class="Spinner"></span>
                </button>
                <button type="submit" class="py-2 px-5 mb-1 rd-5 letter-p-05 w-600 s14 trans3 d-block mx-auto" v-else
                    :class="FormValidation ? 'ActiveBttn' : 'InactiveBttn'" @click.prevent="SignUpAuth" :disabled="!FormValidation">
                    SIGN UP
                </button>

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
                Name: null,
                Email: null,
                Password: null,
            },

            ShowNameErrors: false,
            NameErrors: [
                {Title: 'This field is empty',                     IsFixed: false,},
                {Title: "must contains at least 5 characters",     IsFixed: true,},
                {Title: "must contains ONLY letters with numbers", IsFixed: true,},
                {Title: "Name is Allready Used",                   IsFixed: true,},
            ],
            
            ShowEmailErrors: false,
            EmailErrors: [
                {Title: 'This field is empty',       IsFixed: false,},
                {Title: "Email is invalid",          IsFixed: true,},
                {Title: "Email is Allready Used",    IsFixed: true,},
            ],
            
            ShowPassword: false,
            ShowPasswordErrors: false,
            PasswordErrors: [
                {Title: 'This field is empty',                          IsFixed: false,},
                {Title: "Password must contains at least 6 Characters", IsFixed: true,},
            ],
            
            ServerHasErrors: false,
            Values: null,
            Waiting: false,
        }},
        methods: {
            SignUpAuth() {
                this.Waiting = true
                this.SignUpAuthentification({Name: this.User.Name,Email: this.User.Email}).then( ()=> {
                    this.User.Joined_In = this.FormatDate(new Date())
                    this.SignUp( this.User ).then( this.Waiting = false )
                })
                .catch( err => {
                    this.Waiting = false
                    console.log(err)
                    this.ServerHasErrors = true
                    this.Values = err
                    if (err.Type == 'Email') this.EmailErrors[2].IsFixed = false
                    else if (err.Type == 'Name') this.NameErrors[3].IsFixed = false
                    else {
                        this.EmailErrors[2].IsFixed = false
                        this.NameErrors[3].IsFixed = false
                    }
                })
                
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
            ...mapActions(['SignUpAuthentification','SignUp']),
        },
        computed: {
            FormValidation() {
                let NameValidation = this.NameErrors.every( Error => Error.IsFixed )
                let EmailValidation = this.EmailErrors.every( Error => Error.IsFixed )
                let PasswordValidation = this.PasswordErrors.every( Error => Error.IsFixed )

                if ( NameValidation && EmailValidation && PasswordValidation ) {
                    return true
                }
                else {
                    return false
                }
            },
        },
        watch: {
            'User.Name'(Value) {
                if ( Value ) {
                    this.NameErrors[0].IsFixed = true
                    if ( Value.length < 5 ) {
                        this.NameErrors[1].IsFixed = false
                        this.NameErrors[2].IsFixed = true
                    }
                    else {
                        this.NameErrors[1].IsFixed = true
                        if ( /^[a-zA-Z]+(?:[0-9]*)$/.test(Value) ) {
                            this.NameErrors[2].IsFixed = true
                            if (this.ServerHasErrors && (this.Values.Type == 'Name' || this.Values.Type == 'Both')) {
                                Value != this.Values.UsedName ? this.NameErrors[3].IsFixed = true : this.NameErrors[3].IsFixed = false
                            }
                        }
                        else {
                            this.NameErrors[2].IsFixed = false
                            this.NameErrors[3].IsFixed = true
                        }
                    }
                }
                else {
                    this.NameErrors[0].IsFixed = false
                    this.NameErrors[1].IsFixed = true
                    this.NameErrors[2].IsFixed = true
                }
            },
            'User.Email'(Value) {
                if ( Value ) {
                    this.EmailErrors[0].IsFixed = true
                    if ( /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(Value) ) {
                        this.EmailErrors[1].IsFixed = true
                        if (this.ServerHasErrors && (this.Values.Type == 'Email' || this.Values.Type == 'Both')) {
                            Value != this.Values.UsedEmail ? this.EmailErrors[2].IsFixed = true : this.EmailErrors[2].IsFixed = false
                        }
                    }
                    else {
                        this.EmailErrors[1].IsFixed = false
                        this.EmailErrors[2].IsFixed = true
                    }

                }
                else {
                    this.EmailErrors[0].IsFixed = false
                    this.EmailErrors[1].IsFixed = true
                }
            },
            'User.Password'( Value ) {
                if ( Value ) {
                    this.PasswordErrors[0].IsFixed = true
                    if ( Value.length < 6 ) {
                        this.PasswordErrors[1].IsFixed = false
                    }
                    else {
                        this.PasswordErrors[1].IsFixed = true
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

.BounceLeft {
    position: absolute;
    top: 50%;
    left: 30px;
    width: calc(45% - 30px);
    min-height: 450px;
    background-color: #fff;
    box-shadow: 2px 0 15px rgba(0, 0, 0, 0.25);
    overflow: hidden;
    transform: translate3d(0, -50%, 0);
    transition: transform 0.4s ease-in-out;
    .Content {
        position: absolute;
        top: 40px;
        left: 40px;
        width: calc(100% - 80px);
        opacity: 1;
        visibility: visible;
        transform: translate3d(0, 0, 0);
        transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out, transform 0.5s ease-in-out;
        .Title {
            font-size: 1.5rem;
            font-weight: 500;
            line-height: 1em;
            text-transform: uppercase;
        }
        .Form {
            .Field {
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
                    color: var(--Grey-Text);
                }
                i:hover {
                    color: var(--Scnd-Blue);
                }
            }
        }
    }
}

@media screen and (min-width: 768px) and (max-width: 992px) {
    .BounceLeft {
        width: 47%!important;
    }
}
@media screen and (max-width: 768px) {
    .BounceLeft {
        width: 50%!important;
        .Content {
            left: 20px;
            width: calc(100% - 40px);
            .SocialButtons {
                margin: 1rem!important;
            }
            .Form {
                margin: 0 1rem;
                .Buttons input {
                        width: 100%;
                }
            }
        }
    }
}
@media screen and (max-width: 576px) {
    .BounceLeft {
        left: auto;
    }
}

</style> 