from django.db import models
from multiselectfield import MultiSelectField

animations = [("back", "Back"), ("forward", "Forward"), ("down", "Down"), ("up", "Down"), ("spin", "Spin"),
    ("drop", "Drop"), ("fade", "Fade"), ("float-away", "Float Away"), ("sink-away", "Sink Away"), ("grow", "Grow"),
    ("shrink", "Shrink"), ("pulse", "Pulse"), ("pulse-grow", "Pulse Grow"), ("pulse-shrink", "Pulse Shrink"), 
    ("push", "Push"), ("pop", "Pop"), ("bounce", "Bounce"), ("rotate", "Rotate"), ("grow-rotate", "Grow Rotate"), 
    ("float", "Float"), ("sink", "Sink"), ("bob", "Bob"), ("hang", "Hang"), ("wobble-horizontal", "Wobble Horizontal"), 
    ("wobble-vertical", "Wobble Vertical"), ("buzz", "Buzz"), ("buzz-out", "Buzz Out"),
    ]

# Create your models here.
class Education(models.Model):
    university = models.CharField(max_length=140, verbose_name="Name of University")
    college = models.CharField(max_length=140, verbose_name="College")
    degree = models.CharField(max_length=140, verbose_name="Type of Degree")
    major = models.CharField(max_length=140, verbose_name="Major")
    year = models.CharField(max_length=4, verbose_name="Year")
    gpa = models.DecimalField(decimal_places=2, max_digits=4, default=4.00, verbose_name="GPA")
    # classes = models.ForeignKey('Classes', on_delete=models.CASCADE)
    banner = models.FileField(default="IMAGE URL", verbose_name="Banner Image")
    logo = models.FileField(default="IMAGE URL", verbose_name="Logo")
    m_logo_width = models.PositiveIntegerField(default=50, verbose_name="Mobile Logo Width")
    mascot = models.FileField(default="IMAGE URL", verbose_name="Mascot Image")

    def __str__(self):
        return self.university
    
class Experience(models.Model):
    name = models.CharField(max_length=140, verbose_name="Company Name")
    role = models.CharField(max_length=140)
    role_continued = models.CharField(max_length=140, blank=True, null=True, verbose_name="Role (Continued)")
    start_date = models.DateField(verbose_name="Start Date", blank=True, null=True)
    end_date = models.DateField(verbose_name="End Date", blank=True, null=True)
    current = models.BooleanField(verbose_name="Current Role?", default=False)
    short_description = models.TextField()
    long_description = models.TextField(blank=True, null=True, verbose_name="Long Description")
    banner = models.ImageField(verbose_name="Banner Image")
    tile = models.ImageField(verbose_name="Tile Image")
    
    def __str__(self):
        return self.name

    def save(self, *args, **kwargs):
        if not kwargs.pop('chain', False):
            for obj in self.__class__.objects.exclude(pk=self.pk):
                if obj.current:
                    obj.current = False
                    obj.save(chain=True)
        super(Experience, self).save(*args, **kwargs)

class Projects(models.Model):
    name = models.CharField(max_length=140)
    overview = models.CharField(max_length=140)
    long_description = models.TextField()
    # choices = [(obj.logo.url, obj.skill) for obj in Skills.objects.all()]
    # print(choices)
    # skills_used = MultiSelectField(choices=choices, max_length=300)
    skills = models.ManyToManyField('Skills')
    github = models.CharField(max_length=140, verbose_name="GitHub Link")
 
    def __str__(self):
        return self.name

    # def get_logos(self):
    #     languages = [str(lang) for lang in self.languages.all()]
    #     urls = [Skills.objects.get(skill=i).logo.url for i in languages]
    #     return urls
   
    # def get_languages(self):
    #     languages = ", ".join([str(lang) for lang in self.languages.all()])
    #     return languages

    def save(self, *args, **kwargs):
        super(Projects, self).save(*args, **kwargs)


class Classes(models.Model):
    school = models.ForeignKey(Education, on_delete=models.CASCADE)
    subject = models.CharField(max_length=5)
    course_number = models.CharField(max_length=5)
    course_name = models.CharField(max_length=140)
    credit_hours = models.CharField(max_length=1)

    def __str__(self):
        return self.course_name

class Skills(models.Model):
    skill = models.CharField(max_length=40)
    description = models.TextField()
    logo = models.FileField(verbose_name="Language Logo")
    hover_animation = models.CharField(max_length=40, blank=True, null=True, choices=animations)
    

    def __str__(self):
        return self.skill


from datetime import date
from django.core.exceptions import ValidationError

def date_validator_past_only(value):
    if value > date.today():
        raise ValidationError("Only Dates in the Past Are Allowed")

def date_validator_future_only(value):
    if value < date.today():
        raise ValidationError("Only Dates in the Future Are Allowed")

class Certifications(models.Model):
    name = models.CharField(max_length=140)
    vendor = models.CharField(max_length=60)
    acquired = models.DateField(verbose_name="Acquisiton Date of the Certificate", validators=[date_validator_past_only])
    expire = models.DateField(verbose_name="Expiration Date of the Certificate", validators=[date_validator_future_only])
    certificate = models.ImageField()
    icon = models.ImageField(blank=True, null=True)

    def __str__(self):
        return "{} {}".format(self.vendor, self.name)

