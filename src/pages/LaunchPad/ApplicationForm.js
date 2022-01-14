import { useEffect } from "react"
import './css/Form.css';


const ApplicationForm = ()=> {

    useEffect(() => {
        console.log("NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
    }, [])


    return(
        <div className="Form">
        <div className="container">
  <div className="row">
    <div className="col col-md-8 mr-md-auto ml-md-auto" >
      <div id="content">
            <header className= "headerStyle1">
                    <h1 className="text-center">ACY IDO APPLICATION FORM</h1>
            </header>
            <div className="row form-content">
                <div className="col col-md-10 mr-md-auto ml-md-auto">
                  <form action="" id="quoteForm" method="post">
                   <ul>         
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Office Email Address:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Name-Person of Contact:</label>
                                    <input type="text" id="ContactName" name="ContactName"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Project Name:</label>
                                    <input type="text" id="ProjectName" name="ProjectName"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Project Website:</label>
                                    <input type="text" id="ProjectWebsite" name="ProjectWebsite"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Token Symbol:</label>
                                    <input type="text" id="TokenSymbol" name="TokenSymbol"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Token Contract Address(Chain Included):</label>
                                    <input type="text" id="TokenAddr" name="TokenAddr"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Project Description:</label>
                                    <textarea  id="ProjectDescription" name="ProjectDescription"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Vesting Rule:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Project Logo URL (SVG Preferred):</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">How much to raise?(USD):</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">How many tokens for sale:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Token Supply:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Fully Diluted Market Cup:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">IDO Date:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Token Economics Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
        

                    </ul>  
                          <div id="loading">
                              <div className="spinner">
                                  <div className="bounce1"></div>
                                  <div className="bounce2"></div>
                                  <div className="bounce3"></div>
                                </div>
                          </div>
                          <div id="result"></div>
                          <div className="form-group">
                                  <button type="submit" className="btn btn-raised btn-primary">APPLY 
                                  </button>
                          </div>
                  </form> 
                </div>
          </div>
      </div> 
    </div>
  </div>
</div>
</div>
    )
}


export default ApplicationForm;