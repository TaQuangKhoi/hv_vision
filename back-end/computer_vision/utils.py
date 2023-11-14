import cv2
import numpy as np
import base64

from pytesseract import pytesseract


def get_canny_image(img):
    # Open the image in OpenCV
    img_cv2 = cv2.imdecode(
        np.fromstring(img.read(), np.uint8),
        cv2.IMREAD_UNCHANGED
    )

    origin = get_base64_image(img_cv2)

    # Apply Canny
    edges = cv2.Canny(img_cv2, 100, 200, 3, L2gradient=True)

    result = get_base64_image(edges)

    return [origin, result]


def get_contours_image(img):
    img_cv2 = cv2.imdecode(
        np.fromstring(img.read(), np.uint8),
        cv2.IMREAD_UNCHANGED
    )
    origin = get_base64_image(img_cv2)

    contours, hierarchy = get_contours(img_cv2)

    cv2.drawContours(img_cv2, contours, -1, (0, 255, 0), 3)

    result = get_base64_image(img_cv2)

    return [origin, result]


def text_detection_opencv(img):
    contours, hierarchy = get_contours(img)
    orig = img.copy()
    for cnt in contours:
        x, y, w, h = cv2.boundingRect(cnt)
    # Drawing a rectangle on copied image
    rect = cv2.rectangle(orig, (x, y), (x + w, y + h), (0, 255, 255), 2)
    # cv2.imshow('cnt', rect)
    # cv2.waitKey()
    # Cropping the text block for giving input to OCR
    cropped = orig[y:y + h, x:x + w]
    # Apply OCR on the cropped image
    config = ('-l eng --oem 1 --psm 3')
    text = pytesseract.image_to_string(cropped, config=config)
    print(text)


def get_base64_image(img):
    content = cv2.imencode('.jpg', img)[1].tostring()
    encoded = base64.encodebytes(content)
    return 'data:image/jpg;base64, ' + str(encoded, 'utf-8')


def get_contours(img_cv2):
    # Grayscale
    gray = cv2.cvtColor(img_cv2, cv2.COLOR_BGR2GRAY)

    # Find Canny edges
    edged = cv2.Canny(gray, 30, 200)

    # Finding Contours
    # Use a copy of the image e.g. edged.copy()
    # since findContours alters the image
    contours, hierarchy = cv2.findContours(edged, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_NONE)
    return contours, hierarchy
