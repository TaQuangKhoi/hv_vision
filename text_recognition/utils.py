import cv2
import numpy as np
import base64


def save_canny_image(img):
    file_dir = "text_recognition/static/results/"

    cv2.imdecode(np.fromstring(img.read(), np.uint8), cv2.IMREAD_UNCHANGED)

    file_name = file_dir + "test.png"
    # Save the image
    with open(file_name, 'wb+') as destination:
        for chunk in img.chunks():
            destination.write(chunk)

    # Open the image in OpenCV
    img = cv2.imread(file_name)

    # Apply Canny
    edges = cv2.Canny(img, 100, 200, 3, L2gradient=True)

    image_content = cv2.imencode('.jpg', edges)[1].tostring()
    encoded_image = base64.encodebytes(image_content)
    result = 'data:image/jpg;base64, ' + str(encoded_image, 'utf-8')

    # cv2.imwrite(file_dir + "test_canny.png", edges)

    return ["/static/results/" + "test.png", result]
