
export function superCodificadorSecreto (param){
    return param.replace(/[MURCIELAGO1234567890murcielago]/g, (letras) =>{

        switch (letras) {

            case 'm':
                return 0;
            case 'u':
                return 1;
            case 'r':
                return 2;
            case 'c':
                return 3;
            case 'i':
                return 4;
            case 'e':
                return 5;
            case 'l':
                return 6;
            case 'a':
                return 7;
            case 'g':
                return 8;
            case 'o':
                return 9;

            case 'M':
                return '(';
            case 'U':
                return '$';
            case 'R':
                return '%';
            case 'C':
                return '&';
            case 'I':
                return '/';
            case 'E':
                return '=';
            case 'L':
                return ')';
            case 'A':
                return '!';
            case 'G':
                return '°';
            case 'O':
                return '#';

            case '1':
                return '¬';
            case '2':
                return '{';
            case '3':
                return '+';
            case '4':
                return '}';
            case '5':
                return '_';
            case '6':
                return '<';
            case '7':
                return '¿';
            case '8':
                return '*';
            case '9':
                return '|';
            case '0':
                return '?';    

            default:
                letras;
        }
    });

}

//decodificador

export function decodificadorMensaje(param) {
    const reglasDeReemplazo = {
      '0': 'm',
      '1': 'u',
      '2': 'r',
      '3': 'c',
      '4': 'i',
      '5': 'e',
      '6': 'l',
      '7': 'a',
      '8': 'g',
      '9': 'o',
      '(': 'M',
      '$': 'U',
      '%': 'R',
      '&': 'C',
      '/': 'I',
      '=': 'E',
      ')': 'L',
      '!': 'A',
      '°': 'G',
      '#': 'O',
      '¬': '1',
      '{': '2',
      '+': '3',
      '}': '4',
      '_': '5',
      '>': '6',
      '¿': '7',
      '*': '8',
      '|': '9',
      '?': '0'
    };
  
    return param.replace(/[0-9()$%&/=)!°#¬+{}_¿>*|?]/g, (letra) => {
      return reglasDeReemplazo[letra] || letra;
    });
  }
