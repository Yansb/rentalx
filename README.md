# Cadastro de carro

**RF**

- [x] Deve ser possível cadastrar um novo carro
- [x] Deve ser possível listar todas as categorias

**RN**

- [x] Não deve ser possível cadastrar um carro com uma placa já existente
- [x] Não deve ser possível alterar a placa de um carro ja cadastrado
- [x] O carro deve ser cadastrado como disponível por padrão
- [x] O usuário responsável pelo cadastro do carro deve ser um admin

# Listagem de carros

**RF**

- [x] Deve ser possível listar todos os carros disponíveis
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da categoria
- [x] Deve ser possível listar todos os carros disponíveis pelo nome da marca
- [x] Deve ser possível listar todos os carros disponíveis pelo nome do carro

**RNF**

- [x] O usuário não precisa estar logado no sistema

# Cadastro de especificação no carro

**RF**

- [x] Deve ser possível cadastrar uma especificação para um carro

**RN**

- [x] Não deve ser possível cadastrar uma especificação para um carro não cadastrado
- [x] Não deve ser possível cadastrar uma especificação já existente para o mesmo carro
- [x] O usuário responsável pelo cadastro deve ser um admin

# Cadastro de imagens do carro

**RF**

- [x] Deve ser possível cadastrar a imagem do carro
- [x] Deve ser possível listar todos os carros

**RNF**

- [x] Utilizar o multer para upload dos arquivos

**RN**

- [x] O usuário deve poder cadastrar mais de uma imagem para o mesmo carro
- [x] O usuário responsável pelo cadastro deve ser um admin

# Aluguel de carro

**RF**

- [x] Deve ser possível cadastrar um aluguel

**RN**

- [x] O aluguel tem que ter a duração minima de 1 dia
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo usuário
- [x] Não deve ser possível cadastrar um novo aluguel caso já exista um aberto para o mesmo carro
