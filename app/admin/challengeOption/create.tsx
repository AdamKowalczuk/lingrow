import React from 'react';
import {
  BooleanInput,
  Create,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

const ChallengeOptionCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc" label="Image" />
        <TextInput source="audioSrc" label="Audio" />
      </SimpleForm>
    </Create>
  );
};

export default ChallengeOptionCreate;
