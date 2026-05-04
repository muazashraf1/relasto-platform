from django.db import models
from accounts.models import User
from properties.models import Property

# Create your models here.


class VisitRequest(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    property = models.ForeignKey(Property, on_delete=models.CASCADE)
    # agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='properties') #related_name='properties' already used in property model
    agent = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="visit_request"
    )

    phone = models.TextField(max_length=20)
    email = models.EmailField()

    preferred_date = models.DateTimeField()

    is_reviewed = models.BooleanField(default=False)
    is_completed = models.BooleanField(default=False)

    created_at = models.DateTimeField(auto_now_add=True)
