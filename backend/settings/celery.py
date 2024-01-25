# celery.py

from __future__ import absolute_import, unicode_literals
import os
from celery import Celery,Task

# Set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'settings.settings')

# Create a Celery instance and configure it using the settings from Django.
app = Celery('settings')

# Load task modules from all registered Django app configs.
app.config_from_object('django.conf:settings', namespace='CELERY')

# Auto-discover tasks in all installed apps
app.autodiscover_tasks()


class PeriodicTask(Task):
    @classmethod
    def on_bound(cls, app):
        app.conf.beat_schedule[cls.name] = {
            "schedule": cls.run_every,
            "task": cls.name,
            "args": cls.args if hasattr(cls, "args") else (),
            "kwargs": cls.kwargs if hasattr(cls, "kwargs") else {},
            "options": cls.options if hasattr(cls, "options") else {}
        }