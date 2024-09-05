import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router/router.js'
// VUE_APP_Facebook_App_Id: '922479025807225',
// VUE_APP_Facebook_App_Secret: '99a969281f19f1cfeb817029cf7e9714',
const END_POINT = 'http://localhost:3000'

const store = createStore({
    
    state: {
        Token: null,
        User: {
            Id: null,
            Photo: null,
            Name: null,
            Email: null,
            IsAdmin: false,
            Properties: null,
        },
        IsLoggedIn: null,
        SuccessCard: {
            Text: null,
            To: null,
        },
    },
    
    getters: {
        User( state ) {
            return {Id: state.User.Id, Name: state.User.Name, Email: state.User.Email, }
        },
        IsLoggedIn( state ) {
            return state.IsLoggedIn
        },
    },
    
    mutations: {

        SetSuccessCard( state,Info ) {
            state.SuccessCard = {
                Text: Info.Text,
                To: Info.To ? Info.To : null
            }
        },
        
        SetUser( state,Info ) {
            state.Token = Info.Token
            const UserInfo = Info.UserInfo
            state.User = {
                Id: UserInfo._id,
                Photo: UserInfo.Photo,
                Name: UserInfo.Name,
                Email: UserInfo.Email,
                IsAdmin: UserInfo.IsAdmin,
                Properties: UserInfo.Properties
            },
            state.IsLoggedIn = true

            const User = JSON.stringify({Token: state.Token,UserInfo: state.User})
            localStorage.setItem( 'User',User )
        },
        UpdateUser( state,Photo ) {
            state.User.Photo = Photo
            const Item = localStorage.getItem('User')
            , User = JSON.parse(Item)
            User.UserInfo = state.User
            const UpdatedUser = JSON.stringify(User)
            localStorage.setItem('User', UpdatedUser)
        },
        StaySignedIn( state,Info ) {
            const User = Info.UserInfo
            state.Token = Info.Token
            state.User = {
                Id: User.Id,
                Photo: User.Photo,
                Name: User.Name,
                Email: User.Email,
                IsAdmin: User.IsAdmin,
                Properties: User.Properties
            }
            state.IsLoggedIn = true
        },
        SignOut( state ) {
            router.push('/Membership/Sign-In')
            state.Token = null
            state.User = {
                Id: null,
                Photo: null,
                Name: null,
                Email: null,
                IsAdmin: false,
                Properties: null,
            }
            state.IsLoggedIn = false
            localStorage.removeItem('User')
        },

    },
    
    actions: {
        
        SignUpAuthentification( context,User ) {                     // v/SignUpForm.vue
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + '/Membership/SignUpAuthentification' , { params: User })
                .then( () => {
                    resolve()
                })
                .catch( err => {
                    reject(err.response.data)
                })
            })
        },
        SignUp( context,User ) {                                     // v/SignUpForm.vue 
            return new Promise((resolve, reject) => { 
                axios.post(END_POINT + '/Membership/SignUp' , User)
                .then( res => {
                    context.commit( 'SetUser',res.data )
                    context.commit( 'SetSuccessCard',{Text: 'Signed Up Successfully',To: '/'} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed', err)
                })
            })
        },
        SignIn( context,User ) {                                     // c/SignIn.vue
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/Membership/SignIn' , { params: { User: User } } )
                .then( res => {     
                    context.commit( 'SetUser',res.data )
                    context.commit( 'SetSuccessCard',{Text: 'Signed In Successfully',To: '/'} )
                    resolve()
                })
                .catch( err => {
                    reject(err.response.data)
                })
            })
        },
        StaySignedIn( context ) {                                    // App.vue
            return new Promise((resolve, reject) => {
                const Item = localStorage.getItem('User')
                if (Item) {
                    const User = JSON.parse(Item)
                    axios.get(END_POINT + '/UserAuthentification' , { params: { Token: User.Token } } )
                    .then( res => {
                        context.commit( 'StaySignedIn',User )
                        resolve(User.UserInfo._id)
                        console.log(res.data)
                    })
                    .catch( err => {
                        // context.commit( 'SignOut' )
                        reject()
                        console.log(err)
                    })
                }
            })

        },
        UpdateUser( context,User ) {                                 // v/Profile.vue
            return new Promise((resolve, reject) => {
                axios.post(END_POINT + '/UpdateUser' , User , {headers: { 'Content-Type': 'multipart/form-data' }} )
                .then( res => {
                    console.log(res.data.Update)
                    context.commit( 'UpdateUser',res.data.Photo)
                    context.commit( 'SetSuccessCard',{Text: 'Updated Successfully',To: null} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed', err)
                    reject()
                })
            })
        },

        Admin_SetUsers( context,Query ) {                            // v/Users.vue
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/AdminPanel/SetUsers' , { params: Query })
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },
        Admin_AdministerUser( context,UserId ) {                     // v/Users.vue
            return new Promise((resolve, reject) => {
                axios.patch(END_POINT + '/AdminPanel/AdministerUser' , { UserId: UserId })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'User is Administered',To: null} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },
        Admin_RemoveUser( context,UserId ) {                         // v/Users.vue
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + '/AdminPanel/RemoveUser' , {data: {UserId: UserId} })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'User is Deleted',To: null} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },
        Admin_SetAdmins( context,Query ) {                           // v/Users.vue
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/AdminPanel/SetAdmins' , { params: Query })
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },
        Admin_RevokeAdmin( context,AdminId ) {                       // v/Users.vue
            return new Promise((resolve, reject) => {
                axios.patch(END_POINT + '/AdminPanel/RevokeAdmin', { AdminId: AdminId })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'Admin is Revoked',To: null} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },
        Admin_RemoveAdmin( context,AdminId ) {                       // v/Users.vue
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + '/AdminPanel/RemoveAdmin' , {data: {AdminId: AdminId} })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'Admin is Deleted',To: null} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },

        Vendor_AddProperty( context,Offer ) {                        // v/List.vue
            return new Promise((resolve, reject) => { 
                axios.post(END_POINT + '/Vendor_AddProperty' , Offer , {headers: { 'Content-Type': 'multipart/form-data' }})
                .then( res => {
                    context.commit( 'SetSuccessCard',{ Text: 'Sent For Process', To: null })
                    // '/Profile'
                    console.log(res.data)
                    resolve()
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Vendor_SetProperties( context,UserId ) {                     // v/Profile.vue
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/Vendor_SetProperties' , { params: UserId })
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        SetProperties( context ) {                                   // v/Home.vue + v//Explore.vue
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/SetProperties')
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        SetDetails( context,PropertyId ) {                           // v/Profile.vue
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/SetDetails' , { params: PropertyId })
                .then( res => {
                    console.log(res.data)
                    resolve(res.data)
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Vendor_RemoveProperty( context,Ids ) {                       // v/Profile.vue
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + '/Vendor_RemoveProperty' , {data: Ids })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'RemoveVendorProperty',res.data.VendorPropertyId )
                    context.commit( 'SetSuccessCard',{Text: 'Property is Deleted',To: null} )
                    resolve()
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Admin_SetProperties( context,Query ) {                       // v/Offers + v/Properties
            return new Promise((resolve, reject) => { 
                axios.get(END_POINT + '/AdminPanel/Admin_SetProperties' , { params: Query })
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Admin_ApproveOffer( context,OfferId ) {                      // v/Offers.vue
            return new Promise((resolve, reject) => { 
                axios.post(END_POINT + '/AdminPanel/ApproveOffer', OfferId)
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'Offer is Approved',To: null} )
                    resolve()
                })
                .catch( err => {
                    console.log('Failed',err)
                })
            })
        },
        RemoveProperty( context,Ids ) {                              // v/Offers + v/Properties
            return new Promise((resolve, reject) => {
                axios.delete(END_POINT + '/RemoveProperty' , {data: Ids })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'Property is Deleted',To: null} )
                    resolve()
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },

        Update( context ) {
            // <button class="py-2 px-5 bc-accent" @click="Update" >Update</button>
            return new Promise((resolve, reject) => {
                axios.get(END_POINT + '/Update' )
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'Updated',To: null} )
                    resolve()
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        }
    },
    
})
    
export default store