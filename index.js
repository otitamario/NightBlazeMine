const lote_entrada='0.01';
const USERNAME_LOGIN = 'jose@jose.com';
const PASSWORD = 'yourpassword';
  

const Nightmare = require('nightmare');
const nightmare = Nightmare({
  /* Displays the visual window */
  show: false,
  waitTimeout: 90000,
  //electronPath: require('./node_modules/electron')
  /* Opens the DevTools */
  //openDevTools: {
  //  mode: 'detach'
 // }
}); 

let new_mine='';

(async () => {
  
  
  function novamina(){
    n=Math.floor(Math.random() * 25);
    return '.cell-'+String(n);
  };    
  async function texto() {
    
    const txt =await nightmare.evaluate( () => {
       let element = document.querySelector('#mine-controller .red.undefined');
      const text_elem= element.innerText;
      console.log('texto ',text_elem);
      return text_elem;
     });
  return txt;
    };
  
    
   function saldo (){

    const valor= nightmare.evaluate( () => {
      return document.querySelector('.currency').textContent;
     
     });
    return valor;
  }
    
   async function iniciar(lote) {

 //const cash= await saldo();
 //console.log(cash);
 await nightmare.wait(5000);  
 nightmare.wait('.new-numbers-mines > select:nth-child(1)')
 .select('.new-numbers-mines > select:nth-child(1)', '14');
 
 await nightmare.wait('.input-field')
 .evaluate( () => {
  document.querySelector('.input-field').innerText.replace(/.*/g, '');
return 
 });

 await nightmare.type('.input-field', lote);
 
console.log('lote ',lote);

 await nightmare.wait(1000);
 
 nightmare.wait('#mine-controller .red.undefined')
 .click('#mine-controller .red.undefined');
 new_mine=novamina();
 console.log('mina: ',new_mine);
 nightmare.wait(new_mine)
 .click(new_mine);
 
 
 await nightmare.wait(2000);
 
 var btn_txt= await texto();
 
  
  if(btn_txt.indexOf('Retirar')>=0){
    console.log('ganhou');
    await ganhou(lote_entrada);
  }
else{
  console.log('perdeu');
  await perdeu(String(2*parseFloat(lote)));
}

   };


   async function ganhou(lote) {

   nightmare.wait('#mine-controller .red.undefined')
   .click('#mine-controller .red.undefined');

   await nightmare.wait(1000);
   const cash= await saldo();
   console.log(cash);
   
   /*await nightmare.wait('.new-numbers-mines > select:nth-child(1)');
  
   await nightmare.select('.new-numbers-mines > select:nth-child(1)', '14');
   */
   nightmare.wait('.input-field')
   .evaluate( () => {
    document.querySelector('.input-field').innerText.replace(/.*/g, '');
  return 
   });
   await nightmare.type('.input-field', lote);
   console.log('lote ',lote);
   
   
   nightmare.wait('#mine-controller .red.undefined')
   .click('#mine-controller .red.undefined');
   
   new_mine=novamina();
    console.log('mina: ',new_mine);
    nightmare.wait(new_mine)
    .click(new_mine);
    
   
   await nightmare.wait(2000);
   
   var btn_txt= await texto();
   
    
    if(btn_txt.indexOf('Retirar')>=0){
      console.log('ganhou');
     await ganhou(lote_entrada);
    }
  else{
    console.log('perdeu');
    await perdeu(String(2*parseFloat(lote)));
  }
  
     };
   
  
  
     async function perdeu(lote) {

      //.result__cashout
      //.result__text
     // button.red:nth-child(2)
     //button.red:nth-child(2)
     await nightmare.wait(1000);
     /*await nightmare.wait('.new-numbers-mines > select:nth-child(1)');
    
     await nightmare.select('.new-numbers-mines > select:nth-child(1)', '14');
     */
     const cash= await saldo();
     console.log(cash);
     

     nightmare.wait('.input-field')
     .evaluate( () => {
      document.querySelector('.input-field').innerText.replace(/.*/g, '');
    return 
     });
     await nightmare.type('.input-field', lote);
     console.log('lote ',lote);
     
     nightmare.wait('#mine-controller .red.undefined')
     .click('#mine-controller .red.undefined');
     
     new_mine=novamina();
    console.log('mina: ',new_mine);
    nightmare.wait(new_mine)
    .click(new_mine);
    
 
    
     await nightmare.wait(2000);
     
     var btn_txt= await texto();
     
      
      if(btn_txt.indexOf('Retirar')>=0){
        console.log('ganhou');
        await ganhou(lote_entrada);
      }
    else{
      console.log('perdeu');
      await perdeu(String(2*parseFloat(lote)));
    }
    
       };
      
  
  
  
  
  /* Setting the viewport */
  await nightmare.viewport(1024, 768);

  await nightmare.goto('https://blaze.com/pt/games/mines');
  
  
  /* Waits for a specific selector to be found on a page */
  await nightmare.wait('.link');

  /* Clicks on a selector */
  await nightmare.click('.link');

  await nightmare.wait('div.input:nth-child(1) > div:nth-child(1) > input:nth-child(2)');

  await nightmare.type('div.input:nth-child(1) > div:nth-child(1) > input:nth-child(2)', USERNAME_LOGIN);
  
  await nightmare.wait('div.input:nth-child(2) > div:nth-child(1) > input:nth-child(2)');

  await nightmare.type('div.input:nth-child(2) > div:nth-child(1) > input:nth-child(2)', PASSWORD);
  await nightmare.visible('.submit');
  await nightmare.click('.submit');
  console.log('fazendo login');
  
  await iniciar(lote_entrada);

   
})();

