const express = require('express');
const app = express();

app.use(express.json());

const sampled = [
    { id: 1, name: 'Alice', age: 25 },
    { id: 2, name: 'Bob', age: 30 }
];

const GXML = (data) => {
    let xmlData = '<?xml version="1.0" encoding="UTF-8"?><data>';
    data.forEach(item => {
        xmlData += `
            <item>
                <id>${item.id}</id>
                <name>${item.name}</name>
                <age>${item.age}</age>
            </item>`;
    });
    xmlData += '</data>';
    return xmlData;
};

const GHTML = (data) => {
    return `
        <html>
            <head><title>Data Table</title></head>
            <body>
                <table border="1">
                    <thead>
                        <tr><th>ID</th><th>Name</th><th>Age</th></tr>
                    </thead>
                    <tbody>
                        ${data.map(i => `
                            <tr>
                                <td>${i.id}</td>
                                <td>${i.name}</td>
                                <td>${i.age}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </body>
        </html>`;
};

const formatResponse = (req, res, next) => {
    try {
        const headerFormat = req.headers['accept'] || 'text/html'; 
        req.formattedData = sampled;
        res.locals.formatType = headerFormat;
        next();
    } catch (error) {
        console.error('Error in formatResponse middleware:', error.message);
        res.status(500).json({ success: false, message: 'An error occurred' });
    }
};

app.get('/data', formatResponse, (req, res) => {
    try {
        const { formattedData } = req;
        const formatType = res.locals.formatType;

        if (formatType.includes('application/json')) {
            res.json({ success: true, data: formattedData });

        } else if (formatType.includes('application/xml')) {
            const xmlData = generateXML(formattedData);
            res.setHeader('Content-Type', 'application/xml');
            res.send(xmlData);


        } else if (formatType.includes('text/html')) {
            const htmlData = generateHTML(formattedData);
            res.setHeader('Content-Type', 'text/html');
            res.send(htmlData);
        } else {
            res.status(406).json({ success: false, message: 'Wrong Format Requested' });
        }
    } catch (error) {
        console.error('Error occurred in route handler:', error.message);
        res.status(500).json({ success: false, message: 'An unexpected error occurred' });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});
