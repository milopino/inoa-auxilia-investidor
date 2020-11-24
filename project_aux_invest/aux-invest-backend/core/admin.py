from django.contrib import admin
from .models import Investidor, Carteira, Ativo, historicoAtivo

admin.site.register(Investidor)
admin.site.register(Carteira)
admin.site.register(Ativo)
admin.site.register(historicoAtivo)
