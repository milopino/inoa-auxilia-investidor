from rest_framework import serializers
from .models import Investidor, Ativo, Carteira, historicoAtivo

class InvestidorSerializer(serializers.ModelSerializer):
    first_name = serializers.CharField(source='user.first_name')
    last_name = serializers.CharField(source='user.last_name')
    password = serializers.CharField(source='user.password')
    email = serializers.EmailField(source='user.email')

    class Meta:
        model = Investidor
        fields = ['id', 'first_name', 'last_name', 'email', 'password']

class AtivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Ativo
        fields = ['id', 'nome_ativ', 'sigla', 'preco']

class CarteiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carteira
        fields = ['id', 'nome_cart']

class historicoAtivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = historicoAtivo
        fields = ['id', 'data', 'adj_close', 'close', 'High', 'Low', 'Open', 'Volume']