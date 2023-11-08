const accountSid = 'ACe2dda45734f9f094d264e9b873b1a193' // El id de tu cuenta; 
const authToken = 'cdf170e7fd0a99b9a624823e2c10e0b8' // El TOKEN de tu cuenta; 
const client = require('twilio')(accountSid, authToken);


const sendMessage = async (req, res) => {
    try {

        const { number, message } = req.body;

        const response = await client.messages.create({
            body: message,
            from: 'whatsapp:', // El número que te proporcionen       
            to: `whatsapp:${number}`
        });

        console.log(response);

        res.json({
            msg: 'Mensaje enviado correctamente'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Error al enviar mensaje'
        });
    }
}

module.exports = sendMessage;