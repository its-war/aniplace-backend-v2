module.exports = async (req, res) => {
    const response = `
        <html>
            <head>
                <title>Banner 728x90</title>
            </head>
            <style>
                    body {
                        margin: 0;
                        padding: 0;
                        background-color: #212121;
                    }
            </style>
            <body>
                <script type="text/javascript">
                    atOptions = {
                        'key' : 'f181a6066906f707f3973ed999390119',
                        'format' : 'iframe',
                        'height' : 90,
                        'width' : 728,
                        'params' : {}
                    };
                    document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablecreativeformat.com/f181a6066906f707f3973ed999390119/invoke.js"></scr' + 'ipt>');
                </script>
            </body>
        </html>
    `;
    res.setHeader('content-type', 'text/html');
    res.setHeader('content-length', response.length);
    return res.send(response);
}