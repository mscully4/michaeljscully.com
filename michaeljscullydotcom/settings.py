"""
Django settings for michaeljscullydotcom project.

Generated by 'django-admin startproject' using Django 2.2.7.

For more information on this file, see
https://docs.djangoproject.com/en/2.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/2.2/ref/settings/
"""

import os
import configparser

config = configparser.ConfigParser()
config.read("credentials.ini")

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/2.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = config['Django']['SECRET_KEY']

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['*']

# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django_user_agents',
    'resume',
    'storages',
    'multiselectfield'
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django_user_agents.middleware.UserAgentMiddleware',
]

ROOT_URLCONF = 'michaeljscullydotcom.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'michaeljscullydotcom.wsgi.application'


# Database
# https://docs.djangoproject.com/en/2.2/ref/settings/#databases
import pymysql
pymysql.install_as_MySQLdb()
# if os.getenv('GAE_APPLICATION', None):
#     # Running on production App Engine, so connect to Google Cloud SQL using
#     # the unix socket at /cloudsql/<your-cloudsql-connection string>
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.mysql',
#             'HOST': config['GCloud']['HOST'],
#             'USER': config['GCloud']['USER'],
#             'PASSWORD': config['GCloud']['PASSWORD'],
#             'NAME': config['GCloud']['DATABASE_NAME']
#         }
#     }
# else:
#     # Running locally so connect to either a local MySQL instance or connect to
#     # Cloud SQL via the proxy. To start the proxy via command line:
#     #
#     #     $ cloud_sql_proxy -instances=[INSTANCE_CONNECTION_NAME]=tcp:3306
#     #
#     # See https://cloud.google.com/sql/docs/mysql-connect-proxy
#     DATABASES = {
#         'default': {
#             'ENGINE': 'django.db.backends.mysql',
#             'HOST': '127.0.0.1',
#             'PORT': '3306',
#             'NAME': config['GCloud']['DATABASE_NAME'],
#             'USER': config['GCloud']['USER'],
#             'PASSWORD': config['GCloud']['PASSWORD'],
#         }
#     }

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': os.path.join(BASE_DIR, 'db.sqlite3'),
    }
}


# Password validation
# https://docs.djangoproject.com/en/2.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/2.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/2.2/howto/static-files/

# MEDIA_URL = '/media/'
# MEDIA_ROOT = os.path.join(BASE_DIR, 'media')

# AWS_ACCESS_KEY_ID = config['AWS']['AWS_ACCESS_KEY_ID'] #"AKIA2WIZHBHNND3OZRQS" #os.getenv('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = config['AWS']['AWS_SECRET_ACCESS_KEY'] #'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' #os.getenv('AWS_SECRET_ACCESS_KEY')
# AWS_STORAGE_BUCKET_NAME = config['AWS']['AWS_STORAGE_BUCKET_NAME'] #'michaeljscullydotcom' #os.getenv('AWS_STORAGE_BUCKET_NAME')
# AWS_DEFAULT_ACL = None
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
# AWS_S3_REGION_NAME = 'us-east-1'
# # s3 static settings
# STATIC_ROOT = 'static'
# STATIC_URL = '/static/'
# # STATIC_LOCATION = 'static'
# # STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{STATIC_LOCATION}/'
# # STATICFILES_STORAGE = 'config.storage_backends.StaticStorage'
# # s3 media settings
# MEDIA_LOCATION = 'media'
# MEDIA_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{MEDIA_LOCATION}/'
# DEFAULT_FILE_STORAGE = 'config.storage_backends.PrivateMediaStorage'

# AWS_ACCESS_KEY_ID = "AKIA2WIZHBHNIAJPDOTK" #os.getenv('AWS_ACCESS_KEY_ID')
# AWS_SECRET_ACCESS_KEY = "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" #os.getenv('AWS_SECRET_ACCESS_KEY')
# AWS_STORAGE_BUCKET_NAME = 'michaeljscullydotcom-static' #os.getenv('AWS_STORAGE_BUCKET_NAME')
# AWS_DEFAULT_ACL = 'public-read'
# AWS_S3_CUSTOM_DOMAIN = f'{AWS_STORAGE_BUCKET_NAME}.s3.amazonaws.com'
# AWS_S3_OBJECT_PARAMETERS = {'CacheControl': 'max-age=86400'}
# # s3 static settings
# AWS_LOCATION = 'static'
# STATIC_URL = f'https://{AWS_S3_CUSTOM_DOMAIN}/{AWS_LOCATION}/'
# STATICFILES_STORAGE = 'storages.backends.s3boto3.S3Boto3Storage'

# # add the correct application credentials
DEFAULT_FILE_STORAGE = 'config.storage_backends.GoogleCloudMediaStorage'
GS_MEDIA_BUCKET_NAME = 'michaeljscullydotcommedia'
MEDIA_URL = 'https://storage.googleapis.com/{}/'.format(GS_MEDIA_BUCKET_NAME)


if DEBUG == True:
    STATIC_URL = '/static/'
else:
    STATICFILES_STORAGE = 'config.storage_backends.GoogleCloudStaticStorage'
    GS_STATIC_BUCKET_NAME = 'michaeljscullydotcomstatic'
    STATIC_URL = 'https://storage.googleapis.com/{}/'.format(GS_STATIC_BUCKET_NAME)
