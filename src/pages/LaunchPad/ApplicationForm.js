import { useEffect } from "react"
import './css/Form.css';


const ApplicationForm = ()=> {

    useEffect(() => {
        console.log("NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
    }, [])


    return(
        <div className="container">
  <div className="row">
    <div className="col col-md-8 mr-md-auto ml-md-auto" >
      <div id="content">
            <header className= "headerStyle1">
                    <h1 className="text-center">QUOTE YOUR INSURANCE</h1>
            </header>
            <div className="row form-content">
                <div className="col col-md-10 mr-md-auto ml-md-auto">
                  <form action="" id="quoteForm">
                              
                                <div className="form-group">
                                    <label for="brand">Name:</label>
                                    <select className="form-control" id="brand">
                                        <option value="">- Select -</option>
                                        <option value="Ford">Ford</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Audi">Audi</option>
                                    </select>
                                </div>
                                <div className="form-group">
                                <label for="model">Model:</label>
                                <select className ="form-control" id="model">
                                    <option value="">- Select -</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Sedan">Sedan</option>  
                                    <option value="Cabriolet">Cabriolet</option>
                                    <option value="SUV">SUV</option>
                                </select>
                                </div>
                                <div className="form-group">
                                        <label for="year">Year:</label>
                                        <select className="form-control" id="year">
                                            <option value="">- Select -</option>  
                                        </select>
                                </div>
                                <fieldset className="form-group">
                                    <div className="row">
                                         <legend className="col-form-legend col-12">Type of insurance</legend>

                                      <div className="col12">
                                          <div className="form-check">
                                            <label className="form-check-label">
                                              <input className="form-check-input" type="radio" name="type" value="basic" checked/>
                                              Basic
                                            </label>
                                          </div>
                                        <div className="form-check">
                                            <label className="form-check-label">
                                              <input className="form-check-input" type="radio" name="type" value="complete"/>
                                              Complete
                                            </label>
                                        </div>
                                      </div>
                                    </div>
                              </fieldset>

                          <div id="loading">
                              <div className="spinner">
                                  <div className="bounce1"></div>
                                  <div className="bounce2"></div>
                                  <div className="bounce3"></div>
                                </div>
                          </div>
                          <div id="result"></div>
                          <div className="form-group">
                                  <button type="submit" className="btn btn-raised btn-primary">Generate 
                                  </button>
                          </div>
                  </form> 
                </div>
          </div>
      </div> 
    </div>
  </div>
</div>
    )
}


export default ApplicationForm;