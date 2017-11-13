import './styles.css';

import { Input } from 'semantic-ui-react'
import React from 'react';
import cx from 'classnames';

export default ({ className = '', submitting = false, value = '', onChange = () => {} }) => {
  const classNames = cx({
    className: true,
    inputtext: true
  });

  return (
    <div className={classNames}>
      <div className="input-dummy">{value}</div>
      <Input fluid inverted icon='send' value={value} onChange={onChange} loading={submitting} />
    </div>);
}