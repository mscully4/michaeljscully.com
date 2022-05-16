from django.contrib import admin
from django import forms
from datetime import datetime
from resume.models import Classes
from resume.models import Projects, Education, Experience, Skills, Certifications
from resume.widgets import MonthYearWidget


class ExperienceForm(forms.ModelForm):
    class Meta:
        model = Experience
        widgets = {
            "start_date": MonthYearWidget(years=range(1997, datetime.now().year + 1)),
            "end_date": MonthYearWidget(
                years=range(1997, datetime.now().year + 1), required=False
            ),
        }
        fields = "__all__"


class ExperienceClassAdmin(admin.ModelAdmin):
    form = ExperienceForm


class ProjectsForm(forms.ModelForm):
    class Meta:
        model = Projects
        widgets = {
            "start_date": MonthYearWidget(years=range(1997, datetime.now().year + 1)),
            "end_date": MonthYearWidget(
                years=range(1997, datetime.now().year + 1), required=False
            ),
        }
        fields = "__all__"


class ProjectsClassAdmin(admin.ModelAdmin):
    form = ProjectsForm


class ClassesInline(admin.TabularInline):
    model = Classes


class EducationAdmin(admin.ModelAdmin):
    inlines = [
        ClassesInline,
    ]


admin.site.register(Education, EducationAdmin)
admin.site.register(Experience, ExperienceClassAdmin)
admin.site.register(Projects, ProjectsClassAdmin)
admin.site.register(Skills)
admin.site.register(Certifications)
