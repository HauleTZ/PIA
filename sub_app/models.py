from django.db import models

class image_classification(models.Model):
    pic=models.ImageField(upload_to='images')

class images(models.Model):
    id = models.AutoField(primary_key=True)
    pic=models.ImageField(upload_to='images')

    @classmethod
    def get_image_by_id(cls, id):
        image = images.objects.filter(id=id)
        return image


