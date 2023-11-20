const nodemailer = require('nodemailer');
module.exports = (assunto, mensagem, para) => {
    const transporter = nodemailer.createTransport({
        host: 'localhost',
        port: 587,  // Porta padrão do SMTP (pode variar dependendo da configuração do hMailServer)
    });

    const mailOptions = {
        from: 'system@aniplace.top',
        to: para,
        subject: assunto,
        text: mensagem,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.error('Erro ao enviar e-mail:', error);
        }
        console.log('E-mail enviado:', info);
    });
}