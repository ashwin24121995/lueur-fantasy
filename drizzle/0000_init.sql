-- LUEUR Fantasy Cricket Database Schema
-- PostgreSQL Migration Script for Railway

-- Create enums
DO $$ BEGIN
    CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE contest_status AS ENUM ('upcoming', 'live', 'completed', 'cancelled');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

DO $$ BEGIN
    CREATE TYPE team_status AS ENUM ('draft', 'submitted', 'locked');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(320) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL DEFAULT '',
    name TEXT,
    phone VARCHAR(20),
    date_of_birth TIMESTAMP,
    state VARCHAR(100),
    city VARCHAR(100),
    is_verified BOOLEAN NOT NULL DEFAULT false,
    is_blocked BOOLEAN NOT NULL DEFAULT false,
    role user_role NOT NULL DEFAULT 'user',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW(),
    last_signed_in TIMESTAMP
);

-- Password reset tokens
CREATE TABLE IF NOT EXISTS password_reset_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(255) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    used_at TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Sessions
CREATE TABLE IF NOT EXISTS sessions (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    token VARCHAR(500) NOT NULL UNIQUE,
    expires_at TIMESTAMP NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Matches (cached from Cricket API)
CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    api_match_id VARCHAR(100) NOT NULL UNIQUE,
    name VARCHAR(500) NOT NULL,
    match_type VARCHAR(50) NOT NULL,
    status VARCHAR(255),
    venue VARCHAR(500),
    match_date TIMESTAMP NOT NULL,
    date_time_gmt VARCHAR(50),
    teams JSON,
    team_info JSON,
    score JSON,
    series_id VARCHAR(100),
    fantasy_enabled BOOLEAN NOT NULL DEFAULT false,
    bbb_enabled BOOLEAN NOT NULL DEFAULT false,
    has_squad BOOLEAN NOT NULL DEFAULT false,
    match_started BOOLEAN NOT NULL DEFAULT false,
    match_ended BOOLEAN NOT NULL DEFAULT false,
    toss_winner VARCHAR(255),
    toss_choice VARCHAR(50),
    match_winner VARCHAR(255),
    last_updated TIMESTAMP NOT NULL DEFAULT NOW(),
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Contests
CREATE TABLE IF NOT EXISTS contests (
    id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES matches(id),
    name VARCHAR(255) NOT NULL,
    description TEXT,
    max_participants INTEGER NOT NULL DEFAULT 100,
    current_participants INTEGER NOT NULL DEFAULT 0,
    status contest_status NOT NULL DEFAULT 'upcoming',
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Fantasy teams
CREATE TABLE IF NOT EXISTS fantasy_teams (
    id SERIAL PRIMARY KEY,
    user_id INTEGER NOT NULL REFERENCES users(id),
    contest_id INTEGER NOT NULL REFERENCES contests(id),
    match_id INTEGER NOT NULL REFERENCES matches(id),
    team_name VARCHAR(100),
    captain_player_id VARCHAR(100) NOT NULL,
    vice_captain_player_id VARCHAR(100) NOT NULL,
    total_points INTEGER NOT NULL DEFAULT 0,
    rank INTEGER,
    status team_status NOT NULL DEFAULT 'draft',
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Player selections
CREATE TABLE IF NOT EXISTS player_selections (
    id SERIAL PRIMARY KEY,
    fantasy_team_id INTEGER NOT NULL REFERENCES fantasy_teams(id),
    player_id VARCHAR(100) NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    player_role VARCHAR(100) NOT NULL,
    team_name VARCHAR(255) NOT NULL,
    points INTEGER NOT NULL DEFAULT 0,
    is_captain BOOLEAN NOT NULL DEFAULT false,
    is_vice_captain BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Match results
CREATE TABLE IF NOT EXISTS match_results (
    id SERIAL PRIMARY KEY,
    match_id INTEGER NOT NULL REFERENCES matches(id),
    player_id VARCHAR(100) NOT NULL,
    player_name VARCHAR(255) NOT NULL,
    batting_points INTEGER NOT NULL DEFAULT 0,
    bowling_points INTEGER NOT NULL DEFAULT 0,
    fielding_points INTEGER NOT NULL DEFAULT 0,
    total_points INTEGER NOT NULL DEFAULT 0,
    batting_stats JSON,
    bowling_stats JSON,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Leaderboard
CREATE TABLE IF NOT EXISTS leaderboard (
    id SERIAL PRIMARY KEY,
    contest_id INTEGER NOT NULL REFERENCES contests(id),
    user_id INTEGER NOT NULL REFERENCES users(id),
    fantasy_team_id INTEGER NOT NULL REFERENCES fantasy_teams(id),
    total_points INTEGER NOT NULL DEFAULT 0,
    rank INTEGER,
    created_at TIMESTAMP NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);
CREATE INDEX IF NOT EXISTS idx_sessions_user_id ON sessions(user_id);
CREATE INDEX IF NOT EXISTS idx_sessions_token ON sessions(token);
CREATE INDEX IF NOT EXISTS idx_matches_api_match_id ON matches(api_match_id);
CREATE INDEX IF NOT EXISTS idx_matches_match_date ON matches(match_date);
CREATE INDEX IF NOT EXISTS idx_contests_match_id ON contests(match_id);
CREATE INDEX IF NOT EXISTS idx_fantasy_teams_user_id ON fantasy_teams(user_id);
CREATE INDEX IF NOT EXISTS idx_fantasy_teams_contest_id ON fantasy_teams(contest_id);
CREATE INDEX IF NOT EXISTS idx_player_selections_fantasy_team_id ON player_selections(fantasy_team_id);
CREATE INDEX IF NOT EXISTS idx_leaderboard_contest_id ON leaderboard(contest_id);
