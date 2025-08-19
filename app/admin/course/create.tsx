import React from 'react';
import { Create, required, SimpleForm, TextInput } from 'react-admin';

const CourseCreate = () => {
  return (
    <Create>
      <SimpleForm>
        <TextInput source="title" validate={[required()]} label="Title" />
        <TextInput source="imageSrc" validate={[required()]} label="Image" />
      </SimpleForm>
    </Create>
  );
};

export default CourseCreate;
