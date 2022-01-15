import { useEffect } from "react"
import './css/Form.css';
import { Form, Input, Button, Checkbox } from 'antd';



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
                  <Form action="" id="quoteForm" method="post">
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
                                    <label for="brand" className=" bmd-label">Token Contract Address:</label>
                                    <input type="text" id="TokenAddr" name="TokenAddr"/>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Token Network (Chain):</label>
                                    <select class ="form-control" id="model">
                                    <option value="">- Select -</option>
                                    <option value="137">Polygon 137</option>
                                    <option value="56">BSC(Binance Smart Chain) 56</option>  

                                    </select>
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
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Your Project Build on:</label>
                                    <select class ="form-control" id="model">
                                    <option value="">- Select -</option>
                                    <option value="1">Ethereum(ETH)</option>
                                    <option value="2">Polygon (MATIC)</option>  
                                    <option value="3">Avalanche (AVAX)</option>  
                                    <option value="4">Fantom (FTM)</option>  
                                    <option value="5">Conflux (CFX)</option>  
                                    <option value="6">Arbitrum</option>  
                                    <option value="7">Optimism</option>  
                                    <option value="8">Solana</option>  
                                    <option value="9">Near</option>  
                                    <option value="10">Harmony</option>  
                                    <option value="11">other</option>  
                                    </select>
                                </li>
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Industry Project Category:</label>
                                    <select class ="form-control" id="model">
                                    <option value="">- Select -</option>
                                    <option value="1">Defi</option>
                                    <option value="2">NFT</option>  
                                    <option value="3">GameFi</option>  
                                    <option value="4">SocialFi</option>  
                                    <option value="5">Metaverse</option>  
                                    <option value="6">Blockchain</option>  
                                    <option value="7">Meme</option>  
                                    <option value="8">Stablecoin</option>  
                                    <option value="9">Storage</option>  
                                    <option value="10">other</option>  
                                    </select>
                                </li>              
                                
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">WhitePaper Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>

                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Linkedin Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>

                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Telegram Community Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>

                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Github Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>

                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Twitter Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>

                                
                                <li className="form-group bmd-form-group">
                                    <label for="brand" className=" bmd-label">Discord Link:</label>
                                    <input type="text" id="Email" name="Email"/>
                                </li>
        
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
                  </Form> 
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