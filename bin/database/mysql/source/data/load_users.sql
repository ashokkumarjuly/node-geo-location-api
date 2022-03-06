-- create admin user
INSERT INTO `users` (`id`, `firstName`, `lastName`, `email`, `password`, `uid`, `role`, `phoneCode`, `phoneNo`, `profileImage`, `address`, `address2`, `city`, `state`, `countryCode`, `zipCode`, `profileCompletion`, `status`, `emailVerified`, `authToken`, `verificationTokenExpires`, `timeZone`, `lastLoginDate`, `deletedAt`, `createdAt`, `updatedAt`) 
	VALUES (1, 'Admin', 'User', 'admin@mailinator.com', '$2b$12$IwWMQyFdn/XUIHakaEIiKOhUgmuXzYIc9xXwh0XhwFBrMBsSiNZsa', 'cf2b79f2-1a1e-11ec-b199-000d3a5f9506', 1, '1', '0001101014', '74930e1a-019a-44ee-9b3c-83efbea251b8.jfif', '4353543', NULL, 'werwe', 'werwer', 'US', NULL, 100, 1, 1, NULL, NULL, NULL, NULL, NULL, '2019-07-16 10:41:38', '2022-02-08 05:50:26');

-- user map to role
INSERT INTO `auth_user_role` (`user_id`, `role_id`, `deletedAt`, `createdAt`, `updatedAt`) VALUES (1, 1, NULL, '2021-09-28 12:27:25', '2021-09-28 12:27:25');
