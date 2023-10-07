module.exports = async (req, res) => {
    const response = `
        <html>
            <head>
                <title>Banner 320x50</title>
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
                        'key' : '932808b23a0b73bc2b1596c1ce014e65',
                        'format' : 'iframe',
                        'height' : 50,
                        'width' : 320,
                        'params' : {}
                    };
                    document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablecreativeformat.com/932808b23a0b73bc2b1596c1ce014e65/invoke.js"></scr' + 'ipt>');
                </script>
            </body>
        </html>
    `;
    res.setHeader('content-type', 'text/html');
    res.setHeader('content-length', response.length);
    return res.send(response);
}