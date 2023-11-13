import cv2
import numpy as np
import base64


def save_canny_image(img):
    file_dir = "text_recognition/static/results/"

    # file_name = file_dir + "test.png"
    # # Save the image
    # with open(file_name, 'wb+') as destination:
    #     for chunk in img.chunks():
    #         destination.write(chunk)

    # Open the image in OpenCV
    img_cv2 = cv2.imdecode(
        np.fromstring(img.read(), np.uint8),
        cv2.IMREAD_UNCHANGED
    )
    origin_content = cv2.imencode('.jpg', img_cv2)[1].tostring()
    encoded_origin = base64.encodebytes(origin_content)
    origin = 'data:image/jpg;base64, ' + str(encoded_origin, 'utf-8')

    # Apply Canny
    edges = cv2.Canny(img_cv2, 100, 200, 3, L2gradient=True)
    image_result_content = cv2.imencode('.jpg', edges)[1].tostring()
    encoded_result = base64.encodebytes(image_result_content)

    result = 'data:image/jpg;base64, ' + str(encoded_result, 'utf-8')

    # cv2.imwrite(file_dir + "test_canny.png", edges)

    return [origin, result]
