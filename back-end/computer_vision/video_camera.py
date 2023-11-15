import threading
import cv2
from importlib import resources as impresources
from . import models


class VideoCamera(object):
    def __init__(self, source):
        self.video = cv2.VideoCapture(source)
        (self.grabbed, self.frame) = self.video.read()
        threading.Thread(target=self.update, args=()).start()

    def __del__(self):
        self.video.release()

    def get_frame(self):
        _, jpeg = cv2.imencode('.jpg', self.frame)
        return jpeg.tobytes()

    def get_gray_frame(self):
        gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        _, jpeg = cv2.imencode('.jpg', gray)
        return jpeg.tobytes()

    def get_face_detect_frame(self):
        haarcascade_frontalface_default_xml = impresources.files(models) / 'haarcascade_frontalface_default.xml'
        haarcascade_eye_xml = impresources.files(models) / 'haarcascade_eye.xml'
        with haarcascade_frontalface_default_xml.open("rt") as f:
            face_cascade = cv2.CascadeClassifier(f.read())
        with haarcascade_eye_xml.open("rt") as f:
            eye_cascade = cv2.CascadeClassifier(f.read())

        img = self.frame

        gray = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)

        # Detects faces of different sizes in the input image
        faces = face_cascade.detectMultiScale(gray, 1.3, 5)

        for (x, y, w, h) in faces:
            # To draw a rectangle in a face
            cv2.rectangle(img, (x, y), (x + w, y + h), (255, 255, 0), 2)
            roi_gray = gray[y:y + h, x:x + w]
            roi_color = img[y:y + h, x:x + w]

            # Detects eyes of different sizes in the input image
            eyes = eye_cascade.detectMultiScale(roi_gray)

            # To draw a rectangle in eyes
            for (ex, ey, ew, eh) in eyes:
                cv2.rectangle(roi_color, (ex, ey), (ex + ew, ey + eh), (0, 127, 255), 2)

        _, jpeg = cv2.imencode('.jpg', img)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()
