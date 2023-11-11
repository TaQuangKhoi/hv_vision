from django.shortcuts import render


def index(request):
    return render(
        request,
        template_name='index.jinja',
        context={
            'image': 'https://i.pinimg.com/736x/20/c9/9c/20c99c680ffe0b40127af797a535a225.jpg',
        }
    )
