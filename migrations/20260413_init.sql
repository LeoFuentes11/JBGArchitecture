-- Payload CMS migration for JBG Architects
-- Fresh install - 2026-04-13

-- Users collection
CREATE TABLE "users" (
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

CREATE INDEX "users_email_idx" ON "users" ("email");

-- Users sessions for auth
CREATE TABLE "users_sessions" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "_parent_id" uuid NOT NULL REFERENCES "users"("id") ON DELETE CASCADE,
  "_order" integer,
  "created_at" timestamp with time zone DEFAULT NOW(),
  "expires_at" timestamp with time zone,
  "session" jsonb
);

CREATE INDEX "users_sessions_parent_idx" ON "users_sessions" ("_parent_id");

-- Media collection
CREATE TABLE "media" (
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
  "alt" text NOT NULL,
  "caption" text,
  "credit" text
);

-- Projects collection  
CREATE TABLE "projects" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "category" text NOT NULL,
  "featured" boolean DEFAULT false,
  "heroImage" uuid REFERENCES "media"("id"),
  "gallery" jsonb,
  "shortDescription" text NOT NULL,
  "description" jsonb,
  "location" text,
  "year" integer,
  "client" text,
  "publishedAt" timestamp with time zone,
  "seo" jsonb
);

CREATE INDEX "projects_slug_idx" ON "projects" ("slug");

-- BlogPosts collection
CREATE TABLE "blog-posts" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "status" text NOT NULL DEFAULT 'draft',
  "heroImage" uuid REFERENCES "media"("id"),
  "excerpt" text NOT NULL,
  "content" jsonb,
  "category" text,
  "author" uuid REFERENCES "users"("id"),
  "publishedAt" timestamp with time zone,
  "seo" jsonb
);

CREATE INDEX "blog_posts_slug_idx" ON "blog-posts" ("slug");

-- Services collection
CREATE TABLE "services" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "created_at" timestamp with time zone DEFAULT NOW(),
  "updated_at" timestamp with time zone DEFAULT NOW(),
  "title" text NOT NULL,
  "slug" text NOT NULL UNIQUE,
  "tagline" text NOT NULL,
  "description" jsonb,
  "icon" text,
  "includes" jsonb,
  "order" integer DEFAULT 0
);

CREATE INDEX "services_slug_idx" ON "services" ("slug");
CREATE INDEX "services_order_idx" ON "services" ("order");

-- Payload migrations table
CREATE TABLE "_payload_migrations" (
  "id" uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  "name" varchar NOT NULL,
  "batch" integer,
  "created_at" timestamp with time zone DEFAULT NOW()
);

CREATE INDEX "_payload_migrations_name_idx" ON "_payload_migrations" ("name");