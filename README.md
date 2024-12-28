# Express Format Response API

This is a simple Express.js API that responds with data in different formats (JSON, XML, HTML) based on the `Accept` header sent by the client.

## Features:
- **JSON Format**: Responds with data in JSON format.
- **XML Format**: Responds with data in XML format.
- **HTML Format**: Responds with data in an HTML table format.
- **Middleware for Format Handling**: Custom middleware checks the `Accept` header and formats the response accordingly.
## API Endpoint:

### `GET /data`
This endpoint returns data in the format specified by the `Accept` header.

- **Accept: application/json** - Returns data in JSON format.
- **Accept: application/xml** - Returns data in XML format.
- **Accept: text/html** - Returns data in an HTML table format.
