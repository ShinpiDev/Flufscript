var console_value = document.createElement("span");
console_value.setAttribute("id","console");
document.body.appendChild(console_value);
document.body.style.background = "#000";
console_value.style.color = "#fff";
console_value.style.fontFamily = "monospace";
console_value.style.fontSize = "20px";

function __init__(data) {
  var tokens = ["var","log","if","back","input","repeat","#","=","!","<",">"];
  //Valores
  var tick = 0;

  if(!data.startsWith(";")) {
    __error("The first line must be a ;", 0);
    return;
  }

  function __addScript(src) {
    if(!src.startsWith(";")) {
      __error("The first line must be a ;", word_id);
      return;
    }

    src = src.replace("\r","");
    src = src.trim();
    src = src.split(";");
    for(var a = 0; a < src.length; a++) {
      //remover o \r\n
      src[a] = src[a].substring(1,src[a].length);
      if(src[a].startsWith("\n")) {
        src[a] = src[a].substring(0,src[a].length);
        a--;
      }
      if(src[a].startsWith("\r\n")) {
        src[a] = src[a].substring(1,src[a].length);
        a--;
      }
    }

    for(var a = 0; a < src.length; a++) {
      src[a] = src[a].trim();
    }

    scripts = scripts.concat(src);
  }

  var variables = ["getInput"];
  var values = [""];

  //Funções para facilitar o desenvolvimento
  function __write(text) {
    document.getElementById("console").innerText += text + "\n";
  }

  function __error(error, line) {
    __write("* Error : line(" + line + ") : " + error);
  }

  //Formata o script e separa ele linha a linha
  data = data.replace("\r","");
  data = data.trim();
  var scripts = data.split(";");
  for(var a = 0; a < scripts.length; a++) {
    //remover o \r\n
    scripts[a] = scripts[a].substring(1,scripts[a].length);
    if(scripts[a].startsWith("\n")) {
      scripts[a] = scripts[a].substring(0,scripts[a].length);
      a--;
    }
    if(scripts[a].startsWith("\r\n")) {
      scripts[a] = scripts[a].substring(1,scripts[a].length);
      a--;
    }
  }

  for(var a = 0; a < scripts.length; a++) {
    scripts[a] = scripts[a].trim();
  }

  console.log(scripts);

  for(var word_id = 0; word_id < scripts.length; word_id++) {
    tick++;
    //variaveis
    if(scripts[word_id].startsWith("var")) {
      var vr = scripts[word_id].replace(scripts[word_id].substring(4,scripts[word_id]),""); //retorna o nome da variavel
      if(tokens.includes(vr)) {
        __error("Don't use especial words(" + vr + ") on your script!", word_id);
      }else{
        variables.push(vr); //salva o nome
        values.push("undefined--"); //salva o valor
      }
      vr = ""; //limpa o valor para evitar erros
    }else{
      //Log no console
      if(scripts[word_id].startsWith("log")) {
        var total_text = "";
        var contains_vars = false;
        var text = scripts[word_id].replace(scripts[word_id].substring(4,scripts[word_id]),""); //retorna só o valor após o log
        
        if(tokens.includes(text)) {
          __error("Don't use especial words(" + text + ") on your script!", word_id);
          word_id++;
          text = "";
          contains_vars = false;
          total_text = "";
        }

        //verifica se contém variaveis
        if(scripts[word_id].includes("%")) {
          text = text.split("::"); //separa as vars dos textos
          contains_vars = true;

          console.log(text)
        }
        
        if(contains_vars) {
          for(var i = 0; i < text.length; i ++) {
            text[i] = text[i].trim();
            if(text[i].startsWith("%")) {
              var g = text[i].replace(text[i].substring(1,text[i]),"");
              if(variables.includes(g)) {
                total_text += values[variables.indexOf(g)];
              }else{
                __error(g + " isn't defined!", word_id);
              }
            }else{
              total_text += text[i];
            }
          }
          __write(total_text);
        }else{
          __write(text);
        }

      }else{
        //Definir variavel já existente
        if(variables.includes(scripts[word_id].substring(0,scripts[word_id].indexOf(" = ")))) {
          //scripts[word_id].substring(0,scripts[word_id].indexOf(" = "))
          var name = scripts[word_id].substring(0,scripts[word_id].indexOf(" = "));
          var vl = scripts[word_id].substring(scripts[word_id].indexOf(" = ") + 3,scripts[word_id].length);

          if(vl.startsWith("+")) {
            vl = parseInt(values[variables.indexOf(name)]) + parseInt(vl);
          }

          if(tokens.includes(vl)) {
            __error("Don't use especial words(" + vl + ") on your script!", word_id);
            word_id++;
            vl = "";
            name = "";
          }

          if(variables.includes(name)) {
            values[variables.indexOf(name)] = vl;
            name = "";
            vl = "";
          }else{
            __error(name + " isn't defined!", word_id);
          }
        }else{
          if(scripts[word_id].startsWith("input")) {
            vl = prompt(scripts[word_id].substring(6,scripts[word_id].length));
            values[variables.indexOf("getInput")] = vl;
            vl = "";
          }else{
            //If statement
            if(scripts[word_id].startsWith("if")) {
              var calc = scripts[word_id].substring(2,scripts[word_id].indexOf(":"));
              calc = calc.trim();
              var code = scripts[word_id].substring(scripts[word_id].indexOf(":") + 2,scripts[word_id].length);
              
              if(calc.includes("==")) {
                calc = calc.split("==");
                
                calc[0] = calc[0].trim();
                calc[1] = calc[1].trim();

                if(calc[0].startsWith("%")) {
                  if(variables.includes(calc[0].substring(1,calc[0].length))) {
                    calc[0] = values[variables.indexOf(calc[0].substring(1,calc[0].length))];
                  }else{
                    __error(calc[0] + " isn't defined!", word_id);
                  }
                }

                if(calc[1].startsWith("%")) {
                  if(variables.includes(calc[1].substring(1,calc[1].length))) {
                    calc[1] = values[variables.indexOf(calc[1].substring(1,calc[1].length))];
                  }else{
                    __error(calc[1] + " isn't defined!", word_id);
                  }
                }

                if(calc[0] == calc[1]) {
                  scripts[word_id] = code;
                  word_id--;
                }
              }else{
                if(calc.includes("!=")) {
                  calc = calc.split("!=");
                  
                  calc[0] = calc[0].trim();
                  calc[1] = calc[1].trim();

                  if(calc[0].startsWith("%")) {
                    if(variables.includes(calc[0].substring(1,calc[0].length))) {
                      calc[0] = values[variables.indexOf(calc[0].substring(1,calc[0].length))];
                    }else{
                      __error(calc[0] + " isn't defined!", word_id);
                    }
                  }

                  if(calc[1].startsWith("%")) {
                    if(variables.includes(calc[1].substring(1,calc[1].length))) {
                      calc[1] = values[variables.indexOf(calc[1].substring(1,calc[1].length))];
                    }else{
                      __error(calc[1] + " isn't defined!", word_id);
                    }
                  }

                  if(calc[0] != calc[1]) {
                    scripts[word_id] = code;
                    word_id--;
                  }
                }else{
                  if(calc.includes(">")) {
                    calc = calc.split(">");
                    
                    calc[0] = calc[0].trim();
                    calc[1] = calc[1].trim();
  
                    if(calc[0].startsWith("%")) {
                      if(variables.includes(calc[0].substring(1,calc[0].length))) {
                        calc[0] = values[variables.indexOf(calc[0].substring(1,calc[0].length))];
                      }else{
                        __error(calc[0] + " isn't defined!", word_id);
                      }
                    }
  
                    if(calc[1].startsWith("%")) {
                      if(variables.includes(calc[1].substring(1,calc[1].length))) {
                        calc[1] = values[variables.indexOf(calc[1].substring(1,calc[1].length))];
                      }else{
                        __error(calc[1] + " isn't defined!", word_id);
                      }
                    }
  
                    if(parseInt(calc[0]) > parseInt(calc[1])) {
                      scripts[word_id] = code;
                      word_id--;
                    }
                  }else{
                    if(calc.includes("<")) {
                      calc = calc.split("<");
                      
                      calc[0] = calc[0].trim();
                      calc[1] = calc[1].trim();
    
                      if(calc[0].startsWith("%")) {
                        if(variables.includes(calc[0].substring(1,calc[0].length))) {
                          calc[0] = values[variables.indexOf(calc[0].substring(1,calc[0].length))];
                        }else{
                          __error(calc[0] + " isn't defined!", word_id);
                        }
                      }
    
                      if(calc[1].startsWith("%")) {
                        if(variables.includes(calc[1].substring(1,calc[1].length))) {
                          calc[1] = values[variables.indexOf(calc[1].substring(1,calc[1].length))];
                        }else{
                          __error(calc[1] + " isn't defined!", word_id);
                        }
                      }
    
                      if(parseInt(calc[0]) < parseInt(calc[1])) {
                        scripts[word_id] = code;
                        word_id--;
                      }
                    }
                  }
                }
              }
            }else{
              if(scripts[word_id].startsWith("repeat")) {
                var count = scripts[word_id].substring(7,scripts[word_id].length);

                var code = count.substring(count.indexOf(" ") + 1,scripts[word_id].length)

                count = count.substring(0,count.indexOf(" "));

                for(var ca = 0; ca < parseInt(count); ca++) {
                  scripts[word_id] = code;
                  word_id--;
                }
              }else{
                if(scripts[word_id].startsWith("back")) {
                  word_id = scripts[word_id].substring(5,scripts[word_id].length);
                  if(word_id >= 0) word_id++;
                  if(word_id > scripts.length) {
                    __error("Line " + word_id + " is not searchable",word_id);
                    return;
                  }
                }else{
                  if(scripts[word_id].startsWith("include")) {
                    fetch(scripts[word_id].substring(8,scripts[word_id].length))
                      .then(response => response.text())
                      .then(data => {__addScript(data); scripts[word_id] = ""; word_id--;})
                      .catch(error => document.getElementById("console").innerText += error + "\n");
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}

//Lê o script de fora do interpretador
fetch("index.fluf")
    .then(response => response.text())
    .then(data => __init__(data))
    .catch(error => document.getElementById("console").innerText += error + "\n");