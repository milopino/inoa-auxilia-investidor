from rest_framework import serializers
import yahoo_fin.stock_info as si
import pandas as pd
from .models import Investidor, Ativo, Carteira, historicoAtivo
from django.core.mail import send_mail

def enviar_email(corpo_email, email_para):
    send_mail(
        'Alerta de Ativo - INOA',
        corpo_email,
        email_para,
        [email_para],
        fail_silently=False
    )

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
        fields = ['id', 'nome_ativ', 'sigla', 'preco', 'lim_sup', 'lim_inf', 'carteira']

    def create(self, validated_data):
        instance = Ativo.objects.create(**validated_data)
        instance.preco = round(si.get_live_price(instance.sigla + '.sa'),2)
        instance.save()

        return instance
    
    def update(self, instance, validated_data):
        instance.nome_ativ = validated_data.get('nome_ativ', instance.nome_ativ)
        instance.sigla = validated_data.get('sigla', instance.sigla)
        instance.preco = validated_data.get('preco', round(si.get_live_price(instance.sigla + '.sa'),2))
        instance.lim_sup = validated_data.get('lim_sup', instance.lim_sup)
        instance.lim_inf = validated_data.get('lim_inf', instance.lim_inf)

        #Envio de alerta para o e-mail
        if instance.lim_sup <= instance.preco:
            corpo_email = 'O Ativo ' + instance.nome_ativ + ' por sigla ' + instance.sigla + ' ultrapassou o limite superior definido. \nAlerta com sugestão de venda'
            enviar_email(corpo_email, instance.carteira.investidor.user.email)
            print("Valor ultrapassou o limite superior.")
        elif instance.lim_inf >= instance.preco:
            corpo_email = 'O Ativo ' + instance.nome_ativ + ' por sigla ' + instance.sigla + ' ultrapassou o limite inferior definido. \nAlerta com sugestão de compra'
            enviar_email(corpo_email, instance.carteira.investidor.user.email)
            print("Valor ultrapassou o limite inferior.")
        else:
            print("Valor dentro dos limites")

        instance.save()

        return instance


class CarteiraSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carteira
        fields = ['id', 'nome_cart', 'investidor']

class historicoAtivoSerializer(serializers.ModelSerializer):
    class Meta:
        model = historicoAtivo
        fields = ['id', 'data', 'adj_close', 'close', 'High', 'Low', 'Open', 'Volume', 'ativo']

    def create(self, validated_data):
        instance = historicoAtivo.objects.create(**validated_data)

        #Buscando as informações do histórico do ativo no Yahho Finance
        data_texto = pd.to_datetime(instance.data) + pd.DateOffset(days=1)
        historico = si.get_data(instance.ativo.sigla + '.sa', start_date=instance.data, end_date=data_texto)

        instance.adj_close = round(historico.iloc[0,4], 2)
        instance.close = round(historico.iloc[0,3], 2)
        instance.High = round(historico.iloc[0,1], 2)
        instance.Low = round(historico.iloc[0,2], 2)
        instance.Open = round(historico.iloc[0,0], 2)
        instance.Volume = round(historico.iloc[0,5], 2)
        instance.save()

        return instance
    
    def update(self, instance, validated_data):
        #Buscando as informações do histórico do ativo no Yahho Finance
        data_texto = pd.to_datetime(instance.data) + pd.DateOffset(days=1)
        historico = si.get_data(instance.ativo.sigla + '.sa', start_date=instance.data, end_date=data_texto)

        instance.data = validated_data.get('data', instance.data)
        instance.close = round(historico.iloc[0,3], 2)
        instance.High = round(historico.iloc[0,1], 2)
        instance.Low = round(historico.iloc[0,2], 2)
        instance.Open = round(historico.iloc[0,0], 2)
        instance.Volume = round(historico.iloc[0,5], 2)

        instance.save()

        return instance