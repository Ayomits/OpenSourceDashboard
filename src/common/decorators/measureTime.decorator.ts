export function measureTime(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
      const startTime = performance.now();

      const result = originalMethod.apply(this, args);

      const endTime = performance.now();
      console.log(`Method ${propertyKey} took ${(endTime - startTime).toFixed(2)} seconds`);

      return result;
  };

  return descriptor;
}