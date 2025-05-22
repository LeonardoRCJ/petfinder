-- CreateEnum
CREATE TYPE "Role" AS ENUM ('ADMIN', 'USER');

-- CreateEnum
CREATE TYPE "AdoptionStatus" AS ENUM ('PENDING', 'APPROVED', 'REJECTED');

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "role" "Role" NOT NULL DEFAULT 'USER',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Pet" (
    "id" SERIAL NOT NULL,
    "age" INTEGER NOT NULL,
    "breed" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "energy_level" TEXT NOT NULL,
    "estimated_weight" DOUBLE PRECISION NOT NULL,
    "gender" TEXT NOT NULL,
    "health_condition" TEXT NOT NULL,
    "image_url" TEXT NOT NULL,
    "is_castrated" BOOLEAN NOT NULL,
    "is_dewormed" BOOLEAN NOT NULL,
    "is_good_with_kids" BOOLEAN NOT NULL,
    "is_good_with_other_dogs" BOOLEAN NOT NULL,
    "is_vaccinated" BOOLEAN NOT NULL,
    "last_consultation_date" TIMESTAMP(3) NOT NULL,
    "petname" TEXT NOT NULL,
    "size" TEXT NOT NULL,
    "specie" TEXT NOT NULL,
    "temperament" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Pet_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AdoptionRequest" (
    "id" SERIAL NOT NULL,
    "petId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "formResponse" JSONB NOT NULL,
    "status" "AdoptionStatus" NOT NULL DEFAULT 'PENDING',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AdoptionRequest_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_petId_fkey" FOREIGN KEY ("petId") REFERENCES "Pet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "AdoptionRequest" ADD CONSTRAINT "AdoptionRequest_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
