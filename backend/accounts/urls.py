from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from accounts import views

urlpatterns = [
    path("register/", views.RegisterView.as_view()),
    path("profile/", views.ProfileView.as_view()),
    path('profile/<int:user_id>/', views.PublicProfileView.as_view()),
    path('agents/', views.AgentListView.as_view()),


    # For JWT authenticaation
    # path('token/', TokenObtainPairView.as_view()),  # after adding the metadata in AccessToken/ nichy wali line implement ho gi
    path("token/", views.CustomTokenObtainPairView.as_view()),
    path("token/refresh/", TokenRefreshView.as_view()),
]
