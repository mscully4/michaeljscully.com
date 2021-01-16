from django.db import models
from multiselectfield import MultiSelectField
from django.conf import settings
import json 
import boto3
from datetime import date
from django.core.exceptions import ValidationError

animations = [("back", "Back"), ("forward", "Forward"), ("down", "Down"), ("up", "Down"), ("spin", "Spin"),
    ("drop", "Drop"), ("fade", "Fade"), ("float-away", "Float Away"), ("sink-away", "Sink Away"), ("grow", "Grow"),
    ("shrink", "Shrink"), ("pulse", "Pulse"), ("pulse-grow", "Pulse Grow"), ("pulse-shrink", "Pulse Shrink"), 
    ("push", "Push"), ("pop", "Pop"), ("bounce", "Bounce"), ("rotate", "Rotate"), ("grow-rotate", "Grow Rotate"), 
    ("float", "Float"), ("sink", "Sink"), ("bob", "Bob"), ("hang", "Hang"), ("wobble-horizontal", "Wobble Horizontal"), 
    ("wobble-vertical", "Wobble Vertical"), ("buzz", "Buzz"), ("buzz-out", "Buzz Out"),
    ]

#Validators
def date_validator_past_only(value):
    if value > date.today():
        raise ValidationError("Only Dates in the Past Are Allowed")

def date_validator_future_only(value):
    if value < date.today():
        raise ValidationError("Only Dates in the Future Are Allowed")

#Utilities
def overwrite_db(file_name, bucket, object_name=None):
    """Upload a file to an S3 bucket

    :param file_name: File to upload
    :param bucket: Bucket to upload to
    :param object_name: S3 object name. If not specified then file_name is used
    :return: True if file was uploaded, else False
    """

    # If S3 object_name was not specified, use file_name
    if object_name is None:
        object_name = file_name

    # Upload the file
    s3_client = boto3.client('s3')
    try:
        response = s3_client.upload_file(file_name, bucket, object_name)
    except Exception as e:
        print(e)
        return False
    return True

from django.core.validators import MaxValueValidator, MinValueValidator

# Create your models here.
class Education(models.Model):
    university = models.CharField(max_length=140, verbose_name="Name of University")
    college = models.CharField(max_length=140, verbose_name="College")
    degree = models.CharField(max_length=140, verbose_name="Type of Degree")
    major = models.CharField(max_length=140, verbose_name="Major", null=True, blank=True)
    start_year = models.IntegerField(verbose_name="Start Year", validators=[MinValueValidator(2000), MaxValueValidator(2100)])
    end_year = models.IntegerField(verbose_name="End Year", null=True, blank=True, validators=[MinValueValidator(2000), MaxValueValidator(2100)])
    gpa = models.DecimalField(decimal_places=2, max_digits=4, default=4.00, verbose_name="GPA")
    banner = models.FileField(default="IMAGE URL", verbose_name="Banner Image")
    logo = models.FileField(default="IMAGE URL", verbose_name="Logo")

    def __str__(self):
        return self.university

    def save(self, *args, **kwargs):
        super(Education, self).save(*args, **kwargs)
        overwrite_db(settings.DATABASES['default']['NAME'], settings.AWS_STORAGE_BUCKET_NAME, 'db.sqlite3')


class Experience(models.Model):
    name = models.CharField(max_length=140, verbose_name="Company Name")
    role = models.CharField(max_length=140)
    start_date = models.DateField(verbose_name="Start Date")
    end_date = models.DateField(verbose_name="End Date", blank=True, null=True)
    current = models.BooleanField(verbose_name="Current Role?", default=False)
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
        overwrite_db(settings.DATABASES['default']['NAME'], settings.AWS_STORAGE_BUCKET_NAME, 'db.sqlite3')


class Projects(models.Model):
    industry = models.CharField(max_length=140)
    overview = models.CharField(max_length=300)
    start_date = models.DateField(verbose_name="Start Date", blank=True, null=True)
    end_date = models.DateField(verbose_name="End Date", blank=True, null=True)
    long_description = models.TextField()
    skills = models.ManyToManyField('Skills')
 
    def __str__(self):
        return f"{self.industry}: {self.overview}"

    def save(self, *args, **kwargs):
        super(Projects, self).save(*args, **kwargs)
        overwrite_db(settings.DATABASES['default']['NAME'], settings.AWS_STORAGE_BUCKET_NAME, 'db.sqlite3')


class Classes(models.Model):
    school = models.ForeignKey(Education, on_delete=models.CASCADE)
    subject = models.CharField(max_length=5)
    course_number = models.CharField(max_length=5)
    course_name = models.CharField(max_length=140)
    credit_hours = models.CharField(max_length=1)

    def __str__(self):
        return self.course_name

    def save(self, *args, **kwargs):
        super(Classes, self).save(*args, **kwargs)
        overwrite_db(settings.DATABASES['default']['NAME'], settings.AWS_STORAGE_BUCKET_NAME, 'db.sqlite3')


class Skills(models.Model):
    skill = models.CharField(max_length=40)
    frameworks = models.TextField()
    logo = models.FileField(verbose_name="Language Logo")
    hover_animation = models.CharField(max_length=40, blank=True, null=True, choices=animations)
    
    def __str__(self):
        return self.skill

    def save(self, *args, **kwargs):
        super(Skills, self).save(*args, **kwargs)
        overwrite_db(settings.DATABASES['default']['NAME'], settings.AWS_STORAGE_BUCKET_NAME, 'db.sqlite3')


class Certifications(models.Model):
    name = models.CharField(max_length=140)
    vendor = models.CharField(max_length=60)
    acquired = models.DateField(verbose_name="Acquisiton Date of the Certificate", validators=[date_validator_past_only])
    expire = models.DateField(verbose_name="Expiration Date of the Certificate", validators=[date_validator_future_only])
    certificate = models.ImageField()
    icon = models.ImageField(blank=True, null=True)

    def __str__(self):
        return "{} {}".format(self.vendor, self.name)

    def save(self, *args, **kwargs):
        super(Certifications, self).save(*args, **kwargs)
        overwrite_db(settings.DATABASES['default']['NAME'], settings.AWS_STORAGE_BUCKET_NAME, 'db.sqlite3')

