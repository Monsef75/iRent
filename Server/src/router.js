const { ObjectId } = require('mongodb')
, multer = require('multer')
, bcrypt = require('bcrypt')
, jwt = require('jsonwebtoken')
, fs = require('fs')
, { error } = require('console')
, upload = multer({ dest: 'uploads/' })
, Env = process.env
, SecKey = Env.SEC_KEY

module.exports = (app, Users, Properties) => {

    app.get('/Membership/SignUpAuthentification', async (req, res) => {
        const { Email,Name } = req.query
        , IsEmailExist = await Users.findOne( { 'Email': Email.toLowerCase() } )
        , IsNameExist = await Users.findOne( { 'Name': Name } )
        if (IsEmailExist && IsNameExist) res.status(409).send( {UsedEmail: Email, UsedName: Name, Type: 'Both'} )
        else if (IsEmailExist) res.status(409).send( {UsedEmail: Email, UsedName: null, Type: 'Email'} )
        else if (IsNameExist) res.status(409).send( {UsedEmail: null, UsedName: Name, Type: 'Name'} )
        else res.status(200).send('Success')
    })
    app.post('/Membership/SignUp', async (req, res) => {
        const { Name, Email, Password, Joined_In } = req.body
        , HashedPassword = await bcrypt.hash( Password,10 )
        , User = {
            _id: new ObjectId(),
            Photo: null,
            Name: Name,
            Email: Email.toLowerCase(),
            Password: HashedPassword,
            Favorites: [],
            IsAdmin: false,
            Properties: [],
            Joined_In: Joined_In,
        }        
        await Users.insertOne( User )

        delete User.Password
        const Token = jwt.sign( User , SecKey , { expiresIn: '2h' })
        res.send( {Token,UserInfo: User} )

    })
    app.get('/Membership/SignIn', async (req, res) => {
        const { Email,Password } = req.query.User
        , User = await Users.findOne( {'Email':Email} )
        
        if (User) {
            
            const IsPasswordValid = await bcrypt.compare( Password,User.Password )
            if (IsPasswordValid) {
                const {Password,...UserInfo} = User
                , TokenData = {
                    _id: UserInfo._id,
                    Name: UserInfo.Name,
                    Email: UserInfo.Email,
                }
                , Token = jwt.sign( TokenData , SecKey , { expiresIn: '225h' })
                res.send( {Token,UserInfo} )
            }
            else res.status(401).send('Email or Password is incorrect')
            
        }
        else res.status(401).send('Email or Password is incorrect')
    })
    app.get( '/UserAuthentification' , async (req, res) => {
        const Token = req.query.Token
        jwt.verify( Token , SecKey , (err) => {
            if (err) return res.status(403).send( 'Invalid Token' )
            else res.status(200).send( 'Valid Token' )
        })
    })

    app.post('/UpdateUser', upload.array('Photo', 1) , async(req, res) => {
        const { Id } = req.body
        , _Id = new ObjectId(Id)
        , photo = {
            fileType: req.files[0].mimetype,
            data: fs.readFileSync(req.files[0].path)
        }
        , Update = await Users.updateOne( { '_id': _Id } , { $set: {'Photo': photo } } )
        , User = await Users.findOne( {'_id': _Id} )
        , { Photo } = User
        fs.unlinkSync( req.files[0].path )
        res.send( {Update,Photo} )
    })

    app.get('/AdminPanel/SetUsers', async(req, res) => {
        const { Type, Filters, } = req.query
        , CountQuery = { 'IsAdmin': Type == 'Admins'}
        , FiltersQuery = {}
        , Aggregation = [
            { $match: CountQuery },
        ]
        , QueryNbr = await Users.countDocuments( CountQuery )
        , UsersNbr = await Users.countDocuments()

        if (Filters) {
            Filters.forEach( Filter => {
                Filter.Type == 'Joined_In' ? FiltersQuery['Converted_Joined_In'] = +Filter.OptionSelected
                : FiltersQuery['Converted_Properties'] = +Filter.OptionSelected
            })
            Aggregation.unshift(
                { $addFields: {
                    Converted_Joined_In: {
                        $dateFromString: {
                            dateString: '$Joined_In',
                            format: '%d/%m/%Y : %H:%M',
                            timezone: 'UTC'
                        }
                    },
                    Converted_Properties: { $size: "$Properties" }
                }},
                { $sort: FiltersQuery },
                { $project: { Converted_Joined_In: 0, Converted_Properties: 0 } }
            )
        }
        const Collection = await Users.aggregate( Aggregation ).toArray()
        , users = Collection.map( User => {
            return {
                Id: User._id,
                Photo: User.Photo,
                Name: User.Name,
                Email: User.Email,
                Properties: User.Properties.length,
                Joined: User.Joined_In,
            }
        })

        res.send({Users: users,QueryNbr: QueryNbr,UsersNbr: UsersNbr})
    })
    app.patch('/AdminPanel/AdministerUser', async(req, res) => {
        const Update = await Users.updateOne( {'_id': new ObjectId(req.body.UserId)}, { $set: { IsAdmin: true }})
        res.send( Update )
    })
    app.delete('/AdminPanel/RemoveUser', async(req, res) => {
        const User = await Users.findOne( {'_id': new ObjectId(req.body.UserId)})
        if (User.Properties.length != 0) {
            for (const PropertyId of User.Properties) {
                await Properties.deleteOne( {'_id': new ObjectId(PropertyId)})
            }
        }
        const Delete = await Users.deleteOne( {'_id': new ObjectId(req.body.UserId)})
        res.send( Delete )
    })
    app.get('/AdminPanel/SetAdmins', async(req, res) => {
        const { Filters, } = req.query
        , FiltersQuery = {}
        , Aggregation = [
            { $match: { 'IsAdmin': true }},
        ]
        if (Filters) {
            Filters.forEach( Filter => {
                Filter.Type == 'Joined_In' ? FiltersQuery['Converted_Joined_In'] = +Filter.OptionSelected
                : FiltersQuery[`${Filter.Type}`] = +Filter.OptionSelected
            })
            Aggregation.unshift(
                { $addFields: {
                    Converted_Joined_In: {
                        $dateFromString: {
                            dateString: '$Joined_In',
                            format: '%d/%m/%Y : %H:%M',
                            timezone: 'UTC'
                        }
                    }                    
                }},
                { $sort: FiltersQuery },
                { $project: { Converted_Joined_In: 0 } }
            )
        }
        const Collection = await Users.aggregate( Aggregation ).toArray()
        , Admins = Collection.map( User => {
            return {
                Id: User._id,
                Photo: User.Photo,
                Name: User.Name,
                Email: User.Email,
                Joined: User.Joined_In,
            }
        })
        , AdminsNbr = await Users.countDocuments( {'IsAdmin': true} )
        res.send({Admins: Admins,AdminsNbr: AdminsNbr})
    })
    app.patch('/AdminPanel/RevokeAdmin', async(req, res) => {
        const Update = await Users.updateOne( {'_id': new ObjectId(req.body.AdminId)}, { $set: { IsAdmin: false }})
        res.send( Update )
    })

    app.post('/Vendor_AddProperty', upload.array('Images', 6) , async (req, res) => {
        const {UserId, UserName, ...Other} = req.body

        const Images = req.files.map( File => {
            return {
                fileType: File.mimetype,
                data: fs.readFileSync(File.path)
            }
        })
        Other.Images = Images
        Other.User = {
            Id: UserId,
            Name: UserName,
        }
        Other.IsApproved = false

        const AddOffer = await Properties.insertOne( Other )
        , AddVendorProperty = await Users.updateOne({ '_id': new ObjectId( UserId ) },{ $push: { 'Properties': AddOffer.insertedId }})
        res.send( {AddOffer,AddVendorProperty} )
    })
    app.get('/Vendor_SetProperties', async (req, res) => {
        const Vendor = await Users.findOne({ '_id': new ObjectId(req.query.UserId) })
        , properties = []
        for (const Id of Vendor.Properties) {
            const Document = await Properties.findOne( {'_id': new ObjectId(Id)} )
            properties.push({
                Id: Document._id,
                Info: Document.General,
                Image: Document.Images[0],
                IsApproved: Document.IsApproved,
            })

        }
        res.send( properties )
    })
    app.get('/SetProperties', async (req, res) => {
        const Documents = await Properties.find({ 'IsApproved': true }).toArray()
        , properties = []
        for (const Document in Documents) {
            properties.push({
                Id: Documents[Document]._id,
                Info: { ...Documents[Document].General, ...Documents[Document].Description },
                Image: Documents[Document].Images[0],
            })
        }
        res.send( properties )
    })
    app.get('/SetDetails', async (req, res) => {

        const Document = await Properties.findOne( {'_id': new ObjectId(req.query.PropertyId)} )
        , { User, Added_At, IsApproved, ...Property } = Document
        res.send(Property)

    })
    app.get('/AdminPanel/Admin_SetProperties' , async (req, res) => {
        const { IsApproved, Filters,} = req.query
        , FiltersQuery = {}
        let MatchQuery = { 'IsApproved': IsApproved == 'true' }       
        const Aggregation = [
            { $match: MatchQuery },
        ]
        , PropertiesNbr = await Properties.countDocuments( MatchQuery )

        if (Filters) {
            Filters.forEach( Filter => {
                Filter.Type == 'Added_At' ? FiltersQuery['Converted_Added_At'] = +Filter.OptionSelected
                : FiltersQuery[`${Filter.Type}`] = +Filter.OptionSelected
            })
            if (Object.keys(FiltersQuery).length != 0) {
                Aggregation.unshift(
                    { $addFields: {
                        Converted_Added_At: {
                            $dateFromString: {
                                dateString: '$Added_At',
                                format: '%d/%m/%Y : %H:%M',
                                timezone: 'UTC'
                            }
                        }                    
                    }},
                    { $sort: FiltersQuery },
                    { $project: { Converted_Added_At: 0 } }
                )
            }
        }
        const Documents = await Properties.aggregate( Aggregation ).toArray()

        , properties = Documents.map( Property  => {
            let Name 
            Property.General.Name.length > 18 ? Name = Property.General.Name.toString().slice(0,18) + '...'
            : Name = Property.General.Name
            return {
                Id       : Property._id,
                User     : Property.User,
                Image    : Property.Images[0],
                Name     : Name,
                Type     : Property.General.Type,
                Category : Property.General.Category,
                Price    : Property.General.Price,
                Added    : Property.Added_At,
            }
        })
        , Data = {
            PropertiesNbr: PropertiesNbr,
            Properties: properties
        }
        res.send( Data )
    })
    app.post('/AdminPanel/ApproveOffer', async (req, res) => {
        const Update = await Properties.updateOne({ '_id': new ObjectId(req.body.OfferId) }, { $set: { IsApproved: true }})
        res.send(Update)
    })
    app.delete('/RemoveProperty', async (req, res) => {
        const DeleteProperty = await Properties.deleteOne( {'_id': new ObjectId(req.body.PropertyId) })
        , DeleteVendorProperty = await Users.updateOne({ '_id': new ObjectId(req.body.UserId) }, { $pull: { 'Properties': new ObjectId(req.body.PropertyId) }})
        res.send({ DeleteProperty, DeleteVendorProperty})
    })

    app.get('/Update', async(req, res) => {
        
    })
}