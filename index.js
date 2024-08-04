const countrySelect =document.getElementById("country");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const whatsappBtn = document.getElementById("wp-btn");

//funcion para cargar el JSON
async function loadIndicator(){
  try {
    const response = await fetch('indicator.json');
    const countriesData = await response.json();
    return countriesData;
  }catch (error) {
    console.error('Error en cargar los indicativos: ', error);
    return[];
  }
}

//funcion para cargar el selector
function selectorIndicator(countriesData){
  countriesData.forEach(country => {
    const option = document.createElement("option");
    option.value = country.dial_code;
    option.textContent = `${country.emoji} (${country.dial_code})`;
    option.dataset.code = country.code;
    countrySelect.appendChild(option);
  });
} 

// Función para utilizar la api
async function getUserCountry(){
  try {
    const response = await fetch ("https://ipapi.co/json/")
    const data = await response.json();
    return data.country_code;
  }catch (error){
    console.error("Error al obtener el país del usuario:", error);
    return null;
  }
}

// Funcion principal
async function initializeApp() {
    const countriesData = await loadIndicator();
    selectorIndicator(countriesData);

    const userCountryCode = await getUserCountry();
    if (userCountryCode) {
      const userCountryOption = Array.from(countrySelect.options).find(option => option.dataset.code === userCountryCode);
      if(userCountryOption){
      userCountryOption.selected = true;
    }
  } else{
    const colombiaOption = Array.from(countrySelect.options).find(option => option.textContent.includes("Colombia"));
    if (colombiaOption){
      colombiaOption.selected = true;
    }
  }
  phoneInput.focus(); 
}

initializeApp();
phoneInput.addEventListener("input", function(e){
  this.value = this.value.replace(/[^0-9]/g, '');

  if (this.value.length > 10) {
      this.value = this.value.slice(0, 10)
  }

  if (this.value.length === 10) {
      phoneError.textContent = '';
  }else{
    phoneError.textContent = 'El número teléfonico debe tener 10 dígitos y no incluir letras'
  }
});

whatsappBtn.addEventListener("click", function() {
  const countryCode =countrySelect.value;
  const phoneNumber = phoneInput.value;

  if (phoneNumber.length === 10) {
    const whatsappUrl = `https://wa.me/${countryCode}${phoneNumber}`;
    window.open(whatsappUrl, '_blank');
  }
  else{
    alert("Por favor, Ingrese un número de teléfono válido.");
  }
});
