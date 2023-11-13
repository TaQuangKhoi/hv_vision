from django.db import models


class ImageProcessingResult(models.Model):
    id = models.AutoField(primary_key=True)
    image = models.ImageField(upload_to='images/')  # Store processed images

    # Add fields to store information about the image processing
    processing_date = models.DateTimeField(auto_now_add=True)
    processing_method = models.CharField(max_length=255)

    def __str__(self):
        return f"Processed Image {self.id}"
