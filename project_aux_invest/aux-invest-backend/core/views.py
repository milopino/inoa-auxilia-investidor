from rest_framework import viewsets
from .models import Investidor, Ativo, Carteira, historicoAtivo
from .serializers import InvestidorSerializer ,AtivoSerializer, CarteiraSerializer, historicoAtivoSerializer

class InvestidorViewSet(viewsets.ModelViewSet):
    queryset = Investidor.objects.all()
    serializer_class = InvestidorSerializer

class AtivoViewSet(viewsets.ModelViewSet):
    queryset = Ativo.objects.all()
    serializer_class = AtivoSerializer

class CarteiraViewSet(viewsets.ModelViewSet):
    queryset = Carteira.objects.all()
    serializer_class = CarteiraSerializer

class historicoAtivoViewSet(viewsets.ModelViewSet):
    queryset = historicoAtivo.objects.all()
    serializer_class = historicoAtivoSerializer

