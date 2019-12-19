from django.shortcuts import render
from resume.models import Classes, Skills, Certifications
from resume.models import Education, Projects, Experience, Projects

import logging
from itertools import chain
from datetime import date

logger = logging.getLogger('django')

# Create your views here.
def index(request):
    #sorting the experiences so the most recent will be first, if there is no end date then create a future date and use that
    experiences = sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1]
    projects = Projects.objects.all()
    education = Education.objects.all()
    skills = Skills.objects.all()
    certifications = Certifications.objects.all()
    current = Experience.objects.get(current=True)
    if request.user_agent.is_mobile:
        template = 'm_resume/m_resume.html'
    else:
        template = 'resume/resume.html'
    
    dic = {'current': current,
        'experiences': experiences,
        'projects': projects,
        'education': education,
        'skills': skills,
        "certifications": certifications,
        }
    
    return render(request, template, dic)

def education(request): 
    education = Education.objects.all().order_by('-pk')
    classes = [Classes.objects.filter(school_id=1) for i in list(Classes.objects.order_by('school_id').values_list('school_id').distinct())]
    dic = {"experiences": Experience.objects.all().order_by("-pk"),
            "projects": Projects.objects.all().order_by("-pk"),
            'education': education,
            'classes': Classes.objects.all(),
           }
    # if request.user_agent.is_mobile:
    #     return render(request, 'm_resume/m_education.html', dic)
    # else:
    return render(request, 'resume/education.html', dic)

def individual_education(request, pk):
    individual_education = Education.objects.filter(pk=pk)
    logger.info(individual_education)
    return render(request, 'm_resume/m_education.html', {"individual_education": individual_education})



def experience(request):
    dic = {
        "experiences": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
    }

    # if request.user_agent.is_mobile:
    #     template = 'm_resume/m_experience.html'
    # else:
    template = 'resume/experience.html'
    
    return render(request, template, dic)

def individual_experience(request, pk):
    experience = Experience.objects.filter(pk=pk)[0]
    dic = {
        "experiences": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "position": experience,
    }

    # if request.user_agent.is_mobile:
    #     template = 'm_resume/m_experience/m_individual.html'
    # else:
    template = 'resume/experience/individual.html'
        
    return render(request, template, dic)

def projects(request):
    dic = {
        "experiences": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "skills": Skills.objects.all()
    }
    
    # if request.user_agent.is_mobile:
    #     template = 'm_resume/m_projects.html'
    # else:
    template = 'resume/projects.html'

    return render(request, template, dic)    

def individual_projects(request, pk):
    dic = {
        "experiences": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "project": Projects.objects.filter(pk=pk)[0],
    }
   
    # if request.user_agent.is_mobile:
    #     template = 'm_resume/m_projects/m_individual.html'
    # else:
    template = 'resume/projects/individual.html'
        
    return render(request, template, dic)

def skills(request):
    dic = {
        "experiences": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "skills": Skills.objects.all()
    }

    # if request.user_agent.is_mobile:
    #     template = 'm_resume/m_skills.html'
    # else:
    template = 'resume/skills.html'

    return render(request, template, dic)

def individual_skills(request, pk):
    dic = {
        "experiences": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "skill": Skills.objects.filter(pk=pk)[0],
    }
    
    # if request.user_agent.is_mobile:
    #     template = 'm_resume/m_skills/m_individual.html'
    # else:
    template = 'resume/skills/individual.html'

    return render(request, template, dic)

# def service(request):
#     #assert len(Service.objects.all()) > 0
#     dic = {
#         #sort experience in descending order based on end_date
#         "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
#         "projects": Projects.objects.all().order_by("-pk"),
#         "service": Service.objects.all()[0] if Service.objects.all() else [],
#     }
    
#     return render(request, 'resume/service.html', dic)


# For Testing Purposes
from django.http import HttpResponse

def test_502_error(request):
        return HttpResponse(status=502)

