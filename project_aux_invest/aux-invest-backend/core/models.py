from django.contrib.auth.models import User
from django.db import models

class Investidor(models.Model):
    user = models.OneToOneField(User, on_delete=models.PROTECT, related_name='investidor')

    def __str__(self):
        return self.user.first_name + " " + self.user.last_name

class Carteira(models.Model):
    nome_cart = models.CharField(max_length=100, blank=True)
    #ativos = models.ManyToManyField(Ativo)
    investidor = models.ForeignKey(Investidor, on_delete=models.PROTECT)

    def __str__(self):
        return self.nome_cart

class Ativo(models.Model):
    nome_ativ = models.CharField(max_length=100, blank=False)
    sigla = models.CharField(max_length=7, blank=False)
    preco = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    lim_sup = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    lim_inf = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    carteira = models.ForeignKey(Carteira, on_delete=models.PROTECT)
    
    def __str__(self):
        return self.nome_ativ + " " + "("+ self.sigla + ")"

class historicoAtivo(models.Model):
    data = models.DateField(blank=False)
    adj_close = models.DecimalField(max_digits=7,decimal_places=2, blank=True, null=True)
    close = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    High = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    Low = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    Open = models.DecimalField(max_digits=7, decimal_places=2, blank=True, null=True)
    Volume = models.PositiveIntegerField(blank=True, null=True)
    ativo = models.ForeignKey(Ativo, on_delete=models.PROTECT)

    def __str__(self):
        return self.data

