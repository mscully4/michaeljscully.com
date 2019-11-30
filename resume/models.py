from django.db import models

# Create your models here.
class Education(models.Model):
    university = models.CharField(max_length=140, verbose_name="Name of University")
    college = models.CharField(max_length=140, verbose_name="College")
    degree = models.CharField(max_length=140, verbose_name="Type of Degree")
    major = models.CharField(max_length=140, verbose_name="Major")
    year = models.CharField(max_length=4, verbose_name="Year")
    gpa = models.DecimalField(decimal_places=2, max_digits=4, default=4.00, verbose_name="GPA")
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
    banner_width = models.PositiveIntegerField(default=300, verbose_name="Banner Width")
    banner_height = models.PositiveIntegerField(default=100, verbose_name="Banner Height")
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
    short_description = models.TextField()
    long_description = models.TextField()
    languages = models.ManyToManyField('Languages', related_name="boof")
    github = models.CharField(max_length=140, verbose_name="GitHub Link")
    sample = models.FileField(null=True, blank=True, verbose_name="Post a picture of your project")
    caption = models.TextField(null=True, blank=True, verbose_name="Sample Photo Caption")
 
    def __str__(self):
        return self.name

    def get_logos(self):
        languages = [str(lang) for lang in self.languages.all()]
        urls = [Skills.objects.get(skill=i).logo.url for i in languages]
        return urls
   
    def get_languages(self):
        languages = ", ".join([str(lang) for lang in self.languages.all()])
        return languages

    def save(self, *args, **kwargs):
        super(Projects, self).save(*args, **kwargs)

class Service(models.Model):
    name = models.CharField(max_length=140)
    role = models.CharField(max_length=140, blank=True, null=True)
    role_continued = models.CharField(max_length=140, blank=True, null=True)
    short = models.TextField()
    long = models.TextField()
    logo = models.FileField()
    image = models.ImageField()

    def __str__(self):
        return self.name
    
class Investments(models.Model):
    ticker = models.CharField(max_length=9)
    name = models.CharField(max_length=140)
    date_of_purchase = models.DateField()
    price_at_purchase = models.FloatField()

    def __str__(self):
        return self.ticker

class Classes(models.Model):
    subject = models.CharField(max_length=5)
    course_number = models.CharField(max_length=5)
    course_name = models.CharField(max_length=140)
    credit_hours = models.CharField(max_length=1)

    def __str__(self):
        return self.course_name

class Skills(models.Model):
    skill = models.CharField(max_length=40)
    definition = models.TextField()
    backstory = models.TextField(default="BACKSTORY")
    options = ((1, 'Programming'), (0, 'Technical'))
    typeof = models.IntegerField(choices=options, blank=True, null=True)
    logo = models.FileField(blank=True, null=True)
    animations = [("back", "Back"),
                  ("forward", "Forward"),
                  ("down", "Down"),
                  ("up", "Down"),
                  ("spin", "Spin"),
                  ("drop", "Drop"),
                  ("fade", "Fade"),
                  ("float-away", "Float Away"),
                  ("sink-away", "Sink Away"),
                  ("grow", "Grow"),
                  ("shrink", "Shrink"),
                  ("pulse", "Pulse"),
                  ("pulse-grow", "Pulse Grow"),
                  ("pulse-shrink", "Pulse Shrink"),
                  ("push", "Push"),
                  ("pop", "Pop"),
                  ("bounce", "Bounce"),
                  ("rotate", "Rotate"),
                  ("grow-rotate", "Grow Rotate"),
                  ("float", "Float"),
                  ("sink", "Sink"),
                  ("bob", "Bob"),
                  ("hang", "Hang"),
                  ("wobble-horizontal", "Wobble Horizontal"),
                  ("wobble-vertical", "Wobble Vertical"),
                  ("buzz", "Buzz"),
                  ("buzz-out", "Buzz Out"),
        ]
    hover_animation = models.CharField(max_length=40, blank=True, null=True, choices=animations)

    def __str__(self):
        return self.skill

class Languages(models.Model):
    #if len(Skills.objects.all()) > 0:
     #   options = tuple([(option.skill, option.skill) for option in Skills.objects.all()]) 
    options = []
    name = models.CharField(max_length=140, choices=options)

    def __str__(self):
        return self.name