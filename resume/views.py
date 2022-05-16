from django.shortcuts import render
from django.http import HttpResponse
import logging
from datetime import date
from resume.models import Classes, Skills, Certifications, Education, Projects \
    , Experience


logger = logging.getLogger("django")


def index(request):
    # Sorting the experiences so the most recent will be first, if
    # there is no end date then create a future date and use that
    experiences = sorted(
        Experience.objects.all(),
        reverse=True,
        key=lambda x: x.end_date or date(2069, 4, 20),
    )
    projects = sorted(
        Projects.objects.all(),
        reverse=True,
        key=lambda x: x.end_date or date(2069, 4, 20),
    )
    education = Education.objects.all()
    skills = Skills.objects.all()
    certifications = Certifications.objects.all()
    try:
        current = Experience.objects.get(current=True)
    except Experience.DoesNotExist:
        current = None

    data = {
        "current": current,
        "experiences": experiences,
        "projects": projects,
        "education": education,
        "skills": skills,
        "certifications": certifications,
    }

    return render(request, "resume/resume.html", data)


def education(request):
    education = Education.objects.all().order_by("-pk")
    data = {
        "education": education,
        "classes": Classes.objects.all(),
    }

    return render(request, "resume/education.html", data)


def experience(request):
    data = {
        "experiences": sorted(
            Experience.objects.all(),
            reverse=True,
            key=lambda x: x.end_date or date(2069, 4, 20),
        ),
    }

    return render(request, "resume/experience.html", data)


def individual_experience(request, pk):
    data = {
        "position": Experience.objects.filter(pk=pk)[0]
    }

    return render(request, "resume/experience_individual.html", data)


def projects(request):
    data = {
        "projects": sorted(
            Projects.objects.all(),
            reverse=True,
            key=lambda x: x.end_date or date(2069, 4, 20),
        )
    }

    return render(request, "resume/projects.html", data)


def individual_projects(request, pk):
    data = {
        "project": Projects.objects.filter(pk=pk)[0]
    }

    return render(request, "resume/individual_project.html", data)


def skills(request):
    data = {
        "skills": Skills.objects.all()
    }

    return render(request, "resume/skills.html", data)


def individual_skills(request, pk):
    data = {
        "skill": Skills.objects.filter(pk=pk)[0]
    }

    return render(request, "resume/individual_skill.html", data)


# For Testing Purposes


def test_502_error(request):
    return HttpResponse(status=502)
