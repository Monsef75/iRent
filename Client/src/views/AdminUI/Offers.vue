<template>
    
    <div class="Offers px-4 bc-light-panel position-relative overflow-hidden">
        
        <Title Title="Offers" :ShowTypes="false"/>

        <span class="SpinnerLoader position-fixed" v-if="PageLoading" ></span>

        <div class="EmptyPage t-center" v-else-if="EmptyPage">
            <img src="/src/assets/Imgs/AdminUI/Common/Docs.png" alt="">
            <p class="c-light-white2 fw-bold letter-p-1 t-center" style="font-size: 40px;">No Offers Yet</p>
        </div>

        <div v-else >

            <Info :Info="Info"/>
            <Filters :Filters="Filters" @ApplyFilters="ApplyFilters"/>
            <Table :THead="THead" #Slot>

                <tr class="trans3" v-for="(Offer,Index) in Offers">
                    <th scope="row">{{ Index + 1 }}</th>
                    <th>{{ Offer.User.Name }}</th>
                    <th><img :src="GetImage(Offer.Image)" style="width: 45px;height: 45px;border-radius: 5px;"></th>
                    <th>{{ Offer.Name }}</th>
                    <th>{{ Offer.Type }}</th>
                    <th>{{ Offer.Category }}</th>
                    <th>{{ Offer.Price }} <i class="s12" >Alf</i> </th>
                    <th>{{ Offer.Added }}</th>
                    <th class="position-relative">
                        <GearIcon :ItemSettings="ItemSettings" :Waiting="Offer.Waiting"  @setting="(Value) => Settings( Value, Offer.Id, Offer.User.Id, Index )" />
                    </th>
                </tr>
                <tr class="Loader trans3" v-for=" in 7" v-show="BoxesLoading">
                    <th></th>
                    <th colspan="5" > <span class="Text d-block" ></span> </th>
                    <th colspan="2" > <span class="Text d-block" ></span> </th>
                </tr>
                
            </Table>

        </div>
        
    </div>

</template>

<script>

    import Title from '@/components/AdminUI/Elements/Title.vue'
    import Info from '@/components/AdminUI/Elements/Info.vue'
    import Filters from '@/components/AdminUI/Elements/Filters.vue'
    import Table from '@/components/AdminUI/Elements/Table.vue'
    import GearIcon from '@/components/AdminUI/Elements/GearIcon.vue'
    import { mapActions } from 'vuex'

    export default {
        components: {Title,Info,Filters,Table,GearIcon, },
        data() { return {
            Info: {
                Name: 'Offers',
                Value: null,
            },

            Filters: [
                {Type: 'Info.Price',  Name: "Sort By Offer Price",     Option1: "Highest Price", Option2: "Lowest Price" },
                {Type: 'Offred_At',   Name: "Sort By Offer Date",      Option1: "Newest",        Option2: "Oldest" },
            ],
            Query: {
                IsApproved: false,
                Filters: null,
            },

            THead: [
                "#","Vendor","Offer Image","Name","Type","Category","Price","Date","Process"
            ],
            Offers: [],
            
            ItemSettings: [
                { Setting: "Approve"},
                { Setting: "Show Details"},
                { Setting: "Delete", ColorRed: true},
            ],
            InfoValid : false,

            PageLoading: true,
            BoxesLoading: false,
            EmptyPage: false,
        }},
        methods: {
            SetUp( Query ) {
                this.Admin_SetProperties( Query ).then( res => {
                    if (res.PropertiesNbr == 0) this.EmptyPage = true
                    else {
                        res.Properties.forEach( Offer => Offer.Waiting = false )
                        this.Offers = res.Properties
                        this.Info.Value = res.PropertiesNbr
                    }
                    this.PageLoading = false
                    this.BoxesLoading = false
                })
            },
            GetImage( Image ) {
                return `data:${Image.fileType};base64,${Image.data}`
            },
            ApplyFilters( Vals ) {
                if (Vals.length != 0) {
                    this.Query.Filters = Vals
                    this.Offers = []
                    this.Query.Limits = 16
                    this.Query.Skip = 0
                    this.OffersData.Loader = true
                    this.OffersData.HasMore = true
                    this.SetUp( this.Query )
                } 
            },

            Settings( Value, OfferId, UserId, Index ) {
                if ( Value == 'Approve' ) {
                        this.Admin_ApproveOffer({ OfferId: OfferId }).then( ()=> {
                        this.Offers.splice( Index,1 )
                        --this.Info.Value
                        if (this.Offers.length == 0) this.EmptyPage = true
                    })
                }
                else if ( Value == 'Show Details' ) {
                    window.open(this.$router.resolve({ path: `/Details/${OfferId}` }).href, '_blank')
                }
                else {
                    this.Offers[Index].Waiting = true
                    this.RemoveProperty({ PropertyId: OfferId, UserId: UserId }).then( ()=> {
                        this.Offers.splice( Index,1 )
                        --this.Info.Value
                        if (this.Offers.length == 0) this.EmptyPage = true
                    })
                }
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
            ...mapActions(['Admin_SetProperties', 'Admin_ApproveOffer', 'RemoveProperty',]),
        },
        computed: {
            Types() {
                const Service = this.GetOffer.Info.Service
                if (Service == 'Clothes') {
                    this.GetOffer.ShowSizes = true
                    return ['Shirts','Pants','Shoes','Coats']
                }
                else {
                    this.GetOffer.ShowSizes = false
                    if (Service == 'Devices') {
                        return ['Phones','Laptops']
                    }
                    else if (Service == 'Electronics') {
                        return ['Wireless Headphones','Wire Headphones','Headsets','Chargers']
                    }
                    else {
                        delete this.GetOffer.Info.Type
                        return false
                    }
                }

            },
            Categories() {
                const Service = this.GetOffer.Info.Service
                if (Service == 'Clothes') {
                    return ['LifeStyle','Running','Football','Training & Gym']
                }
                else if (Service == 'Accessories') {
                    return ['Watches','Glasses','Necklaces And Rings','Bracelets','Caps']
                }
                else {
                    delete this.GetOffer.Info.Category
                    return false
                }
            },
            Genders() {
                if (this.GetOffer.Info.Service == 'Clothes' || this.GetOffer.Info.Service == 'Accessories') {
                    return ['Men','Women','Boys','Girls']
                }
                else {
                    delete this.GetOffer.Info.Gender
                    return false
                }
                
            }, 
        },
        created() {
            this.SetUp( this.Query )
        },
    }
</script>

<style scoped lang="scss" >

.Offers {
    .Offer {
        .BackBttn:hover {
            color: var(--Prim-Blue)
        }
        .Form input:not([placeholder="Product Name"]) {
            width: calc(50% - 0.25rem);
            flex-grow: 1;
        }
    }
}
tr {
    vertical-align: middle;
    th {
        text-align: center;
        span.default {
            background-color: #FCA311;
            color: white;
            text-shadow: .5px .8px 1px var(--Black-Text);
        }
        span.pointer:hover {
            color: var(--Scnd-Blue);
        }
        span.Canceled {
            background-color: var(--Red);
        }
        span.Carried {
            background-color: var(--Bold-Green);
        }
    }
}
tr:nth-of-type(2n+1) {
    background-color: rgb(65, 68, 81,0.5);
}
tr:hover {
    background-color: rgba(65, 68, 81, 0.7);
    color: var(--Light-white2);
}
tr:not(.Loader):hover {
    background-color: rgba(65, 68, 81, 0.7);
    color: var(--Light-white2);
}
tr.Loader {
    height: 40px;
    .Text {
        width: 90%;
        height: 10px;
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