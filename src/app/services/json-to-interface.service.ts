import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class JsonToInterfaceService {
  convert(data: string, interfaceName: string = 'IResponse') {
    const result = this.generateInterfaceCode(JSON.parse(data), interfaceName) + "}";
    return result;
  }

  generateInterfaceCode(json: any, interfaceName: string = 'IResponse') {
    let code = `export interface ${interfaceName} {\n`;

    for (const key in json) {
      const value = json[key];
      let _type: string = typeof value;

      if (Array.isArray(value)) {
        const subInterfaceName = `I${key[0].toUpperCase()}${key.slice(1)}`;
        code =
          this.generateInterfaceCode(value[0], subInterfaceName) + '\n' + code;
        _type = subInterfaceName + '[]';
      } else if (_type === 'object') {
        const subInterfaceName = `I${key[0].toUpperCase()}${key.slice(1)}`;
        code =
          this.generateInterfaceCode(value, subInterfaceName) + '\n' + code;
        _type = subInterfaceName;
      }

      code += `  ${key}: ${_type};\n`;
    }
    return code;
  }
}
