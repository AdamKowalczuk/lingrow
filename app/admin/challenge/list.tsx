import React from 'react';
import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  SelectField,
  TextField,
} from 'react-admin';

const ChallengeList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="questionEn" label="Question (EN)" />
        <TextField source="questionPl" label="Question (PL)" />
        <TextField source="questionJp" label="Question (JP)" />
        <SelectField
          source="type"
          choices={[
            {
              id: 'SELECT',
              name: 'SELECT',
            },
            {
              id: 'ASSIST',
              name: 'ASSIST',
            },
            {
              id: 'LISTEN',
              name: 'LISTEN',
            },
            {
              id: 'FILL_BLANK',
              name: 'FILL_BLANK',
            },
          ]}
        />
        <ReferenceField source="lessonId" reference="lessons" label="Lesson" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};

export default ChallengeList;
