from django.urls import path, re_path
from django.conf.urls import url, include
from . import views

# from django.conf.urls import url, include
from rest_framework_nested import routers
# from api import views


from django.views.decorators.csrf import csrf_exempt


lead_router = routers.DefaultRouter()
lead_router.register(r'lead', views.LeadViewSet, base_name='lead')

lead_list = views.LeadViewSet.as_view({
    'get': 'list',
    'post': 'create'
})


lead_detail = views.LeadViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})



urlpatterns = [
    # re_path(r'^api/lead/', views.LeadListCreate.as_view() ),
    # path('/', include(lead_router.urls)),
    # re_path(r'^api/lead/', views.LeadViewSet)
    path('api/lead/', lead_list, name='-list'),
    path('api/lead/<int:pk>/', csrf_exempt(lead_detail), name='snippet-detail'),
    path('api/lead/<int:lead_id>/upload_pic/', views.ImageUploadView.as_view()),
    path('api/lead/<int:lead_id>/update/', lead_detail, name='snippet-update'),
    # path('api/lead/<int:pk>/')
]