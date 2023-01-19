import os.path

from django.shortcuts import render
from django.template import RequestContext
from .forms import ImageUploadForm
from .models import image_classification, images
from django.http import HttpResponseRedirect
from .py_templates.my_model import prediction
from PIL import Image
import requests
import numpy as np

dis = {'PNEUMONIA': 'PNEUMONIA', 'NORMAL': 'NORMAL'}


def home(request):
    if request.method == "POST":
        images = image_classification.objects.all()
        try:
            url = images[len(images) - 1].pic.url
            pred, percent = prediction(url)
            # out= dis [int(out)]
            print('----------------', url, '----------------')
            print('-----disease is------- ', pred, '----------')
            if percent == 100:
                percent = percent - 3
            return render(request, 'home.html', {'pred': pred, 'percentage': percent, 'url': url})
        except FileNotFoundError:
            return render(request, 'home.html', {'pred': 'no image'})
    else:return render(request, 'home.html', {'pred': 'no image', 'percentage': '', 'url': ''})

def uploadImage(request):
    print('image uploaded via disk')
    img = request.FILES['image']
    image = image_classification(pic=img)
    image.save()
    return HttpResponseRedirect('/')


# return render(request,'home.html')

def uploadURL(request):
    # file_name='image{}.jpg'.format(np.random.randint())
    print('image is uploaded via url')
    url = request.POST.get('imgurls')
    # img=Image.open(urllib2.urlopen(url))
    # img=Image.open(requests.get(url, stream=True).raw)
    imgurl = requests.get(url, stream=True).raw
    out = image_classification(imgurl)
    out = dis[int(out)]
    # img.save(file_name)
    return render(request, 'home.html', {'pred': out, 'url': url})


def getPatientImage(request):
    if request.method == "POST":
        pk = request.POST.get('image')
        image = images.get_image_by_id(id=pk)
        print(image)
        try:
            url = image[len(image) - 1].pic.url
            pred, percent = prediction(url)
            print('----------------', url, '----------------')
            print('-----disease is------- ', pred, '----------')

            if percent == 100:
                percent = percent - 3
            return render(request, 'home.html', {'pred': pred, 'percentage': percent, 'url': url})
        except FileNotFoundError:
            return render(request, 'home.html', {'pred': 'no image'})


def uploadImageID(request, pk):
    img = images.objects.filter(id=pk)
    if request.method == "POST":
        images(pk=img)
        return HttpResponseRedirect('/')
# return render(request,'home.html')


def error(request):
    return render(request, '505.html')

def imageForm(request):
    if request.method == "POST":
        form = ImageUploadForm(request.POST, request.FILES)
        if form.is_valid():
            form.save()
            img = form.instance
            return render(request, 'radiology.html', {'form': form, 'img': img})
    else:
        form = ImageUploadForm()
        return render(request, 'radiology.html', {'form': form})

def imagelist(request):
    img = images.objects.all()
    return render(request, 'imageslist.html', {'img':img})
