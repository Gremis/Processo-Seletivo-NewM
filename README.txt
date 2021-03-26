
INSTRUÇÕES DE INSTALAÇÃO DO SISTEMA



## ⚙️ Baixe e descompacte a pasta Processo Seletivo NewM:

Dentro vai conter 2 carpetas **api_php** e **Front-master**:

**api_php / -** Contém o código-fonte da API com a funcionalidade implementada no Backend usando PHP e um banco de dados MySQL.
Certifique-se de ter XAMPP ou MAMP ou LAMP instalado em seu computador.
Você vai precisar:
   - Importe o arquivo *api_php\bd\newm.sql* do banco de dados
   - Alterar as credenciais do banco de dados api_php\bd\bd.php com suas próprias credenciais no *$host=””*, *$user=””* e *$password=””*



**Front-master / -** Contém o código-fonte do Frontend usando ReactJs, Bootstrap para melhorar os estilos css, Reactstrap para gerar janelas modais e Axios para fazer petições à API
Dentro da pasta Front-master rode:

```bash
npm install
```

Depois de ter instalado o arquivo node_modules, inicie a aplicação com a base de datos ativa:


```bash
npm run start
```

Outra alternativa é clonar o repositório https://github.com/Gremis/Processo-Seletivo-NewM.git

Qualquer sugestão ou dúvida fico a dispor,

Atenciosamente,

Gremis Tovar
