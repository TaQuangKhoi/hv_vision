from django.views.decorators import gzip
from django.http import StreamingHttpResponse, HttpResponse, JsonResponse, FileResponse
from django.views.decorators.csrf import csrf_exempt
import json

from computer_vision.video_camera import VideoCamera
import socketio

sio = socketio.Server(async_mode='threading')

rtmp_url = "rtmp://35.185.190.46/live/keios"


@sio.on('connect')
def my_event(sid):
    print("connected")


def gen(camera):
    while True:
        frame = camera.get_frame()
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


def generate_video(frame):
    while True:
        yield (b'--frame\r\n'
               b'Content-Type: image/jpeg\r\n\r\n' + frame + b'\r\n\r\n')


@csrf_exempt
def update_url(request):
    if request.method == "POST":
        global rtmp_url
        rtmp_url = json.loads(request.body)["rtmp_url"]
        return HttpResponse("OK")


@gzip.gzip_page
def gray(request):
    """ Gray Video """
    try:
        cam = VideoCamera(rtmp_url)
        return StreamingHttpResponse(generate_video(cam.get_gray_frame()),
                                     content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        return JsonResponse({"error": "error"})


@gzip.gzip_page
def video(request):
    """ Normal Video """
    try:
        cam = VideoCamera(rtmp_url)
        return StreamingHttpResponse(generate_video(cam.get_frame()),
                                     content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        return JsonResponse({"error": "error"})


@gzip.gzip_page
def face_detect(request):
    """ Normal Video """
    try:
        print("view face_detect")
        cam = VideoCamera(rtmp_url)
        return StreamingHttpResponse(generate_video(cam.get_face_detect_frame()),
                                     content_type="multipart/x-mixed-replace;boundary=frame")
    except:  # This is bad! replace it with proper handling
        return JsonResponse({"error": "error"})
