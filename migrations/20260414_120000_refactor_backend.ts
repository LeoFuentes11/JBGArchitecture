import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
    -- Add missing columns to locked documents rels for new collections
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "pages_id" integer;
    ALTER TABLE "payload_locked_documents_rels" ADD COLUMN IF NOT EXISTS "categories_id" integer;
    
    -- Create indexes for new columns
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_pages_id_idx" ON "payload_locked_documents_rels" USING btree ("pages_id");
    CREATE INDEX IF NOT EXISTS "payload_locked_documents_rels_categories_id_idx" ON "payload_locked_documents_rels" USING btree ("categories_id");
    
    -- Create Categories table
    CREATE TABLE IF NOT EXISTS "categories" (
      "id" serial PRIMARY KEY NOT NULL,
      "title" varchar NOT NULL,
      "slug" varchar NOT NULL,
      "parent_id" integer,
      "updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
      "created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
    );
    
    -- Create Header global tables
    CREATE TABLE IF NOT EXISTS "header_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "header" (
      "id" serial PRIMARY KEY NOT NULL,
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    
    -- Create Footer global tables
    CREATE TABLE IF NOT EXISTS "footer_nav_items" (
      "_order" integer NOT NULL,
      "_parent_id" integer NOT NULL,
      "id" varchar PRIMARY KEY NOT NULL,
      "label" varchar NOT NULL,
      "url" varchar NOT NULL
    );
    
    CREATE TABLE IF NOT EXISTS "footer" (
      "id" serial PRIMARY KEY NOT NULL,
      "copyright" varchar DEFAULT '© JBG Architecture. All rights reserved.',
      "updated_at" timestamp(3) with time zone,
      "created_at" timestamp(3) with time zone
    );
    
    -- Create indexes
    CREATE UNIQUE INDEX IF NOT EXISTS "categories_slug_idx" ON "categories" USING btree ("slug");
    CREATE INDEX IF NOT EXISTS "categories_parent_idx" ON "categories" USING btree ("parent_id");
    
    CREATE INDEX IF NOT EXISTS "header_nav_items_order_idx" ON "header_nav_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "header_nav_items_parent_id_idx" ON "header_nav_items" USING btree ("_parent_id");
    
    CREATE INDEX IF NOT EXISTS "footer_nav_items_order_idx" ON "footer_nav_items" USING btree ("_order");
    CREATE INDEX IF NOT EXISTS "footer_nav_items_parent_id_idx" ON "footer_nav_items" USING btree ("_parent_id");
  `)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
    DROP INDEX IF EXISTS "payload_locked_documents_rels_pages_id_idx";
    DROP INDEX IF EXISTS "payload_locked_documents_rels_categories_id_idx";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "pages_id";
    ALTER TABLE "payload_locked_documents_rels" DROP COLUMN IF EXISTS "categories_id";
    
    DROP TABLE IF EXISTS "footer_nav_items" CASCADE;
    DROP TABLE IF EXISTS "footer" CASCADE;
    DROP TABLE IF EXISTS "header_nav_items" CASCADE;
    DROP TABLE IF EXISTS "header" CASCADE;
    DROP TABLE IF EXISTS "categories" CASCADE;
  `)
}