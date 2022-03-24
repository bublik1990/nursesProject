from django.urls import path
from .views import *


urlpatterns = [
    path('', index, name='home'),
    path('form/', fill_form, name='fill_form'),
]