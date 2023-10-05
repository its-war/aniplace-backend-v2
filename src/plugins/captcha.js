const svgCaptcha = require('svg-captcha');

function generateRandomTextCaptcha() {
    const captcha = svgCaptcha.create({
        size: 6,
        ignoreChars: '0o1ilILOt',
        noise: 12,
        color: true,
        background: 'rgba(18,18,18,.4)',
        width: 300,
        height: 80,
        fontSize: 75
    });

    // Retorna o texto do CAPTCHA gerado e o SVG como uma string
    return { text: captcha.text, svg: captcha.data };
}

module.exports = generateRandomTextCaptcha;