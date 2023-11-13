let imageInput = document.getElementById("imageInput")
let imagePreview = document.getElementById("image-upload")

let contoursSubmitButton = document.getElementById("contours-submit-button")
let cannySubmitButton = document.getElementById("canny-submit-button")

/* CONTOURS */
contoursSubmitButton.addEventListener("click", function () {
    if (imageInput.files.length === 0) {
        setOriginFileToInput()
        return
    }

    let formContours = document.getElementById("form-file")
    formContours.action = "/text_recognition/contours/"
    formContours.submit()
})

/* CANNY */
cannySubmitButton.addEventListener("click", function () {
    if (imageInput.files.length === 0) {
        setOriginFileToInput()
        return
    }

    let formCanny = document.getElementById("form-file")
    formCanny.action = "/text_recognition/"
    formCanny.submit()
})

function clickImageBox() {
    console.debug("Khôi yêu Hảo")
    imageInput.click()

    // get image from click event
    imageInput.addEventListener("change", function () {
        let image = imageInput.files[0]
        let reader = new FileReader()
        reader.onload = function (e) {
            imagePreview.src = e.target.result
        }
        reader.readAsDataURL(image)
        console.debug("imageInput files: ", imageInput.files)
    });
}

async function onSubmitForm() {
    let imageInput = document.getElementById("imageInput")
    let image = imageInput.files[0]
    if (!image) {
        alert("Please choose image")
        return
    }

    let formData = new FormData()
    formData.append("image", image)

    await fetch('http://127.0.0.1:8000/text_recognition/', {
        method: 'POST',
        body: formData
    }).then(function (response) {
        return response.json()
    }).then(function (data) {
        console.debug("data: ", data)
        // let textResult = document.getElementById("text-result")
        // textResult.innerHTML = data["text"]
    })
}


function setOriginFileToInput() {
    let imageUploadValue = document.getElementById('imageUploadValue')
    const imageUpload = JSON.parse(imageUploadValue.textContent);
    let file = new File([imageUpload], "image-from-server.jpg", {type: "image/jpeg"})
    let container = new DataTransfer();
    container.items.add(file);
    imageInput.files = container.files;
}