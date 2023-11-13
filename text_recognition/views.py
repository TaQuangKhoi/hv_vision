from django.http import HttpResponse
from django.shortcuts import render
from .forms import ImageForm
import cv2


def index(request):
    """Index page view"""

    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            # length of request.FILES
            # print(len(request.FILES))
            image = request.FILES.get("imageInput")

            # Open the image in OpenCV
            img = cv2.imread(image)

            # Apply Canny
            edges = cv2.Canny(img, 100, 200, 3, L2gradient=True)

            with open(f"media/test.png", 'wb+') as destination:
                for chunk in edges.chunks():
                    destination.write(chunk)
            # for file in request.FILES.getlist('imageInput'):
            #     print(file)
            #     print(type(file))
        else:
            # print form errors
            print(form.errors)
            return HttpResponse("Invalid form")

        # get values from form
        data = request.POST
        name = data.get("name")

        files = request.FILES
        image_upload = files.get("image-upload")
        return HttpResponse("OK")
    else:
        form = ImageForm()
        return render(
            request,
            template_name='tr_index.jinja',
            context={
                'image': 'https://i.pinimg.com/736x/20/c9/9c/20c99c680ffe0b40127af797a535a225.jpg',
                'form': form,
            }
        )
