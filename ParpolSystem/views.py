from django.http import HttpResponse
from django.shortcuts import render, redirect

def index(request):
    return render(request, "index.html")

def login(request):
    return render(request, "login.html")

def base(request):
    return render(request, "base.html")

def about(request):
    return render(request, "about.html")

def movimientos(request):
    return render(request, 'movimientos.html') 

def clientes(request):
    print("Página clientes cargada")
    return render(request, "clientes.html")

def configuracion(request):
    return render(request, "configuracion.html")

def empleados(request):
    return render(request, "empleados.html")

def envios(request):
    return render(request, "envios.html")

def estadisticas(request):
    return render(request, "estadisticas.html")

def misproductos(request):
    print("Página Mis Productos cargada")
    return render(request, "misproductos.html")

def proveedores(request):
    return render(request, "proveedores.html")