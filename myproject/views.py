from django.shortcuts import render
from resume.models import Classes, Skills, Certifications
from resume.models import Education, Projects, Experience, Projects

import logging
from itertools import chain
from datetime import date

logger = logging.getLogger('django')

# Create your views here.
def home(request):
    return render(request, 'home.html')