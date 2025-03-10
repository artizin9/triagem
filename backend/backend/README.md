**Problemas atuais:**

- [ ] Sempre faz upload dos arquivos, independente se a requisição falhou ou não (se tentar com email repetido, mesmo que dê erro, ele faz upload)
- [ ] Todos os arquivos ficam na mesma pasta, o ideal é que cada um ficassem em uma pasta separada
- [ ] Ao atualizar a imagem, faz um novo upload, e não apaga o antigo.
- [ ] Não consegui achar uma tipagem para o `request.file`

**Fluxo da aplicação**

- Toda vez que o comando npm install (ou pnpm install) for rodado, será executado o arquivo que está em `src/seed/index.ts`, que vai ZERAR O BANCO e colocar por padrão um usuário com email admin@admin.com e senha 1234567
- Para testar essa api, é necessário instalar o insomnia e importar o arquivo json "arquivo-para-importar..."
- Todos os uploads estão sendo salvos na pasta `tmp/uploads` e para acessar cada imagem, bastar verificar o campo imageUrl no prisma studio, e acessar o link pelo navegador: `http://localhost:3333/uploads/<imageUrl>`
- As rotas são bem explicativas e já estão com exemplos prontos, mas estou aberto para maiores explicações
- Devido o tempo a API está funcionando ok, mas com certeza tem como melhorar, muitas coisas.
