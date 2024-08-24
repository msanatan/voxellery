from rest_framework import generics, status
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import RefreshToken

from .models import VoxelleryUser
from .serializers import VoxelleryUserSerializer

class SignUpView(generics.CreateAPIView):
    queryset = VoxelleryUser.objects.all()
    serializer_class = VoxelleryUserSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()

        # Generate the tokens
        refresh = RefreshToken.for_user(user)
        return Response(
            data={
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'isAdmin': user.is_admin,
            },
            status=status.HTTP_201_CREATED
        )

class LoginView(generics.GenericAPIView):
    serializer_class = VoxelleryUserSerializer
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = VoxelleryUser.objects.filter(email=email).first()
        if user and user.check_password(password):
            refresh = RefreshToken.for_user(user)
            return Response(
                data={
                    'refresh': str(refresh),
                    'access': str(refresh.access_token),
                    'isAdmin': user.is_admin,
                },
                status=status.HTTP_200_OK
            )

class LogoutView(generics.GenericAPIView):
    permission_classes = [IsAuthenticated]

    def post(self, request, *args, **kwargs):
        refresh_token = request.data["refresh"]
        token = RefreshToken(refresh_token)
        token.blacklist()
        return Response(data={'success': True}, status=status.HTTP_205_RESET_CONTENT)
