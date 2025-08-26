import { relations } from 'drizzle-orm';
import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  serial,
  text,
  timestamp,
} from 'drizzle-orm/pg-core';

export const courses = pgTable('courses', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titlePl: text('title_pl').notNull(),
  titleJp: text('title_jp').notNull(),
  imageSrc: text('image_src').notNull(),
  targetLanguage: text('target_language').notNull(),
});

export const coursesRelations = relations(courses, ({ many }) => ({
  userProgress: many(userProgress),
  units: many(units),
}));

export const units = pgTable('units', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titlePl: text('title_pl').notNull(),
  titleJp: text('title_jp').notNull(),
  descriptionEn: text('description_en').notNull(),
  descriptionPl: text('description_pl').notNull(),
  descriptionJp: text('description_jp').notNull(),
  courseId: integer('course_id')
    .references(() => courses.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer('order').notNull(),
});

export const unitsRelations = relations(units, ({ many, one }) => ({
  course: one(courses, {
    fields: [units.courseId],
    references: [courses.id],
  }),
  lessons: many(lessons),
}));

export const lessons = pgTable('lessons', {
  id: serial('id').primaryKey(),
  titleEn: text('title_en').notNull(),
  titlePl: text('title_pl').notNull(),
  titleJp: text('title_jp').notNull(),
  unitId: integer('unit_id')
    .references(() => units.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  order: integer('order').notNull(),
});

export const lessonsRelations = relations(lessons, ({ one, many }) => ({
  unit: one(units, {
    fields: [lessons.unitId],
    references: [units.id],
  }),
  challenges: many(challenges),
}));

export const challengesEnum = pgEnum('type', [
  'SELECT',
  'ASSIST',
  'LISTEN',
  'FILL_BLANK',
]);

export const challenges = pgTable('challenges', {
  id: serial('id').primaryKey(),
  lessonId: integer('lesson_id')
    .references(() => lessons.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  type: challengesEnum('type').notNull(),
  questionEn: text('question_en').notNull(),
  questionPl: text('question_pl').notNull(),
  questionJp: text('question_jp').notNull(),
  audioSrcEn: text('audio_src_en'),
  audioSrcPl: text('audio_src_pl'),
  audioSrcJp: text('audio_src_jp'),
  order: integer('order').notNull(),
});

export const challengesRelations = relations(challenges, ({ one, many }) => ({
  lesson: one(lessons, {
    fields: [challenges.lessonId],
    references: [lessons.id],
  }),
  challengeOptions: many(challengeOptions),
  challengeProgress: many(challengeProgress),
}));

export const challengeOptions = pgTable('challenge_options', {
  id: serial('id').primaryKey(),
  challengeId: integer('challenge_id')
    .references(() => challenges.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  textEn: text('text_en').notNull(),
  textPl: text('text_pl').notNull(),
  textJp: text('text_jp').notNull(),
  correct: boolean('correct').notNull(),

  audioSrcEn: text('audio_src_en'),
  audioSrcPl: text('audio_src_pl'),
  audioSrcJp: text('audio_src_jp'),
  imageSrc: text('image_src'),
});

export const challengeOptionsRelations = relations(
  challengeOptions,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeOptions.challengeId],
      references: [challenges.id],
    }),
  }),
);

export const challengeProgress = pgTable('challenge_progress', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  challengeId: integer('challenge_id')
    .references(() => challenges.id, {
      onDelete: 'cascade',
    })
    .notNull(),
  completed: boolean('completed').notNull().default(false),
});

export const challengeProgressRelations = relations(
  challengeProgress,
  ({ one }) => ({
    challenge: one(challenges, {
      fields: [challengeProgress.challengeId],
      references: [challenges.id],
    }),
  }),
);

export const userProgress = pgTable('user_progress', {
  userId: text('user_id').primaryKey(),
  userName: text('user_name').notNull().default('User'),
  userImageSrc: text('user_image_src').notNull().default('/mascot.svg'),
  activeCourseId: integer('active_course_id').references(() => courses.id, {
    onDelete: 'cascade',
  }),
  hearts: integer('hearts').notNull().default(5),
  points: integer('points').notNull().default(0),
});

export const userProgressRelations = relations(userProgress, ({ one }) => ({
  activeCourse: one(courses, {
    fields: [userProgress.activeCourseId],
    references: [courses.id],
  }),
}));

export const userSubscription = pgTable('user_subscription', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull().unique(),
  stripeCustomerId: text('stripe_customer_id').notNull().unique(),
  stripeSubscriptionId: text('stripe_subscription_id').notNull().unique(),
  stripePriceId: text('stripe_price_id').notNull(),
  stripeCurrentPeriodEnd: timestamp('stripe_current_period_end').notNull(),
});

export const questProgress = pgTable('quest_progress', {
  id: serial('id').primaryKey(),
  userId: text('user_id').notNull(),
  questTitle: text('quest_title').notNull(),
  questValue: integer('quest_value').notNull(),
  currentProgress: integer('current_progress').notNull().default(0),
  completed: boolean('completed').notNull().default(false),
  rewardClaimed: boolean('reward_claimed').notNull().default(false),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const questProgressRelations = relations(questProgress, ({ one }) => ({
  user: one(userProgress, {
    fields: [questProgress.userId],
    references: [userProgress.userId],
  }),
}));
