function fetchBody() {
    fetch('http://localhost:8080/mainContentWithWebsockets.txt')
    .then((response) => {
        return response.text();
    })
    .then((html) => {
        let body = document.body.innerHTML
        body += html
        document.body.innerHTML = body     
    })
}

fetchBody()