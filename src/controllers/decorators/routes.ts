import 'reflect-metadata';

export function get(path: string) {  // do metadata zachowujemy sciezke
  return function(target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata('path', path, target, key);
  }
}

