// SurveyForm shows a form for a user to add input
import _ from 'lodash';
import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Link } from 'react-router-dom';
import SurveyField from './SurveyField';
import validEmails from '../../utils/validateEmails';

const FIELDS = [
  { label: 'Survey Title', name: 'title', noValueError: 'Provide a Survey Title' },
  { label: 'Subject Line', name: 'subject', noValueError: 'Provide a Subject' },
  { label: 'Email Body', name: 'body', noValueError: 'Provide a Message' },
  { label: 'Recipient List', name: 'emails', noValueError: 'Provide an Email' },
];

class SurveyForm extends Component {
  renderFields() {
    return _.map(FIELDS, ({ label, name }) => {
      return (
        <Field
          key={name}
          component={SurveyField}
          type="text"
          label={label}
          name={name}
        />
      );
    });
  }
  render() {
    return (
      <div>
        <form onSubmit={this.props.handleSubmit(values => console.log(values))}>
          {this.renderFields()}
          <Link to="/surveys" className="red btn-flat white-text">
            Cancel
          </Link>
          <button type="submit" className="mediumAquaMarine btn-flat right white-text">
            Next
            <i className="material-icons right">done</i>
          </button>
        </form>
      </div>
    );
  }
}

function validate(values) {
  const errors = {};

  _.each(FIELDS, ({ name }) => {
    if (!values[name]) {
      errors[name] = 'You must provide a value';
    }
  });

  errors.emails = validateEmails(values.emails || '');

  return errors;
}

export default reduxForm({
  validate,
  form: 'surveyForm',
})(SurveyForm);
