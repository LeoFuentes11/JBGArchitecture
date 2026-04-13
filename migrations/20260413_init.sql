-- Initial migration for JBG Architects
-- Created: 2026-04-13

-- Users collection (with auth)
CREATE TABLE IF NOT EXISTS "users" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "email" varchar NOT NULL UNIQUE,
  "reset_password_token" varchar,
  "reset_password_expiration" timestamp with time zone,
  "verification_token" varchar,
  "verification_expiration" timestamp with time zone,
  "salt" varchar,
  "hash" varchar,
  "login_attempts" integer DEFAULT 0,
  "lock_until" timestamp with time zone,
  "name" text NOT NULL,
  "role" text NOT NULL DEFAULT 'editor'
);

CREATE INDEX IF NOT EXISTS "users_email_idx" ON "users" ("email");

-- Media collection
CREATE TABLE IF NOT EXISTS "media" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "url" text,
  "filename" text,
  "mime_type" text,
  "filesize" integer,
  "width" integer,
  "height" integer,
  "sizes" jsonb,
  "focal_x" integer,
  "focal_y" integer,
  "alt" text,
  "caption" jsonb
);

-- Projects collection
CREATE TABLE IF NOT EXISTS "projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "description" jsonb,
  "content" jsonb,
  "featured_image" uuid REFERENCES "media"("id"),
  "category" text,
  "location" text,
  "year" integer,
  "status" text DEFAULT 'draft',
  "featured" boolean DEFAULT false,
  "images" jsonb,
  "client" text,
  "area" text
);

CREATE INDEX IF NOT EXISTS "projects_slug_idx" ON "projects" ("slug");
CREATE INDEX IF NOT EXISTS "projects_status_idx" ON "projects" ("status");

-- BlogPosts collection
CREATE TABLE IF NOT EXISTS "blog_posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "content" jsonb,
  "excerpt" text,
  "featured_image" uuid REFERENCES "media"("id"),
  "author" text,
  "published_at" timestamp with time zone,
  "status" text DEFAULT 'draft',
  "tags" jsonb,
  "categories" jsonb
);

CREATE INDEX IF NOT EXISTS "blog_posts_slug_idx" ON "blog_posts" ("slug");
CREATE INDEX IF NOT EXISTS "blog_posts_status_idx" ON "blog_posts" ("status");
CREATE INDEX IF NOT EXISTS "blog_posts_published_at_idx" ON "blog_posts" ("published_at");

-- Services collection
CREATE TABLE IF NOT EXISTS "services" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "description" jsonb,
  "icon" text,
  "featured" boolean DEFAULT false,
  "order" integer DEFAULT 0,
  "price_range" text
);

CREATE INDEX IF NOT EXISTS "services_slug_idx" ON "services" ("slug");
CREATE INDEX IF NOT EXISTS "services_order_idx" ON "services" ("order");

-- Payload requires these internal tables
CREATE TABLE IF NOT EXISTS "_payload_migrations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "batch" integer,
  "created_at" timestamp with time zone DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS "_payload_migrations_name_idx" ON "_payload_migrations" ("name");

-- Insert initial migration record
INSERT INTO "_payload_migrations" ("name", "batch", "created_at")
VALUES ('init', 1, NOW())
ON CONFLICT DO NOTHING;

-- Grant permissions (adjust as needed for your Neon setup)
-- Note: Neon uses role-based access, owner has full access by default