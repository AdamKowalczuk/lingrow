import React from 'react';
import {
  Create,
  NumberInput,
  ReferenceInput,
  required,
  SelectInput,
  SimpleForm,
  TextInput,
} from 'react-admin';

const ChallengeCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput
          source="questionEn"
          validate={[required()]}
          label="Question (EN)"
        />
        <TextInput
          source="questionPl"
          validate={[required()]}
          label="Question (PL)"
        />
        <TextInput
          source="questionJp"
          validate={[required()]}
          label="Question (JP)"
        />
        <TextInput source="audioSrcEn" label="Audio Source (EN)" />
        <TextInput source="audioSrcPl" label="Audio Source (PL)" />
        <TextInput source="audioSrcJp" label="Audio Source (JP)" />
        <SelectInput
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
          validate={[required()]}
        />
        <ReferenceInput source="lessonId" reference="lessons" />
        <NumberInput source="order" validate={[required()]} label="Order" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeCreate;
