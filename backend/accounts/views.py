from django.shortcuts import render
from rest_framework.response import Response
from accounts.serializers import (
    RegisterSerializer,
    ProfileSerializer,
    CustomTokenSerializer,
    AgentProfileSerializer,
    ContactMessageSerializer,
)
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from django.shortcuts import get_object_or_404
from rest_framework import generics
from django.db.models import Avg
from accounts.models import User, ContactMessage
from reviews.models import Review
from rest_framework.pagination import PageNumberPagination

# Create your views here.


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            
            return Response({"message": "User created successfully"})

        return Response(serializer.errors, status=400)


class ProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        profile = request.user.profile
        serializer = ProfileSerializer(profile)
        return Response(serializer.data)

    def put(
        self, request
    ):  #  FIX (POST → PATCH) this is for strong check k user sirf apni hi profile edit kr skta hai

        profile = request.user.profile
        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated!"})
        return Response(serializer.errors, status=400)


# class LoginView(TokenObtainPairView):
#     pass


# agent profile publicly viewable by this
class PublicProfileView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, user_id):
        from accounts.models import User, Profile

        user = get_object_or_404(User, id=user_id)
        profile, created = Profile.objects.get_or_create(user=user)

        avg_rating = Review.objects.filter(agent=user).aggregate(avg=Avg("rating"))["avg"]
        review_count = Review.objects.filter(agent=user).count()

        data = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "is_agent": user.is_agent,
            "bio": profile.bio,
            "location": profile.location,
            "phone": user.phone,
            "address": user.address,
            "profile_image": profile.profile_image.url if profile.profile_image else None,
            "average_rating": round(avg_rating, 1) if avg_rating is not None else None,
            "review_count": review_count,
        }

        return Response(data)


class CustomTokenObtainPairView(TokenObtainPairView):  # for adding the metadata in AccessToken
    serializer_class = CustomTokenSerializer


class AgentPagination(PageNumberPagination):
    page_size = 8

class AgentListView(generics.ListAPIView):
    serializer_class = AgentProfileSerializer
    pagination_class = AgentPagination

    def get_queryset(self):
        queryset = User.objects.filter(is_agent=True)

        location = self.request.query_params.get("location")
        if location:
            queryset = queryset.filter(profile__location__icontains=location)

        return queryset


class ContactMessageView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Your message has been sent successfully. We will get back to you soon!"}, status=201)
        return Response(serializer.errors, status=400)

