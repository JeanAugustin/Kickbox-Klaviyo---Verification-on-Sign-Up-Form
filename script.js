const form = document.getElementById("signUpForm");

const klaviyoPublicKey = "Qg3FLb";

const klaviyoListID = "VgPaZB";

const message = document.getElementById("error-display");

const klaviyoSubscribe = (klaviyoListID, email, firstName, lastName, klaviyoPublicKey) => {
    const options = {
        method: 'POST',
        headers: {revision: '2023-02-22', 'content-type': 'application/json'},
        body: JSON.stringify({
            data: {
            type: 'subscription',
            attributes: {
                list_id: klaviyoListID,
                custom_source: 'Custom Source - Verified Email',
                email: email,
                properties: {
                    $first_name: firstName,
                    $last_name: lastName,
                    'Kickbox Verified': true
                    }
                }
            }
        })
    };

    fetch(`https://a.klaviyo.com/client/subscriptions/?company_id=${klaviyoPublicKey}`, options)
    .then(response => response.json())
    .then(response => console.log(response))
    .catch(err => console.log(err));
}

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;

    const firstName = document.getElementById("firstName").value;

    const lastName = document.getElementById("lastName").value;

    const submitButton = document.getElementById("submitButton");

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
                submitButton.disabled = true // Disables button if inputted email is invalid
            
                setTimeout(() => {
                    submitButton.disabled = false; // Re-enables button after 3 seconds
                }, 3000); 
                


            } else {
                message.innerText = ""

                // Subscribe for Email Marketing in Klaviyo
                klaviyoSubscribe(klaviyoListID, email, firstName, lastName, klaviyoPublicKey)
                

            }
        })
        .catch(error => console.log(error))
});