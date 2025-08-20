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
        title: 'Klasy postaci',
        description: 'Poznaj różne klasy postaci w świecie fantasy',
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        title: 'Mitologia grecka',
        description: 'Odkryj świat greckich bogów, herosów i potworów',
        order: 2,
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
      {
        id: 4,
        unitId: 2,
        title: 'Symbole i miejsca',
        order: 1,
      },
      {
        id: 5,
        unitId: 2,
        title: 'Stworzenia mityczne',
        order: 2,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        question: 'Kto potrafi wskrzeszać martwych sojuszników?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: 'SELECT',
        question: 'Kto atakuje z dystansu przy użyciu łuku?',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        question: 'Kto specjalizuje się w truciznach i cichych eliminacjach?',
        order: 3,
      },
      {
        id: 4,
        lessonId: 2,
        type: 'SELECT',
        question: 'Kto jest najsłynniejszym japońskim mistrzem skradania się?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2,
        type: 'SELECT',
        question: 'Kto najczęściej korzysta z kuszy?',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2,
        type: 'SELECT',
        question:
          'Kto stoi na pierwszej linii, broniąc tarczą i ciężką zbroją?',
        order: 3,
      },
      {
        id: 7,
        lessonId: 3,
        type: 'SELECT',
        question: 'Kto przyzywa siły natury i leczy ziołami?',
        order: 1,
      },
      {
        id: 8,
        lessonId: 3,
        type: 'SELECT',
        question: 'Kto rzuca ofensywne czary, takie jak kula ognia?',
        order: 2,
      },
      {
        id: 9,
        lessonId: 3,
        type: 'SELECT',
        question: 'Kto walczy kataną, kierując się kodeksem bushido?',
        order: 3,
      },
      {
        id: 20,
        lessonId: 3,
        type: 'SELECT',
        question: 'Kto cicho kradnie i otwiera zamki bez klucza?',
        order: 4,
      },
      {
        id: 11,
        lessonId: 4,
        type: 'SELECT',
        question: 'Gdzie mieszkają greccy bogowie?',
        order: 1,
      },
      {
        id: 12,
        lessonId: 4,
        type: 'SELECT',
        question: 'Co jest symbolem władzy Zeusa?',
        order: 2,
      },
      {
        id: 13,
        lessonId: 4,
        type: 'SELECT',
        question: 'Co jest bronią Posejdona?',
        order: 3,
      },
      {
        id: 14,
        lessonId: 5,
        type: 'SELECT',
        question: 'Kto ma węże zamiast włosów?',
        order: 1,
      },
      {
        id: 15,
        lessonId: 5,
        type: 'SELECT',
        question: 'Kto jest skrzydlatym koniem?',
        order: 2,
      },
      {
        id: 16,
        lessonId: 5,
        type: 'SELECT',
        question: 'Kto strzeże wejścia do podziemi?',
        order: 3,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: '/fantasy/images/barbarian.png',
        text: 'Barbarzyńca',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/barbarzynca.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/fantasy/images/wizard.png',
        text: 'Czarodziej',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/czarodziej.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/fantasy/images/priest.png',
        text: 'Kapłan',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/kaplan.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        imageSrc: '/fantasy/images/swordsman.png',
        text: 'Szermierz',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/szermierz.mp3',
      },
      {
        challengeId: 2,
        imageSrc: '/fantasy/images/archer.png',
        text: 'Łucznik',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/lucznik.mp3',
      },
      {
        challengeId: 2,
        imageSrc: '/fantasy/images/monk.png',
        text: 'Mnich',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/mnich.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: '/fantasy/images/assassin.png',
        text: 'Skrytobójca',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/skrytobojca.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/fantasy/images/barbarian.png',
        text: 'Barbarzyńca',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/barbarzynca.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/fantasy/images/knight.png',
        text: 'Rycerz',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/rycerz.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        imageSrc: '/fantasy/images/ninja.png',
        text: 'Ninja',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/ninja.mp3',
      },
      {
        challengeId: 4,
        imageSrc: '/fantasy/images/thief.png',
        text: 'Złodziej',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/zlodziej.mp3',
      },
      {
        challengeId: 4,
        imageSrc: '/fantasy/images/assassin.png',
        text: 'Skrytobójca',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/skrytobojca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        imageSrc: '/fantasy/images/crossbowman.png',
        text: 'Kusznik',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/kusznik.mp3',
      },
      {
        challengeId: 5,
        imageSrc: '/fantasy/images/archer.png',
        text: 'Łucznik',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/lucznik.mp3',
      },
      {
        challengeId: 5,
        imageSrc: '/fantasy/images/gunner.png',
        text: 'Strzelec',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/strzelec.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6,
        imageSrc: '/fantasy/images/knight.png',
        text: 'Rycerz',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/rycerz.mp3',
      },
      {
        challengeId: 6,
        imageSrc: '/fantasy/images/swordsman.png',
        text: 'Szermierz',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/szermierz.mp3',
      },
      {
        challengeId: 6,
        imageSrc: '/fantasy/images/barbarian.png',
        text: 'Barbarzyńca',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 7,
        imageSrc: '/fantasy/images/wizard.png',
        text: 'Czarodziej',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/czarodziej.mp3',
      },
      {
        challengeId: 7,
        imageSrc: '/fantasy/images/druid.png',
        text: 'Druid',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/druid.mp3',
      },
      {
        challengeId: 7,
        imageSrc: '/fantasy/images/priest.png',
        text: 'Kapłan',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/kaplan.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 8,
        imageSrc: '/fantasy/images/priest.png',
        text: 'Kapłan',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/kaplan.mp3',
      },
      {
        challengeId: 8,
        imageSrc: '/fantasy/images/wizard.png',
        text: 'Czarodziej',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/czarodziej.mp3',
      },
      {
        challengeId: 8,
        imageSrc: '/fantasy/images/knight.png',
        text: 'Rycerz',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/rycerz.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 9,
        imageSrc: '/fantasy/images/ninja.png',
        text: 'Ninja',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/ninja.mp3',
      },
      {
        challengeId: 9,
        imageSrc: '/fantasy/images/samurai.png',
        text: 'Samuraj',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/samuraj.mp3',
      },
      {
        challengeId: 9,
        imageSrc: '/fantasy/images/swordsman.png',
        text: 'Szermierz',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/szermierz.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        imageSrc: '/fantasy/images/assassin.png',
        text: 'Skrytobójca',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/skrytobojca.mp3',
      },
      {
        challengeId: 20,
        imageSrc: '/fantasy/images/thief.png',
        text: 'Złodziej',
        correct: true,
        audioSrc: '/fantasy/mp3/pl/zlodziej.mp3',
      },
      {
        challengeId: 20,
        imageSrc: '/fantasy/images/adventurer.png',
        text: 'Poszukiwacz przygód',
        correct: false,
        audioSrc: '/fantasy/mp3/pl/poszukiwacz_przygod.mp3',
      },
    ]);

    // Opcje dla wyzwań mitologii greckiej
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 11,
        imageSrc: '/mythology/images/olympus.png',
        text: 'Olimp',
        correct: true,
        audioSrc: '/mythology/mp3/pl/olimp.mp3',
      },
      {
        challengeId: 11,
        imageSrc: '/mythology/images/ancient-pillar.png',
        text: 'Starożytny filar',
        correct: false,
        audioSrc: '/mythology/mp3/pl/starozytny-filar.mp3',
      },
      {
        challengeId: 11,
        imageSrc: '/mythology/images/pyre.png',
        text: 'Stos pogrzebowy',
        correct: false,
        audioSrc: '/mythology/mp3/pl/stos-pogrzebowy.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 12,
        imageSrc: '/mythology/images/lightning.png',
        text: 'Błyskawica',
        correct: true,
        audioSrc: '/mythology/mp3/pl/blyskawica.mp3',
      },
      {
        challengeId: 12,
        imageSrc: '/mythology/images/trident.png',
        text: 'Trójząb',
        correct: false,
        audioSrc: '/mythology/mp3/pl/trojzab.mp3',
      },
      {
        challengeId: 12,
        imageSrc: '/mythology/images/horn.png',
        text: 'Róg',
        correct: false,
        audioSrc: '/mythology/mp3/pl/rog.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 13,
        imageSrc: '/mythology/images/trident.png',
        text: 'Trójząb',
        correct: true,
        audioSrc: '/mythology/mp3/pl/trojzab.mp3',
      },
      {
        challengeId: 13,
        imageSrc: '/mythology/images/lightning.png',
        text: 'Błyskawica',
        correct: false,
        audioSrc: '/mythology/mp3/pl/blyskawica.mp3',
      },
      {
        challengeId: 13,
        imageSrc: '/mythology/images/horn.png',
        text: 'Róg',
        correct: false,
        audioSrc: '/mythology/mp3/pl/rog.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 14,
        imageSrc: '/mythology/images/medusa.png',
        text: 'Meduza',
        correct: true,
        audioSrc: '/mythology/mp3/pl/meduza.mp3',
      },
      {
        challengeId: 14,
        imageSrc: '/mythology/images/cerberus.png',
        text: 'Cerber',
        correct: false,
        audioSrc: '/mythology/mp3/pl/cerber.mp3',
      },
      {
        challengeId: 14,
        imageSrc: '/mythology/images/cyclops.png',
        text: 'Cyklop',
        correct: false,
        audioSrc: '/mythology/mp3/pl/cyklop.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 15,
        imageSrc: '/mythology/images/pegasus.png',
        text: 'Pegaz',
        correct: true,
        audioSrc: '/mythology/mp3/pl/pegaz.mp3',
      },
      {
        challengeId: 15,
        imageSrc: '/mythology/images/sphinx.png',
        text: 'Sfinks',
        correct: false,
        audioSrc: '/mythology/mp3/pl/sfinks.mp3',
      },
      {
        challengeId: 15,
        imageSrc: '/mythology/images/cerberus.png',
        text: 'Cerber',
        correct: false,
        audioSrc: '/mythology/mp3/pl/cerber.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 16,
        imageSrc: '/mythology/images/cerberus.png',
        text: 'Cerber',
        correct: true,
        audioSrc: '/mythology/mp3/pl/cerber.mp3',
      },
      {
        challengeId: 16,
        imageSrc: '/mythology/images/cyclops.png',
        text: 'Cyklop',
        correct: false,
        audioSrc: '/mythology/mp3/pl/cyklop.mp3',
      },
      {
        challengeId: 16,
        imageSrc: '/mythology/images/sphinx.png',
        text: 'Sfinks',
        correct: false,
        audioSrc: '/mythology/mp3/pl/sfinks.mp3',
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to seed the database');
  }
};

main();
