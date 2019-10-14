const Discord = require('discord.js');
const config = require('./config.json');
const client = new Discord.Client();


client.on('ready', () => {
  console.log('Estou pronto letis bora!');
});

function search(files, nome){

	for(var i = 0; i < files.length; i++) {
	
		if (nome.includes(files[i])) return true		
	}	
	return false
}


client.on('message', message => {

    if (message.content.startsWith("!remover")){
    frase = message.content.split(" ");
    nome = frase[frase.length-1];
    var fs = require('fs');
    var files = fs.readdirSync(__dirname +'/arquivos/');
    if (search(files, nome)) {
    var filePath = (__dirname + '/arquivos/' + nome);
    fs.unlinkSync(filePath); 
    message.reply("arquivo removido com sucesso!");
    }else {
      message.reply("o arquivo não foi encontrado!");
    }

    } else if(message.content.startsWith("!arquivos")) {

      var fs = require('fs');
      var files = fs.readdirSync(__dirname +'/arquivos/');
      for(var i = 0; i < files.length; i++) {
      message.channel.send(files[i]);
      
      }

    } else if (message.content.startsWith("!carregar")){
      frase = message.content.split(" ");
      nome = frase[frase.length-1];
      var fs = require('fs'); 
      var files = fs.readdirSync(__dirname +'/arquivos/');
      if (search(files, nome)) {
      message.channel.send(" Aqui está o arquivo ", {files: ["./arquivos/" + nome]});
      } else {
        message.reply("o arquivo não foi encontrado!");
      }
     
       } else if (message.attachments.array().length > 0 && message.content.startsWith("!storage")){
        var attachment = message.attachments.array();
        attachment.forEach(function(attachment) {   
          const fs = require('fs');
          var request = require('request');
          request(attachment.url).pipe(fs.createWriteStream('./arquivos/' + attachment.filename));
          message.reply("arquivo adicionado com sucesso!");
        })
        }
  
  });



client.login(config.token);


