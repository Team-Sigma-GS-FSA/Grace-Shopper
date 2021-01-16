import React from 'react';

const NewUser = (props) => {
  const { handleChange, handleSubmit, name, fuelType, errors } = props;
  return (
    <div className="wrapper">
      {props.editClicked ? (
        <h2>Edit Robot</h2>
      ) : (
        <div>
          <h1>Stackbot</h1>
          <h2>Add a New Robot</h2>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <br />
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Name this Robot"
            value={name}
            onChange={handleChange}
          />
        </div>
        <br />
        <br />
        <div>
          <label htmlFor="fuelType">Fuel Type:</label>
          <select
            name="fuelType"
            value={fuelType}
            onSelect={handleChange}
            onChange={handleChange}
          >
            <option value="electric">electric</option>
            <option value="gas">gas</option>
            <option value="diesel">diesel</option>
          </select>
        </div>
        <br />
        <br />
        <div>
          {errors[0] === undefined ? (
            <div className="back">
              <button type="submit" className="button_base b09_electric">
                Submit Robot
              </button>
            </div>
          ) : (
            <div>
              <div className="back">
                <button
                  disabled
                  type="submit"
                  className="button_base b09_electric"
                >
                  Submit Robot
                </button>
              </div>
              <small> {errors[0]} </small>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default NewUser;
