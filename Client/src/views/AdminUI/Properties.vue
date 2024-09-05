<template>

    <div class="Clothes px-4 bc-light-panel overflow-hidden">

        <Title :Title="ServiceName" v-if="EmptyPage"/>
        <Title :Title="ServiceName" v-else/>
        
        <span class="SpinnerLoader position-fixed" v-if="PageLoading" ></span>

        <div class="EmptyPage f-center gap-5" v-else-if="EmptyPage || NoProperties">
            <img src="/src/assets/Imgs/AdminUI/Common/Docs.png" alt="">
            <div>
                <p class="c-light-white2 fw-bold lh-sm letter-p-1 mb-5" style="font-size: 50px;">
                    Oops .. There Are No {{ EmptyPage ? ServiceName : Query.Type }} Right Now !
                </p>
            </div>
        </div>

        <div v-else>

            <Info :Info="Info"/>
            <Filters :Filters="Filters" @ApplyFilters="ApplyFilters" :ClearFilters="ClearFilters"/>

            <span class="SpinnerLoader position-fixed mt-5" style="width: 48px; height: 48px;"  v-if="BoxesLoading" ></span>
            <Table :THead="THead" #Slot v-else >

                <tr class="trans3" v-for="(Property,Index) in Properties">
                    <th scope="row">{{ Index + 1 }}</th>
                    <th>{{ Property.User.Name }}</th>
                    <th><img :src="GetImage(Property.Image)" style="width: 45px;height: 45px;border-radius: 5px;"></th>
                    <th>{{ Property.Name }}</th>
                    <th>{{ Property.Type }}</th>
                    <th>{{ Property.Category }}</th>
                    <th>{{ Property.Price }} <i class="s11">Dz</i> </th>
                    <th>{{ Property.Added }}</th>
                    <th class="position-relative">
                        <GearIcon :ItemSettings="ItemSettings" :Waiting="Property.Waiting" @setting="(Value) => Settings( Value, Property.Id, Property.User.Id, Index )" />
                    </th>
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

            Info: {
                Name: 'All Properties',
            },
            ScndInfo: {
                Name: 'Sale Properties',
            },

            Filters: [
                // {Type: 'General.Category',  Name: "Sort By Category",    Option1: "For Rent",          Option2: "For Sell" },
                {Type: 'Added_At',    Name: "Sort By Added date",  Option1: "Newest Properties", Option2: "Oldest Properties" },
                {Type: 'General.Price', Name: "Sort By Price",       Option1: "Highest Price",     Option2: "Lowest Price" },
            ],
            ClearFilters: false,
            Query: {
                IsApproved: true,
                Filters: null,
            },

            THead: [
                "#","Vendor","Property Image","Name","Type","Category","Price","Added","Process"
            ],
            Properties: [],
            ItemSettings: [
                { Setting: "Show Details"},
                { Setting: "Delete", ColorRed: true },
            ],

            PageLoading: true,
            BoxesLoading: false,
            EmptyPage: false,
            NoProperties: false,
        }},
        methods: {
            SetUp( Query ) {
                this.Admin_SetProperties( Query ).then( res => {
                    if ( res.PropertiesNbr == 0 ) this.EmptyPage = true
                    else {
                        res.Properties.forEach( Product => Product.Waiting = false )
                        this.NoProperties = false
                        this.Info.Value = res.PropertiesNbr
                        this.Properties = res.Properties
                    }
                    this.BoxesLoading = false
                    this.PageLoading = false
                })
            },
            GetImage( Image ) {
                return `data:${Image.fileType};base64,${Image.data}`
            },
            ApplyFilters( Vals ) {
                if (Vals.length != 0) {
                    this.Query.Filters = Vals
                    this.Properties = []
                    this.BoxesLoading = true
                    this.SetUp( this.Query )
                } 
            },

            Settings( Value, PropertyId, UserId, Index ) {
                if ( Value == 'Show Details' ) {
                    window.open(this.$router.resolve({ path: `/Details/${PropertyId}` }).href, '_blank')
                }
                else {
                    this.Properties[Index].Waiting = true
                    this.RemoveProperty({ PropertyId: PropertyId, UserId: UserId }).then( ()=> {
                        this.Properties.splice( Index,1 )
                        --this.Info.Value
                        if (this.Properties.length == 0) this.EmptyPage = true
                    })

                }
            },
            ...mapActions(['Admin_SetProperties', 'RemoveProperty']),
        },
        watch: {
            'ScndInfo.Value'(Val) {
                if ( Val == 0 ) {
                    this.NoProperties = true
                }
            },
        },
        created() {
            this.SetUp( this.Query )
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