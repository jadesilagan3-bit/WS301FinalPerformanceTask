
const form = document.getElementById("registrationForm");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("confirmPassword");
const showPasswordButton = document.getElementById("showPassword");
const successMessage = document.getElementById("successMessage");


function showError(input, message) {
    input.classList.add("error");
    document.getElementById(input.id + "Error").textContent = message;
}


function clearError(input) {
    input.classList.remove("error");
    document.getElementById(input.id + "Error").textContent = "";
}


form.addEventListener("submit", function(event) {
    event.preventDefault();

    const studentId = document.getElementById("studentId");
    const fullName = document.getElementById("fullName");
    const email = document.getElementById("email");
    const phone = document.getElementById("phone");
    const birthDate = document.getElementById("birthDate");
    const gender = document.getElementById("gender");
    const program = document.getElementById("program");
    const yearLevel = document.getElementById("yearLevel");
    const address = document.getElementById("address");
    const agreement = document.getElementById("agreement");

    const inputs = [
        studentId, fullName, email, phone, birthDate,
        gender, program, yearLevel, password,
        confirmPassword, address
    ];

    let isValid = true;
    successMessage.textContent = "";

    // Remove extra spaces and old errors
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type !== "password") {
            inputs[i].value = inputs[i].value.trim();
        }

        clearError(inputs[i]);
    }

    document.getElementById("agreementError").textContent = "";

    if (studentId.value === "") {
        showError(studentId, "Please enter your student ID.");
        isValid = false;
    }

    if (fullName.value === "") {
        showError(fullName, "Please enter your full name.");
        isValid = false;
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (email.value === "") {
        showError(email, "Please enter your email.");
        isValid = false;
    } else if (!emailPattern.test(email.value)) {
        showError(email, "Please enter a valid email address.");
        isValid = false;
    }

    const phonePattern = /^09[0-9]{9}$/;

    if (phone.value === "") {
        showError(phone, "Please enter your phone number.");
        isValid = false;
    } else if (!phonePattern.test(phone.value)) {
        showError(phone, "Only use numbers.");
        isValid = false;
    }

    if (birthDate.value === "") {
        showError(birthDate, "Please select your date of birth.");
        isValid = false;
    } else if (new Date(birthDate.value) > new Date()) {
        showError(birthDate, "Date of birth cannot be in the future.");
        isValid = false;
    }

    if (gender.value === "") {
        showError(gender, "Please select your gender.");
        isValid = false;
    }

    if (program.value === "") {
        showError(program, "Please select your program.");
        isValid = false;
    }

    if (yearLevel.value === "") {
        showError(yearLevel, "Please select your year level.");
        isValid = false;
    }

    if (password.value === "") {
        showError(password, "Please enter a password.");
        isValid = false;
    } else if (password.value.length < 6) {
        showError(password, "Password must have at least 6 characters.");
        isValid = false;
    }

    if (confirmPassword.value === "") {
        showError(confirmPassword, "Please confirm your password.");
        isValid = false;
    } else if (password.value !== confirmPassword.value) {
        showError(confirmPassword, "The passwords do not match.");
        isValid = false;
    }

    if (address.value === "") {
        showError(address, "Please enter your address.");
        isValid = false;
    }

    if (!agreement.checked) {
        document.getElementById("agreementError").textContent =
            "Please check the agreement box.";
        isValid = false;
    }

   
    if (isValid) {
        successMessage.textContent =
            form.dataset.formName + " successful! Thank you.";

        form.setAttribute("data-status", "complete");
    } else {
        form.setAttribute("data-status", "incomplete");
    }
});


showPasswordButton.addEventListener("click", function() {
    if (password.type === "password") {
        password.setAttribute("type", "text");
        confirmPassword.setAttribute("type", "text");
    } else {
        password.setAttribute("type", "password");
        confirmPassword.setAttribute("type", "password");
    }

    showPasswordButton.classList.toggle("showing");
});


const allInputs = form.querySelectorAll("input, select, textarea");

allInputs.forEach(function(input) {
    input.addEventListener("input", function() {
        clearError(input);
        successMessage.textContent = "";
    });

    input.addEventListener("change", function() {
        clearError(input);

        if (input.id === "agreement") {
            document.getElementById("agreementError").textContent = "";
        }
    });
});


form.addEventListener("reset", function() {
    setTimeout(function() {
        const fields = form.querySelectorAll("input, select, textarea");

        fields.forEach(function(input) {
            input.classList.remove("error");
        });

        const messages = form.querySelectorAll(".error-message");

        messages.forEach(function(message) {
            message.textContent = "";
        });

        successMessage.textContent = "";

        form.setAttribute("data-status", "incomplete");
        password.setAttribute("type", "password");
        confirmPassword.setAttribute("type", "password");
        showPasswordButton.classList.remove("showing");
    }, 0);
});
