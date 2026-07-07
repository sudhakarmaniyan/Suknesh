# Suknesh Techcenter LLP Deployment Guide

## 1. Upload Files
Upload the complete project folder to your hosting `public_html` or web root.

## 2. Database
1. Create MySQL database.
2. Import `database/schema.sql`.
3. Update `php/config.php`.

## 3. Admin
Open:
`yourdomain.com/admin/login.php`

Default login from Module 4:
- Username: admin
- Password: admin123

Change this before going live.

## 4. SEO
Update:
- `robots.txt`
- `sitemap.xml`
- `schema-organization.json`

Replace `https://yourdomain.com` with your actual domain.

## 5. Security
Use `.htaccess` from the security folder if using Apache hosting.

## 6. SSL
Enable HTTPS from your hosting control panel.

## 7. Testing
Check:
- Home page
- Forms
- Admin login
- Database entries
- Mobile responsiveness
- Google Map
- Email links
