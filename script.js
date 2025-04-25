//object to save Data
let summary = {
  person: {
    name: "",
    email: "",
    phoneNumber: "",
  },
  plan: {
    type: "",
    name: "",
    price: "",
  },
  addons: {
    name: [],
    price: [],
  },
  total: 0,
};

//some chk bools
let isMonthly = true;
let isStep1Success = [];
let currentStep = 1;
let isProcessComplete = false;

//step1
function step1(){
    changeButton(false);
    hideButton(backButton);
    changeStep(currentStep,1);
    changeActiveState(currentStep,1);
    currentStep = currentStepUpdate(currentStep,1);
}

//step2
function step2(){
  changeButton(false);
  showButton(backButton);
  changeStep(currentStep,2);
  changeActiveState(currentStep,2);
  currentStep = currentStepUpdate(currentStep,2);
}

//step3
function step3(){
  changeButton(false);
  showButton(backButton);
  changeStep(currentStep,3);
  changeActiveState(currentStep,3);
  currentStep = currentStepUpdate(currentStep,3);
}

//step4
function step4(){
    changeButton(true);
    saveData();
    showSummary(summary);
    showButton(backButton);
    changeStep(currentStep,4);
    changeActiveState(currentStep,4);
    currentStep = currentStepUpdate(currentStep,4);
  }
  
  //step5
  function step5(){
    let chkDetails = checkingData(name,email,phone);
    let chkPlan = checkingPlan();
    
    if(!chkDetails){
      step1();
    }
    else if(!chkPlan){
      step2();
    }
    if(chkDetails && chkPlan){
        isProcessComplete = true;
        changeStep(currentStep,5);
        hideButton(nextButton);
        hideButton(backButton);
        showSummary(summary);
        currentStep = currentStepUpdate(currentStep,5);
        return;
      }
      // if(!chkDetails){
      //   step1();
      // }
      // else if(!chkPlan){
      //   step2();
      // }
}

//starting to the desired step
document.addEventListener('DOMContentLoaded',function(){
  step1();
})

// sidebar click event handler
let sections = document.querySelectorAll('.section');
sections.forEach(function(s){
  s.addEventListener('click',function(e){
    let goToStep = e.currentTarget.dataset.section;
    if(isProcessComplete){
      return;
    }
    if(goToStep == 1){
      step1();
    }
    else if(goToStep == 2){
      step2();
    }
    else if(goToStep == 3){
      step3();
    }
    else if(goToStep == 4){
      step4();
    }
  })
})

//change plan monthly->yearly
function changeTag(isMonthly){
  return !isMonthly;
}

// Checking empty input
let name = document.querySelector("#name");
let email = document.querySelector("#email");
let phone = document.querySelector("#phone-no");
let error = document.querySelectorAll(".error-text");

function checkingData(...details) {
  let isValid = true;
  details.forEach(function(input){
    if(input.value.trim() === ""){
      input.parentNode.querySelector('.error-text').classList.add('error-text--active');
      input.classList.add('error-state');
      isValid = false;
    }
    else{
      if(input.id === 'email' && !authEmail(email)){
        isValid = false
      }
      if(input.id === 'phone-no' && !authPhone(phone)){
        isValid = false;
      }
    }
  })

  return isValid;
}
//checking plan
function checkingPlan() {

  for (let plan of plans) {
    if (plan.classList.contains('plan--active')) {
      return true;
    }
  }
  return false;
}

function authEmail(email){
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  let emailError = email.parentNode.querySelector('#email-not-valid-error');
  let emailChk = regex.test(email.value.trim());
  if(!emailChk){
    emailError.classList.add('error-text--active');
    return false;
  }
  else{
    emailError.classList.remove('error-text--active');
    return true;
  }

}

function authPhone(phone){
  let phoneError = phone.parentNode.querySelector('#phone-not-valid-error');
  let phoneChk = phone.value.trim().length === 10 ? true : false;
  if(!phoneChk){
    phoneError.classList.add('error-text--active');
    return false;
  }
  else{
    phoneError.classList.remove('error-text--active');
    return true;
  }
}


//jumping between steps
function changeStep(currentStep, goToStep) {
  let cS = document.querySelectorAll(`.step-${currentStep}`);
  let gS = document.querySelectorAll(`.step-${goToStep}`);

  cS.forEach(function (e) {
    e.classList.add("hidden");
  });

  gS.forEach(function (e) {
    e.classList.remove("hidden");
  });
}

//next button
let nextButton = document.querySelector(".submit-btn");
nextButton.addEventListener("click",nextButtonFunction);

function nextButtonFunction(e){
  e.preventDefault();

  if(currentStep === 1){
    step2();
  }
  else if(currentStep === 2){
    step3();
  }
  else if(currentStep === 3){
    step4();
  }
  else{
    step5();
  }
}

//change next -> confirm
function changeButton(chk) {
  if(chk){
    nextButton.classList.remove('btn--dark');
    nextButton.classList.add('btn--accent');
    nextButton.innerHTML = "Confirm";
  }
  else{
    nextButton.classList.remove('btn--accent');
    nextButton.classList.add('btn--dark');
    nextButton.innerHTML = "Next Step";
  }
}

//back button
let backButton = document.querySelector(".back-btn");
backButton.addEventListener("click", function (e) {
  if(currentStep === 2){
    step1();
  }
  else if(currentStep === 3){
    step2();
  }
  else if(currentStep === 4){
    step3();
  }
  else{
    step4();
  }
});

//hiding back button
function hideButton(btn) {
  btn.classList.add("hidden");
}

//show btn
function showButton(btn){
  btn.classList.remove('hidden');
}

//input field
let input = document.querySelectorAll("input");
input.forEach(function (ele) {
  ele.addEventListener("input", function (e) {
    let parent = e.target.parentNode;
    parent.querySelector(".error-text").classList.remove("error-text--active");
    ele.classList.remove("error-state");
    if(ele.id === 'email'){
      parent.querySelector('#email-not-valid-error').classList.remove('error-text--active');
    }
    if(ele.id === 'phone-no'){
      parent.querySelector('#phone-not-valid-error').classList.remove('error-text--active');
    }
  });
});

// toggle-button
let toggleButton = document.querySelector(".toggle-button");
let toggleButtonContainer = document.querySelector(".toggle-button-container");
toggleButton.addEventListener("click", function () {
  changeAddOn();
  isMonthly = changeTag(isMonthly);
  toggleButtonContainer.classList.toggle("monthly--active");
  toggleButtonContainer.classList.toggle("yearly--active");
  changePlan();
});

// changing-plans(monthly/yearly)
function changePlan() {
  plans.forEach(function (aP) {
    aP.classList.toggle("monthly");
  });
  plans.forEach(function (yP) {
    yP.classList.toggle("yearly");
  });
}

// selecting-plan
let plans = document.querySelectorAll(".plan");
plans.forEach(function (plan) {
  plan.addEventListener("click", function (e) {
    if (plan.classList.contains("plan--active")) {
      plan.classList.remove("plan--active");
      return;
    }
    plans.forEach(function (p) {
      p.classList.remove("plan--active");
    });
    plan.classList.add("plan--active");
  });
});

//change Active States
function changeActiveState(currentStep, goToStep) {

  let currState = document.querySelector(`.section-${currentStep}`);
  let goToState = document.querySelector(`.section-${goToStep}`);

  currState.classList.remove("section--active");
  goToState.classList.add("section--active");
}

//add-ons
let addons = document.querySelectorAll(".add-on");
addons.forEach(function (addon) {
  addon.addEventListener("click", function () {
    addon.classList.toggle("add-on--active");
    addon.querySelector(".checkbox").toggleAttribute("checked");
  });
});

//changing addons
function changeAddOn() {
  let addons = document.querySelectorAll(".add-on");
  addons.forEach(function (addon) {
    addon.classList.toggle("monthly-addon");
  });
  addons.forEach(function (addon) {
    addon.classList.toggle("yearly-addon");
  });
}

// select plan
function saveData() {
  let plansArray = Array.from(plans);
  let selectedPlan = plansArray.filter(function (i) {
    return i.classList.contains("plan--active");
  });

  if(selectedPlan.length === 0){
    summary.plan.name = '';
    summary.plan.price = '';
    return;
  }

  //selecting plan type
    let planType = isMonthly ? 'monthly' : 'yearly';
    summary.plan.type = isMonthly ? 'Monthly' : 'Yearly';

    //selecting active plan

  //selecting active plan heading
    summary.plan.name =
      selectedPlan[0].querySelector(".plan-heading").dataset.planName;
  
    //selecting active plan price
    summary.plan.price =
      selectedPlan[0].querySelector(`.${planType}-plan-price`).dataset.planPrice;

  //selecting active addons
  let addonArray = Array.from(addons);
  let selectedAddon = addonArray.filter(function (i) {
      return i.classList.contains("add-on--active");
    });
  
  //clearing unwanted addons
    summary.addons.name = [];
    summary.addons.price = [];

  //selecting active addon heading
  selectedAddon.forEach(function (add) {
      summary.addons.name.push(
          add.querySelector(".add-on-heading").dataset.addOnHeading
        );
    });
    
  //selecting active addon price
  selectedAddon.forEach(function (add) {
    summary.addons.price.push(
      add.querySelector(`.add-on-price-${planType}`).dataset.addOnPrice
    );

  });

  //adding person details
  summary.person.name = name.value;
  summary.person.email = email.value;
  summary.person.phoneNumber = phone.value;

  //calculatig total expenses
  summary.total = calculateTotal();
}

//showing summary at frontend
function showSummary(summary) {

  if(summary.plan.name === ''){
    renderPlan();
    renderTotal();
    renderAddon();
    return;
  }

  //shwing final plan
  document.querySelector(
    ".final-plan-name"
  ).innerHTML = `${summary.plan.name}(${summary.plan.type})`;

  // showing final plan price
  document.querySelector(".final-plan-price").innerHTML = summary.plan.price;

  //clearing extra addons
  renderAddon();
  let maxAddOn = summary.addons.name.length;

  //showing hr according to the addons no
  togglehorizontal(maxAddOn);

//showing addon and price
  for(let i = 1;i<=maxAddOn;i++){
    let addonName = document.querySelector(`.addon-${i}-name`);
    addonName.innerHTML = summary.addons.name[i-1];
    
    let addonPrice = document.querySelector(`.addon-${i}-price`);
    addonPrice.innerHTML = summary.addons.price[i-1];
    
    addonName.parentNode.classList.remove("hidden");
  }

//showing total price
  document.querySelector('.total-price').innerHTML = `$${summary.total}${isMonthly ? '/mo' : '/yr'}`;
//updating total text accord to plan(mo/yr)
  document.querySelector('.total').innerHTML = isMonthly ?  'Total(per month)' : 'Total(per year)';

}

//clearing summary UI
function renderAddon() {
  let maxAddOn = 3;
  for (let i = 0; i < maxAddOn; i++) {
    let element = document.querySelector(`.addon-${i + 1}-name`);

    element.parentNode.classList.add("hidden");
    element.innerHTML = "";

    document.querySelector(`.addon-${i + 1}-price`).innerHTML = "";
  }
}

function renderPlan(){
  jump.classList.add('hidden');
  document.querySelector(
    ".final-plan-name"
  ).innerHTML = 'No Active Plan';

  // showing final plan price
  document.querySelector(".final-plan-price").innerHTML = '';
}

function renderTotal(){
  document.querySelector('.total-price').innerHTML = '';
  //updating total text accord to plan(mo/yr)
    document.querySelector('.total').innerHTML = '';
}

//toggling hr
function togglehorizontal(length) {
  let hr = document.querySelector("hr");
  length > 0 ? hr.classList.remove("hidden") : hr.classList.add("hidden");
}

// change plans later
let jump = document.querySelector(".plan-change-btn");
jump.addEventListener("click", function (e) {
  step2();
});

//update currentStep
function currentStepUpdate(currentStep, to = 0) {
  currentStep = to;
  return currentStep;
}

//calculating total expenses
function calculateTotal(){
  let total = parseInt(summary.plan.price.replace(/\D/g,''));
  summary.addons.price.forEach(function(p){
    total += parseInt(p.replace(/\D/g,''));
  })
  return total;
}

