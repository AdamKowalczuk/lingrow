'use client';

import {
  BookOpen,
  Layers,
  GraduationCap,
  Target,
  Settings,
} from 'lucide-react';
import simpleRestProvider from 'ra-data-simple-rest';
import React from 'react';
import {
  Admin,
  Resource,
  radiantLightTheme,
  radiantDarkTheme,
} from 'react-admin';

import ChallengeCreate from './challenge/create';
import ChallengeEdit from './challenge/edit';
import ChallengeList from './challenge/list';
import ChallengeOptionCreate from './challengeOption/create';
import ChallengeOptionEdit from './challengeOption/edit';
import ChallengeOptionList from './challengeOption/list';
import CourseCreate from './course/create';
import CourseEdit from './course/edit';
import CourseList from './course/list';
import LessonCreate from './lesson/create';
import LessonEdit from './lesson/edit';
import LessonList from './lesson/list';
import UnitCreate from './unit/create';
import UnitEdit from './unit/edit';
import UnitList from './unit/list';

const dataProvider = simpleRestProvider('/api');

const AdminApp = () => {
  return (
    <Admin
      dataProvider={dataProvider}
      theme={radiantLightTheme}
      darkTheme={radiantDarkTheme}
    >
      <Resource
        name="courses"
        list={CourseList}
        create={CourseCreate}
        edit={CourseEdit}
        recordRepresentation="title"
        icon={BookOpen}
      />
      <Resource
        name="units"
        list={UnitList}
        create={UnitCreate}
        edit={UnitEdit}
        recordRepresentation="title"
        icon={Layers}
      />
      <Resource
        name="lessons"
        list={LessonList}
        create={LessonCreate}
        edit={LessonEdit}
        recordRepresentation="title"
        icon={GraduationCap}
      />
      <Resource
        name="challenges"
        list={ChallengeList}
        create={ChallengeCreate}
        edit={ChallengeEdit}
        recordRepresentation="question"
        icon={Target}
      />
      <Resource
        name="challengeOptions"
        options={{ label: 'Challenge Options' }}
        list={ChallengeOptionList}
        create={ChallengeOptionCreate}
        edit={ChallengeOptionEdit}
        recordRepresentation="text"
        icon={Settings}
      />
    </Admin>
  );
};

export default AdminApp;
