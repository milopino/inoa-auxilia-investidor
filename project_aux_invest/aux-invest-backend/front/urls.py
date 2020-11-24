from django.contrib import admin
from django.urls import path, include
from rest_framework import routers
from core.views import InvestidorViewSet ,AtivoViewSet, CarteiraViewSet, historicoAtivoViewSet

router = routers.DefaultRouter()
router.register(r'investidores', InvestidorViewSet)
router.register(r'ativos', AtivoViewSet)
router.register(r'carteiras', CarteiraViewSet)
router.register(r'historicosativos', historicoAtivoViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('admin/', admin.site.urls),
]
