"""django_project URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""

from django.contrib import admin
from django.urls import path
from . import views
from django.views.generic import ListView, DetailView

urlpatterns = [
    path('', views.index, name="index"),
    path('admin/', admin.site.urls),
    path('education', views.education, name="education"),
    path('experience', views.experience, name="experience"),
    path('experience/<int:pk>', views.individual_experience, name="individual_experience"),
    path('projects', views.projects, name="projects"),
    path('projects/<int:pk>', views.individual_projects, name="individual_projects"),
    path('skills', views.skills, name="skills"),
    path('skills/<int:pk>', views.individual_skills, name="individual_skills"),
    path('502', views.test_502_error, name="502 Error"),
]
