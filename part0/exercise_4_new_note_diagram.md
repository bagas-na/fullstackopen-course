```mermaid
sequenceDiagram
    participant browser
    participant server

    Note over browser: Browser handles the form submit event.
    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    Note over server: Server handles POST request to <br/> /exampleapp/new_note (a redirect)
    server-->>browser: Status Code "302 Found", location: /exampleapp/notes
    deactivate server

    Note over browser: Browser requests resource defined <br/> in the header's location
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    Note over server: Server handles GET request
    server-->>browser: HTML document
    deactivate server

    Note over browser: Browser parses HTML, requests <br/> resources within <head> of HTML <br/> (main.css, main.js)
    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the css file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: the JavaScript file
    deactivate server

    Note right of browser: The browser starts executing the JavaScript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "HTML is easy", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
```
