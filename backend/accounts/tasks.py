# tasks.py in your Django app

from celery import shared_task
from django.core.management import call_command
from time import sleep

@shared_task
def cleanup_unverified_users():
    print('jee')
    call_command('delete_unverified_accounts')
    
@shared_task
def my_task():
    for i in range(11):
        print(i)
        sleep(1)
        
    return "Tasl complete"
    
   
