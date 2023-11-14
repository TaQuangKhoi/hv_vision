from django.db import models


class History(models.Model):
    image = models.ImageField(default=None
                              )
    result = models.ImageField(default=None)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
