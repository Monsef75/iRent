import { createStore } from 'vuex'
import axios from 'axios'
import router from '@/router/router.js'

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
        UpdateUser( state,Info ) {
            state.User.Photo = Info.Photo
            state.User.Name = Info.Name
            state.User.IsVendor = Info.IsVendor
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
                axios.get(Env.END_POINT + '/Membership/SignUpAuthentification' , { params: User })
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
                axios.post(Env.END_POINT + '/Membership/SignUp' , User)
                .then( res => {
                    console.log(res.data)
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
                axios.get(Env.END_POINT + '/Membership/SignIn' , { params: { User: User } } )
                .then( res => {     
                    context.commit( 'SetUser',res.data )
                    resolve()
                })
                .catch( err => {
                    reject(err.response.data)
                })
                .finally(
                    context.commit( 'SetSuccessCard',{Text: 'Signed In Successfully',To: '/'} )
                )
            })
        },
        StaySignedIn( context ) {                                    // App.vue
            return new Promise((resolve, reject) => {
                const Item = localStorage.getItem('User')
                if (Item) {
                    const User = JSON.parse(Item)
                    axios.get(Env.END_POINT + '/UserAuthentification' , { params: { Token: User.Token } } )
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

        Admin_SetUsers( context,Query ) {                            // v/Users.vue
            return new Promise((resolve, reject) => { 
                axios.get(Env.END_POINT + '/AdminPanel/SetUsers' , { params: Query })
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
                axios.patch(Env.END_POINT + '/AdminPanel/AdministerUser' , { UserId: UserId })
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
                axios.delete(Env.END_POINT + '/AdminPanel/RemoveUser' , {data: {UserId: UserId} })
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
                axios.get(Env.END_POINT + '/AdminPanel/SetAdmins' , { params: Query })
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
                axios.patch(Env.END_POINT + '/AdminPanel/RevokeAdmin', { AdminId: AdminId })
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
                axios.delete(Env.END_POINT + '/AdminPanel/RemoveAdmin' , {data: {AdminId: AdminId} })
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

        AddProperty( context,Offer ) {                               // v/List.vue
            return new Promise((resolve, reject) => { 
                axios.post(Env.END_POINT + '/AddProperty' , Offer , {headers: { 'Content-Type': 'multipart/form-data' }})
                .then( res => {
                    context.commit( 'SetSuccessCard',{ Text: 'Sent For Process', To: null })
                    // '/Profile'
                    console.log(res.data)
                    resolve()
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Vendor_SetProperties( context,Properties ) {                 // v/Profile.vue
            return new Promise((resolve, reject) => { 
                axios.get(Env.END_POINT + '/Vendor_SetProperties' , { params: VendorProperties })
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Vendor_RemoveProperty( context,Ids ) {                       // v/Profile.vue
            return new Promise((resolve, reject) => {
                axios.delete(Env.END_POINT + '/Vendor_RemoveProperty' , {data: Ids })
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
                axios.get(Env.END_POINT + '/AdminPanel/Admin_SetProperties' , { params: Query })
                .then( res => {
                    resolve(res.data)
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
        Admin_ApproveOffer( context,OfferId ) {                      // v/Offers.vue
            return new Promise((resolve, reject) => { 
                axios.post(Env.END_POINT + '/AdminPanel/ApproveOffer', OfferId)
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
        Admin_RemoveProperty( context,Params ) {                     // v/Offers + v/Properties
            return new Promise((resolve, reject) => {
                axios.delete(Env.END_POINT + '/AdminPanel/Admin_RemoveProperty' , {data: Params })
                .then( res => {
                    console.log(res.data)
                    context.commit( 'SetSuccessCard',{Text: 'Property is Deleted',To: null} )
                    resolve()
                })
                .catch( err => console.log( 'Failed',err ) )
            })
        },
    },
    
})
    
export default store