from django.http import HttpResponse
from django.shortcuts import render
from .forms import ImageForm
from .utils import save_canny_image


def index(request):
    """Index page view"""

    if request.method == 'POST':
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            # length of request.FILES
            # print(len(request.FILES))
            image = request.FILES.get("imageInput")
            [image_upload, image_preview] = save_canny_image(image)
            return render(
                request,
                template_name='tr_index.jinja',
                context={
                    'imageUpload': image_upload,
                    'imagePreview': image_preview,
                    'form': form,
                }
            )
        else:
            # print form errors
            print(form.errors)
            return HttpResponse("Invalid form")
    else:
        form = ImageForm()
        return render(
            request,
            template_name='tr_index.jinja',
            context={
                # 'image': 'https://i.pinimg.com/736x/20/c9/9c/20c99c680ffe0b40127af797a535a225.jpg', # Hình Hảo
                'imageUpload': 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
                'imagePreview': 'https://cdn-icons-png.flaticon.com/512/2659/2659360.png',
                'form': form,
            }
        )
