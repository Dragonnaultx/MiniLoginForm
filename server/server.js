const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config').get(process.env.NODE_ENV);
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const Joi = require('joi');



app = express();
mongoose.Promise = global.Promise;
mongoose.connect(config.DATABASE);

const { User } = require('./models/user'); 
const { auth} = require('./middleware/auth');
const { sendEmail } = require('./middleware/mail')

app.use(bodyParser.json());
app.use(cookieParser());

// EMAIL //

app.post('/api/email', (req,res)=>{
    
   const {email} = req.body;
   sendEmail(email,(err,data) => {
       if(err){
           res.status(500).json({message: 'Internal Error'});
       }else{
           res.json({message: 'Email sent!!!'})
       }
   });
   
})

// VALIDATION INPUT //

app.post('/api/validation',(req,res)=>{

    const schemaJoi = Joi.object().keys({
        name: Joi.string().min(3).max(30).required(),
        lastname: Joi.string().min(3).max(30).required(),
        username: Joi.string().min(3).max(30).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).required(),
        email: Joi.string().regex(/\S+@\S+\.\S+/).required()
    });
    Joi.validate(req.body,schemaJoi,(err,result)=>{
        if(err){
            res.send('Error has occured')
        }
        res.send('succesful validation')
})
})

// REGISTER //

app.post('/api/register',(req,res)=>{
    
    const user = new User(req.body);
    
    
    user.save((err,doc)=>{
        console.log(doc)
        if(err) return res.json({success:false});
        
        })
        res.status(200).json({
            success:true,
            user:doc,
            
        })
    })


// LOGIN //

app.post('/api/login',(req,res)=>{
    User.findOne({'email':req.body.email},(err,user)=>{
        if(!user) return res.json({isAuth:false,message:'Auth failed, email not found'})

        user.comparePassword(req.body.password,(err,isMatch)=>{
            if(!isMatch) return res.json({
                isAuth:false,
                message:'Wrong password'
            });

            user.generateToken((err,user)=>{
                if(err) return res.status(400).send(err);
                res.cookie('auth',user.token).json({
                    isAuth:true,
                    id:user._id,
                    email:user.email
                })
            })
        })
    })
})

app.get('/api/logout',auth,(req,res)=>{
    req.user.deleteToken(req.token,(err,user)=>{
        if(err) return res.status(400).send(err);
        res.sendStatus(200)
    })
})

app.get('/api/auth',auth,(req,res)=>{
    res.json({
        isAuth:true,
        id:req.user._id,
        email:req.user.email,
        name:req.user.name,
        lastname:req.user.lastname
    })
});

// ALL USERS //

app.get('/api/users',(req,res)=>{
    User.find({},(err,users)=>{
        if(err) return res.status(400).send(err);
        res.status(200).send(users)
    })
})


// UPDATE //
app.post('/api/user_update',(req,res)=>{
    User.findByIdAndUpdate(req.body._id,req.body,{new:true},(err,doc)=>{
        if(err) return res.status(400).send(err);
        res.json({
            success:true,
            doc
        })
    })
})


// DELETE //

app.delete('/api/delete_user/:id',(req,res)=>{
    User.findByIdAndRemove(req.params.id).exec().then(doc=>{
        if(!doc) {
            return res.status(404).end();}
            return res.status(204).end();
    }).catch(err => next(err))
})

// READ USER //

app.get('/api/user/',(req,res)=>{
    User.find({email:req.query.user}).exec((err,docs)=>{
        if(err) return res.status(400).send(err);
        res.send(docs)
    })
})

const port = process.env.PORT || 3001;
app.listen(port, ()=>{
    console.log(`Server connected - ${port}`)
})