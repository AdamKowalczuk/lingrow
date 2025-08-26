import React from 'react';
import {
  BooleanField,
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
  ImageField,
} from 'react-admin';

const ChallengeOptionList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <NumberField source="id" />
        <TextField source="textEn" label="Text (EN)" />
        <TextField source="textPl" label="Text (PL)" />
        <TextField source="textJp" label="Text (JP)" />
        <BooleanField source="correct" />
        <ReferenceField
          source="challengeId"
          reference="challenges"
          label="Challenge"
        />
        <ImageField source="imageSrc" label="Image" />
        <TextField source="audioSrcEn" label="Audio (EN)" />
        <TextField source="audioSrcPl" label="Audio (PL)" />
        <TextField source="audioSrcJp" label="Audio (JP)" />
      </Datagrid>
    </List>
  );
};

export default ChallengeOptionList;
