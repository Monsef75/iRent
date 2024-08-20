<template>
    
    <div class="checkbox-wrapper ms-auto me-3">
        <input :id="Id" type="checkbox" class="pointer" :checked="Checked" @click="$emit('Emit')" >
        <svg viewBox="0 0 35.6 35.6">
            <circle class="background" cx="17.8" cy="17.8" r="17.8"></circle>
            <circle class="stroke" cx="17.8" cy="17.8" r="14.37"></circle>
            <polyline class="check" points="11.78 18.12 15.55 22.23 25.17 12.87"></polyline>
        </svg>
    </div>
    
</template>

<script>
    
    
    
    export default {
    
        props: ['Id','Checked'],
        data() { return {
            
        }},
        methods: {
            
        },
        computed: {
            
        },
        watch: {
            
        },
    }
    
</script>

<style scoped lang='scss'>
    
    .checkbox-wrapper {
        position: relative;
        display: inline-block;
        width: 35px;
        height: 35px;
        .background {
            fill: var(--Light-Accent2);
            transition: ease all 0.6s;
            -webkit-transition: ease all 0.6s;
        }
        .stroke {
            fill: none;
            stroke: #fff;
            stroke-miterlimit: 10;
            stroke-width: 2px;
            stroke-dashoffset: 100;
            stroke-dasharray: 100;
            transition: ease all 0.6s;
            -webkit-transition: ease all 0.6s;
        }
        .check {
            fill: none;
            stroke: #fff;
            stroke-linecap: round;
            stroke-linejoin: round;
            stroke-width: 2px;
            stroke-dashoffset: 22;
            stroke-dasharray: 22;
            transition: ease all 0.6s;
            -webkit-transition: ease all 0.6s;
        }
        input[type=checkbox] {
            position: absolute;
            width: 100%;
            height: 100%;
            left: 0;
            top: 0;
            margin: 0;
            opacity: 0;
            appearance: none;
            -webkit-appearance: none;
        }
        input[type=checkbox]:checked + svg {
            .background {
                fill: var(--Accent)
            }
            .stroke {
                stroke-dashoffset: 0;
            }
            .check {
                stroke-dashoffset: 0;
            }
        }
    }
    // Remove comment for Hover Style
    // .checkbox-wrapper:hover .check {
    //     stroke-dashoffset: 0;
    // }

</style>