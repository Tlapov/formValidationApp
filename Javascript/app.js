
export default class FormValidation{
    constructor(inputs, form){
        this.inputs = inputs
        this.form = form
        this.inputs.forEach(input => {
            input.addEventListener("change", (e) => {
                const inputElement = e.target
                const inputElementName = inputElement.name

                switch(inputElementName){
                    case "ime":
                        this.checkName(inputElement)
                        break
                    case "mail":
                        this.checkEmail(inputElement)
                        break
                    case "lozinka":
                        this.checkPassword(inputElement)
                        break
                    case "ponoviLozinku":
                        this.checkRepeatPassword(inputElement)                     
                }
            });
        });
        form.addEventListener("submit", (e) => {
            e.preventDefault()
            if(inputs[0].hasAttribute("data-check") && inputs[1].hasAttribute("data-check") && inputs[2].hasAttribute("data-check") && inputs[3].hasAttribute("data-check")){
                alert("Bravo")
                for(let input of inputs){
                   input.value = ""
                   input.removeAttribute("data-check")
                }
            }
            
        })
        
    }
    checkName(input){
        const inputArea = input.parentElement,
        small = inputArea.nextElementSibling,
        inputValue = input.value,
        inputValidation = inputValue.trim().split(" ")

        if(inputValue.length < 6){
           small.textContent = "vaše ime i prezime otprilike mora sadržavati minimalno 6 slova" 
        } else if(inputValidation.length < 2){
           small.textContent = "Morate unijeti ime i prezime"
        }
        else{
            small.textContent = "";
            input.setAttribute("data-check", true)
        }
    }
    checkEmail(input){
        const inputValue = input.value,
        inputArea = input.parentElement,
        small = inputArea.nextElementSibling
        if(inputValue.length == 0){
            small.textContent = "Unesite ispravnu e-mail adresu";
        }
        else{
                const url = "https://emailvalidation.abstractapi.com/v1/?api_key=c6b92c8ef0264a63878a1a7fc3f992d8&email=" + inputValue
                fetch(url).then(res => res.json()).then(data => {
                    if(data.is_valid_format.value == false){
                        small.textContent = "Unesite ispravnu e-mail adresu";
                    }else{
                        small.textContent = "";
                        input.setAttribute("data-check", true)
                    }
                })
        }
        
    }
    checkPassword(input){
        const inputValue = input.value,
        inputArea = input.parentElement,
        small = inputArea.nextElementSibling
        let lettersCheck = /[A-Z][a-z]/
        let numbersCheck = /[0-9]/
        let symbolsCheck = /[!”#$%&’()*+,-./:;<=>?@[\]^_`{|}~]/

        if(inputValue.length < 8){
            small.textContent = "vaša lozinka mora sadržavati minimalno 8 karaktera uključujući slova, brojeve i simbole";
        }else if(lettersCheck.test(inputValue) == false){
            small.textContent = "lozinka mora sadržavati velika i mala slova";
        }else if(numbersCheck.test(inputValue) == false){
            small.textContent = "lozinka mora sadržavati barem jedan broj";
        }else if(symbolsCheck.test(inputValue) == false){
            small.textContent = "lozinka mora sadržavati barem jedan simbol";
        }
        else{
            small.textContent = "";
            input.setAttribute("data-check", true)
        }                 
    }
    checkRepeatPassword(input){
        const password = document.querySelector("input[name='lozinka']"),
        inputArea = input.parentElement,
        small = inputArea.nextElementSibling
        if(password.value !== input.value){
            small.textContent = "ponovljena lozinka mora biti jednaka s lozinkom koju ste unijeli"
        }
        else{
            small.textContent = "";
            input.setAttribute("data-check", true)
        }
    }
}

