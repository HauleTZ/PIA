from django.urls import path
from django.views.defaults import server_error

from . import views

urlpatterns = [
    path('',views.home,name='home', ),
    path('upload',views.uploadImage, name='uploadImage'),
    path('upoadbyURL',views.uploadURL, name='uploadURL'),
    path('uploadImageId',views.uploadImageID, name='uploadImageID'),
    path('getPatientImage', views.getPatientImage, name='get-patient-image'),
    path('imageForm', views.imageForm, name='image-form'),
    path('imageList', views.imagelist, name='imagelist')
    ]
handler500 = "sub_app.views.error"


