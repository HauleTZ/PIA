from django import forms
from .models import images


class ImageUploadForm(forms.ModelForm):
    #image=forms.ImageField(widget=forms.TextInput(attrs={"class":"form-control"}))

    class Meta:
        model = images
        fields=['pic']