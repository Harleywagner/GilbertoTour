
// script.js - Gilberto Tour

// Função de navegação entre páginas
function irPara(destino) {
  window.location.href = destino;
}

// Adiciona parâmetro de mensagem ao link do WhatsApp
document.addEventListener('DOMContentLoaded', function () {
  const whatsappLink = document.querySelector('.whatsapp-float');
  if (whatsappLink) {
    whatsappLink.href = "https://wa.me/558584127344?text=Olá,%20quero%20mais%20informações%20sobre%20os%20passeios.";
  }

  // Mostrar tooltip após 5 segundos
  const tooltip = document.querySelector('.tooltip');
  if (tooltip) {
    tooltip.style.opacity = 0;
    tooltip.style.transition = "opacity 1s ease";
    setTimeout(() => {
      tooltip.style.opacity = 1;
    }, 5000);
  }
});
