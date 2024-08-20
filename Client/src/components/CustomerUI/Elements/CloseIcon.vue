<template>

    <div class="Close position-absolute flex-grow-1 zindex-p-1 pointer ">
        <i class="fa-solid fa-circle-xmark Close-Icon trans3" :class="IconColor ? 'c-light-black fs-4' : 'c-light-white s18'"></i>
    </div>
    
</template>

<script>

    export default {
        props:['IconColor'],
        data() { return {

        }},
        methods: {
        },
        watch: {
        },
    }

</script> 

<style scoped>

.Close {
  right: 15px;
  top: 15px;
}
.Close-Icon:hover {
    color: white
}

</style> 