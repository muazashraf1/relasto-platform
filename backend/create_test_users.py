import os
import django
import sys

# Setup Django
sys.path.append(os.path.dirname(__file__))
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')
django.setup()

from accounts.models import User

# Create test agent
agent, created = User.objects.get_or_create(
    username='testagent',
    defaults={
        'email': 'agent@test.com',
        'is_agent': True
    }
)
if created:
    agent.set_password('123456789')
    agent.save()
    print('Agent created: testagent')

# Create test user
user, created = User.objects.get_or_create(
    username='testuser',
    defaults={
        'email': 'user@test.com',
        'is_agent': False
    }
)
if created:
    user.set_password('123456789')
    user.save()
    print('User created: testuser')

print('Test users ready!')