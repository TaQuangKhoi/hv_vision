"""
WSGI config for hv_vision project.

It exposes the WSGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/wsgi/
"""

import os

import socketio
from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'hv_vision.settings')
os.environ.setdefault('SERVER_GATEWAY_INTERFACE', 'Web')

# create a Socket.IO server
sio = socketio.Server()

application = get_wsgi_application()
application = socketio.WSGIApp(sio, application)