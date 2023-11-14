from rest_framework import views
from rest_framework.parsers import MultiPartParser
from rest_framework.renderers import JSONRenderer
from rest_framework.response import Response

from computer_vision import utils


class FileUploadView(views.APIView):
    parser_classes = (MultiPartParser,)

    def post(self, request, format=None):
        file_obj = request.data.get('file')
        [image_upload, image_preview] = utils.get_contours_image(file_obj)
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

    def get(self, request, filename, format=None):
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
