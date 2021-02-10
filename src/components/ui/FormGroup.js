import React from 'react';
import PropTypes from 'prop-types';

const FormGroup = function (props) {
  const {input, type, placeholder, meta, controlClass, errorClass, groupClass} = props;
  const {error, submitFailed} = meta;
  const showError = error && submitFailed;
  const controlClassName = `${controlClass} ${showError ? errorClass : ''}`;

  return (
    <div className={groupClass}>
      <input {...input} className={controlClassName} type={type} placeholder={placeholder} />

      {showError && (
        <div className="error-msg">
          {error}
        </div>
      )}
    </div>
  );
};

const {string, bool, func, shape} = PropTypes;

FormGroup.propTypes = {
  input: shape({
    name: string.isRequired,
    onBlur: func.isRequired,
    onChange: func.isRequired,
    onDragStart: func.isRequired,
    onDrop: func.isRequired,
    onFocus: func.isRequired,
    value: string.isRequired,
  }),
  placeholder: string.isRequired,
  meta: shape({
    error: string,
    submitFailed: bool.isRequired,
  }),
  controlClass: string.isRequired,
  errorClass: string.isRequired,
  groupClass: string.isRequired,
};

export default FormGroup;
