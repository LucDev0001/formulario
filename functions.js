$(function () {
    // 1 - Criar uma janela modal
    // 2 - Criar um formulário dentro da janela modal
    // 3 - Criar um botão para abrir a janela modal
    // 4 - Criar um botão para fechar a janela modal
    // 5 - Validar Formulário

    abrirJanela();
    verificarCliqueFechar();
    verificarAceiteTermos();

    // Função para abrir a janela
    function abrirJanela() {
        // Quando clicar no botão abrir a janela
        $('.btn h1').on('click', function(e) { // Usando on() em vez de click()
            e.stopPropagation();
            
            // Verificar se o checkbox está marcado antes de abrir a janela
            if ($('#aceite-termos').prop('checked')) {
                $('.bg').fadeIn(); // fadeIn = mostra a janela
            } else {
                alert('Você precisa aceitar os termos e condições para continuar.');
            }

            // Evitar o alerta quando o link "termos e condições" for clicado
            $('a').on('click', function(e) {
                // Se o link for de "termos e condições", não disparar o alerta
                if ($(this).attr('href') === '#') {
                    e.preventDefault();  // Evitar a navegação
                    window.open("https://link-para-os-termos.com", "_blank"); // Abre os termos em uma nova aba
                }
            });
        });
    }

    // Função para fechar a janela
    function verificarCliqueFechar() {
        var el = $('body, .closeBtn');
        el.on('click', function() { // Usando on() em vez de click()
            $('.bg').fadeOut(); // fadeOut = esconde a janela
        });

        // Para impedir que o clique no formulário feche a janela.
        $('.form').on('click', function(e) { // Usando on() em vez de click()
            e.stopPropagation();
        });
    }

    // Função para verificar o aceite dos termos
    function verificarAceiteTermos() {
        $('#aceite-termos').on('change', function() { // Usando on() em vez de change()
            // Verificar se o usuário aceitou os termos
            if ($(this).prop('checked')) {
                $('#submitBtn').prop('disabled', false); // Habilitar o botão de envio
            } else {
                $('#submitBtn').prop('disabled', true); // Desabilitar o botão de envio
            }
        });
    }

    // Validação do formulário antes do envio
    $('form#form1').on('submit', function(e) { // Usando on() em vez de submit()
        // Prevenir o envio do formulário até que a validação seja concluída
        e.preventDefault();

        // Pegar os valores dos campos
        var nome = $('input[name=nome]').val();
        var telefone = $('input[name=telefone]').val();
        var email = $('input[name=email]').val();
        var mensagemSobre = $('textarea[name=mensagem]').val(); // Valor da nova textarea

        var isValid = true; // Flag para verificar se todos os campos são válidos

        // Validação do nome
        if (!validarNome(nome)) {
            $('input[name=nome]').css('border', '2px solid red');
            isValid = false;
        } else {
            $('input[name=nome]').css('border', '2px solid green');
        }

        // Validação do telefone
        if (!validarTelefone(telefone)) {
            $('input[name=telefone]').css('border', '2px solid red');
            isValid = false;
        } else {
            $('input[name=telefone]').css('border', '2px solid green');
        }

        // Validação do e-mail
        if (!validarEmail(email)) {
            $('input[name=email]').css('border', '2px solid red');
            isValid = false;
        } else {
            $('input[name=email]').css('border', '2px solid green');
        }

        // Se todos os campos forem válidos, prepara os dados para enviar pelo WhatsApp
        if (isValid) {
            console.log("Formulário enviado com sucesso!");

            // Criar a mensagem para WhatsApp
            var mensagem = `Dados do Formulário\n\n`;
            mensagem += `Nome: ${nome}\n`;
            mensagem += `Telefone: ${telefone}\n`;
            mensagem += `Email: ${email}\n`;

            // Se o usuário escreveu algo na textarea
            if (mensagemSobre.trim() !== "") {
                mensagem += `\nMensagem sobre o usuário:\n${mensagemSobre}\n`;
            }

            // Criar o link do WhatsApp
            var numeroWhatsApp = "5511999999999"; // Número de telefone do WhatsApp
            var linkWhatsApp = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;

            // Redirecionar para o WhatsApp
            window.open(linkWhatsApp, '_blank');
        } else {
            console.log("Formulário contém erros, corrija os campos marcados.");
        }

        return false; // Prevenir o envio padrão do formulário
    });

   // Função para validar o nome
function validarNome(nome) {
    var palavras = nome.trim().split(/\s+/); // Divide por espaços em branco, e usa trim() para remover espaços extras

    // Valida se o nome tem pelo menos 2 palavras
    if (palavras.length < 2) {
        return false;
    }

    // Verifica se cada parte do nome começa com letra maiúscula e o restante com minúscula
    for (var i = 0; i < palavras.length; i++) {
        // Verifica se a primeira letra é maiúscula e o restante minúscula
        var palavra = palavras[i];
        if (!/^[A-Z][a-z]+$/.test(palavra)) {
            return false;
        }
    }

    return true; // Nome válido
}


    // Função para validar o telefone (formato simples de exemplo)
    function validarTelefone(telefone) {
        var regex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; // Formato (XX) XXXX-XXXX ou (XX) XXXXX-XXXX
        return regex.test(telefone);
    }

    // Função para validar o e-mail
    function validarEmail(email) {
        var regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/; // Validação simples de e-mail
        return regex.test(email);
    }

    // Função para formatar o telefone automaticamente
    $('input[name="telefone"]').on('input', function() {
        var telefone = $(this).val();
        telefone = telefone.replace(/\D/g, ''); // Remove todos os caracteres não numéricos

        if (telefone.length <= 2) {
            telefone = '(' + telefone;
        } else if (telefone.length <= 6) {
            telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2);
        } else if (telefone.length <= 10) {
            telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 6) + '-' + telefone.substring(6);
        } else {
            telefone = '(' + telefone.substring(0, 2) + ') ' + telefone.substring(2, 7) + '-' + telefone.substring(7, 11);
        }

        $(this).val(telefone); // Atualiza o valor do input
    });
});
