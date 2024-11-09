
from django.contrib import admin
from django.urls import path
from django.conf.urls.static import static
from django.conf import settings
from ParpolSystem.views import base, about, movimientos, clientes, envios, empleados, estadisticas, configuracion, proveedores, misproductos, index, login

urlpatterns = [
    path('admin/', admin.site.urls),
    path('', index, name='index'),
    path('login/', login, name='login'),
    path('base/', base, name='base'),
    path('about/', about, name= 'about'),
    path('base/movimientos/', movimientos, name='movimientos'),
    path('base/clientes/', clientes, name='clientes'),
    path('base/envios/', envios, name='envios'),
    path('base/empleados/', empleados, name='empleados'),
    path('base/estadisticas/', estadisticas, name='estadisticas'),
    path('base/configuracion/', configuracion, name='configuracion'),
    path('base/proveedores/', proveedores, name='proveedores'),
    path('base/misproductos/', misproductos, name='misproductos'),
]
