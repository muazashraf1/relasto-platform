from django.urls import path
from properties import views

urlpatterns = [
    path("create/", views.CreatePropertyView.as_view()),
    path("my/", views.MyPropertyListView.as_view()),
    path("search/", views.PropertySearchView.as_view()),
    path("update/<slug:slug>/", views.UpdatePropertyView.as_view()),
    path("delete/<slug:slug>/", views.DeletePropertyView.as_view()),
    path("<slug:slug>/", views.PropertyDetailView.as_view()),
    # path("images/upload/", views.UploadPropertyImageView.as_view()),
    # path("features/add/", views.AddPropertyFeatureView.as_view()),
    path("images/upload/<slug:slug>/", views.UploadPropertyImageView.as_view()),
    path("features/add/<slug:slug>/", views.AddPropertyFeatureView.as_view()),
    path("features/delete/<int:id>/", views.DeletePropertyFeatureView.as_view()),
]


# ------ Testing in POSTMAN

# 1- register the new user with agent ----> http://127.0.0.1:8000/api/accounts/register/

#             {
#   "username": "agent2",
#   "email": "agent2@gmail.com",
#   "password": "123456789",
#   "password2": "123456789",
#   "is_agent": true
# }

# 2- login with that user  --> http://127.0.0.1:8000/api/accounts/token/

#             {
#   "email": "agent2@gmail.com",
#   "password": "123456789"
# }


# 3- Authorization setting

# 4- create the property ---> http://127.0.0.1:8000/api/properties/create/
#         {
#   "title": "Luxury House Lahore",
#   "description": "Beautiful house in DHA",
#   "price": 5000000,
#   "status": "sale",
#   "type": "residential",
#   "city": "Lahore",
#   "address": "DHA Phase 6"
# }
# non agent sy request bhejny pr errro aaye ga

# 5- My property getting  --> http://127.0.0.1:8000/api/properties/my/


# 4- update the propert ----> http://127.0.0.1:8000/api/properties/update/luxury-house-lahore/

# {
#   "price": 4500000,
#   "city": "Islamabad"
# }


# =================== 5.6 module testing


# 1- register the user ---> POST http://127.0.0.1:8000/api/accounts/register/

#             {
#   "username": "ahmar",
#   "email": "ahmar@gmail.com",
#   "password": "12345678",
#   "password2": "12345678",
#   "is_agent": true
# }


# 2- the login the user ---> POST http://127.0.0.1:8000/api/accounts/token/

#                 {
#   "email": "ahmar@gmail.com",
#   "password": "12345678"
# }


# 3- then create the property by authenticated user --> POST http://127.0.0.1:8000/api/properties/create/

# {
#   "title": "Modern House Lahore",
#   "description": "Beautiful house",
#   "price": 80000,
#   "status": "sale",
#   "type": "residential",
#   "city": "Lahore",
#   "address": "DHA Phase 5"
# }   ---> here slug is created the will use in next step.


# 4- upload the image by using the slug ----> POST http://127.0.0.1:8000/api/properties/images/upload/ahmar-house-lahore/


# 5-add the features ----> POST http://127.0.0.1:8000/api/properties/features/add/villa-karachi/

# in json
#                   {
                    #   "key": "bedrooms",
                    #   "value": "4"
                    # } 

# 6- check the property detail ---> GET http://127.0.0.1:8000/api/properties/villa-karachi/

# 7- delete the feature ---> DELETE http://127.0.0.1:8000/api/properties/features/delete/1/