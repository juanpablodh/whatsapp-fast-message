const countrySelect =document.getElementById("country");
const phoneInput = document.getElementById("phone");
const phoneError = document.getElementById("phone-error");
const whatsappBtn = document.getElementById("wp-btn");

phoneInput.addEventListener("input", function(e){
  this.value = this.value.replace(/[^0-9]/g, '');

  if (this.value.length > 10) {
      this.value = this.value.slice(0, 10)
  }

  if (this.value.length === 10) {
      phoneError.textContent = '';
  }else{
    phoneError.textContent = 'El número teléfonico debe tener 10 dígitos'
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
