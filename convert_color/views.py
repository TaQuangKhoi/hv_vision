from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# use render() instead of HttpResponse()
def index_convert_color(request):
    return render(
        request,
        template_name='index.jinja',
        context={
            'image': 'https://i.pinimg.com/736x/20/c9/9c/20c99c680ffe0b40127af797a535a225.jpg',
        }
    )



