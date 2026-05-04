from rest_framework import serializers
from reviews.models import Review
from accounts.models import User


# class ReviewCreateSerializer(serializers.ModelSerializer):
#     agent = serializers.CharField(write_only=True) ❌ galat — agent id hona chahiye, string nahi
#     class Meta:
#         model = Review
#         fields = ["rating", "comment", "agent"]


# class ReviewListSerializer(serializers.ModelSerializer):
#     user = serializers.CharField(read_only=True) ❌ is se username nahi aayega properly
#     class Meta:
#         model = Review
#         fields = ["user", "rating", "comment", "created_at"]


class ReviewCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ["comment", "rating", "agent"]

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating muust be in between 1 and 5")
        return value


class ReviewListSerializer(serializers.ModelSerializer):
    user = serializers.CharField(source="user.username")

    class Meta:
        model = Review
        fields = ["id", "user", "rating", "comment", "created_at"]
