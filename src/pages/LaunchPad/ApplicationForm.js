
import { useEffect, useState } from "react"
import './css/Form.css';

// CONSTANTS
const INITIAL_FORM = {
  //1
  username: '',
  projectname: '',
  email: '',
  websiteURL: '',
  logoURL: '',
  description: '',
  category: '',
  projectIn: '',

  whitepaperLINK: '',
  githubLINK: '',
  telegramLINK: '',
  twitterLINK: '',
  linkedinLINK: '',
  discordLINK: '',

  //2
  symbol: '',
  address: '',
  supply: '',
  ecolink: '',

  //3
  idoDate: '',
  start: '',
  ended: '',

  vestingStart: '',
  vestingMonth: '',
  vestingDate: '',

  idoPrice: '',
  raise: '',
  marketcap: '',
  sale: '',

}

const PLACE_HOLDERS = {
  //1
  username: '1.1 Your Telegram Username',
  projectname: '1.2 ProjectName',
  email: '1.3 Official Email Address',
  websiteURL: '1.4 Project Website',
  logoURL: '1.5 Project Logo URL (SVG Prefferred)',
  description: '1.6 ProjectDescription',
  category: '1.7 Project Category',
  projectIn: '1.8 Your Project Build In',

  whitepaperLINK: '1.9 WhitePaper Link',
  githubLINK: '1.10 Github Link',
  telegramLINK: '1.11 Telegram Community Link',
  twitterLINK: '1.12 Twitter Link',
  linkedinLINK: '1.13 Linkedin Link',
  discordLINK: '1.14 Discord Link',
  //2
  symbol: '2.1 Token Symbol',
  address: '2.2 Token Contract Address in Scan',
  supply: '2.3 Total Supply',
  ecolink: '2.4 Token Econimics Link',

  //3
  idoDate: '3.1 IDO Date',
  start: '3.2 Start Time',
  ended: '3.3 Ended Time',

  vestingStart: 'fillBlank',
  vestingMonth: 'fillBlank',
  vestingDate: 'fillBlank',

  idoPrice: '3.5 IDO Price',
  raise: '3.6 How much to raise?(USD)',
  marketcap: '3.7 Fully Diluted Market Cap(Auto Fill)',
  sale: '3.8 How many tokens for sale?(Auto Fill)',


}

const VALIDATION_FUNCTIONS = {
  email: (value) => {
    if (value !== 'a') return false;

    return true;
  },

  username: (value) => {
    if (value.trim() === "") return false;

    return true;
  },
}

const ERROR_INFOS = {
  //1
  username: "Username length should be larger than 5",//"Please enter your username"
  projectname: "Please enter your project name",
  email:  //{
    "Please enter your email"//,
  //"Please enter a correct email address format"
  //}
  ,
  websiteURL: "Please enter your project website url",
  logoURL: "Please enter your logo url",
  description: "Please enter your project description",
  category: "Please enter your project category",
  projectIn: "Please enter where your project is built in",

  whitepaperLINK: "Please enter url",//1.9-1.14
  githubLINK: "Please enter url",
  telegramLINK: "Please enter url",
  twitterLINK: "Please enter url",
  linkedinLINK: "Please enter url",
  discordLINK: "Please enter url",

  //2
  symbol: "Please enter your Token Symbol", //2.1
  address:  "Please enter your Token Contract Address", //2.2
  supply: "Please enter your Token Supply", //2.3
  ecolink: "Please enter your Token Econimics Link",//2.4

  //3
  idoDate: "Please enter IDO Date", //3.1
  start: "Please enter Start Time", //3.2
  ended: "Please enter Ended Time", //3.3

  vestingStart: "Please fill in the blanks", //3.4 ALL
  vestingMonth: "Please fill in the blanks", //3.4 ALL
  vestingDate: "Please fill in the blanks", //3.4 ALL

  idoPrice: "Please enter IDO Price", //3.5
  raise: "Please enter USD", //3.6

  marketcap: '',
  sale: '',


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
            <InputField name="username" setFormField={setFormField} />
            <InputField name="projectname" setFormField={setFormField} />
            <InputField name="email" setFormField={setFormField} />
            <InputField name="websiteURL" setFormField={setFormField} />
            <InputField name="logoURL" setFormField={setFormField} />
            <InputField name="description" setFormField={setFormField} />
            <InputField name="category" setFormField={setFormField} />
            <InputField name="projectIn" setFormField={setFormField} />

            <InputField name="whitepaperLINK" setFormField={setFormField} />
            <InputField name="githubLINK" setFormField={setFormField} />
            <InputField name="telegramLINK" setFormField={setFormField} />
            <InputField name="twitterLINK" setFormField={setFormField} />
            <InputField name="linkedinLINK" setFormField={setFormField} />
            <InputField name="discordLINK" setFormField={setFormField} />

            <input type="button" name="next" className="next action-button" value="Next" onClick={() => setCurrentFieldIndex(1)} />
          </fieldset>
        </div>

        <div style={{ display: currentFieldIndex === 1 ? 'block' : 'none' }}>
          <fieldset>
            <h2 className="fs-title">Social Profiles</h2>
            <h3 className="fs-subtitle">Your presence on the social network</h3>
            <InputField name="symbol" setFormField={setFormField} />
            <InputField name="address" setFormField={setFormField} />
            <InputField name="supply" setFormField={setFormField} />
            <InputField name="ecolink" setFormField={setFormField} />

            <input type="button" name="previous" className="previous action-button" value="Previous" onClick={() => setCurrentFieldIndex(0)} />
            <input type="button" name="next" className="next action-button" value="Next" onClick={() => setCurrentFieldIndex(2)} />
          </fieldset>
        </div>

        <div style={{ display: currentFieldIndex === 2 ? 'block' : 'none' }}>
          <fieldset>
            <h2 className="fs-title">Personal Details</h2>
            <h3 className="fs-subtitle">We will never sell it</h3>
            <InputField name="idoDate" setFormField={setFormField} />
            <InputField name="start" setFormField={setFormField} />
            <InputField name="ended" setFormField={setFormField} />

            <legeng>3.4 Vesting Rule: </legeng>
            <InputField name="vestingStart" setFormField={setFormField} />% at TGE, then linear unclock during next
            <InputField name="vestingMonth" setFormField={setFormField} /> month on
            <InputField name="vestingDate" setFormField={setFormField} /> (day)

            <InputField name="idoPrice" setFormField={setFormField} />
            <InputField name="raise" setFormField={setFormField} />
            <InputField name="marketcap" setFormField={setFormField} />
            <InputField name="sale" setFormField={setFormField} />

            <input type="button" name="previous" className="previous action-button" value="Previous" onClick={() => setCurrentFieldIndex(1)} />
            <input type="submit" name="submit" className="submit action-button" value="Submit" onClick={submitData} />
          </fieldset>
        </div>

      </form>
    </div>

  )
}

export default ApplicationForm;