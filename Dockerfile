FROM node:12.13.0
#latest LTS version
RUN mkdir -p /work/
COPY . /work
RUN cd /work && npm install && npm run build
EXPOSE 3000
ENTRYPOINT cd /work && npx serve -s build -l 3000