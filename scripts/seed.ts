import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';

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
    await db.delete(schema.userSubscription);
    await db.delete(schema.questProgress);

    await db.insert(schema.courses).values([
      {
        id: 1,
        title: 'Polish',
        imageSrc: '/pl.svg',
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
        title: 'Klasy postaci',
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        title: 'Broń i walka',
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        title: 'Magia i uzdrowienie',
        order: 3,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        question: 'Which class uses a traditional bow and arrow?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: 'SELECT',
        question: 'Which class has the highest intelligence stat?',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        question: 'Which class wears heavy armor and uses a shield?',
        order: 3,
      },
      {
        id: 4,
        lessonId: 2,
        type: 'SELECT',
        question: 'Which class can turn invisible?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2,
        type: 'SELECT',
        question: 'Which class has the highest dexterity?',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2,
        type: 'SELECT',
        question: 'Which class has the highest strength?',
        order: 3,
      },
      {
        id: 7,
        lessonId: 3,
        type: 'SELECT',
        question: 'Which class can resurrect dead allies?',
        order: 1,
      },
      {
        id: 8,
        lessonId: 3,
        type: 'SELECT',
        question: 'Which class specializes in alchemy?',
        order: 2,
      },
      {
        id: 9,
        lessonId: 3,
        type: 'SELECT',
        question: 'Which class has the best critical skills?',
        order: 3,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: '/avatars/bow.png',
        text: 'Łucznik',
        correct: true,
        audioSrc: '/mp3/lucznik.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/avatars/crossbow.png',
        text: 'Kusznik',
        correct: false,
        audioSrc: '/mp3/kusznik.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/avatars/gunnery.png',
        text: 'Strzelec',
        correct: false,
        audioSrc: '/mp3/strzelec.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        imageSrc: '/avatars/wizard.png',
        text: 'Czarodziej',
        correct: true,
        audioSrc: '/mp3/czarodziej.mp3',
      },
      {
        challengeId: 2,
        imageSrc: '/avatars/magician.png',
        text: 'Mag',
        correct: false,
        audioSrc: '/mp3/mag.mp3',
      },
      {
        challengeId: 2,
        imageSrc: '/avatars/alchemy.png',
        text: 'Alchemik',
        correct: false,
        audioSrc: '/mp3/alchemik.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: '/avatars/knight.png',
        text: 'Rycerz',
        correct: true,
        audioSrc: '/mp3/rycerz.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/avatars/barbarian.png',
        text: 'Barbarzyńca',
        correct: false,
        audioSrc: '/mp3/barbarzynca.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/avatars/swordsman.png',
        text: 'Miecznik',
        correct: false,
        audioSrc: '/mp3/miecznik.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        imageSrc: '/avatars/ninja.png',
        text: 'Ninja',
        correct: true,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 4,
        imageSrc: '/avatars/thief.png',
        text: 'Złodziej',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 4,
        imageSrc: '/avatars/assasin.png',
        text: 'Zabójca',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        imageSrc: '/avatars/adventurer.png',
        text: 'Poszukiwacz przygód',
        correct: true,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 5,
        imageSrc: '/avatars/martial.png',
        text: 'Artysta walki',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 5,
        imageSrc: '/avatars/samurai.png',
        text: 'Samuraj',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6,
        imageSrc: '/avatars/barbarian.png',
        text: 'Barbarzyńca',
        correct: true,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 6,
        imageSrc: '/avatars/knight.png',
        text: 'Rycerz',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 6,
        imageSrc: '/avatars/swordsman.png',
        text: 'Miecznik',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 7,
        imageSrc: '/avatars/priest.png',
        text: 'Kapłan',
        correct: true,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 7,
        imageSrc: '/avatars/druid.png',
        text: 'Druid',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 7,
        imageSrc: '/avatars/monk.png',
        text: 'Mnich',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 8,
        imageSrc: '/avatars/alchemy.png',
        text: 'Alchemik',
        correct: true,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 8,
        imageSrc: '/avatars/wizard.png',
        text: 'Czarodziej',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 8,
        imageSrc: '/avatars/magician.png',
        text: 'Mag',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 9,
        imageSrc: '/avatars/assasin.png',
        text: 'Zabójca',
        correct: true,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 9,
        imageSrc: '/avatars/thief.png',
        text: 'Złodziej',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
      {
        challengeId: 9,
        imageSrc: '/avatars/ninja.png',
        text: 'Ninja',
        correct: false,
        audioSrc: '/barbarzynca.mp3',
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to seed the database');
  }
};

main();
