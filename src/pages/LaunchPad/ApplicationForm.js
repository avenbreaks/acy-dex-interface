import { useEffect,useState,createRef } from "react"
import './css/Form.css';
import { Form, Input, Button, Checkbox } from 'antd';

const ApplicationForm = ()=> {

    const [progress, setProgress] = useState(0);
    const [field,setField] = useState(0);

    const nextProgress = (num)=>{

      var current_fs, next_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches
      
      console.log("click")
      current_fs = document.getElementById("fieldset"+num);
      next_fs = document.getElementById("fieldset"+(num+1));
      console.log(current_fs,next_fs)


      //activate next step on progressbar using the index of next_fs
      document.getElementById("step"+(num+1)).classList.add("active");
      
      //show the next fieldset
      next_fs.style.display = "block";
      current_fs.style.display="none";
      //hide the current fieldset with style
    }

    const previousProgress = (num) => {
      var current_fs, last_fs, previous_fs; //fieldsets
      var left, opacity, scale; //fieldset properties which we will animate
      var animating; //flag to prevent quick multi-click glitches
      
      console.log("click for back")
      current_fs = document.getElementById("fieldset"+num);
      last_fs = document.getElementById("fieldset"+(num-1));


      //activate next step on progressbar using the index of next_fs
      document.getElementById("step"+(num)).classList.remove("active");
      
      //show the next fieldset
      last_fs.style.display = "block";
      current_fs.style.display="none";
      //hide the current fieldset with style
    }

    useEffect(() => {



        document.getElementById("next1").addEventListener("click",(event)=>{nextProgress(1)});
        document.getElementById("next2").addEventListener("click",(event)=>{nextProgress(2)});
        document.getElementById("previous1").addEventListener("click",()=>{previousProgress(2)});
        document.getElementById("previous2").addEventListener("click",()=>{previousProgress(3)});

 


    }, [])



    return(
        <div className="Form">
        <div className="container">
        <form id="msform">
  <ul id="progressbar">
    <li id="step1" class="active">Project Description</li>
    <li id="step2">Social Profiles</li>
    <li id="step3">Personal Details</li>
  </ul>
  <fieldset id="fieldset1">
    <h2 class="fs-title">Project Description</h2>
    {/* <h3 class="fs-subtitle">This is step 1</h3> */}
    <input type="text" name="ContacterTg" placeholder="1.1 Your Telegram Username"/>
    <input type="text" name="ProjectName" placeholder="1.2 ProjectName" />
    <input type="email" name="OfficialEmail" placeholder="1.3 Official Email Address" />
    <input type="url" name="Website" placeholder="1.4 Project Website" />
    <input type="url" name="Logo" placeholder="1.5 Project Logo URL (SVG Prefferred)"/>
    <textarea name="Description" placeholder="1.6 ProjectDescription"/>
    {/* <select>
      <option value="volvo">Volvo</option>
      <option value="saab">Saab</option>
      <option value="fiat">Fiat</option>
      <option value="audi">Audi</option>
    </select> */}
    <input type="text" name="Category" placeholder="1.7 Project Category"/>

    <input type="text" name="ProjectIn" placeholder="1.8 Your Project Build In"/>
    <input type="url" name="WhitePaper" placeholder="1.9 WhitePaper Link"/>
    <input type="url" name = "Github" placeholder="1.10 Github Link"/>
    <input type="url" name = "Telegram" placeholder="1.11 Telegram Community Link"/>
    <input type="url" name = "Twitter" placeholder="1.12 Twitter Link"/>
    <input type="url" name = "Linkedin" placeholder="1.13 Linkedin Link"/>
    <input type="url" name = "Discord" placeholder="1.14 Discord Link"/>

    <input id="next1" type="button" name="next" class="next action-button"  value="Next" />
  </fieldset>
  <fieldset id="fieldset2">
    <h2 class="fs-title">Social Profiles</h2>
    <h3 class="fs-subtitle">Your presence on the social network</h3>
    <input type="text" name="twitter" placeholder="Twitter" />
    <input type="text" name="facebook" placeholder="Facebook" />
    <input type="text" name="gplus" placeholder="Google Plus" />
    <input id="previous1" type="button" name="previous" class="previous action-button" value="Previous" />
    <input id="next2" type="button" name="next" class="next action-button" value="Next"   />
  </fieldset>
  <fieldset id="fieldset3">
    <h2 class="fs-title">Personal Details</h2>
    <h3 class="fs-subtitle">We will never sell it</h3>
    <input type="text" name="fname" placeholder="First Name" />
    <input type="text" name="lname" placeholder="Last Name" />
    <input type="text" name="phone" placeholder="Phone" />
    <textarea name="address" placeholder="Address"></textarea>
    <input id="previous2" type="button" name="previous" class="previous action-button" value="Previous" />
    <input id="submit" type="submit" name="submit" class="submit action-button" value="Submit" />
  </fieldset>
</form>
  
</div>
</div>
    )
}


export default ApplicationForm;