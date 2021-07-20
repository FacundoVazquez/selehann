# Users: Admins
# Resources: Assets, Licenses, Developers


# Backend
## Endpoints:

# Users
POST | /api/{version}/users **Add user**
POST | /api/{version}/users/login **Authenticate user**

# Assets
/api/{version}/assets **CRUD**

# Licenses
/api/{version}/licenses **CRUD**

# Developers
/api/{version}/developers **CRUD**


# Frontend
## Views:

/auth      **Login** _A view to enter credentials of user admin_

/developers **Developers list** _A list of developers with their name and status_
            **Add developer:** _A place to create developers. It could be a modal or a standalone view_
            **Manage developer:**_A view to manage the developers, their assets and licenses_


# Workflow:
1) The user (admin) access to the application.
    A) If the user is'nt authenticated, the application redirect the user to the login view.
    B) If the user is already authenticated or the user logged in successfully, the application redirect the user to the developers administration view.

2) The user can see a list of developers for add new or delete them. Also the user can update the assignments of resources (assets and licenses) for the developers.