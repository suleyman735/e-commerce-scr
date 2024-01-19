from django.core.management.base import BaseCommand
from django.utils import timezone
from ...models import UserAccount
from ...tasks import cleanup_unverified_users

class Command(BaseCommand):
    help = 'Deletes unverified accounts with is_verified=False older than a specified duration.'
    print(help)

    def handle(self, *args, **options):
        duration = timezone.now() - timezone.timedelta(minutes=2)
        print(duration)
        unverified_accounts = UserAccount.objects.filter(is_verified=False, created_at__lte=duration)
        print(unverified_accounts)
        
        for account in unverified_accounts:
            account.delete()
        cleanup_unverified_users.delay()
        self.stdout.write(self.style.SUCCESS('Successfully deleted unverified accounts.'))