from django.conf.urls import url
from casa import views
from casas import settings


routes = getattr(settings, 'REACT_ROUTES', []);

urlpatterns = [
    url(r'^$', views.welcome, name='welcome'),
    url(r'^apartments/$',views.ApartmentList.as_view()),
    url(r'^addapartment/$', views.ApartmentList.as_view()),
    url(r'^apartment/\d+/$', views.ApartmentList.as_view()),
    url(r'^owner/$',views.OwnerDetails.as_view()),
    url(r'^comparables/$',views.ApartmentList.as_view()),
    url(r'^userstatus/$', views.is_user_authenticated),
    url(r'^homes/$', views.homes, name='homes'),
    url(r'^hostels/$', views.hostels, name='hostels'),
    url(r'^hotel/$', views.hotel_rooms, name='hotel rooms'),
    url(r'^account/$', views.account, name='account'),
    url(r'^stalls/$', views.stalls, name='stalls'),
    url(r'^offices/$', views.offices, name='offices'),
    url(r'^home/$', views.HomeList.as_view())
]
