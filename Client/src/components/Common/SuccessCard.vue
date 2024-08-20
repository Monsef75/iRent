<template>
    
    <div class="SuccessCard position-fixed" Id="SuccessCard">
        <div class="Container position-relative shadow-sm">
            <span class="c-white ps-3 pe-2 s17 fw-bold t-nowrap">{{ SuccessCard.Text }}</span>
            <div class="Circle position-absolute f-center">
                <i class="fa-solid fa-check"></i>
            </div>
        </div>
    </div>
    
</template>

<script>
    
    import { mapState  } from 'vuex'
    
    export default {
        components: {},
        data() { return {
            
        }},
        methods: {
        },
        computed: {
            ...mapState(['SuccessCard',]), 
        },
        watch: {
            SuccessCard: {
                handler( Info ) {
                    if (Info) {
                        const Card = document.getElementById('SuccessCard')
                        Card.classList.remove('RemoveAnim')
                        Card.classList.add('ParentAnim')
                        setTimeout( () => {
                            Card.firstElementChild.classList.add('ChildAnim')
                        } , 1000 )
                        setTimeout( () => {
                            Card.classList.add('RemoveAnim')
                            Card.classList.remove('ParentAnim')
                            Card.firstElementChild.classList.remove('ChildAnim')
                        } , 3000 )
                        if (Info.To) this.$router.push(Info.To)
                    }
                },deep: true
            },
        },
    }
    
</script>

<style scoped lang='scss'>
    
.SuccessCard {
    opacity: 0;
    right: 80px;
    bottom: 40px;
    transition: 1000ms ease-out;
    .Container {
        --bg-toggle: hsl(0, 0%, 96%);
        --bg-circle: hsl(96, 85%, 34%);;
        height: 33px;
        width: 0;
        background-color: var(--bg-toggle);
        border-radius: 4rem;
        display: flex;
        align-items: center;
        transition: 300ms;
        span {
            opacity: 0;
            transition: 1000ms;
        }
        .Circle {
            width: 45px;
            height: 45px;
            background-color: var(--bg-circle);
            border-radius: 50%;
            transition: background-color 1000ms;
            box-shadow: 0 1rem 3rem rgba(0, 0, 0, .8);
            transition: .3s;
            i {
                color: var(--bg-toggle);
            }
        }
    }
    
}
.ParentAnim {
    opacity: 1;
    .ChildAnim {
        width: calc(100% + .5rem + 45px);
        --bg-toggle: hsl(96, 85%, 34%);
        --bg-circle: hsl(0, 0%, 96%);
        span {
            opacity: 1;
        }
        .Circle {
            right: .5rem;
        }
    }
}
.RemoveAnim {
    span {
        display: none;
    }
    .Circle {
        transform: scale(1.2);
    }
}
    

</style>