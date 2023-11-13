function clickImageBox() {
    console.debug("Khôi yêu Hảo")
    let imageInput = document.getElementById("imageInput")
    imageInput.click()

    // get image from click event
    imageInput.addEventListener("change", function () {
        let image = imageInput.files[0]
        let reader = new FileReader()
        reader.onload = function (e) {
            let imagePreview = document.getElementById("image-preview")
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
