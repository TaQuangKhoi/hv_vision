from django.http.multipartparser import MultiPartParser
from django.shortcuts import render
from django.views import View
from rest_framework import viewsets, views
from rest_framework.parsers import FileUploadParser, FormParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from .models import History
from .serializers import HistorySerializer

from computer_vision import utils


class HistoryViewSet(viewsets.ModelViewSet):
    queryset = History.objects.all()
    serializer_class = HistorySerializer


class FileUploadView(views.APIView):
    # parser_classes = (MultiPartParser, FormParser)

    def post(self, request, format=None):
        file_obj = request.FILES.get("file")
        [image_upload, image_preview] = utils.get_canny_image(file_obj)
        res = {
            'imageUpload': image_upload,
            'imagePreview': image_preview,
        }
        json_data = JSONRenderer().render(res)
        return Response(
            json_data,
            status=200,
            content_type='application/json'
        )

    def get(self, request, format=None):
        res = {
            'message': "Khôi nhớ Hảo"
        }
        json_data = JSONRenderer().render(res)
        print('GET')
        return Response(
            json_data,
            status=200,
            content_type='application/json'
        )


class CannyView(View):
    pass
