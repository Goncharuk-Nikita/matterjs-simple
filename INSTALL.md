# Для начала, нам нужен nodejs, чтобы запустить приложение и git, чтобы скачать последную версию проекта.

# тут node:
https://nodejs.org/en/download

# тут git:
https://git-scm.com/downloads

# После установкм нужно проверить что все установилось. Заходим в консоль и в ней набираем:
# для проверки node
node -v 
# для проверки git
git -v

# теперь можно качать архив. Создаем папку проекта. Заходим в нее через консоль:
cd ./path/to/project/
# и выкачиваем архив:
git clone https://github.com/officefish/matterjs-simple.git  
# заходим внутрь проекта
cd matterjs-simple

# теперь устанавливаем yarn
npm install --global yarn

# устанавливаем зависимости
yarn

# запускаем приложение
yarn start

# открываем браузер, во вкладке набираем localhost:3000

