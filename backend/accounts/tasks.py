# tasks.py in your Django app

from celery import shared_task
from django.core.management import call_command
from time import sleep
from celery.schedules import crontab
from settings.celery import app, PeriodicTask

@shared_task
def cleanup_unverified_users():
    print('jee')
    call_command('delete_unverified_accounts')
  
@app.task(
    base=PeriodicTask,
    run_every=crontab(minute='*/1'),
    name='my_task',
    options={'queue': 'queue_name'}
)  
def my_task():
    for i in range(11):
        print('i')
        sleep(1)
        
    return "Tasl complete"



# backend.conf.beat_schedule = {
#   'add-every-30-seconds': {
#         'task': 'tasks.add',
#         'schedule': 30.0,
#         'args': (16, 16)
#     },
# }
# app.conf.timezone = 'UTC'
    
   
