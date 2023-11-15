from django.views.decorators import gzip
from django.http import StreamingHttpResponse, HttpResponse, JsonResponse, FileResponse
import cv2
import threading


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
        image = cv2.cvtColor(self.frame, cv2.COLOR_BGR2GRAY)
        _, jpeg = cv2.imencode('.jpg', image)
        return jpeg.tobytes()

    def update(self):
        while True:
            (self.grabbed, self.frame) = self.video.read()


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


def generate_video(frame):
    while True:
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@gzip.gzip_page
def gray(request):
    """ Gray Video """
    try:
        cam = VideoCamera("rtmp://35.185.190.46/live/keios")
        return StreamingHttpResponse(generate_video(cam.get_gray_frame()),
                                     content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        return JsonResponse({"error": "error"})


@gzip.gzip_page
def video(request):
    """ Normal Video """
    try:
        cam = VideoCamera("rtmp://35.185.190.46/live/keios")
        return StreamingHttpResponse(generate_video(cam.get_frame()),
                                     content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        return JsonResponse({"error": "error"})


def get_image(request):
    print("get_image")

    cam = VideoCamera("rtmp://35.185.190.46/live/keios")
    frame = cam.get_frame()
    print("frame")

    image = yield (b'--frame\r\n'
                   b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')
    print("yield")

    img = open(image, 'rb')
    print("open")

    return FileResponse(img)
