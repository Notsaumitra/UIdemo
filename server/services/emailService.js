const {SMTPClient} = require('emailjs');

const client = new SMTPClient({
	user: 'ironman.register@gmail.com',
	password: 'mindtree1234',
	host: 'smtp.gmail.com',
	ssl: true,
});

// send the message and get a callback with an error or details of the message that was sent
const sendEmail = (text,to,subject)=>{
    return new Promise ((resolve,reject)=>{
        client.send(
            {
                text: text,
                from: 'IronmanTeam <ironman.register@gmail.com>',
                to: to,
                subject: subject,
            },
            (err, message) => {
                if(err){
                    reject(err);
                }
                else{
                    resolve(message);
                }
            }
        );
    })
    
}


module.exports = sendEmail;