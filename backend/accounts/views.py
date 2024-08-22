from rest_framework import generics, status
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import VoxelleryUser
from .serializers import VoxelleryUserSerializer

class SignUpView(generics.CreateAPIView):
    queryset = VoxelleryUser.objects.all()
    serializer_class = VoxelleryUserSerializer

class LoginView(generics.GenericAPIView):
    serializer_class = VoxelleryUserSerializer

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = VoxelleryUser.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            })
