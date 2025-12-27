CREATE TABLE `contests` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` int NOT NULL,
	`name` varchar(255) NOT NULL,
	`description` text,
	`maxParticipants` int NOT NULL DEFAULT 100,
	`currentParticipants` int NOT NULL DEFAULT 0,
	`status` enum('upcoming','live','completed','cancelled') NOT NULL DEFAULT 'upcoming',
	`startTime` timestamp NOT NULL,
	`endTime` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `contests_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `fantasyTeams` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`contestId` int NOT NULL,
	`matchId` int NOT NULL,
	`teamName` varchar(100),
	`captainPlayerId` varchar(100) NOT NULL,
	`viceCaptainPlayerId` varchar(100) NOT NULL,
	`totalPoints` int NOT NULL DEFAULT 0,
	`rank` int,
	`status` enum('draft','submitted','locked') NOT NULL DEFAULT 'draft',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `fantasyTeams_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `leaderboard` (
	`id` int AUTO_INCREMENT NOT NULL,
	`contestId` int NOT NULL,
	`userId` int NOT NULL,
	`fantasyTeamId` int NOT NULL,
	`totalPoints` int NOT NULL DEFAULT 0,
	`rank` int,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `leaderboard_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matchResults` (
	`id` int AUTO_INCREMENT NOT NULL,
	`matchId` int NOT NULL,
	`playerId` varchar(100) NOT NULL,
	`playerName` varchar(255) NOT NULL,
	`battingPoints` int NOT NULL DEFAULT 0,
	`bowlingPoints` int NOT NULL DEFAULT 0,
	`fieldingPoints` int NOT NULL DEFAULT 0,
	`totalPoints` int NOT NULL DEFAULT 0,
	`battingStats` json,
	`bowlingStats` json,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `matchResults_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `matches` (
	`id` int AUTO_INCREMENT NOT NULL,
	`apiMatchId` varchar(100) NOT NULL,
	`name` varchar(500) NOT NULL,
	`matchType` varchar(50) NOT NULL,
	`status` varchar(255),
	`venue` varchar(500),
	`matchDate` timestamp NOT NULL,
	`dateTimeGMT` varchar(50),
	`teams` json,
	`teamInfo` json,
	`score` json,
	`seriesId` varchar(100),
	`fantasyEnabled` boolean NOT NULL DEFAULT false,
	`bbbEnabled` boolean NOT NULL DEFAULT false,
	`hasSquad` boolean NOT NULL DEFAULT false,
	`matchStarted` boolean NOT NULL DEFAULT false,
	`matchEnded` boolean NOT NULL DEFAULT false,
	`tossWinner` varchar(255),
	`tossChoice` varchar(50),
	`matchWinner` varchar(255),
	`lastUpdated` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `matches_id` PRIMARY KEY(`id`),
	CONSTRAINT `matches_apiMatchId_unique` UNIQUE(`apiMatchId`)
);
--> statement-breakpoint
CREATE TABLE `passwordResetTokens` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`token` varchar(255) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`usedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `passwordResetTokens_id` PRIMARY KEY(`id`),
	CONSTRAINT `passwordResetTokens_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `playerSelections` (
	`id` int AUTO_INCREMENT NOT NULL,
	`fantasyTeamId` int NOT NULL,
	`playerId` varchar(100) NOT NULL,
	`playerName` varchar(255) NOT NULL,
	`playerRole` varchar(100) NOT NULL,
	`teamName` varchar(255) NOT NULL,
	`points` int NOT NULL DEFAULT 0,
	`isCaptain` boolean NOT NULL DEFAULT false,
	`isViceCaptain` boolean NOT NULL DEFAULT false,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `playerSelections_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` int AUTO_INCREMENT NOT NULL,
	`userId` int NOT NULL,
	`token` varchar(500) NOT NULL,
	`expiresAt` timestamp NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `sessions_id` PRIMARY KEY(`id`),
	CONSTRAINT `sessions_token_unique` UNIQUE(`token`)
);
--> statement-breakpoint
CREATE TABLE `users` (
	`id` int AUTO_INCREMENT NOT NULL,
	`email` varchar(320) NOT NULL,
	`passwordHash` varchar(255) NOT NULL,
	`name` varchar(255) NOT NULL,
	`phone` varchar(20),
	`dateOfBirth` timestamp NOT NULL,
	`state` varchar(100) NOT NULL,
	`city` varchar(100),
	`isVerified` boolean NOT NULL DEFAULT false,
	`isBlocked` boolean NOT NULL DEFAULT false,
	`role` enum('user','admin') NOT NULL DEFAULT 'user',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	`lastSignedIn` timestamp,
	CONSTRAINT `users_id` PRIMARY KEY(`id`),
	CONSTRAINT `users_email_unique` UNIQUE(`email`)
);
