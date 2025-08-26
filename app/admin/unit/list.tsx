import React from 'react';
import {
  Datagrid,
  List,
  NumberField,
  ReferenceField,
  TextField,
} from 'react-admin';

const UnitList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="titleEn" label="Title (EN)" />
        <TextField source="titlePl" label="Title (PL)" />
        <TextField source="titleJp" label="Title (JP)" />
        <TextField source="descriptionEn" label="Description (EN)" />
        <TextField source="descriptionPl" label="Description (PL)" />
        <TextField source="descriptionJp" label="Description (JP)" />
        <ReferenceField source="courseId" reference="courses" label="Course" />
        <NumberField source="order" />
      </Datagrid>
    </List>
  );
};

export default UnitList;
