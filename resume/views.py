from django.shortcuts import render
from resume.models import Classes , Skills
from resume.models import Education, Service, Projects, Experience, Projects

import logging
from itertools import chain
from datetime import date

logger = logging.getLogger('django')

# Create your views here.
def index(request):
    #sorting the experiences so the most recent will be first, if there is no end date then create a future date and use that
    experience_set = sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1]
    current = Experience.objects.get(current=True)
    education = Education.objects.all()
    service = Service.objects.all()
    skills = Skills.objects.all()
    current = Experience.objects.get(current=True)
    if request.user_agent.is_mobile:
        experience = []
        for entry in experience_set:
            experience.append(entry)
        projects = []
        for entry in Projects.objects.all():
            projects.append(entry)
        activities = []
        dic = {'current': current,
                'experience': experience,
                'service': service,
                'projects': projects,
                'education': education,
                'skills': skills,
                }
        template = 'm_resume/m_resume.html'
    else:
        experience = []
        for i, gig in enumerate(experience_set):
            if i % 3 == 0:
                experience.append([None, None, None])
            experience[i//3][i%3] = gig
        projects = []
        for i, project in enumerate(Projects.objects.all()):
            if i % 3 == 0:
                projects.append([None, None, None])
            projects[i//3][i%3] = project
        template = 'resume/resume.html'
    
    dic = {'current': current,
        'experience': experience,
        'service': service,
        'projects': projects,
        'education': education,
        'skills': skills,
        }
    
    return render(request, template, dic)

def education(request): 
    education = Education.objects.all().order_by('-pk')
    econ = Classes.objects.filter(subject="ECON").order_by("subject", "course_number")
    cse = Classes.objects.filter(subject__in=["CSE", "CDT"]).order_by("-subject", "course_number")
    business = Classes.objects.filter(subject__in=["ITAO", "ACCT", "ACMS"]).order_by("subject", "course_number")
    other = Classes.objects.exclude(subject__in=["ECON", "CSE", "CDT", "ITAO", "ACCT", "ACMS"]).order_by("subject", "course_number")
    dic = {"experience": Experience.objects.all().order_by("-pk"),
            "projects": Projects.objects.all().order_by("-pk"),
            'education': education,
            'classes': [econ, cse, business, other],
           }
    if request.user_agent.is_mobile:
        return render(request, 'm_resume/m_education.html', dic)
    else:
        return render(request, 'resume/education.html', dic)

def individual_education(request, pk):
    individual_education = Education.objects.filter(pk=pk)
    logger.info(individual_education)
    dic = {"individual_education": individual_education}
    return render(request, 'm_resume/m_education.html', dic)



def experience(request):
    dic = {
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
    }

    if request.user_agent.is_mobile:
        template = 'm_resume/m_experience.html'
    else:
        template = 'resume/experience.html'
    
    return render(request, template, dic)

def individual_experience(request, pk):
    experience = Experience.objects.filter(pk=pk)[0]
    dic = {
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "position": experience,
    }

    if request.user_agent.is_mobile:
        template = 'm_resume/m_experience/m_individual.html'
    else:
        template = 'resume/experience/individual.html'
        
    return render(request, template, dic)

def projects(request):
    dic = {
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "skills": Skills.objects.all()
    }
    
    if request.user_agent.is_mobile:
        template = 'm_resume/m_projects.html'
    else:
        template = 'resume/projects.html'

    return render(request, template, dic)    

def individual_projects(request, pk):
    dic = {
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "project": Projects.objects.filter(pk=pk)[0],
    }
   
    if request.user_agent.is_mobile:
        template = 'm_resume/m_projects/m_individual.html'
    else:
        template = 'resume/projects/individual.html'
        
    return render(request, template, dic)

def skills(request):
    dic = {
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "skills": Skills.objects.all()
    }

    if request.user_agent.is_mobile:
        template = 'm_resume/m_skills.html'
    else:
        template = 'resume/skills.html'

    return render(request, template, dic)

def individual_skills(request, pk):
    dic = {
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "skill": Skills.objects.filter(pk=pk)[0],
    }
    
    if request.user_agent.is_mobile:
        template = 'm_resume/m_skills/m_individual.html'
    else:
        template = 'resume/skills/individual.html'

    return render(request, template, dic)

def service(request):
    #assert len(Service.objects.all()) > 0
    dic = {
        #sort experience in descending order based on end_date
        "experience": sorted(Experience.objects.all(), key=lambda x: x.end_date or date(2121, 4, 20))[::-1],
        "projects": Projects.objects.all().order_by("-pk"),
        "service": Service.objects.all()[0] if Service.objects.all() else [],
    }
    
    return render(request, 'resume/service.html', dic)


# For Testing Purposes
from django.http import HttpResponse

def test_502_error(request):
        return HttpResponse(status=502)

