# install programm
FROM node

# create workdir
WORKDIR /app

# copy files from project to workdii 
COPY . .

# install node_modules
RUN npm install

# run on PORT 4321
EXPOSE 4321

# run project
CMD ["node", "server"]



