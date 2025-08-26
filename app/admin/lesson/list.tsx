import React from 'react';
import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';

const LessonList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="titleEn" label="Title (EN)" />
        <TextField source="titlePl" label="Title (PL)" />
        <TextField source="titleJp" label="Title (JP)" />
        <ReferenceField source="unitId" reference="units" label="Unit" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};

export default LessonList;
