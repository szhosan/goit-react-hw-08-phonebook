import React from 'react';
import s from './ContactSearch.module.css';
import PropTypes from 'prop-types';

const ContactSearch = ({ value, onChange }) => {
  return (
    <div className={s.container}>
      <label>
        Find contacts by name
        <br />
        <input type="text" value={value} onChange={onChange} />
      </label>
    </div>
  );
};

ContactSearch.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default ContactSearch;
