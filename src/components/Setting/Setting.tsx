import React, { useState } from 'react';

import * as Yup from 'yup';

import { Form, TextField, SelectField, SubmitButton } from '../Form/Form';

import './Setting.scss';

const Setting: React.FC = () => {
  const [formData] = useState({
    name: '',
    email: '',
    role: '',
  });

  const onSubmit = (values: any) => {
    console.log(values);
  };

  const formSchema = Yup.object().shape({
    name: Yup.string()
      .required('Required')
      .min(5, 'Min length is 5'),
    email: Yup.string()
      .email()
      .required('Required')
      .min(1, 'Min length is 1'),
    role: Yup.string()
      .oneOf(['admin', 'user'])
      .required('Required')
      .min(1, 'At least one role'),
  });

  return (
    <>
      <Form
        enableReinitialize={false}
        initialValues={formData}
        validationSchema={formSchema}
        onSubmit={onSubmit}
      >
        <div>
          <div className="p12">
            <TextField name="name" label="Name" />
          </div>

          <div className="p12">
            <TextField name="email" label="Email" />
          </div>

          <div className="p12">
            <SelectField
              name="role"
              label="Role"
              options={[
                {
                  label: 'Admin',
                  value: 'admin',
                },
                {
                  label: 'User',
                  value: 'user',
                },
              ]}
            />
          </div>

          <div className="p12">
            <SubmitButton title="Submit" />
          </div>
        </div>
      </Form>
    </>
  );
};

export default Setting;
