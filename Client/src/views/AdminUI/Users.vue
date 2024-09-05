<template>

    <div class="Users px-4 bc-light-panel">

        <Title :Title="MembersType" />
        
        <span class="SpinnerLoader position-fixed" v-show="PageLoading" ></span>

        <div v-show="!PageLoading">

            <Info :Info="Info"/>
            <Filters :Filters="Filters" @ApplyFilters="ApplyFilters" :ClearFilters="ClearFilters"/>

            <span class="SpinnerLoader position-fixed mt-5" style="width: 48px; height: 48px;" v-if="BoxesLoading" ></span>
            <Table :THead="THead" #Slot v-else >

                <tr class="trans3" v-for="(User,Index) in Users">
                    <th scope="row">{{ Index + 1 }}</th>
                    <th><img :src="GetImage( User.Photo )" alt="" style="width: 50px;height: 50px;border-radius: 5px;"></th>
                    <th>{{ User.Name }}</th>
                    <th>{{ User.Email }}</th>
                    <th>{{ User.Properties }}</th>
                    <th>{{ User.Joined }}</th>
                    <th class="position-relative">
                        <GearIcon :ItemSettings="ItemSettings" :Waiting="User.Waiting" @setting="(Value) => Settings(Value,User.Id,Index)" />
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
        components: {Title,Info,Filters,Table,GearIcon},
        data() { return {
            MembersType: 'Users',

            Info: {
                Name: 'Users',
            },

            Filters: [
                {Type: 'Joined_In',   Name: "Sort By Joining Date", Option1: "Newest",             Option2: "Oldest" },
                {Type: 'Properties', Name: "Sort By Properties", Option1: "Highest Properties", Option2: "Lowest Properties" },
            ],
            ClearFilters: false,
            Query: {
                Type: 'Customers',
                Filters: null,
            },

            THead: [
                "#","Photo Profile","User Name","Email","Properties","Joined In","Process"
            ],
            Users: [],
            ItemSettings: [
                {Setting: "Delete", ColorRed:true},
            ],

            PageLoading: true,
            BoxesLoading: false,
        }},
        methods: {
            SetUp( Query ) {
                this.Admin_SetUsers( Query ).then( res => {
                    res.Users.forEach( User => {
                        User.Waiting = false
                    })
                    this.Users = res.Users
                    this.Info.Value = res.UsersNbr
                    this.BoxesLoading = false
                    this.PageLoading = false
                })
            },
            ApplyFilters( Vals ) {
                if (Vals.length != 0) {
                    this.Query.Filters = Vals
                    this.Users = []
                    this.BoxesLoading = true
                    this.SetUp( this.Query )
                } 
            },
            GetImage( Photo ) {
                if (Photo) return `data:${Photo.fileType};base64,${Photo.data}`
                else return '/src/assets/Imgs/Common/Avatar.png'
            },
            
            TypeSelected( Value ) {
                this.Query.Type = Value
                this.Query.Filters = null
                this.BoxesLoading = true
                this.Users = []
                this.SetUp( this.Query )
            },
            Settings( Value, UsertId, Index ) {
                if (Value == 'Delete') {
                    this.Users[Index].Waiting = true
                    this.Admin_RemoveUser(UsertId).then( ()=> {
                        this.Users.splice(Index, 1)
                        --this.Info.Value
                    })
                }
            },
            ...mapActions(['Admin_SetUsers','Admin_AdministerUser','Admin_RemoveUser']),
        },
        created() {
            this.SetUp( this.Query )
        },
    }
</script>

<style scoped lang="scss">

tr {
    vertical-align: middle;
    th {
        text-align: center;
    }
}
tr:nth-of-type(2n+1) {
    background-color: rgb(65, 68, 81,0.5);
}
tr:not(.Loader):hover {
    background-color: rgb(65, 68, 81,0.7);
    color: var(--Light-white2);
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