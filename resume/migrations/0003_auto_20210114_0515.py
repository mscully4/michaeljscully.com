# Generated by Django 3.1.4 on 2021-01-14 05:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('resume', '0002_projects_overview'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='education',
            name='mascot',
        ),
        migrations.AlterField(
            model_name='education',
            name='major',
            field=models.CharField(blank=True, max_length=140, null=True, verbose_name='Major'),
        ),
    ]