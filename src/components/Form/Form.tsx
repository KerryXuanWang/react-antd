import React from 'react';

import {
  Formik,
  Form as FormikForm,
  Field,
  ErrorMessage,
  useFormikContext,
  FormikConfig,
} from 'formik';

import './Form.scss';

const ERROR_MARGIN = '5px';
const ERROR_COLOR = 'red';

export interface IFormProps extends FormikConfig<any> {}

export const Form: React.FC<IFormProps> = (props) => {
  return (
    <Formik {...props}>
      <FormikForm>{props.children}</FormikForm>
    </Formik>
  );
};

export interface IBasicDesc {
  name: string;
  label: string;
}

export interface ITextField extends IBasicDesc {
  placeholder?: string;
  [x: string]: any;
}
export const TextField = (props: ITextField) => {
  const { name, label, placeholder, ...rest } = props;
  return (
    <div className="row">
      {label && <label htmlFor={name}>{label}</label>}
      <Field
        className="ant-input"
        type="text"
        name={name}
        id={name}
        placeholder={placeholder || ''}
        {...rest}
      />
      <ErrorMessage
        name={name}
        render={(msg: string) => (
          <div style={{ color: ERROR_COLOR, marginLeft: ERROR_MARGIN }}>{msg}</div>
        )}
      />
    </div>
  );
};

export interface IOption {
  value: string | number;
  label: string;
}
export interface ISelectField extends IBasicDesc {
  options: IOption[];
}
export const SelectField = (props: ISelectField) => {
  const { name, label, options } = props;
  return (
    <div className="row">
      {label && <label htmlFor={name}>{label}</label>}
      <Field className="ant-input" as="select" id={name} name={name}>
        <option value="">Choose...</option>
        {options.map((option: IOption) => (
          <option key={option.value} value={option.value} label={option.label} />
        ))}
      </Field>
      <ErrorMessage
        name={name}
        render={(msg: string) => (
          <div style={{ color: ERROR_COLOR, marginLeft: ERROR_MARGIN }}>{msg}</div>
        )}
      />
    </div>
  );
};

export interface IRadio extends IBasicDesc {
  value: string;
}
export interface IRadioField {
  radios: IRadio[];
}
export const RadioField = (props: IRadioField) => {
  const { radios } = props;

  return (
    <div role="group" aria-labelledby="my-radio-group">
      {radios.map((o) => {
        return (
          <label key={`${o.label}-${o.value}`}>
            <Field type="radio" name={o.name} value={o.value} />
            {o.label}
          </label>
        );
      })}
    </div>
  );
};

export interface IButton {
  title: string;
  [x: string]: any;
}
export const SubmitButton = (props: IButton) => {
  const { title, ...rest } = props;
  const { isSubmitting } = useFormikContext();

  return (
    <button type="submit" className="ant-btn ant-btn-primary" {...rest} disabled={isSubmitting}>
      {title}
    </button>
  );
};
