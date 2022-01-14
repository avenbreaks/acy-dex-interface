import { useEffect } from "react"

const ApplicationForm = ()=> {

    useEffect(() => {
        console.log("NEWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW")
    }, [])


    return(
        <div class="container">
  <div class="row">
    <div class="col col-md-8 mr-md-auto ml-md-auto" >
      <div id="content">
            <header>
                    <h1 class="text-center">QUOTE YOUR INSURANCE</h1>
            </header>
            <div class="row form-content">
                <div class="col col-md-10 mr-md-auto ml-md-auto">
                  <form action="" id="quoteForm">
                              
                                <div class="form-group">
                                    <label for="brand">Name:</label>
                                    <select class="form-control" id="brand">
                                        <option value="">- Select -</option>
                                        <option value="Ford">Ford</option>
                                        <option value="Honda">Honda</option>
                                        <option value="Audi">Audi</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                <label for="model">Model:</label>
                                <select class ="form-control" id="model">
                                    <option value="">- Select -</option>
                                    <option value="Hatchback">Hatchback</option>
                                    <option value="Sedan">Sedan</option>  
                                    <option value="Cabriolet">Cabriolet</option>
                                    <option value="SUV">SUV</option>
                                </select>
                                </div>
                                <div class="form-group">
                                        <label for="year">Year:</label>
                                        <select class="form-control" id="year">
                                            <option value="">- Select -</option>  
                                        </select>
                                </div>
                                <fieldset class="form-group">
                                    <div class="row">
                                         <legend class="col-form-legend col-12">Type of insurance</legend>

                                      <div class="col12">
                                          <div class="form-check">
                                            <label class="form-check-label">
                                              <input class="form-check-input" type="radio" name="type" value="basic" checked/>
                                              Basic
                                            </label>
                                          </div>
                                        <div class="form-check">
                                            <label class="form-check-label">
                                              <input class="form-check-input" type="radio" name="type" value="complete"/>
                                              Complete
                                            </label>
                                        </div>
                                      </div>
                                    </div>
                              </fieldset>

                          <div id="loading">
                              <div class="spinner">
                                  <div class="bounce1"></div>
                                  <div class="bounce2"></div>
                                  <div class="bounce3"></div>
                                </div>
                          </div>
                          <div id="result"></div>
                          <div class="form-group">
                                  <button type="submit" class="btn btn-raised btn-primary">Generate 
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