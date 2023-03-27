const form = document.getElementById("signUpForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const firstName = document.getElementById("firstName").value;
    const lastName = document.getElementById("lastName").value;


    console.log(email)
    console.log(firstName)
    console.log(lastName)  

    const data = JSON.stringify({email, firstName, lastName})

    console.log(data)

    fetch('http://localhost:3000/data', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: data
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

});