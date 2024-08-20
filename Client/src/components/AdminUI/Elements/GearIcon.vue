<template>

    <section>
        <div class="ButtonSpinner2" v-if="Waiting">
            <div class="Spinner"></div>
        </div>
        <div class="Icon mx-auto dropstart w-fit" v-else>
            <label class="pointer dropdown-toggle" data-bs-toggle="dropdown">
                <i class="fa-solid fa-gear c-secondary fs-5 pointer trans3"></i>
            </label>
            <ul class="dropdown-menu">
                <li class="dropdown-item pointer trans3" v-for="Item in ItemSettings" @click="Setting(Item.Setting)">
                    <span class="fw-bold letter-p-05 s15 trans3" :class="Item.ColorRed ? 'c-light-red' : 'c-light-white'">
                        {{ Item.Setting }}
                    </span>
                </li>
            </ul>
        </div>
    </section>
    
</template>

<script>
    export default {
        props: ['ItemSettings','Waiting'],
        data() { return {

        }},
        methods: {
            Setting( Value ) {
                this.$emit( 'setting',Value )
            }
        },
        watch: {

        },
    }
</script>

<style scoped lang="scss">

label::before {
    display: none!important;
}
label:hover i  {
    color: var(--Primary);
}
.dropdown-menu {
    background-color: var(--Panel);
    border-bottom: 3px solid var(--Primary);
    border-top: 3px solid var(--Primary);
    border-radius: 5px;
    margin-top: -12px!important;
    margin-right: 3px!important;
    .dropdown-item:hover {
        background-color: var(--Primary);
        span {
            padding-left: 5px;
        }
        span.c-light-white {
            color: var(--Text)
        }
        span.c-light-red {
            color: red;
        }
    }
}

</style> 