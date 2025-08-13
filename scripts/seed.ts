import 'dotenv/config';
import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';

import * as schema from '@/db/schema';

const sql = neon(process.env.DATABASE_URL!);
const db = drizzle(sql, { schema });

const main = async () => {
  try {
    console.log('Seeding database');

    await db.delete(schema.courses);
    await db.delete(schema.userProgress);
    await db.delete(schema.units);
    await db.delete(schema.lessons);
    await db.delete(schema.challenges);
    await db.delete(schema.challengeOptions);
    await db.delete(schema.challengeProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Spanish',
        imageSrc: '/es.svg',
      },
      {
        id: 2,
        title: 'French',
        imageSrc: '/fr.svg',
      },
      {
        id: 3,
        title: 'Croatian',
        imageSrc: '/hr.svg',
      },
      {
        id: 4,
        title: 'Italian',
        imageSrc: '/it.svg',
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        title: 'Unit 1',
        description: 'Learn the basics of Spanish',
        order: 1,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        title: 'Nouns',
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        title: 'Verbs',
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        title: 'Verbs',
        order: 3,
      },
      {
        id: 4,
        unitId: 1,
        title: 'Verbs',
        order: 4,
      },
      {
        id: 5,
        unitId: 1,
        title: 'Verbs',
        order: 5,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        question: 'Which one of these is the "the man"?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: 'ASSIST',
        question: '"the man"',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        question: 'Which one of these is the "the robot"?',
        order: 3,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: '/boy.svg',
        text: 'el hombre',
        correct: true,
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/girl.svg',
        text: 'la mujer',
        correct: false,
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/zombie.svg',
        text: 'el robot',
        correct: false,
        audioSrc: '/es_robot.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        text: 'el hombre',
        correct: true,
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 2,
        text: 'la mujer',
        correct: false,
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 2,
        text: 'el robot',
        correct: false,
        audioSrc: '/es_robot.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        text: 'el hombre',
        correct: false,
        audioSrc: '/es_man.mp3',
      },
      {
        challengeId: 3,
        text: 'la mujer',
        correct: false,
        audioSrc: '/es_woman.mp3',
      },
      {
        challengeId: 3,
        text: 'el robot',
        correct: true,
        audioSrc: '/es_robot.mp3',
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 4,
        lessonId: 2,
        type: 'SELECT',
        question: 'Which one of these is the "the man"?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2,
        type: 'ASSIST',
        question: '"the man"',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2,
        type: 'SELECT',
        question: 'Which one of these is the "the robot"?',
        order: 3,
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to seed the database');
  }
};

main();
