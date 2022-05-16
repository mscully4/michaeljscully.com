from django import forms
from resume.widgets import MonthYearWidget


class MonthYearForm(forms.Form):
    date = forms.DateField(widget=MonthYearWidget)
