## Default Admin User

On backend startup, the app ensures a default admin user exists.

- Email: `amitrana748095@gmail.com`
- Password: `AmitraNa2`

If no admin exists, this user is created automatically.
If a user with this email already exists, the account is promoted to admin.

## Security Notice

Change this default password immediately after first login.
For production, set `DEFAULT_ADMIN_EMAIL`, `DEFAULT_ADMIN_PASSWORD`, and `DEFAULT_ADMIN_NAME` in environment variables.
