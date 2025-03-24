const mailer = require("nodemailer");

const sendingMail = async(to, subject,text) =>{
    const transporter = mailer.createTransport({
        service:"gmail",
        auth:{
            user:"wearwebeaytostyle@gmail.com",
            pass:"ecsi hmjd vquk btgv"
        }
    })
    const mailOptions = {
        from:"wearwebeaytostyle@gmail.com",
        to:to,
        subject:subject,
        html:text
    }
    const mailResponse = await transporter.sendMail(mailOptions);
    console.log(mailResponse);
    return mailResponse;
}
module.exports  = {
    sendingMail
}