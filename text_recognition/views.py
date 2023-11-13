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
            save_canny_image(image)
            return HttpResponse("Valid form")
        else:
            # print form errors
            print(form.errors)
            return HttpResponse("Invalid form")

        # get values from form
        data = request.POST
        name = data.get("name")

        files = request.FILES
        image_upload = files.get("image-upload")
        return render(
            request,
            template_name='tr_index.jinja',
            context={
                'image': 'https://i.pinimg.com/736x/20/c9/9c/20c99c680ffe0b40127af797a535a225.jpg',
                'form': form,
            }
        )
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
