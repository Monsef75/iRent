<template>

    <div class="Users px-4 bc-light-panel">

        <Title :Title="MembersType" :Types="UsersTypes" @TypeSelected="TypeSelected" />
        
        <span class="SpinnerLoader position-fixed" v-show="PageLoading" ></span>

        <div v-show="!PageLoading">

            <Info :Info="Info"/>
            <Filters :Filters="Filters" @ApplyFilters="ApplyFilters" :ClearFilters="ClearFilters"/>
            <Info :Info="ScndInfo" :ShowSearch="true"/>
            <Table :THead="THead" #Slot>

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
                <tr class="Loader trans3" v-for=" in 6" v-show="BoxesLoading">
                    <th></th>
                    <th> <span class="Image d-block" ></span> </th>
                    <th :colspan="ScndInfo.Name == 'Customers' ? 4 : 5" > <span class="Text d-block" ></span> </th>
                    <th colspan="2" > <span class="Text d-block" ></span> </th>
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
            UsersTypes: ["Customers","Admins"],

            Info: {
                Name: 'Users',
            },
            ScndInfo: {
                Name: 'Customers',
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
                {Setting: "Administer",},
                {Setting: "Delete", ColorRed:true},
            ],

            DeleteUser: null,
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
                    this.ScndInfo.Value = res.QueryNbr
                    this.Info.Value = res.UsersNbr
                    this.BoxesLoading = false
                    this.PageLoading = false
                })
            },
            ApplyFilters( Vals ) {
                if (Vals.length != 0) {
                    this.Query.Filters = Vals
                    this.Users = []
                    this.Query.Limits = 16
                    this.Query.Skip = 0
                    this.UsersData.Loader = true
                    this.UsersData.HasMore = true
                    this.SetUp( this.Query )
                } 
            },
            Settings( Value,UsertId,Index ) {
                if (Value == 'Administer') {
                    this.Users[Index].Waiting = true
                    this.AdministerUser( UsertId ).then( () => {
                        this.Users.splice(Index, 1)
                        --this.ScndInfo.Value
                        --this.Info.Value
                    })
                }
                else {
                    this.DeleteUser = {
                        Id: UsertId,
                        Index: Index,
                    }
                    const WarningInfo = {
                        Name: 'DeleteUser',
                        IsDashboardBox: true,
                        Confirmation: 'Are you sure you want to Delete the User ?',
                        Text: 'Are you sure you want to Delete the User ?',
                        ButtonText: 'Delete',
                        ButtonColor: 'bc-red',
                    }
                    this.emitter.emit( 'ShowWarningBox',WarningInfo )

                }
            },
            GetImage( Photo ) {
                if (Photo) return `data:${Photo.fileType};base64,${Photo.data}`
                else return '/src/assets/Imgs/Common/Avatar.png'
            },
            TypeSelected( Value ) {
                this.ScndInfo.Name = Value
                this.Query.Type = Value
                this.ScndInfo.Value = '#'
                this.Query.Filters = null
                this.BoxesLoading = true
                this.ClearFilters = true
                this.Users = []
                this.SetUp( this.Query )
            },
            AcceptWarning() {
                this.Users[this.DeleteUser.Index].Waiting = true
                this.RemoveUser(this.DeleteUser.Id).then( ()=> {
                    this.Users.splice(this.DeleteUser.Index, 1)
                    --this.ScndInfo.Value
                    --this.Info.Value
                })
            },
            ...mapActions(['Admin_SetUsers','Admin_AdministerUser','Admin_RemoveUser']),
        },
        created() {
            this.SetUp( this.Query )
        },
        mounted() {
            this.emitter.on( 'DeleteUser',() => this.AcceptWarning() )
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