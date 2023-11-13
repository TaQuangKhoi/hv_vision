import cv2


def save_canny_image(img):
    file_dir = "text_recognition/static/results/"

    file_name = file_dir + "test.png"
    # Save the image
    with open(file_name, 'wb+') as destination:
        for chunk in img.chunks():
            destination.write(chunk)

    # Open the image in OpenCV
    img = cv2.imread(file_name)

    # Apply Canny
    edges = cv2.Canny(img, 100, 200, 3, L2gradient=True)

    cv2.imwrite(file_dir + "test_canny.png", edges)
