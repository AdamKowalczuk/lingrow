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
        titleEn: 'Polish',
        titlePl: 'Polski',
        imageSrc: '/pl.svg',
      },
    ]);

    await db.insert(schema.units).values([
      {
        id: 1,
        courseId: 1,
        titleEn: 'Character Classes',
        titlePl: 'Klasy postaci',
        descriptionEn:
          'Learn about different character classes in the fantasy world',
        descriptionPl: 'Poznaj różne klasy postaci w świecie fantasy',
        order: 1,
      },
      {
        id: 2,
        courseId: 1,
        titleEn: 'Greek Mythology',
        titlePl: 'Mitologia grecka',
        descriptionEn: 'Discover the world of Greek gods, heroes and monsters',
        descriptionPl: 'Odkryj świat greckich bogów, herosów i potworów',
        order: 2,
      },
    ]);
    await db.insert(schema.lessons).values([
      {
        id: 1,
        unitId: 1,
        titleEn: 'Character Classes',
        titlePl: 'Klasy postaci',
        order: 1,
      },
      {
        id: 2,
        unitId: 1,
        titleEn: 'Weapons and Combat',
        titlePl: 'Broń i walka',
        order: 2,
      },
      {
        id: 3,
        unitId: 1,
        titleEn: 'Magic and Healing',
        titlePl: 'Magia i uzdrowienie',
        order: 3,
      },
      {
        id: 4,
        unitId: 2,
        titleEn: 'Symbols and Places',
        titlePl: 'Symbole i miejsca',
        order: 1,
      },
      {
        id: 5,
        unitId: 2,
        titleEn: 'Mythical Creatures',
        titlePl: 'Stworzenia mityczne',
        order: 2,
      },
    ]);

    await db.insert(schema.challenges).values([
      {
        id: 1,
        lessonId: 1,
        type: 'SELECT',
        questionEn: 'Who can resurrect dead allies?',
        questionPl: 'Kto potrafi wskrzeszać martwych sojuszników?',
        order: 1,
      },
      {
        id: 2,
        lessonId: 1,
        type: 'SELECT',
        questionEn: 'Who attacks from a distance using a bow?',
        questionPl: 'Kto atakuje z dystansu przy użyciu łuku?',
        order: 2,
      },
      {
        id: 3,
        lessonId: 1,
        type: 'SELECT',
        questionEn: 'Who specializes in poisons and silent eliminations?',
        questionPl: 'Kto specjalizuje się w truciznach i cichych eliminacjach?',
        order: 3,
      },
      {
        id: 4,
        lessonId: 2,
        type: 'SELECT',
        questionEn: 'Who is the most famous Japanese stealth master?',
        questionPl:
          'Kto jest najsłynniejszym japońskim mistrzem skradania się?',
        order: 1,
      },
      {
        id: 5,
        lessonId: 2,
        type: 'SELECT',
        questionEn: 'Who most often uses a crossbow?',
        questionPl: 'Kto najczęściej korzysta z kuszy?',
        order: 2,
      },
      {
        id: 6,
        lessonId: 2,
        type: 'SELECT',
        questionEn:
          'Who stands on the front line, defending with a shield and heavy armor?',
        questionPl:
          'Kto stoi na pierwszej linii, broniąc tarczą i ciężką zbroją?',
        order: 3,
      },
      {
        id: 7,
        lessonId: 3,
        type: 'SELECT',
        questionEn: 'Who summons the forces of nature and heals with herbs?',
        questionPl: 'Kto przyzywa siły natury i leczy ziołami?',
        order: 1,
      },
      {
        id: 8,
        lessonId: 3,
        type: 'SELECT',
        questionEn: 'Who casts offensive spells like fireball?',
        questionPl: 'Kto rzuca ofensywne czary, takie jak kula ognia?',
        order: 2,
      },
      {
        id: 9,
        lessonId: 3,
        type: 'SELECT',
        questionEn: 'Who fights with a katana, following the bushido code?',
        questionPl: 'Kto walczy kataną, kierując się kodeksem bushido?',
        order: 3,
      },
      {
        id: 20,
        lessonId: 3,
        type: 'SELECT',
        questionEn: 'Who quietly steals and opens locks without keys?',
        questionPl: 'Kto cicho kradnie i otwiera zamki bez klucza?',
        order: 4,
      },
      {
        id: 11,
        lessonId: 4,
        type: 'SELECT',
        questionEn: 'Where do Greek gods live?',
        questionPl: 'Gdzie mieszkają greccy bogowie?',
        order: 1,
      },
      {
        id: 12,
        lessonId: 4,
        type: 'SELECT',
        questionEn: 'What is the symbol of Zeus power?',
        questionPl: 'Co jest symbolem władzy Zeusa?',
        order: 2,
      },
      {
        id: 13,
        lessonId: 4,
        type: 'SELECT',
        questionEn: 'What is Poseidons weapon?',
        questionPl: 'Co jest bronią Posejdona?',
        order: 3,
      },
      {
        id: 14,
        lessonId: 5,
        type: 'SELECT',
        questionEn: 'Who has snakes instead of hair?',
        questionPl: 'Kto ma węże zamiast włosów?',
        order: 1,
      },
      {
        id: 15,
        lessonId: 5,
        type: 'SELECT',
        questionEn: 'Who is the winged horse?',
        questionPl: 'Kto jest skrzydlatym koniem?',
        order: 2,
      },
      {
        id: 16,
        lessonId: 5,
        type: 'SELECT',
        questionEn: 'Who guards the entrance to the underworld?',
        questionPl: 'Kto strzeże wejścia do podziemi?',
        order: 3,
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 1,
        imageSrc: '/fantasy/images/barbarian.png',
        textEn: 'Barbarian',
        textPl: 'Barbarzyńca',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/barbarian.mp3',
        audioSrcPl: '/fantasy/mp3/pl/barbarzynca.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/fantasy/images/wizard.png',
        textEn: 'Wizard',
        textPl: 'Czarodziej',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/wizard.mp3',
        audioSrcPl: '/fantasy/mp3/pl/czarodziej.mp3',
      },
      {
        challengeId: 1,
        imageSrc: '/fantasy/images/priest.png',
        textEn: 'Priest',
        textPl: 'Kapłan',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/priest.mp3',
        audioSrcPl: '/fantasy/mp3/pl/kaplan.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 2,
        imageSrc: '/fantasy/images/swordsman.png',
        textEn: 'Swordsman',
        textPl: 'Szermierz',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/swordsman.mp3',
        audioSrcPl: '/fantasy/mp3/pl/szermierz.mp3',
      },
      {
        challengeId: 2,
        imageSrc: '/fantasy/images/archer.png',
        textEn: 'Archer',
        textPl: 'Łucznik',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/archer.mp3',
        audioSrcPl: '/fantasy/mp3/pl/lucznik.mp3',
      },
      {
        challengeId: 2,
        imageSrc: '/fantasy/images/monk.png',
        textEn: 'Monk',
        textPl: 'Mnich',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/monk.mp3',
        audioSrcPl: '/fantasy/mp3/pl/mnich.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 3,
        imageSrc: '/fantasy/images/assassin.png',
        textEn: 'Assassin',
        textPl: 'Skrytobójca',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/assassin.mp3',
        audioSrcPl: '/fantasy/mp3/pl/skrytobojca.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/fantasy/images/barbarian.png',
        textEn: 'Barbarian',
        textPl: 'Barbarzyńca',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/barbarian.mp3',
        audioSrcPl: '/fantasy/mp3/pl/barbarzynca.mp3',
      },
      {
        challengeId: 3,
        imageSrc: '/fantasy/images/knight.png',
        textEn: 'Knight',
        textPl: 'Rycerz',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/knight.mp3',
        audioSrcPl: '/fantasy/mp3/pl/rycerz.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 4,
        imageSrc: '/fantasy/images/ninja.png',
        textEn: 'Ninja',
        textPl: 'Ninja',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/ninja.mp3',
        audioSrcPl: '/fantasy/mp3/pl/ninja.mp3',
      },
      {
        challengeId: 4,
        imageSrc: '/fantasy/images/thief.png',
        textEn: 'Thief',
        textPl: 'Złodziej',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/thief.mp3',
        audioSrcPl: '/fantasy/mp3/pl/zlodziej.mp3',
      },
      {
        challengeId: 4,
        imageSrc: '/fantasy/images/assassin.png',
        textEn: 'Assassin',
        textPl: 'Skrytobójca',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/assassin.mp3',
        audioSrcPl: '/fantasy/mp3/pl/skrytobojca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 5,
        imageSrc: '/fantasy/images/crossbowman.png',
        textEn: 'Crossbowman',
        textPl: 'Kusznik',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/crossbowman.mp3',
        audioSrcPl: '/fantasy/mp3/pl/kusznik.mp3',
      },
      {
        challengeId: 5,
        imageSrc: '/fantasy/images/archer.png',
        textEn: 'Archer',
        textPl: 'Łucznik',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/archer.mp3',
        audioSrcPl: '/fantasy/mp3/pl/lucznik.mp3',
      },
      {
        challengeId: 5,
        imageSrc: '/fantasy/images/gunner.png',
        textEn: 'Gunner',
        textPl: 'Strzelec',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/gunner.mp3',
        audioSrcPl: '/fantasy/mp3/pl/strzelec.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 6,
        imageSrc: '/fantasy/images/knight.png',
        textEn: 'Knight',
        textPl: 'Rycerz',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/knight.mp3',
        audioSrcPl: '/fantasy/mp3/pl/rycerz.mp3',
      },
      {
        challengeId: 6,
        imageSrc: '/fantasy/images/swordsman.png',
        textEn: 'Swordsman',
        textPl: 'Szermierz',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/swordsman.mp3',
        audioSrcPl: '/fantasy/mp3/pl/szermierz.mp3',
      },
      {
        challengeId: 6,
        imageSrc: '/fantasy/images/barbarian.png',
        textEn: 'Barbarian',
        textPl: 'Barbarzyńca',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/barbarian.mp3',
        audioSrcPl: '/fantasy/mp3/pl/barbarzynca.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 7,
        imageSrc: '/fantasy/images/wizard.png',
        textEn: 'Wizard',
        textPl: 'Czarodziej',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/wizard.mp3',
        audioSrcPl: '/fantasy/mp3/pl/czarodziej.mp3',
      },
      {
        challengeId: 7,
        imageSrc: '/fantasy/images/druid.png',
        textEn: 'Druid',
        textPl: 'Druid',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/druid.mp3',
        audioSrcPl: '/fantasy/mp3/pl/druid.mp3',
      },
      {
        challengeId: 7,
        imageSrc: '/fantasy/images/priest.png',
        textEn: 'Priest',
        textPl: 'Kapłan',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/priest.mp3',
        audioSrcPl: '/fantasy/mp3/pl/kaplan.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 8,
        imageSrc: '/fantasy/images/priest.png',
        textEn: 'Priest',
        textPl: 'Kapłan',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/priest.mp3',
        audioSrcPl: '/fantasy/mp3/pl/kaplan.mp3',
      },
      {
        challengeId: 8,
        imageSrc: '/fantasy/images/wizard.png',
        textEn: 'Wizard',
        textPl: 'Czarodziej',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/wizard.mp3',
        audioSrcPl: '/fantasy/mp3/pl/czarodziej.mp3',
      },
      {
        challengeId: 8,
        imageSrc: '/fantasy/images/knight.png',
        textEn: 'Knight',
        textPl: 'Rycerz',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/knight.mp3',
        audioSrcPl: '/fantasy/mp3/pl/rycerz.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 9,
        imageSrc: '/fantasy/images/ninja.png',
        textEn: 'Ninja',
        textPl: 'Ninja',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/ninja.mp3',
        audioSrcPl: '/fantasy/mp3/pl/ninja.mp3',
      },
      {
        challengeId: 9,
        imageSrc: '/fantasy/images/samurai.png',
        textEn: 'Samurai',
        textPl: 'Samuraj',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/samurai.mp3',
        audioSrcPl: '/fantasy/mp3/pl/samurai.mp3',
      },
      {
        challengeId: 9,
        imageSrc: '/fantasy/images/swordsman.png',
        textEn: 'Swordsman',
        textPl: 'Szermierz',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/swordsman.mp3',
        audioSrcPl: '/fantasy/mp3/pl/szermierz.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 20,
        imageSrc: '/fantasy/images/assassin.png',
        textEn: 'Assassin',
        textPl: 'Skrytobójca',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/assassin.mp3',
        audioSrcPl: '/fantasy/mp3/pl/skrytobojca.mp3',
      },
      {
        challengeId: 20,
        imageSrc: '/fantasy/images/thief.png',
        textEn: 'Thief',
        textPl: 'Złodziej',
        correct: true,
        audioSrcEn: '/fantasy/mp3/en/thief.mp3',
        audioSrcPl: '/fantasy/mp3/pl/zlodziej.mp3',
      },
      {
        challengeId: 20,
        imageSrc: '/fantasy/images/adventurer.png',
        textEn: 'Adventurer',
        textPl: 'Poszukiwacz przygód',
        correct: false,
        audioSrcEn: '/fantasy/mp3/en/adventurer.mp3',
        audioSrcPl: '/fantasy/mp3/pl/poszukiwacz_przygod.mp3',
      },
    ]);

    // Opcje dla wyzwań mitologii greckiej
    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 11,
        imageSrc: '/mythology/images/olympus.png',
        textEn: 'Olympus',
        textPl: 'Olimp',
        correct: true,
        audioSrcEn: '/mythology/mp3/en/olympus.mp3',
        audioSrcPl: '/mythology/mp3/pl/olimp.mp3',
      },
      {
        challengeId: 11,
        imageSrc: '/mythology/images/ancient-pillar.png',
        textEn: 'Ancient Pillar',
        textPl: 'Starożytny filar',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/ancient-pillar.mp3',
        audioSrcPl: '/mythology/mp3/pl/starozytny-filar.mp3',
      },
      {
        challengeId: 11,
        imageSrc: '/mythology/images/pyre.png',
        textEn: 'Pyre',
        textPl: 'Stos pogrzebowy',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/pyre.mp3',
        audioSrcPl: '/mythology/mp3/pl/stos-pogrzebowy.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 12,
        imageSrc: '/mythology/images/lightning.png',
        textEn: 'Lightning',
        textPl: 'Błyskawica',
        correct: true,
        audioSrcEn: '/mythology/mp3/en/lightning.mp3',
        audioSrcPl: '/mythology/mp3/pl/blyskawica.mp3',
      },
      {
        challengeId: 12,
        imageSrc: '/mythology/images/trident.png',
        textEn: 'Trident',
        textPl: 'Trójząb',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/trident.mp3',
        audioSrcPl: '/mythology/mp3/pl/trojzab.mp3',
      },
      {
        challengeId: 12,
        imageSrc: '/mythology/images/horn.png',
        textEn: 'Horn',
        textPl: 'Róg',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/horn.mp3',
        audioSrcPl: '/mythology/mp3/pl/rog.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 13,
        imageSrc: '/mythology/images/trident.png',
        textEn: 'Trident',
        textPl: 'Trójząb',
        correct: true,
        audioSrcEn: '/mythology/mp3/en/trident.mp3',
        audioSrcPl: '/mythology/mp3/pl/trojzab.mp3',
      },
      {
        challengeId: 13,
        imageSrc: '/mythology/images/lightning.png',
        textEn: 'Lightning',
        textPl: 'Błyskawica',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/lightning.mp3',
        audioSrcPl: '/mythology/mp3/pl/blyskawica.mp3',
      },
      {
        challengeId: 13,
        imageSrc: '/mythology/images/horn.png',
        textEn: 'Horn',
        textPl: 'Róg',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/horn.mp3',
        audioSrcPl: '/mythology/mp3/pl/rog.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 14,
        imageSrc: '/mythology/images/medusa.png',
        textEn: 'Medusa',
        textPl: 'Meduza',
        correct: true,
        audioSrcEn: '/mythology/mp3/en/medusa.mp3',
        audioSrcPl: '/mythology/mp3/pl/meduza.mp3',
      },
      {
        challengeId: 14,
        imageSrc: '/mythology/images/cerberus.png',
        textEn: 'Cerberus',
        textPl: 'Cerber',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/cerberus.mp3',
        audioSrcPl: '/mythology/mp3/pl/cerber.mp3',
      },
      {
        challengeId: 14,
        imageSrc: '/mythology/images/cyclops.png',
        textEn: 'Cyclops',
        textPl: 'Cyklop',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/cyclops.mp3',
        audioSrcPl: '/mythology/mp3/pl/cyklop.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 15,
        imageSrc: '/mythology/images/pegasus.png',
        textEn: 'Pegasus',
        textPl: 'Pegaz',
        correct: true,
        audioSrcEn: '/mythology/mp3/en/pegasus.mp3',
        audioSrcPl: '/mythology/mp3/pl/pegaz.mp3',
      },
      {
        challengeId: 15,
        imageSrc: '/mythology/images/sphinx.png',
        textEn: 'Sphinx',
        textPl: 'Sfinks',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/sphinx.mp3',
        audioSrcPl: '/mythology/mp3/pl/sfinks.mp3',
      },
      {
        challengeId: 15,
        imageSrc: '/mythology/images/cerberus.png',
        textEn: 'Cerberus',
        textPl: 'Cerber',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/cerberus.mp3',
        audioSrcPl: '/mythology/mp3/pl/cerber.mp3',
      },
    ]);

    await db.insert(schema.challengeOptions).values([
      {
        challengeId: 16,
        imageSrc: '/mythology/images/cerberus.png',
        textEn: 'Cerberus',
        textPl: 'Cerber',
        correct: true,
        audioSrcEn: '/mythology/mp3/en/cerberus.mp3',
        audioSrcPl: '/mythology/mp3/pl/cerber.mp3',
      },
      {
        challengeId: 16,
        imageSrc: '/mythology/images/cyclops.png',
        textEn: 'Cyclops',
        textPl: 'Cyklop',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/cyclops.mp3',
        audioSrcPl: '/mythology/mp3/pl/cyklop.mp3',
      },
      {
        challengeId: 16,
        imageSrc: '/mythology/images/sphinx.png',
        textEn: 'Sphinx',
        textPl: 'Sfinks',
        correct: false,
        audioSrcEn: '/mythology/mp3/en/sphinx.mp3',
        audioSrcPl: '/mythology/mp3/pl/sfinks.mp3',
      },
    ]);

    console.log('Seeding finished');
  } catch (error) {
    console.log(error);
    throw new Error('Failed to seed the database');
  }
};

main();
