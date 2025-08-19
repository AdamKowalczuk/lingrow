import React from 'react';
import {
  BooleanInput,
  Edit,
  ReferenceInput,
  required,
  SimpleForm,
  TextInput,
} from 'react-admin';

const ChallengeOptionEdit = () => {
  return (
    <Edit>
      <SimpleForm>
        <TextInput source="text" validate={[required()]} label="Text" />
        <BooleanInput source="correct" label="Correct" />
        <ReferenceInput source="challengeId" reference="challenges" />
        <TextInput source="imageSrc" label="Image" />
        <TextInput source="audioSrc" label="Audio" />
      </SimpleForm>
    </Edit>
  );
};

export default ChallengeOptionEdit;
