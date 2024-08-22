from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsOwnerOrReadOnly(BasePermission):
    '''
    Anonymous users can see the art i.e. read, but only authenticated users can write artworks
    '''
    def has_permission(self, request, view):
        '''Allow users to GET artworks, or be authenticated'''
        if request.method in SAFE_METHODS:
            return True

        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        '''Allow owners or admins to update artwork'''
        if request.method in SAFE_METHODS:
            return True

        return obj.user == request.user or request.user.is_admin
