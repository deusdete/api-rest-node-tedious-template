const transport = require('./EmailController');
const ejs = require('ejs');
require('dotenv').config();

module.exports = {

  async newContact (req, res) {
    let emailTemplate;
    const { nome, email, mensagem} = req.body;
    if(!nome || !email ||!mensagem) {
      return res.status(401).json({general: "Fill in all the fields!"})
    }
    try {
      ejs.renderFile('./src/utils/html/EmailTemplate.ejs',{
        nome, 
        email, 
        mensagem
      }).then(result => {
        emailTemplate = result;
        try {
          const mailOptions = {
            from: `Contato - ${nome} | Exemple <exemple@email.com>`,
            to: "exemple@email.com",
            subject: 'Contato - Exemple',
            html: emailTemplate
          };
          transport.sendMail(mailOptions, (error, info) => {
            if (error) {
                return res.status(401).json({error});
            }
            return res.status(200).json({
              messageId: info.messageId,
            });
          });
        } catch (error) {
          return res.status(500).json({error});
        }
      }).catch(err => {
        console.log(err)
        return res.status(500).send(err);
      })
    } catch (error) {
      return res.status(500).json({error})
    }
  }
}