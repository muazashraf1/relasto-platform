from rest_framework import serializers
from accounts.models import User, Profile
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ["email", "username", "password", "password2", "is_agent"]

    def validate(self, data):
        if data["password"] != data["password2"]:
            raise serializers.ValidationError("Password not match")
        email = data.get("email", "")
        if email and User.objects.filter(email__iexact=email).exists():
            raise serializers.ValidationError({"email": "Email already exist"})
        return data

    def create(self, validated_data):
        validated_data.pop("password2")
        user = User(email=validated_data["email"], username=validated_data["username"],is_agent=validated_data.get("is_agent", False))
        user.set_password(validated_data["password"])
        user.save()
        return user


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["bio", "profile_image", "location"]


# class LoginSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = User
#         fields = ['email', 'password']


class CustomTokenSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        user = self.user
        data["user"] = {
            "id": user.id,
            "email": user.email,
            "username": user.username,
            "is_agent": user.is_agent,
        }

        # profile info
        data["profile"] = {
            "bio": user.profile.bio,
            "location": user.profile.location,
            "phone": user.phone,
            "address": user.address,
        }

        return data
    

class AgentProfileSerializer(serializers.ModelSerializer):
    bio = serializers.CharField(source='profile.bio', read_only=True)
    location = serializers.CharField(source='profile.location', read_only=True)
    profile_image = serializers.ImageField(source='profile.profile_image', read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'is_agent', 'bio', 'location', 'phone', 'address', 'profile_image']