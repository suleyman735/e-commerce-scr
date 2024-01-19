# # Create a file named cleanup_unverified_users.py in one of your Django apps

# from django.core.management.base import BaseCommand
# from .models import UserAccount
# from django.utils import timezone

# class Command(BaseCommand):
#     help = 'Deletes users who have not verified their email within a certain time frame.'

#     def handle(self, *args, **options):
#         # Define the time frame for considering an account as unverified
#         expiration_time = timezone.now() - timezone.timedelta(minutes=2)  # Adjust as needed

#         # Query and delete unverified users
#         unverified_users = UserAccount.objects.filter(is_verified=False, created_at=expiration_time)
#         unverified_users_count = unverified_users.count()

#         if unverified_users_count > 0:
#             self.stdout.write(self.style.SUCCESS(f'Deleting {unverified_users_count} unverified users...'))
#             unverified_users.delete()
#         else:
#             self.stdout.write(self.style.SUCCESS('No unverified users to delete.'))


from django.core.management.base import BaseCommand
from django.utils import timezone
from .models import UserAccount
from backend.accounts.tasks import cleanup_unverified_users

class Command(BaseCommand):
    help = 'Deletes unverified accounts with is_verified=False older than a specified duration.'
    print(help)

    def handle(self, *args, **options):
        duration = timezone.now() - timezone.timedelta(minutes=2)
        print(duration)
        unverified_accounts = UserAccount.objects.filter(user__is_verified=False, created_at__lte=duration)
        print(unverified_accounts)
        
        for account in unverified_accounts:
            account.user.delete()
        cleanup_unverified_users.delay()
        self.stdout.write(self.style.SUCCESS('Successfully deleted unverified accounts.'))

