import _ from 'lodash';

export default (error) => {
  const fault = _.get(error, 'Fault.detail.WebServiceFault.faults.fault');
  let normalizedError;

  if (fault) {
    normalizedError = {
      message: fault.message,
      messageKey: `errors.rgf.${fault.code}`,
      parameters: fault.parameters
    }
  } else {
    normalizedError = {
      message: _.get(error, 'error.message', ''),
      messageKey: _.get(error, 'error.messageKey', 'internal-application-error'),
      parameters: _.get(error, 'error.parameters', {})
    }
  }

  return normalizedError;
}