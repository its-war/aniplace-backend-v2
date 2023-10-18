module.exports = async (req, res) => {
    const response = `
        <html>
            <head>
                <title>Banner 300x250</title>
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
                        'key' : 'c13bffaa3a263d8590698267f21fb40f',
                        'format' : 'iframe',
                        'height' : 250,
                        'width' : 300,
                        'params' : {}
                    };
                    document.write('<scr' + 'ipt type="text/javascript" src="//www.profitablecreativeformat.com/c13bffaa3a263d8590698267f21fb40f/invoke.js"></scr' + 'ipt>');
                </script>
            </body>
        </html>
    `;
    res.setHeader('content-type', 'text/html');
    res.setHeader('content-length', response.length);
    return res.send(response);
}