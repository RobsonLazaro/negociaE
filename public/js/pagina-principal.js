//dropdown login

document.getElementById("loginBtn").addEventListener("click", function(event){
    event.preventDefault();
    document.getElementById("dropdownMenu").classList.toggle("show");
});

window.onclick = function(event) {
    if (!event.target.matches('.fas')) {
      var dropdowns = document.getElementsByClassName("dropdown-content");
      var i;
      for (i = 0; i < dropdowns.length; i++) {
        var openDropdown = dropdowns[i];
        if (openDropdown.classList.contains('show')) {
          openDropdown.classList.remove('show');
        }
      }
    }
  }







// Pega os modais
var loginModal = document.getElementById('loginModalbt');
var loginModal = document.getElementById('loginModalvend');
var loginModal = document.getElementById('loginModalcom');
var registerModal = document.getElementById('registerModal');

// Pega os botões que abrem os modais
var loginBt = document.getElementById('loginBt');
var loginVend = document.getElementById('loginVend');
var loginCom = document.getElementById('loginCom');
var registerBtn = document.getElementById('registerBtn');

// Pega os elementos <span> que fecham os modais
var closeBtns = document.getElementsByClassName('close');

// Quando o usuário clica no botão, abre o modal de login ADM
loginBt.onclick = function() {
    loginModalbt.style.display = "block";
}
document.getElementById('Modalbt').onclick = function(event) {
    event.preventDefault();
    var btUsername = document.getElementById('btUsername').value;
    var btPassword = document.getElementById('btPassword').value;

    // Verifique se os campos não estão vazios
    if (!btUsername && !btPassword ) {
     
        alert("Por favor, preencha todos os campos.");
    } else {
       
        window.location.href = "index-perfil-adm.html";
    }
};


// Quando o usuário clica no botão, abre o modal de login do vendedor
loginVend.onclick = function() {
    loginModalvend.style.display = "block";
}



// Quando o usuário clica no botão, abre o modal de login do comprador
loginCom.onclick = function() {
    loginModalcom.style.display = "block";
}



// Quando o usuário clica no botão, abre o modal de cadastro
registerBtn.onclick = function() {
    registerModal.style.display = "block";
}

// Quando o usuário clica em <span> (x), fecha o modal
for (var i = 0; i < closeBtns.length; i++) {
    closeBtns[i].onclick = function() {
        loginModalcom.style.display = "none";
        loginModalvend.style.display = "none";
        registerModal.style.display = "none";
    }
}

// Quando o usuário clica fora do modal, fecha ele
window.onclick = function(event) {
    if (event.target === loginModal) {
        loginModalbt.style.display = "none";

    }


    if (event.target === registerModal) {
        registerModal.style.display = "none";
    }
}

// Aplica a máscara de CNPJ e Telefone
$(document).ready(function() {
    $('#cnpjVendedor').mask('00.000.000/0000-00');
    $('#telefone').mask('(00) 00000-0000');
    $('#cnpjCadastro').mask('00.000.000/0000-00');
    $('#cnpjComprador').mask('00.000.000/0000-00');
    
    
});

$(document).ready(function() {
    // Abrir modal de cadastro
    $('.openRegisterModal').click(function(e) {
        e.preventDefault();
        $('#registerModal').show();
    });

    // Fechar o modal de cadastro
    $('#registerModal .close').click(function() {
        $('#registerModal').hide();
    });

    // Fechar o modal ao clicar fora do conteúdo
    $(window).click(function(e) {
        if ($(e.target).is('#registerModal')) {
            $('#registerModal').hide();
        }
    });
});