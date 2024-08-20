<template>
    
    <div class="Shadow" v-if="ViewWarningBox">
        <article class="Box position-fixed center pb-3 rd-5" :class="WarningBox.IsDashboardBox ? 'bc-dark-Blue2' : 'bc-white'" >
            
            <div class="Head mb-4 rd-t-5" :class="WarningBox.IsDashboardBox ? 'bc-dark-Blue3' : 'bc-dark-Blue'" >
                <p class="letter-p-05 ps-3 s15" :class="WarningBox.IsDashboardBox ? 'c-white' : 'c-gray'" >
                    {{ WarningBox.Confirmation }} 
                </p>
                <CloseIcon  @click="ViewWarningBox = false" class="CloseIcon"/>
            </div>
            <div class="Body d-flex align-items-center gap-4 mb-4 px-4">
                <i class="fa-solid fa-circle-exclamation" :class="WarningBox.IsDashboardBox ? 'c-dark-blue3' : 'c-dark-blue'" ></i>
                <span class="s18">
                    <p class="" :class="WarningBox.IsDashboardBox ? 'c-white' : 'c-light-text'" >
                        {{ WarningBox.Text }} 
                    </p>
                </span>
            </div>
            <div class="Buttons d-flex justify-content-end gap-3 me-3">
                <button class="Bttn c-white" :class="WarningBox.ButtonColor" @click="AcceptWarning" >
                    {{ WarningBox.ButtonText }} 
                </button>
                <button class="Bttn c-white bc-scnd-blue" @click="ViewWarningBox = false"> Go back </button>
            </div>

        </article>
    </div>
    
</template>

<script>
    
    import CloseIcon from '@/components/Dashboard/Elements/CloseIcon.vue'

    export default {
        components: {CloseIcon,},
        data() { return {
            ViewWarningBox: null,
            WarningBox: {
                Name: null,
                IsDashboardBox: null,
                Confirmation: null,
                Text: null,
                ButtonText: null,
                ButtonColor: null,
            }
        }},
        methods: {
            AcceptWarning() {
                this.emitter.emit( this.WarningBox.Name )
                this.ViewWarningBox = false
            },
        },
        mounted() {
            this.emitter.on( 'ShowWarningBox',(WarningBox) => {
                this.ViewWarningBox = true
                this.WarningBox = WarningBox
            })
        },
    }
    
</script>

<style scoped lang='scss'>
    
    .Box {
        z-index: 3;
        max-width: 700px;
        min-width: 550px;
        .Head {
            padding: .6rem 0;
            .CloseIcon {
                top: 10px;
            }
        }
        i {
            font-size: 80px;
        }
        button:first-of-type {
            opacity: 0.85;
        }
        button:first-of-type:hover {
            opacity: 1;
        }
        button:last-of-type:hover {
            background-color: var(--Prim-Blue) !important;
        }
    }

</style>