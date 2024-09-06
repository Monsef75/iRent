<template>

    <div class="Favorites position-relative">

        <div class="FavoritesIcon c-white position-relative pointer trans2">
            <i class="fa-solid fa-heart s20 trans3 pointer" :class="{'c-prim-blue' : !HideBox}"  @click="HideBoxes"></i>
            <i class="fa-solid fa-chevron-down position-absolute s10 c-white trans3" :class="HideBox ? 'Arrow-Up' : 'Arrow-Down c-prim-blue'"></i>
            <p class="ItemsNumbers position-absolute c-white bc-red s12 rounded-circle f-center" v-if="!Loading && !EmptyCart" >{{ NbrProducts }}</p>
        </div>

        <div class="FavoritesBox bc-accent position-absolute bd-b-prim-5 p-3 rd-10 shadow-lg zindex-p-1 trans3"
         :class="{'opacity-0 invisible' : HideBox, 'pb-0': EmptyCart}">

            <CloseIcon @click="HideBox = !HideBox" />
            <div class="Title d-flex align-items-center pb-3 bd-b-grey1">
                <h5 class="c-white letter-p-1 fw-bold me-2 py-1">Favorite Items :</h5>
                <p class="c-white bc-red fs-6 rounded-circle f-center" v-if="!Loading && !EmptyCart" >{{ NbrProducts }}</p>
            </div>
            <div class="Loader f-center" style="height: 300px;" v-show="Loading">
                <div class="SimpleSpinner"></div>
            </div>
            <div class="Content" :class="{'ProductsBox bd-b-grey1 my-3' : !EmptyCart}" v-show="!Loading" >

                <div class="NoItems pt-3" v-show="EmptyCart">
                    <p class="c-light-white pb-1 s25 fw-bold t-center mb-4">No Properties Added In The Favorites Right Now!</p>
                    <img class="d-block mx-auto" src="/src/assets/Imgs/CustomerUI/Header/Favorites.png" alt="">
                </div>
                <div class="Products p-3 rd-10" v-show="!EmptyCart">
                    <div class="Product rounded d-flex align-items-center justify-content-between mb-3 trans3" 
                    v-for="(Product,Index) in Products" >
                        <div class="ProductInfo d-flex gap-3 pointer" @click="ShowDetails(Product.Params)">
                            <div class="Image rounded-3">
                                <img :src="GetImage( Product.Img )" alt=""> 
                            </div>
                            <div class="Text">
                                <p class="c-white s16 fw-bolder letter-p-1">{{ GetName(Product.Name) }}</p>
                                <p class="c-light-white2 s14 position-relative w-fit">{{ Product.Price }} <i class="s10">Alf</i> </p>
                            </div>
                        </div>
                        <div class="RemoveIcon bc-light-White rounded-circle f-center trans3 pointer" @click="removeFromFavorite(Product.Params.Id,Index)">
                            <i class="fa-solid fa-xmark c-light-white s14 trans3"></i>
                        </div>
                    </div>
                    <div class="ClearProducts d-flex justify-content-end">
                        <label class="pointer" v-show="!EmptyCart" @click="ClearProducts">
                            <span class="c-light-white s14 me-2 trans3">Clear All</span>
                            <i class="c-red fa-solid fa-arrow-up-from-bracket s15 trans3"></i>
                        </label>
                    </div>
                </div>

            </div>

        </div>

    </div>

</template>

<script>

    import CloseIcon from '/src/components/CustomerUI/Elements/CloseIcon.vue'
    import { mapActions } from 'vuex'

    export default {
        props:['BoxStatus'],
        components: {CloseIcon,},
        data() { return {
            Products: [],
            HideBox: true,
            NbrProducts : null,
            EmptyCart: true,
            Loading: false,
        }},
        methods: {
            GetImage( Image ) {
                return `data:${Image.fileType};base64,${Image.data}`
            },
            GetName(Name) {
                if (Name.length > 15) return Name.toString().slice(0,15) + '...'
                else return Name
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
            ShowDetails( Params ) {
                this.$router.push( `/${Params.Service}/ProductDetails?Id=${Params.Id}` )
            },
            removeFromFavorite( ItemId,ItemIndex ) {
                this.RemoveFromFavorites(ItemId).then( () => {
                    this.Products.splice(ItemIndex,1)
                    this.emitter.emit( "RemoveProductFavorite",[ItemId] )
                })
            },
            ClearProducts() {
                const  ItemsId = this.Products.map( Product => { return Product.Params.Id } )
                this.Products = []
                this.ClearFavorites().then( this.emitter.emit( "RemoveProductFavorite",ItemsId ) )
            },
            ...mapActions(['SetFavorites','AddToFavorites','RemoveFromFavorites','ClearFavorites']),
            
        },
        watch: {
            Products(Val) {
                this.NbrProducts = Val.length
                Val.length == 0 ? this.EmptyCart = true : this.EmptyCart = false
                
            },
            BoxStatus(Val) {
                this.HideBox = Val
            },
        },
        created() {
            // this.$store.subscribe( (mutation, state) => {
            //     if (state.IsLoggedIn) {
            //         this.Loading = true   
            //         this.SetFavorites().then( res => {
            //             this.Products = res
            //             this.Loading = false   
            //         })
            //     }
            // })
        },
        mounted() {
            this.emitter.on('AddToFavorites', ( {Favorite,ItemInfo} ) => {
                if (this.EmptyCart) this.EmptyCart = false
                this.AddToFavorites(Favorite)
                .then( () => {
                    const Product = {
                        Params: Favorite,
                        Img: ItemInfo.Image,
                        Name: ItemInfo.Name,
                        Price: ItemInfo.Price
                    }
                    this.Products.push(Product)
                })
            })
            this.emitter.on('RemoveFromFavorites', ItemId => {
                const Product = this.Products.find( Product => Product.Params.Id == ItemId  )
                const ItemIndex = this.Products.indexOf(Product)
                this.RemoveFromFavorites(ItemId).then( () => {
                    this.Products.splice(ItemIndex,1)
                })
            })
            this.emitter.on('ClearFavorites', () => this.Products = [])
        }
    }
    
</script> 

<style scoped lang="scss">

.Favorites {
    .FavoritesIcon {
        .ItemsNumbers {
            left: 100%;
            top: -10px;
            width: 17px;
            height: 17px;
        }
    }
    .FavoritesIcon:hover i {
        color: var(--Primary);
    }
    .FavoritesBox {
        top: 50px;
        right: -27px;
        width: 350px;
        .Title {
            p {
                height: 30px;
                width: 30px;
            }
        }
        .Content {
            .Products {
                max-height: 260px;
                overflow-y: scroll;
                .Product {
                    background-image: linear-gradient(to right , rgb(255, 255, 255, 0.1) , transparent);
                    .ProductInfo {
                        .Image {
                            width: 50px;
                            height: 50px;
                            img {
                                width: 100%;
                            }
                        }
                    }
                    .RemoveIcon {
                        height: 25px;
                        width: 25px;
                    }
                    .RemoveIcon:hover i {
                        color: var(--Red);
                    }
                }
                .ClearProducts label:hover {
                    span {
                        color: white;
                    }
                }

            }
            .Products::-webkit-scrollbar {
                width: 2px;
            }
            .Products::-webkit-scrollbar-thumb {
                background-color: var(--Prim-Blue);
            }
            .NoItems {
                img {
                    opacity: 0.75;
                    width: 250px;
                    height: 250px;
                }
            }
        }
        .ProductsBox {
            box-shadow: inset -5px  5px  20px hsla(229, 78%, 7%, 0.4),
                inset  5px -5px  20px hsla(229, 78%, 7%, 0.2);
        }
    }
    .FavoritesBox::before {
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
    .Favorites {                                     
        position: static!important;
        .FavoritesBox {
            right: 10px;
            top: 65px;
            border-radius: 5px;
            margin: 0 auto;
            width: calc(100% - 20px);
        }
        .FavoritesBox::before {
            right: 65px;
        }
    }
}

</style> 