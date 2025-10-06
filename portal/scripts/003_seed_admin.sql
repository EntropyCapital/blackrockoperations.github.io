-- This script creates a test admin user
-- You'll need to sign up with this email first, then run this script to upgrade to admin

-- Update the profile role to admin for the first user
-- Replace 'your-email@example.com' with the email you used to sign up
update public.profiles
set role = 'admin'
where email = 'coltonletellier15@gmail.com';

-- Verify the update worked
select id, email, role, full_name from public.profiles where email = 'coltonletellier15@gmail.com';
