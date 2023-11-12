from django.shortcuts import render
import cv2

def index(request):
    """Index page view"""

    if request.method == 'POST':
        # get values from form
        data = request.POST
        name = data.get("name")
        print(name)

        files = request.FILES
        image_upload = files.get("image-upload")
        print(type(image_upload))
        # save image to media folder
        # with open(f"media/test.png", 'wb+') as destination:
        #     for chunk in image_upload.chunks():
        #         destination.write(chunk)

    return render(
        request,
        template_name='tr_index.jinja',
        context={
            'image': 'https://i.pinimg.com/736x/20/c9/9c/20c99c680ffe0b40127af797a535a225.jpg',
        }
    )
