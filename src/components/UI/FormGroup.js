import React, {PureComponent} from 'react';


export default class FormGroup extends PureComponent {
  render() {
    const {input, type, placeholder, meta} = this.props;
    const showError = meta.error && meta.submitFailed;
    const controlClassName = `${this.props.controlClass} ${showError ? this.props.errorClass : ''}`;

    return (
      <div className={this.props.groupClass}>
        <input {...input} className={controlClassName} type={type} placeholder={placeholder} />

        {
          showError
          &&
            <div className='error-msg'>
              {meta.error}
            </div>
        }
      </div>
    );
  }
}
