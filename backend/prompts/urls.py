from django.urls import path
from . import views

urlpatterns = [
    path('prompts/', views.prompt_list, name='prompt_list'),
    path('prompts/<uuid:prompt_id>/', views.prompt_detail, name='prompt_detail'),
]