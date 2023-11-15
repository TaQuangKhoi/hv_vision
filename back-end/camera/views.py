from django.views.decorators import gzip
from django.http import StreamingHttpResponse, HttpResponse
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
        # Processing image here
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


@gzip.gzip_page
def livefe(request):
    try:
        cam = VideoCamera("rtmp://35.185.190.46/live/keios")
        return StreamingHttpResponse(gen(cam), content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        return HttpResponse("error")
