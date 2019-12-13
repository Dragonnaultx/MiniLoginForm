const nodemailer = require('nodemailer');
const mailGun = require('nodemailer-mailgun-transport');


const auth = {
    auth: {
        api_key: '6c051fd5b15b0e45fc306b44980e7a57-5645b1f9-270b3032',
        domain: 'sandbox2de35331a12a4b43a5357253c96e4419.mailgun.org'
    }
};
// const transporter = nodemailer.createTransport({
//     host: 'smtp.gmail.com', 
//     auth: {
//         user: 'strelacmk@gmail.com',
//         pass: 'kosmeic2711991'
//     }
// })

const transporter = nodemailer.createTransport(mailGun(auth));

const sendEmail = (email, cb) => {
    
    
    const emailOptions = {
        from: 'strelacmk@gmail.com',
        to: email,
        subject: 'Activate your MINI_PROJEKAT account', 
        text: "Hello,<br/> Please click on the link to verify your email. <br/> <a>Click here</a>"
        
    } 
    
    transporter.sendMail(emailOptions, (err, data) =>{
        if(err){
            cb(err,null)
        }else{
            cb(null,data)
        }
    })
}

module.exports = {sendEmail};
