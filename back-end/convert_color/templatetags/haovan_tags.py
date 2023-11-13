from django import template

register = template.Library()


@register.simple_tag
def static_dir(request):
    return 'convert_color'
