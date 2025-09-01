function thanks(){
        localStorage.setItem("submittedForm", true)
    }
    function newMesage(){
        localStorage.setItem("submittedForm", false)

        let contact_form = document.getElementById("contact-frm")
        let contact_thanks = document.getElementById("contact-thanks")
        contact_form.classList.add("d-flex")
        contact_form.style.display= "flex"
        contact_thanks.classList.remove("d-flex")
        contact_thanks.classList.add("hidden")
    }

    if(localStorage.getItem("submittedForm") === "true"){
        let contact_form = document.getElementById("contact-frm")
        let contact_thanks = document.getElementById("contact-thanks")
        contact_form.classList.remove("d-flex")
        contact_form.style.display= "none"
        contact_thanks.classList.remove("hidden")
        contact_thanks.classList.add("d-flex")
    }