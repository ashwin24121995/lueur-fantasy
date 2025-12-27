ALTER TABLE `users` MODIFY COLUMN `passwordHash` varchar(255) NOT NULL DEFAULT '';--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `name` text;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `dateOfBirth` timestamp;--> statement-breakpoint
ALTER TABLE `users` MODIFY COLUMN `state` varchar(100);