import React from 'react';
import { Datagrid, List, TextField, ImageField } from 'react-admin';

const CourseList = () => {
  return (
    <List>
      <Datagrid rowClick="edit">
        <TextField source="id" />
        <TextField source="titleEn" label="Title (EN)" />
        <TextField source="titlePl" label="Title (PL)" />
        <TextField source="titleJp" label="Title (JP)" />
        <TextField source="targetLanguage" label="Target Language" />
        <ImageField source="imageSrc" label="Image" />
      </Datagrid>
    </List>
  );
};

export default CourseList;
