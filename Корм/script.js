```javascript
const toggle =
document.getElementById('breedToggle');

const title =
document.getElementById('productTitle');

const granule =
document.getElementById('granuleSize');

const image =
document.getElementById('productImage');

const largeLabel =
document.getElementById('largeLabel');

const smallLabel =
document.getElementById('smallLabel');

toggle.addEventListener('change',()=>{

if(toggle.checked){

title.innerHTML =
'Для средних и мелких пород';

granule.innerHTML =
'0.5 см';

image.src =
'assets/images/bag-small.png';

largeLabel.classList.remove('active');
smallLabel.classList.add('active');

}else{

title.innerHTML =
'Для крупных и средних пород';

granule.innerHTML =
'1.5 см';

image.src =
'assets/images/bag-large.png';

smallLabel.classList.remove('active');
largeLabel.classList.add('active');

}

});

/* ЦЕНЫ */

const packageSelect =
document.getElementById('packageSelect');

const productPrice =
document.getElementById('productPrice');

packageSelect.addEventListener('change',()=>{

let kg =
parseFloat(packageSelect.value);

let price = kg * 550;

productPrice.innerHTML =
price + ' ₽';

});
```
