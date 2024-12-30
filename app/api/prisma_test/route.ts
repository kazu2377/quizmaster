import { Prisma, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

/**
 * Validator object for selecting specific fields from the 'questions' table in Prisma.
 * Uses Prisma's type-safe validator to ensure type checking during compilation.
 *
 * @remarks
 * Selected fields include:
 * - id
 * - text
 * - options
 * - correctanswer
 *
 * @type {Prisma.questionsDefaultArgs}
 */
const questionsKey = Prisma.validator<Prisma.questionsDefaultArgs>()({
  select: {
    id: true,
    text: true,
    options: true,
    correctanswer: true,
  },
});

export type Questions = Prisma.questionsGetPayload<typeof questionsKey>;

export async function GET() {
  try {
    const questions = await prisma.questions.findMany(questionsKey);

    return NextResponse.json({
      success: true,
      data: questions,
    });
  } catch (error) {
    console.error("Database error:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch questions",
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
