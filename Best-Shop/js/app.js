const h1 = document.createElement("h1");
h1.innerText = "Hello World!";
document.querySelector("#app").append(h1);



// burger menu

const menuToggleButton = document.querySelector('.menu__toggle');
const menuNav = document.querySelector('.header__nav');
if (menuToggleButton) {
   menuToggleButton.addEventListener('click', function (e) {
      document.body.classList.toggle('_lock');
      menuToggleButton.classList.toggle('_active');
      menuNav.classList.toggle('_active');
   });
};

//-----------------------------------

const allSections = document.querySelectorAll('.nav__link[data-goto]');

if (allSections.length > 0) {
   allSections.forEach(menuNav => {
      menuNav.addEventListener('click', onMenuClickLink);
   });
   function onMenuClickLink(e) {
      const menuLink = e.target;
      if (menuLink.dataset.goto && document.querySelector(menuLink.dataset.goto)) {
         const gotoBlock = document.querySelector(menuLink.dataset.goto);
         const gotoBlockValue = gotoBlock.getBoundingClientRect().top + scrollY - document.querySelector('header').offsetHeight;
         
         if (menuToggleButton.classList.contains('_active')) {
            document.body.classList.remove('_lock');
            menuToggleButton.classList.remove('_active');
            menuNav.classList.remove('_active');
         };
         window.scrollTo({
            top: gotoBlockValue,
            behavior: 'smooth'
         });
         e.preventDefault();
      };
   };
};

//Calculator------------------------------------------------

const calcSum = document.querySelector(".calc__summary ul");
const choosePack = document.querySelector(".calc__select");
const accountingCheck = document.querySelector('#accounting');
const terminalCheck = document.querySelector('#terminal');
const totalPr = document.querySelector(`#total-price`);
const calcSumbmn = document.querySelectorAll('.calc__summary .item__price span');

class Calculator{
   constructor(val,child,sell) {
      this.val = val;
      this.child = child;
      this.sell = sell;
   };
};

class Checkbox extends Calculator{
   constructor(val, child, sell) {
      super(val, child, sell);
      const id = eval(`calcSum.children[${(this.child)}]`);
      this.val.addEventListener('change', () => {
         if (this.val.checked !== true) {
            id.style.display = 'none';
            id.children[1].children[0].innerText = 0;
            totaly();
         } else {
            id.style.display = 'block';
            id.children[1].children[0].innerText = `${this.sell}`;
            totaly();            
         };         
      });
   };
};

class Summary extends Calculator{
   constructor(val, child,sell) {
      super(val, child,sell);
      this.val.onchange = this.onChange.bind(this);
   };
   onChange(event) {
      this.inputValue = event.target.value;
      const id = eval(`calcSum.children[${(this.child)}]`);
      const mult = this.inputValue * this.sell;
      if (this.inputValue != 0) {
         id.style.display = 'block';
         id.children[1].innerText = `${this.inputValue} * $${this.sell}`;
         id.children[2].children[0].innerText = `${mult}`;
            
         totaly();
      } else {
         id.style.display = 'none'; 
         id.children[2].children[0].innerText = 0;
         totaly();
      };     
   };
};

class Package extends Calculator {
   constructor(val, child, sell) {
      super(val, child, sell);
      const id = eval(`calcSum.children[${(this.child)}]`);
      this.val.addEventListener('click', function (e) {
         choosePack.classList.toggle('open');
         this.inputValue = e.target.innerText;
         choosePack.children[0].innerText = `${this.inputValue}`;
         if (this.inputValue === 'Basic' || this.inputValue === 'Professional' || this.inputValue === 'Premium') {
            if (this.inputValue === 'Professional') {
               this.sell = 25;
            }else if (this.inputValue === 'Premium') {
               this.sell = 60;
            } else {
               this.sell = 0;
            }
            id.style.display = 'block';
            id.children[1].innerText = `${this.inputValue}`;
            id.children[2].children[0].innerText = `${this.sell}`;
            totaly();
         }
      });
   };
};

totaly = () => {
   const arr = [];
   calcSumbmn.forEach(element => {
      const result = element.innerText;
      arr.push(+result);
   });
   const res = arr.reduce((a, b) => a + b);
   totalPr.style.display = 'block';
   totalPr.innerText = `Total: $ ${res}`;
};

const getProducts = new Summary(document.querySelector("#products"), 0,0.5);
const getOrders = new Summary(document.querySelector("#orders"), 1, 0.25);
const checkPackage = new Package(choosePack, 2, 0);
const checkBoxAccounting = new Checkbox(accountingCheck, 3, 5);
const checkBoxTerminal = new Checkbox(terminalCheck, 4, 10);