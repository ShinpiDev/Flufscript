function __init__(data) {
  var functions = [];
  var functions_scripts = [];
  var variables = ["getInput"];
  var values = [""];
  var original_script = data;
  var server = undefined;

  const console_value = document.createElement("span");
  console_value.setAttribute("id", "console");
  document.body.appendChild(console_value);
  document.body.style.background = "#000";
  console_value.style.color = "#fff";
  console_value.style.fontFamily = "monospace";
  console_value.style.fontSize = "20px";

  var tokens = ["var", "log", "if", "back", "input", "repeat", "#", "=", "!", "<", ">", "$","#"];

  if (!data.startsWith(";")) {
    //__error("The first line must be a ;", 0);
    //return;
  }

  function __addScript(src, line) {
    if (!src.startsWith(";")) {
      __error("The first line must be a ;", word_id);
      return;
    }

    src = src.replace("\r", "");
    src = src.trim();
    src = src.split(";");
    for (var a = 0; a < src.length; a++) {
      //remover o \r\n
      src[a] = src[a].substring(1, src[a].length);
      if (src[a].startsWith("\n")) {
        src[a] = src[a].substring(0, src[a].length);
        a--;
      }
      if (src[a].startsWith("\r\n")) {
        src[a] = src[a].substring(1, src[a].length);
        a--;
      }
    }

    for (var a = 0; a < src.length; a++) {
      src[a] = src[a].trim();
    }

    scripts = scripts.concat(src);
  }

  //Funções para facilitar o desenvolvimento
  function __write(text) {
    document.getElementById("console").innerText += text + "\n";
  }

  function __error(error, line) {
    __write("* Error : line(" + line + ") : " + error);
  }

  //Formata o script e separa ele linha a linha
  data = data.trim();
  var scripts = data.split(";");
  for (var a = 0; a < scripts.length; a++) {
    scripts[a] = scripts[a].substring(2, scripts[a].length);
  }

  for (var a = 0; a < scripts.length; a++) {
    scripts[a] = scripts[a].trim();
  }

  for (var word_id = 0; word_id < scripts.length; word_id++) {
    //variaveis
    if (scripts[word_id].startsWith("var")) {
      var vr = scripts[word_id].replace(scripts[word_id].substring(4, scripts[word_id]), ""); //retorna o nome da variavel

      if (variables.includes(vr)) {
        __error("The variable (" + vr + ") alreddy exist", word_id);
        word_id++;
      }

      if (tokens.includes(vr)) {
        __error("Don't use especial words(" + vr + ") on your script!", word_id);
      } else {
        variables.push(vr); //salva o nome
        values.push("undefined--"); //salva o valor
      }
      vr = ""; //limpa o valor para evitar erros
    } else {
      //Log no console
      if (scripts[word_id].startsWith("log")) {
        var total_text = "";
        var contains_vars = false;
        var text = scripts[word_id].replace(scripts[word_id].substring(4, scripts[word_id]), ""); //retorna só o valor após o log

        if (tokens.includes(text)) {
          __error("Don't use especial words(" + text + ") on your script!", word_id);
          word_id++;
          text = "";
          contains_vars = false;
          total_text = "";
        }

        //verifica se contém variaveis
        if (scripts[word_id].includes("%")) {
          text = text.split("::"); //separa as vars dos textos
          contains_vars = true;

          console.log(text)
        }

        if (contains_vars) {
          for (var i = 0; i < text.length; i++) {
            text[i] = text[i].trim();
            if (text[i].startsWith("%")) {
              var g = text[i].replace(text[i].substring(1, text[i]), "");
              if (variables.includes(g)) {
                total_text += values[variables.indexOf(g)];
              } else {
                __error(g + " isn't defined!", word_id);
              }
            } else {
              total_text += text[i];
            }
          }
          __write(total_text);
        } else {
          __write(text);
        }

      } else {
        //Definir variavel já existente
        if (variables.includes(scripts[word_id].substring(0, scripts[word_id].indexOf(" = ")))) {
          //scripts[word_id].substring(0,scripts[word_id].indexOf(" = "))
          var name = scripts[word_id].substring(0, scripts[word_id].indexOf(" = "));
          var vl = scripts[word_id].substring(scripts[word_id].indexOf(" = ") + 3, scripts[word_id].length);

          function math() {
            if (vl.substring(1, vl.length).startsWith("%")) {
              if (variables.includes(vl.substring(2, vl.length))) {
                vl = values[variables.indexOf(vl.substring(2, vl.length))];
              } else {
                __error(g + " isn't defined!", word_id);
              }
            }
          }

          if (vl.startsWith("+")) {
            math();
            console.log(vl)
            vl = parseInt(values[variables.indexOf(name)]) + parseInt(vl);
            vl = vl.toString();
          } else {
            if (vl.startsWith("-")) {
              math();
              vl = parseInt(values[variables.indexOf(name)]) - parseInt(vl.substring(1, vl.length));
              vl = vl.toString();
            } else {
              if (vl.startsWith("*")) {
                math();
                console.log(vl)
                vl = parseInt(values[variables.indexOf(name)]) * parseInt(vl.substring(1, vl.length));
                vl = vl.toString();
              } else {
                if (vl.startsWith("/")) {
                  math();
                  console.log(vl)
                  vl = parseInt(values[variables.indexOf(name)]) / parseInt(vl.substring(1, vl.length));
                  vl = vl.toString();
                } else {
                  if (vl.startsWith("$")) {
                    math();
                    console.log(vl)
                    vl = parseInt(values[variables.indexOf(name)]) % parseInt(vl.substring(1, vl.length));
                    vl = vl.toString();
                  } else {
                    if (vl.startsWith("_")) {
                      math();
                      console.log(vl)
                      vl = parseInt(values[variables.indexOf(name)]) ** parseInt(vl.substring(1, vl.length));
                      vl = vl.toString();
                    }
                  }
                }
              }
            }
          }


          if (vl.startsWith("%")) {
            if (variables.includes(vl.substring(1, vl.length))) {
              vl = values[variables.indexOf(vl.substring(1, vl.length))];

            } else {
              __error(g + " isn't defined!", word_id);
            }
          }

          if (tokens.includes(vl)) {
            __error("Don't use especial words(" + vl + ") on your script!", word_id);
            word_id++;
            vl = "";
            name = "";
          }

          if (variables.includes(name)) {
            values[variables.indexOf(name)] = vl;
            name = "";
            vl = "";
          } else {
            __error(name + " isn't defined!", word_id);
          }
        } else {
          if (scripts[word_id].startsWith("input")) {
            vl = prompt(scripts[word_id].substring(6, scripts[word_id].length));
            values[variables.indexOf("getInput")] = vl;
            vl = "";
          } else {
            //If statement
            if (scripts[word_id].startsWith("if")) {
              var calc = scripts[word_id].substring(2, scripts[word_id].indexOf(":"));
              calc = calc.trim();
              var code = scripts[word_id].substring(scripts[word_id].indexOf(":") + 2, scripts[word_id].length);

              if (calc.includes("==")) {
                calc = calc.split("==");

                calc[0] = calc[0].trim();
                calc[1] = calc[1].trim();

                if (calc[0].startsWith("%")) {
                  if (variables.includes(calc[0].substring(1, calc[0].length))) {
                    calc[0] = values[variables.indexOf(calc[0].substring(1, calc[0].length))];
                  } else {
                    __error(calc[0] + " isn't defined!", word_id);
                  }
                }

                if (calc[1].startsWith("%")) {
                  if (variables.includes(calc[1].substring(1, calc[1].length))) {
                    calc[1] = values[variables.indexOf(calc[1].substring(1, calc[1].length))];
                  } else {
                    __error(calc[1] + " isn't defined!", word_id);
                  }
                }

                if (calc[0] == calc[1]) {
                  scripts[word_id] = code;
                  word_id--;
                }
              } else {
                if (calc.includes("!=")) {
                  calc = calc.split("!=");

                  calc[0] = calc[0].trim();
                  calc[1] = calc[1].trim();

                  if (calc[0].startsWith("%")) {
                    if (variables.includes(calc[0].substring(1, calc[0].length))) {
                      calc[0] = values[variables.indexOf(calc[0].substring(1, calc[0].length))];
                    } else {
                      __error(calc[0] + " isn't defined!", word_id);
                    }
                  }

                  if (calc[1].startsWith("%")) {
                    if (variables.includes(calc[1].substring(1, calc[1].length))) {
                      calc[1] = values[variables.indexOf(calc[1].substring(1, calc[1].length))];
                    } else {
                      __error(calc[1] + " isn't defined!", word_id);
                    }
                  }

                  if (calc[0] != calc[1]) {
                    scripts[word_id] = code;
                    word_id--;
                  }
                } else {
                  if (calc.includes(">")) {
                    calc = calc.split(">");

                    calc[0] = calc[0].trim();
                    calc[1] = calc[1].trim();

                    if (calc[0].startsWith("%")) {
                      if (variables.includes(calc[0].substring(1, calc[0].length))) {
                        calc[0] = values[variables.indexOf(calc[0].substring(1, calc[0].length))];
                      } else {
                        __error(calc[0] + " isn't defined!", word_id);
                      }
                    }

                    if (calc[1].startsWith("%")) {
                      if (variables.includes(calc[1].substring(1, calc[1].length))) {
                        calc[1] = values[variables.indexOf(calc[1].substring(1, calc[1].length))];
                      } else {
                        __error(calc[1] + " isn't defined!", word_id);
                      }
                    }

                    if (parseInt(calc[0]) > parseInt(calc[1])) {
                      scripts[word_id] = code;
                      word_id--;
                    }
                  } else {
                    if (calc.includes("<")) {
                      calc = calc.split("<");

                      calc[0] = calc[0].trim();
                      calc[1] = calc[1].trim();

                      if (calc[0].startsWith("%")) {
                        if (variables.includes(calc[0].substring(1, calc[0].length))) {
                          calc[0] = values[variables.indexOf(calc[0].substring(1, calc[0].length))];
                        } else {
                          __error(calc[0] + " isn't defined!", word_id);
                        }
                      }

                      if (calc[1].startsWith("%")) {
                        if (variables.includes(calc[1].substring(1, calc[1].length))) {
                          calc[1] = values[variables.indexOf(calc[1].substring(1, calc[1].length))];
                        } else {
                          __error(calc[1] + " isn't defined!", word_id);
                        }
                      }

                      if (parseInt(calc[0]) < parseInt(calc[1])) {
                        scripts[word_id] = code;
                        word_id--;
                      }
                    }
                  }
                }
              }
            } else {
              if (scripts[word_id].startsWith("repeat")) {
                var count = scripts[word_id].substring(7, scripts[word_id].length);

                var code = count.substring(count.indexOf(" ") + 1, scripts[word_id].length)

                count = count.substring(0, count.indexOf(" "));

                for (var ca = 0; ca < parseInt(count); ca++) {
                  scripts[word_id] = code;
                  word_id--;
                }
              } else {
                if (scripts[word_id].startsWith("back")) {
                  word_id = scripts[word_id].substring(5, scripts[word_id].length);
                  if (word_id >= 0) word_id++;
                  if (word_id > scripts.length) {
                    __error("Line " + word_id + " is not searchable", word_id);
                    return;
                  }
                } else {
                  if (scripts[word_id].startsWith("include")) {
                    var line = scripts[word_id];
                    fetch(scripts[word_id].substring(8, scripts[word_id].length) + ".fluf")
                      .then(response => response.text())
                      .then(data => { __addScript(data); scripts[word_id] = ""; word_id--; })
                      .catch(error => { document.getElementById("console").innerText += error + "\n"; console.log(error) });
                  } else {
                    if (scripts[word_id] == "clear") {
                      document.getElementById("console").innerText = "";
                    } else {
                      if (scripts[word_id].startsWith("function")) {
                        var func = scripts[word_id].substring(9, scripts[word_id].length);
                        functions.push(func.trim());

                        if (func.includes(" ")) {
                          __error("Cant use spaces on functions name", word_id);
                          return;
                        }

                        for (var al = word_id + 1; al < scripts.length; al++) {
                          if (scripts[al] != "end") {
                            functions_scripts.push(func + ":" + scripts[al]);
                            scripts[al] = "";
                          } else {
                            scripts[al] = "";
                            functions_scripts.push(func + ":end");
                            al = scripts.length + 1;
                          }
                        }
                      } else {
                        if (scripts[word_id].startsWith("(")) {
                          if (scripts[word_id].endsWith(")")) {
                            var fc = scripts[word_id].substring(1, scripts[word_id].length - 1);
                            fc = fc.trim();

                            let position = scripts.indexOf("(" + fc + ")");

                            if (functions.includes(fc)) {
                              var f = [];
                              for (var a = 0; a < functions_scripts.length; a++) {
                                if (functions_scripts[a].startsWith(fc) && !functions_scripts[a].endsWith("end")) {
                                  var gg = functions_scripts[a].replace(fc, "");
                                  f.push(gg.substring(1, gg.length));
                                }
                              }

                              scripts.splice(position, 1, ...f);
                              word_id--;
                            } else {
                              __error("The function " + fc + " isn't defined!", word_id);
                            }
                          } else {
                            __error("Missing ) in line " + word_id, word_id);
                          }
                        } else {
                          if (scripts[word_id].startsWith("fluf(")) {
                            if (scripts[word_id].endsWith(")")) {
                              var code_to_execute = scripts[word_id].substring(5, scripts[word_id].length - 1);
                              code_to_execute = code_to_execute.trim();

                              let position = scripts.indexOf("(" + code_to_execute + ")");

                              if (code_to_execute.includes("$")) {
                                var code = code_to_execute.split("$");

                                for (var cd = 0; cd < code.length; cd++) {
                                  code[cd] = code[cd].trim();
                                }

                                scripts[word_id] = "";
                                scripts.splice(position, 1, ...code);
                                console.log(scripts);

                                word_id--;
                                console.log(scripts)
                              }
                            } else {
                              __error("Missing ) in line " + word_id, word_id);
                            }
                          }else{
                            if(scripts[word_id].startsWith("#")) {
                              word_id++;
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
        }
      }
    }
  }
}

//Lê o script de fora do interpretador
fetch("index.fluf")
  .then(response => response.text())
  .then(data => __init__(data))
  .catch(error => /*document.getElementById("console").innerText += error + "\n"*/ console.log(error));