const form = document.getElementById("signUpForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;
    const message = document.getElementById("error-display");

    const data = JSON.stringify({email, firstName, lastName})

    console.log(data)

    fetch('http://localhost:3000/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: data
        })
        .then(response => response.json())
        .then(data => {
            console.log(data)
            
            if (data["Result"] === "undeliverable") {
                
                message.innerText = "Please submit a valid email address."

            } else {
                // Subscribe for Email Marketing in Klaviyo

                message.innerText = ""
                

            }
        })
        .catch(error => console.log(error))
});