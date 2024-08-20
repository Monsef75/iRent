<template>

    <div class="Clothes px-4 bc-light-panel overflow-hidden">

        <Title :Title="ServiceName" v-if="EmptyCategory"/>
        <Title :Title="ServiceName" :Types="PropertyCategories" @TypeSelected="TypeSelected" v-else/>
        
        <span class="SpinnerLoader position-fixed" v-if="PageLoading" ></span>

        <div class="EmptyPage f-center gap-5" v-else-if="EmptyCategory || NoProperties">
            <img src="/src/assets/Imgs/AdminUI/Common/Docs.png" alt="">
            <div>
                <p class="c-light-white2 fw-bold lh-sm letter-p-1 mb-5" style="font-size: 50px;">
                    Oops .. There Are No {{ EmptyCategory ? ServiceName : Query.Type }} Right Now !
                </p>
            </div>
        </div>

        <div v-else>

            <Info :Info="Info"/>
            <Filters :Filters="Filters" @ApplyFilters="ApplyFilters" :ClearFilters="ClearFilters"/>
            <Info :Info="ScndInfo" :ShowSearch="true"/>
            <Table :THead="THead" #Slot>

                <tr class="trans3" v-for="(Property,Index) in Properties">
                    <th scope="row">{{ Index + 1 }}</th>
                    <th>{{ Property.User.Name }}</th>
                    <th><img :src="Property.Image" style="width: 45px;height: 45px;border-radius: 5px;"></th>
                    <th>{{ Property.Name }}</th>
                    <th>{{ Property.Type }}</th>
                    <th>{{ Property.Category }}</th>
                    <th>{{ Property.Location }}</th>
                    <th>{{ Property.Price }} <i class="s11">Dz</i> </th>
                    <th>{{ Property.Added }}</th>
                    <th class="position-relative">
                        <GearIcon :ItemSettings="ItemSettings" :Waiting="Property.Waiting" @setting="(Value) => Settings(Value,Product.Id,Index)" />
                    </th>
                </tr>
                <tr class="Loader trans3" v-for=" in 6" v-show="BoxesLoading">
                    <th></th>
                    <th> <span class="Image d-block" ></span> </th>
                    <th colspan="4" > <span class="Text d-block" ></span> </th>
                    <th colspan="3" > <span class="Text d-block" ></span> </th>
                </tr>
                
            </Table>

        </div>
    
    </div>
    

</template>

<script>

    import Title from '/src/components/AdminUI/Elements/Title.vue'
    import Info from '/src/components/AdminUI/Elements/Info.vue'
    import Filters from '/src/components/AdminUI/Elements/Filters.vue'
    import Table from '/src/components/AdminUI/Elements/Table.vue'
    import GearIcon from '/src/components/AdminUI/Elements/GearIcon.vue'
    import { mapActions } from 'vuex'

    export default {
        components: {Title,Filters,Table,GearIcon,Info,},
        data() { return {
            ServiceName: 'Properties',
            PropertyCategories: [
                "For Sale","For Rent"
            ],

            Info: {
                Name: 'All Properties',
            },
            ScndInfo: {
                Name: 'Sale Properties',
            },

            Filters: [
                {Type: 'Info.Stock',  Name: "Sort By Category",    Option1: "For Rent",          Option2: "For Sell" },
                {Type: 'Added_At',    Name: "Sort By Added date",  Option1: "Newest Properties", Option2: "Oldest Properties" },
                {Type: 'Info.Profit', Name: "Sort By Price",       Option1: "Highest Price",     Option2: "Lowest Price" },
            ],
            ClearFilters: false,
            Query: {
                Category: 'Sale',
                Filters: null,
            },

            THead: [
                "#","Vendor","Property Image","Name","Type","Category","Location","Price","Added","Process"
            ],
            Properties: [],
            ItemSettings: [
                { Setting: "Show Details"},
                { Setting: "Delete", ColorRed: true },
            ],

            DeleteProperty: null,

            PageLoading: false,
            BoxesLoading: false,
            EmptyCategory: false,
            NoProperties: false,
        }},
        methods: {
            SetUp( Query ) {
                this.Admin_SetProperties( Query ).then( res => {
                    if ( res.Info.AllPropertiesNbr == 0 ) this.EmptyCategory = true
                    else if ( res.Info.PropertiesNbr == 0 ) this.NoProperties = true
                    else {
                        res.Properties.forEach( Product => {
                            Product.Waiting = false
                        })
                        this.NoProperties = false
                        this.Info.Value = res.Info.AllPropertiesNbr
                        this.ScndInfo.Value = res.Info.PropertiesNbr
                        this.Properties = res.Properties
                    }
                    this.BoxesLoading = false
                    this.Loading = false
                })
            },
            TypeSelected( Value ) {
                this.NoProperties ? this.PageLoading = true : this.BoxesLoading = true
                this.Query.Type = Value.slice(4)
                this.ScndInfo.Name = Value.slice(4) + ' Properties'
                this.ScndInfo.Value = '#'
                this.Query.Filters = null
                this.ClearFilters = true
                this.Properties = []
                this.SetUp( this.Query )
            },
            ApplyFilters( Vals ) {
                if (Vals.length != 0) {
                    this.Query.Filters = Vals
                    this.Products = []
                    this.Query.Limits = 11
                    this.Query.Skip = 0
                    this.ProductsData.Loader = true
                    this.ProductsData.HasMore = true
                    this.SetUp( this.Query )
                } 
            },
            Settings( Value,ProductId,Index ) {
                if (Value == 'Edit') {
                    const Params = {
                        For: this.ServiceName,
                        Id: ProductId
                    }
                    this.emitter.emit( 'UpdateProduct',Params )  //Home.vue
                }
                else {
                    this.DeleteProduct = {
                        Id: ProductId,
                        Index: Index,
                    }
                    const WarningInfo = {
                        Name: 'DeleteClothes',
                        IsDashboardBox: true,
                        Confirmation: 'Are you sure you want to Delete the Product ?',
                        Text: 'Are you sure you want to Delete the Product ?',
                        ButtonText: 'Delete',
                        ButtonColor: 'bc-red',
                    }
                    this.emitter.emit( 'ShowWarningBox',WarningInfo )

                }
            },
            ShowAddPage() {
                this.emitter.emit( 'UpdateProduct' ) // Home.vue
            },
            AcceptWarning() {
                this.Products[this.DeleteProduct.Index].Waiting = true
                const Params = {
                    Service: this.ServiceName,
                    Id: this.DeleteProduct.Id,
                }
                this.RemoveProduct(Params).then( ()=> {
                    this.Products.splice(this.DeleteProduct.Index, 1)
                    this.ViewWarningBox = false
                    --this.ScndInfo.Value
                    --this.Info.Value
                })
            },
            ...mapActions(['Admin_SetProperties','Admin_RemoveProperty']),
        },
        watch: {
            'ScndInfo.Value'(Val) {
                if ( Val == 0 ) {
                    this.NoProperties = true
                }
            },
        },
        created() {
            // this.SetUp( this.Query )
        },
        mounted() {
            this.emitter.on( 'DeleteClothes',() => this.AcceptWarning() )
        },
    }
</script>

<style scoped lang="scss">

tr {
    color: var(--Light-White2);
    vertical-align: middle;
    th {
        text-align: center;
    }
}
tr:nth-of-type(2n+1) {
    background-color: var(--Light-Panel);
}
tr:not(.Loader):hover {
    background-color: var(--Light-Panel);
    color: var(--Light-white);
}
tr.Loader {
    .Image {
        width: 50px;
        height: 50px;
        border-radius: 5px;
        margin: 0 auto;
    }
    .Text {
        width: 90%;
        height: 15px;
        border-radius: 10px;
    }
    span {
        background: linear-gradient(
            100deg,
            rgba(255, 255, 255, 0) 40%,
            rgba(255, 255, 255, .5) 50%,
            rgba(255, 255, 255, 0) 60%
        ) var(--Light-white);
        background-size: 200% 100%;
        background-position-x: 180%;
        animation: 1.5s .06s Loader ease-in-out infinite;
    }
    @keyframes Loader {
        to {
            background-position-x: -20%;
        }
    }
}

</style> 