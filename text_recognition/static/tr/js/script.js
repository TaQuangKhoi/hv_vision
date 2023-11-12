
function clickImageBox() {
    console.debug("Khôi yêu Hảo")
    let imageInput = document.getElementById("image-upload")
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
    });

    let formUpload = document.getElementById("form-upload")
    console.debug(formUpload)
}