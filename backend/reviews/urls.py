from django.urls import path
from reviews import views
urlpatterns = [
    path('create/', views.CreateReviewView.as_view()),
    path('agent/<int:agent_id>/', views.AgentReviewListView.as_view()),
    path('update/<int:review_id>/', views.UpdateReviewView.as_view()),
]
