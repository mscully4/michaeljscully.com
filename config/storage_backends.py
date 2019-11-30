"""
GoogleCloudStorage extensions suitable for handing Django's
Static and Media files.

Requires following settings:
MEDIA_URL, GS_MEDIA_BUCKET_NAME
STATIC_URL, GS_STATIC_BUCKET_NAME

In addition to
https://django-storages.readthedocs.io/en/latest/backends/gcloud.html
"""
from django.conf import settings
from storages.backends.gcloud import GoogleCloudStorage
from storages.utils import setting
from urllib.parse import urljoin


class GoogleCloudMediaStorage(GoogleCloudStorage):
    """GoogleCloudStorage suitable for Django's Media files."""

    def __init__(self, *args, **kwargs):
        if not settings.MEDIA_URL:
            raise Exception('MEDIA_URL has not been configured')
        kwargs['bucket_name'] = setting('GS_MEDIA_BUCKET_NAME')
        super(GoogleCloudMediaStorage, self).__init__(*args, **kwargs)

    def url(self, name):
        """.url that doesn't call Google."""
        return urljoin(settings.MEDIA_URL, name)


class GoogleCloudStaticStorage(GoogleCloudStorage):
    """GoogleCloudStorage suitable for Django's Static files"""

    def __init__(self, *args, **kwargs):
        if not settings.STATIC_URL:
            raise Exception('STATIC_URL has not been configured')
        kwargs['bucket_name'] = setting('GS_STATIC_BUCKET_NAME')
        super(GoogleCloudStaticStorage, self).__init__(*args, **kwargs)

    def url(self, name):
        """.url that doesn't call Google."""
        return urljoin(settings.STATIC_URL, name)

from storages.backends.s3boto3 import S3Boto3Storage
from django.conf import settings


class StaticStorage(S3Boto3Storage):
    location = 'static'
    default_acl = 'public-read'


class PublicMediaStorage(S3Boto3Storage):
    location = 'media'
    default_acl = 'public-read'
    file_overwrite = False

class PrivateMediaStorage(S3Boto3Storage):
    location = 'private'
    default_acl = 'private'
    file_overwrite = False
    custom_domain = False