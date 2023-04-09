/*
  Warnings:

  - You are about to alter the column `type` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `provider` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `provider_account_id` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `refresh_token` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `access_token` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `token_type` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `scope` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `id_token` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `session_state` on the `accounts` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `title` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `category` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `image_src` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `location_value` on the `listings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `description` on the `reservations` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `image` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `hashed_password` on the `users` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "accounts" ALTER COLUMN "type" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "provider" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "provider_account_id" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "refresh_token" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "access_token" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "token_type" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "scope" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "id_token" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "session_state" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "listings" ALTER COLUMN "title" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "description" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "category" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "image_src" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "location_value" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "reservations" ALTER COLUMN "description" SET DATA TYPE VARCHAR(255);

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "name" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "image" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "hashed_password" SET DATA TYPE VARCHAR(255);
