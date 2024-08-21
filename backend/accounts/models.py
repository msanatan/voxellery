import uuid

from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class VoxelleryUserManager(BaseUserManager):
    def create_user(self, email: str, username: str, password: str | None=None, **extra_fields: dict):
        '''
        Creates and saves a user with an email, username and password
        '''
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=self.normalize_email(email), username=username,**extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email: str, username: str, password: str | None=None, **extra_fields: dict):
        """
        Creates and saves a superuser with the given email, date of
        birth and password.
        """
        user = self.create_user(
            email=self.normalize_email(email),
            username=username,
            password=password,
            **extra_fields
        )
        user.is_admin = True
        user.save(using=self._db)
        return user

class VoxelleryUser(AbstractBaseUser):
    '''
    In this custom user model, usernames are still required but we login via email.
    '''
    # Use UUIDs which work better for distributed systems
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(verbose_name="Email Address", max_length=255, unique=True)
    # A public display name for users, as we don't want to expose emails
    username = models.CharField(max_length=255)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    # Tell Django that our user's unique identifier is their email
    USERNAME_FIELD = 'email'
    # Keep username required
    REQUIRED_FIELDS = ['username']

    # Needed for the manage.py createsuperuser command to work
    objects = VoxelleryUserManager()

    def __str__(self):
        return self.email

    def has_perm(self, perm, obj=None):
        '''Should be more specific, for now let's allow all'''
        return True

    def has_module_perms(self, app_label):
        '''Should be more specific, for now let's allow all'''
        return True

    @property
    def is_staff(self):
        '''All admins are staff'''
        return self.is_admin
