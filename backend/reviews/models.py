from django.db import models
from accounts.models import User

# Create your models here.


class Review(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='given_reviews')
    agent = models.ForeignKey(User, on_delete=models.CASCADE, related_name='received_reviews')

    rating = models.IntegerField()
    comment = models.TextField(blank=True)

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ['user', 'agent']

    def __str__(self):
        return f"{self.user.email} -> {self.agent.email}"
