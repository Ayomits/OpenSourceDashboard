# Auth module

This module needs for Oauth2 with the help discord and generating JWT token
Also for protectect admin or server settings endpoints

## Guards:

1. IsAuth guard
2. IsAdmin guard
3. IsYourServer guard

1) This guard need for protect endpoint where user need to authenticate
2) This guard need for endpoint where user need to be admin
3) This is guard is the most interesting. Here i check user admin or owner on server. Using for settings modules