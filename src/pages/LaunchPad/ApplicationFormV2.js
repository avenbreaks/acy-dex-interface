import e from "@umijs/deps/compiled/express";
import { useEffect, useState } from "react"
import './css/Form.css';

// CONSTANTS
const INITIAL_FORM = {
  email: '',
  username: '',
  address: ''
}

const PLACE_HOLDERS = {
  email: 'Please input your email',
  username: 'Please input your name',
  address: 'lalal'
}

const VALIDATION_FUNCTIONS = {
  email: (value) => {
    if (value !== 'a') return false;

    return true;
  },
}

const ERROR_INFOS = {
  email: "It's not a valid email",
  username: "Username length should be larger than 5"
}

// COMPONENTS
const InputField = ({
  type = "text",
  name,
  setFormField
}) => {

  const [isError, setIsError] = useState(false);

  const onChangeField = (e) => {
    const value = e.target.value;
    if (name in VALIDATION_FUNCTIONS) {
      if (!VALIDATION_FUNCTIONS[name](value)) {
        setIsError(true);
      } else {
        setIsError(false);
      }
    }
  } 

  const onBlurField = (e) => {
    const value = e.target.value;
    setFormField(name, value);
  }

  return (
    <div>
      {isError &&
        <div className="error-info">{ERROR_INFOS[name]}</div>
      }
      <input
        type={type}
        placeholder={PLACE_HOLDERS[name]}
        onChange={onChangeField}
        onBlur={onBlurField}
      />
    </div>
  )
}

const ApplicationForm = () => {

  // STATES
  const [currentFieldIndex, setCurrentFieldIndex] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);

  // HOOKS
  useEffect(() => {
    console.log('formdata', formData);
  }, [formData])

  // FUNCTIONS
  const setFormField = (fieldname, value) => {
    const newFormData = Object.assign({}, formData);
    newFormData[fieldname] = value;
    setFormData(newFormData);
  }

  const submitData = (e) => {
    console.log(formData);
    // TODO: request to backend, register function in src/services/launch.js
    // look for example at the end of src/services/api.js

    e.preventDefault();
  }

  // COMPONENTS
  const ProgressBar = () => {
    return (
      <ul id="progressbar">
        <li className="active">Project</li>
        <li>Token</li>
        <li>IDO</li>
      </ul>
    )
  }

  return (
    <div id="form-container">

      <form id="msform">
        <ProgressBar />

        <div style={{ display: currentFieldIndex === 0 ? 'block' : 'none' }}>
          <fieldset>
            <h2 className="fs-title">Create your account</h2>
            <h3 className="fs-subtitle">This is step 1</h3>
            <InputField name="email" setFormField={setFormField}/>
            <input type="button" name="next" className="next action-button" value="Next" onClick={() => setCurrentFieldIndex(1)} />
          </fieldset>
        </div>

        <div style={{ display: currentFieldIndex === 1 ? 'block' : 'none' }}>
          <fieldset>
            <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <InputField name="email" setFormField={setFormField}/>
            <input type="button" name="previous" className="previous action-button" value="Previous" onClick={() => setCurrentFieldIndex(0)} />
            <input type="button" name="next" className="next action-button" value="Next" onClick={() => setCurrentFieldIndex(2)} />
          </fieldset>
        </div>

        <div style={{ display: currentFieldIndex === 2 ? 'block' : 'none' }}>
          <fieldset>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">We will never sell it</h3>
            <InputField name="email" setFormField={setFormField}/>
            <input type="button" name="previous" className="previous action-button" value="Previous" onClick={() => setCurrentFieldIndex(1)} />
            <input type="submit" name="submit" className="submit action-button" value="Submit" onClick={submitData}/>
          </fieldset>
        </div>

      </form>
    </div>

  )
}

export default ApplicationForm;