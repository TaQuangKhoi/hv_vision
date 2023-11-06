from django.http import HttpResponse
from django.shortcuts import render


def index(request):
    return HttpResponse("Hello, world. You're at the polls index.")


# use render() instead of HttpResponse()
def index_convert_color(request):
    return render(request, template_name='index.html')
